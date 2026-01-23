"use server"

import axios from "axios"

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST

export interface NewsItem {
    id: string
    title: string
    summary: string
    source: string
    date: string
    category: "Tech" | "Education"
    region: "India" | "World"
    url: string
    imageUrl: string
}

export interface JobItem {
    id: string
    title: string
    company: string
    location: string
    type: "Full-time" | "Part-time" | "Internship" | "Contract"
    mode: "Remote" | "Hybrid" | "On-site"
    posted: string
    tags: string[]
    logoUrl?: string
    applyLink: string
}

export async function getNews(): Promise<NewsItem[]> {
    try {
        // Fetch Tech News (India)
        const techResponse = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: 'in',
                category: 'technology',
                apiKey: NEWS_API_KEY,
                pageSize: 4
            }
        });

        // Fetch Education/Science News (World) - mixed for variety
        const globalResponse = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: 'education technology',
                language: 'en',
                sortBy: 'publishedAt',
                apiKey: NEWS_API_KEY,
                pageSize: 4
            }
        });

        const techNews = techResponse.data.articles.map((article: any, index: number) => ({
            id: `tech-${index}`,
            title: article.title,
            summary: article.description || "No description available.",
            source: article.source.name,
            date: new Date(article.publishedAt).toLocaleDateString(),
            category: "Tech",
            region: "India",
            url: article.url,
            imageUrl: article.urlToImage || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
        }));

        const eduNews = globalResponse.data.articles.map((article: any, index: number) => ({
            id: `edu-${index}`,
            title: article.title,
            summary: article.description || "No description available.",
            source: article.source.name,
            date: new Date(article.publishedAt).toLocaleDateString(),
            category: "Education",
            region: "World",
            url: article.url,
            imageUrl: article.urlToImage || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
        }));

        // Combine and limit
        return [...techNews.slice(0, 2), ...eduNews.slice(0, 2)];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

export async function getJobs(): Promise<JobItem[]> {
    try {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: 'software developer in India',
                page: '1',
                num_pages: '1'
            },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        };

        const response = await axios.request(options);
        const data = response.data.data;

        return data.slice(0, 4).map((job: any) => ({
            id: job.job_id,
            title: job.job_title,
            company: job.employer_name,
            location: `${job.job_city || 'India'}, ${job.job_country || ''}`,
            type: job.job_employment_type || "Full-time",
            mode: job.job_is_remote ? "Remote" : "On-site",
            posted: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : "Recently",
            tags: [job.job_job_title, ...Object.keys(job.job_required_skills || {}).slice(0, 2)],
            logoUrl: job.employer_logo,
            applyLink: job.job_apply_link
        }));

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
}
