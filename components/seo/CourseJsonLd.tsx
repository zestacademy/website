import { Course } from "@/types/lms";

interface CourseJsonLdProps {
    course: Course;
}

export default function CourseJsonLd({ course }: CourseJsonLdProps) {
    const baseUrl = "https://zestacademy.tech";
    const courseUrl = `${baseUrl}/courses/${course.slug || course.id}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Zest Academy",
            "sameAs": baseUrl
        },
        "image": [
            course.thumbnail
        ],
        "offers": {
            "@type": "Offer",
            "category": "Paid",
            "price": course.price || 0,
            "priceCurrency": "INR"
        },
        "educationalLevel": course.level,
        "url": courseUrl,
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Online",
            "instructor": {
                "@type": "Person",
                "name": course.instructorName
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
