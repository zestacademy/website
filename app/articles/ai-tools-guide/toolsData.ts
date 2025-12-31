
export interface Tool {
    id: string
    name: string
    url: string
    description: string
    logoUrl?: string
}

export interface Category {
    title: string
    iconName: string // We will map this to lucide icons in the component
    iconColor: string
    tools: Tool[]
}

export const toolsData: Category[] = [
    {
        title: "Content Ideas & Research Tools",
        iconName: "Lightbulb",
        iconColor: "text-yellow-500",
        tools: [
            {
                id: "virality-ai",
                name: "Virality AI",
                url: "https://viralityai.net",
                description: "AI-powered platform for predicting and creating viral content through advanced analytics and trend analysis."
            },
            {
                id: "answerthepublic",
                name: "AnswerThePublic",
                url: "https://answerthepublic.com",
                description: "Discover what questions people are asking about your topic. Visualizes search queries to generate content ideas."
            },
            {
                id: "alsoasked",
                name: "AlsoAsked",
                url: "https://alsoasked.com",
                description: "Uncovers related questions people ask on search engines, helping you understand user intent and create comprehensive content."
            },
            {
                id: "ahrefs",
                name: "Ahrefs",
                url: "https://ahrefs.com",
                description: "Comprehensive SEO toolset that helps you research keywords, analyze competitors, and discover content opportunities."
            },
            {
                id: "industry-subreddit",
                name: "Industry Subreddit",
                url: "https://reddit.com",
                description: "Find niche communities and trending discussions in your industry for authentic content inspiration."
            },
            {
                id: "portent-ideas",
                name: "Portent Ideas",
                url: "https://www.portent.com/tools/title-maker",
                description: "Content idea generator that creates catchy titles and headlines based on your keywords."
            },
            {
                id: "deap-market",
                name: "Deap Market",
                url: "https://deapmarket.com",
                description: "Market research tool that identifies content gaps and opportunities in your niche."
            },
            {
                id: "contentideas-io",
                name: "Contentideas.io",
                url: "https://contentideas.io",
                description: "AI-driven content ideation platform that suggests trending topics and themes for your audience."
            },
            {
                id: "ubersuggest",
                name: "Ubersuggest",
                url: "https://neilpatel.com/ubersuggest",
                description: "Neil Patel's tool for keyword research, content ideas, and SEO insights to improve your strategy."
            },
            {
                id: "nexunom",
                name: "Nexunom",
                url: "https://nexunom.com",
                description: "Advanced content intelligence platform for discovering trending topics and content performance metrics."
            },
            {
                id: "marketing-miner",
                name: "Marketing Miner",
                url: "https://marketingminer.com",
                description: "Comprehensive marketing analytics tool for extracting insights from various data sources for content strategy."
            }
        ]
    },
    {
        title: "Design & Visual Creation Tools",
        iconName: "Palette",
        iconColor: "text-pink-500",
        tools: [
            {
                id: "canva",
                name: "Canva",
                url: "https://canva.com",
                description: "User-friendly graphic design platform with templates, AI features, and collaborative tools for creating stunning visuals."
            },
            {
                id: "gimp",
                name: "GIMP",
                url: "https://gimp.org",
                description: "Free, open-source image editor with professional-grade features for photo manipulation and graphic design."
            },
            {
                id: "figma",
                name: "Figma",
                url: "https://figma.com",
                description: "Collaborative interface design tool perfect for creating UI/UX designs, prototypes, and design systems."
            },
            {
                id: "photopea",
                name: "Photopea",
                url: "https://photopea.com",
                description: "AI-powered photo editing tool that enhances images with intelligent filters and adjustments."
            },
            {
                id: "picmonkey",
                name: "PicMonkey",
                url: "https://picmonkey.com",
                description: "Easy-to-use photo editor and design tool with templates for social media, marketing materials, and more."
            },
            {
                id: "adobe-spark",
                name: "Adobe Express (Spark)",
                url: "https://www.adobe.com/express/",
                description: "Create graphics, web pages, and video stories quickly with Adobe's streamlined design tools."
            },
            {
                id: "desygner",
                name: "Desygner",
                url: "https://desygner.com",
                description: "All-in-one design tool offering templates for various formats from social posts to business cards."
            },
            {
                id: "vistacreate",
                name: "VistaCreate",
                url: "https://create.vista.com",
                description: "Online design platform with thousands of templates and a vast library of stock assets for quick content creation."
            },
            {
                id: "krita",
                name: "Krita",
                url: "https://krita.org",
                description: "Professional-quality, free painting program designed for concept art, illustration, and texturing."
            },
            {
                id: "glimpse",
                name: "Glimpse",
                url: "https://glimpse-editor.org",
                description: "GIMP-based image editor with enhanced UI and modern features for photo editing enthusiasts."
            },
            {
                id: "genially",
                name: "Genially",
                url: "https://genial.ly",
                description: "Create interactive presentations, infographics, and multimedia content with engaging animations."
            },
            {
                id: "polotno-studio",
                name: "Polotno Studio",
                url: "https://studio.polotno.com",
                description: "Browser-based design tool for creating graphics with an intuitive interface and template library."
            }
        ]
    },
    {
        title: "Data Visualization & Chart Tools",
        iconName: "BarChart3",
        iconColor: "text-blue-500",
        tools: [
            {
                id: "canva-graphs",
                name: "Canva Graphs",
                url: "https://www.canva.com/graphs/",
                description: "Create professional charts and graphs easily within Canva's design platform with customizable templates."
            },
            {
                id: "chartblocks",
                name: "ChartBlocks",
                url: "https://chartblocks.io",
                description: "Online chart builder that creates responsive, embeddable charts from your data with no coding required."
            },
            {
                id: "venngage",
                name: "Venngage",
                url: "https://venngage.com",
                description: "Infographic and data visualization tool with templates for creating engaging visual reports and presentations."
            },
            {
                id: "vistacreate-graphs",
                name: "VistaCreate",
                url: "https://create.vista.com",
                description: "Design platform that includes tools for creating data visualizations and infographics alongside other graphics."
            },
            {
                id: "snappa",
                name: "Snappa",
                url: "https://snappa.com",
                description: "Quick and easy graphic design tool with built-in features for creating charts and data visualizations."
            },
            {
                id: "google-charts",
                name: "Google Charts",
                url: "https://developers.google.com/chart",
                description: "Free, powerful charting library that creates interactive visualizations from data with extensive customization options."
            },
            {
                id: "design-wizard",
                name: "Design Wizard",
                url: "https://designwizard.com",
                description: "Design tool offering chart templates and data visualization options for creating professional presentations."
            },
            {
                id: "visually",
                name: "Visually",
                url: "https://visual.ly",
                description: "Platform connecting businesses with designers to create custom infographics and data visualizations."
            },
            {
                id: "datamatic",
                name: "Datamatic.io",
                url: "https://datamatic.io",
                description: "Automated data visualization tool that transforms complex data into clear, understandable charts."
            },
            {
                id: "raw-graphs",
                name: "Raw Graphs",
                url: "https://rawgraphs.io",
                description: "Open-source data visualization framework for creating custom vector-based visualizations from spreadsheets."
            }
        ]
    },
    {
        title: "Stock Photos & Media Resources",
        iconName: "Image",
        iconColor: "text-green-500",
        tools: [
            {
                id: "pexels",
                name: "Pexels",
                url: "https://pexels.com",
                description: "High-quality, free stock photos and videos shared by talented creators worldwide."
            },
            {
                id: "imagesearchman",
                name: "ImageSearchMan",
                url: "https://play.google.com/store/apps/details?id=com.sun.imagesearch.man",
                description: "Powerful search engine aggregator for finding free images across multiple stock photo sites."
            },
            {
                id: "unsplash",
                name: "Unsplash",
                url: "https://unsplash.com",
                description: "Beautiful, free images and photos contributed by a community of photographers, freely usable."
            },
            {
                id: "mixkit",
                name: "Mixkit",
                url: "https://mixkit.co",
                description: "Free stock video clips, music tracks, and templates for your creative projects."
            },
            {
                id: "stocksnap",
                name: "StockSnap.io",
                url: "https://stocksnap.io",
                description: "Hundreds of high-resolution images added weekly, all free from copyright restrictions."
            },
            {
                id: "stockvault",
                name: "StockVault",
                url: "https://stockvault.net",
                description: "Free stock photos and images for personal and commercial use with thousands of options."
            },
            {
                id: "pixabay",
                name: "Pixabay",
                url: "https://pixabay.com",
                description: "Vast library of free stock images, illustrations, vectors, and videos for any project."
            },
            {
                id: "morguefile",
                name: "Morguefile",
                url: "https://morguefile.com",
                description: "Free image archive for creative projects with photos available for commercial use."
            },
            {
                id: "behance",
                name: "Behance",
                url: "https://behance.net",
                description: "Adobe's platform showcasing creative work where designers share projects and portfolio pieces."
            },
            {
                id: "imgur",
                name: "Imgur",
                url: "https://imgur.com",
                description: "Image hosting and sharing platform with a vast community-driven collection of images and GIFs."
            },
            {
                id: "librestock",
                name: "Librestock",
                url: "https://librestock.com",
                description: "Search engine that finds free stock photos from multiple websites in one place."
            },
            {
                id: "gencraft",
                name: "Gencraft",
                url: "https://gencraft.com",
                description: "AI-powered image generator that creates unique visuals from text descriptions for creative projects."
            }
        ]
    },
    {
        title: "Hashtag Research & Optimization Tools",
        iconName: "Hash",
        iconColor: "text-purple-500",
        tools: [
            {
                id: "hashtagstack",
                name: "HashtagStack",
                url: "https://hashtagstack.com",
                description: "Generate relevant hashtag sets for Instagram and social media to increase post visibility and reach."
            },
            {
                id: "gravtag",
                name: "GravTag",
                url: "https://gravtag.com",
                description: "Hashtag analytics tool that helps you find trending hashtags and analyze their performance."
            },
            {
                id: "allhashtag",
                name: "AllHashtag",
                url: "https://all-hashtag.com",
                description: "Comprehensive hashtag generator, analyzer, and creator for optimizing social media posts."
            },
            {
                id: "hashtagexpert",
                name: "HashtagExpert",
                url: "https://hashtag.expert",
                description: "Expert-level hashtag research tool providing insights into hashtag popularity and effectiveness."
            },
            {
                id: "hashtagmenow",
                name: "HashtagMeNow",
                url: "https://hashtagmenow.com",
                description: "Quick hashtag generator that creates relevant hashtags for your content instantly."
            },
            {
                id: "sistrix-hashtag",
                name: "Sistrix Hashtag",
                url: "https://www.sistrix.com/hashtag-generator",
                description: "SEO-focused hashtag tool that analyzes hashtag performance and suggests optimal combinations."
            },
            {
                id: "metahashtags",
                name: "MetaHashtags",
                url: "https://metahashtags.com",
                description: "Advanced hashtag generator using AI to create contextually relevant hashtag sets."
            },
            {
                id: "instavast",
                name: "Instavast",
                url: "https://instavast.com",
                description: "Instagram hashtag generator and analytics tool for maximizing engagement and reach."
            },
            {
                id: "bigbangram",
                name: "BigBangRam",
                url: "https://bigbangram.com",
                description: "Hashtag research and optimization tool designed for Instagram marketing success."
            }
        ]
    },
    {
        title: "Social Media Analytics & Insights Tools",
        iconName: "LineChart",
        iconColor: "text-orange-500",
        tools: [
            {
                id: "notjustanalytics",
                name: "NotJustAnalytics",
                url: "https://notjustanalytics.com",
                description: "Comprehensive social media analytics platform providing deep insights into content performance and audience behavior."
            },
            {
                id: "inflact",
                name: "Inflact",
                url: "https://inflact.com",
                description: "Instagram analytics and growth tool offering detailed metrics, hashtag analysis, and competitor tracking."
            },
            {
                id: "creator-studio",
                name: "Creator Studio",
                url: "https://business.facebook.com/creatorstudio",
                description: "Facebook's official tool for managing and analyzing content across Facebook and Instagram."
            },
            {
                id: "union-metrics",
                name: "Union Metrics",
                url: "https://unionmetrics.com",
                description: "Social media analytics platform providing actionable insights for Twitter, Instagram, and Facebook."
            },
            {
                id: "analisa",
                name: "Analisa.io",
                url: "https://analisa.io",
                description: "AI-powered Instagram and TikTok analytics tool for influencer analysis and campaign tracking."
            },
            {
                id: "pixlee",
                name: "Pixlee",
                url: "https://pixlee.com",
                description: "Visual marketing platform that helps brands discover, curate, and analyze user-generated content."
            },
            {
                id: "tapinfluence",
                name: "TapInfluence",
                url: "https://tapinfluence.com",
                description: "Influencer marketing platform with analytics for measuring campaign performance and ROI."
            },
            {
                id: "instrack",
                name: "Instrack.app",
                url: "https://instrack.app",
                description: "Instagram analytics tracker that monitors followers, engagement, and content performance in real-time."
            },
            {
                id: "toolzu",
                name: "Toolzu",
                url: "https://toolzu.com",
                description: "Multi-platform social media analytics tool providing insights across various social networks."
            },
            {
                id: "socialstats",
                name: "SocialStats.info",
                url: "https://socialstats.info",
                description: "Real-time social media statistics and analytics for tracking influencers and brand performance."
            }
        ]
    },
    {
        title: "Social Media Scheduling & Management Tools",
        iconName: "Calendar",
        iconColor: "text-teal-500",
        tools: [
            {
                id: "meta-business-suite",
                name: "Meta Business Suite",
                url: "https://business.facebook.com",
                description: "Facebook's all-in-one tool for managing, scheduling, and analyzing posts across Facebook and Instagram."
            },
            {
                id: "combin",
                name: "Combin Scheduler",
                url: "https://combin.com",
                description: "Instagram and Facebook scheduling tool with visual planning features and hashtag management."
            },
            {
                id: "tailwind",
                name: "Tailwind",
                url: "https://tailwindapp.com",
                description: "Pinterest and Instagram scheduler with SmartSchedule feature and content discovery tools."
            },
            {
                id: "buffer",
                name: "Buffer",
                url: "https://buffer.com",
                description: "Intuitive social media management tool for scheduling posts, analyzing performance, and managing multiple accounts."
            },
            {
                id: "circleboom",
                name: "CircleBoom",
                url: "https://circleboom.com",
                description: "Twitter management tool with scheduling, analytics, and account cleaning features."
            },
            {
                id: "socialchamp",
                name: "SocialChamp",
                url: "https://socialchamp.io",
                description: "Affordable social media scheduling platform supporting multiple networks with bulk uploading capabilities."
            },
            {
                id: "planable",
                name: "Planable",
                url: "https://planable.io",
                description: "Collaborative content planning and approval platform for social media teams with visual calendar."
            },
            {
                id: "coschedule",
                name: "CoSchedule",
                url: "https://coschedule.com",
                description: "Marketing calendar and social media scheduling tool that integrates with major platforms and WordPress."
            }
        ]
    },
    {
        title: "AI Productivity & Automation Tools",
        iconName: "Zap",
        iconColor: "text-red-500",
        tools: [
            {
                id: "vidyo-ai",
                name: "Vidyo AI",
                url: "https://vidyo.ai",
                description: "AI-powered video editing tool that automatically creates short clips from long-form content for social media."
            },
            {
                id: "predis-ai",
                name: "Predis AI",
                url: "https://predis.ai",
                description: "AI content generator that creates social media posts, ads, and captions with optimized hashtags."
            },
            {
                id: "upscayl",
                name: "Upscayl",
                url: "https://upscayl.org",
                description: "Free, open-source AI image upscaler that enhances image resolution using advanced algorithms."
            },
            {
                id: "picfinder",
                name: "PicFinder.ai",
                url: "https://picfinder.ai",
                description: "AI-powered image search and discovery tool that helps find the perfect visuals for your projects."
            },
            {
                id: "10web",
                name: "10Web",
                url: "https://10web.io",
                description: "AI-powered WordPress platform offering automated website building, hosting, and optimization."
            },
            {
                id: "scribe",
                name: "Scribe",
                url: "https://scribehow.com",
                description: "Automatically creates step-by-step guides and documentation by recording your screen actions."
            },
            {
                id: "neurallove",
                name: "NeuralLove",
                url: "https://neural.love",
                description: "AI art generator and image enhancement tool for creating and improving digital artwork."
            },
            {
                id: "bardeen",
                name: "Bardeen",
                url: "https://bardeen.ai",
                description: "No-code automation tool that streamlines repetitive tasks across apps and browsers with AI."
            },
            {
                id: "sendfame",
                name: "SendFame",
                url: "https://sendfame.com",
                description: "AI-powered video message platform creating personalized celebrity-style video greetings."
            },
            {
                id: "textblaze",
                name: "TextBlaze",
                url: "https://blaze.today",
                description: "Text expander tool that automates typing with templates and shortcuts for faster productivity."
            }
        ]
    }
];
