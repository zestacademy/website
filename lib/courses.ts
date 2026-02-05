
export const courses = [
    {
        id: "python-basics",
        title: "Python Mastery",
        description: "Complete 20-day Python journey from basics to advanced. Build real projects and master Python fundamentals.",
        level: "Beginner",
        levelColor: "bg-green-500",
        duration: "20 Days",
        courses: 20,
        color: "from-yellow-500/20 to-blue-500/5",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop",
        link: "/courses/python-basics"
    },
    {
        id: "internet-of-things",
        title: "Internet of Things",
        description: "Master IoT from sensor networks to cloud computing. Learn Arduino, Raspberry Pi, and build smart systems for real-world applications.",
        level: "Intermediate",
        levelColor: "bg-yellow-500",
        duration: "12 Weeks",
        courses: 39,
        color: "from-purple-500/20 to-teal-500/5",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        link: "/courses/internet-of-things"
    }
]

export function getCourseById(id: string) {
    return courses.find(r => r.id === id) || courses.find(r => r.link.includes(id))
}
