export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Zest Academy",
        "url": "https://zestacademyonline.vercel.app",
        "logo": "https://zestacademyonline.vercel.app/logo.png",
        "sameAs": [
            "https://twitter.com/zestacademy",
            "https://linkedin.com/company/zestacademy"
        ],
        "description": "Master Engineering Fundamentals & Ace Interviews with structured learning paths.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "contact@zestacademy.com"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
