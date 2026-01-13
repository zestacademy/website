export const roadmaps = [
    {
        id: "python-basics", // Added an ID for easy lookup
        title: "Python Basics",
        description: "Complete 20-day Python journey from basics to advanced. Build real projects and master Python fundamentals.",
        level: "Beginner",
        levelColor: "bg-green-500",
        duration: "20 Days",
        courses: 20,
        color: "from-yellow-500/20 to-blue-500/5",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop",
        link: "/roadmaps/python-basics"
    },
    {
        id: "internet-of-things", // Added an ID for easy lookup
        title: "Internet of Things",
        description: "Master IoT from sensor networks to cloud computing. Learn Arduino, Raspberry Pi, and build smart systems for real-world applications.",
        level: "Intermediate",
        levelColor: "bg-yellow-500",
        duration: "8 Weeks",
        courses: 39,
        color: "from-purple-500/20 to-teal-500/5",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        link: "/roadmaps/internet-of-things"
    }
]

export function getRoadmapById(id: string) {
    return roadmaps.find(r => r.id === id) || roadmaps.find(r => r.link.includes(id))
}
