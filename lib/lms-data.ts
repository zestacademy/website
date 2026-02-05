
import { Course } from "@/types/lms";

export const pythonCourse: Course = {
    id: "python-basics",
    title: "Python Mastery",
    subtitle: "Complete 20-day Python journey from basics to advanced.",
    description: "Master Python programming with this comprehensive 20-day curriculum. From variables to Data Science basics, build real-world projects. Perfect for beginners.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop",
    level: "Beginner",
    duration: "20 Days",
    tags: ["Python", "Programming", "Data Science"],
    certificateAvailable: true,
    modules: Array.from({ length: 20 }, (_, i) => {
        const day = i + 1;
        // content mapping based on the previous file read
        const titles = [
            "Introduction + Setup", "Variables + Data Types", "Operators", "Strings", "Lists",
            "Tuples + Sets", "Dictionary", "If-Else Conditions", "Loops", "Functions",
            "File Handling", "Error Handling", "Modules & Packages", "OOP - Part 1", "OOP - Part 2",
            "Advanced Concepts", "Working With APIs", "Data Handling + Pandas", "Mini Project Day", "Final Project"
        ];

        return {
            id: `day-${day}`,
            title: `Day ${day}: ${titles[i] || 'Topic'}`,
            order: day,
            lessons: [
                {
                    id: `d${day}-content`,
                    title: "Lesson Content",
                    type: "text",
                    content: {
                        type: "text",
                        markdown: `# ${titles[i]}\n\nWelcome to Day ${day} of Python Mastery. In this lesson, we will cover the core concepts detailed in the curriculum.\n\n### Topics\n- Key Concept 1\n- Key Concept 2\n- Practical Examples\n\n*(Full detailed content migrating from legacy system...)*`
                    }
                },
                {
                    id: `d${day}-quiz`,
                    title: `Day ${day} Quiz`,
                    type: "quiz",
                    content: {
                        type: "quiz",
                        questions: [
                            {
                                id: "q1",
                                question: "Test your understanding of today's topics.",
                                options: ["Option A", "Option B", "Option C"],
                                correctOptionIndex: 0
                            }
                        ]
                    }
                }
            ]
        }
    })
};

export const iotCourse: Course = {
    id: "internet-of-things",
    title: "Internet of Things Specialist",
    subtitle: "Build smart devices and connected systems.",
    description: "Master IoT from sensor networks to cloud computing. Learn Arduino, Raspberry Pi, and build smart systems for real-world applications.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    level: "Intermediate",
    duration: "12 Weeks",
    tags: ["IoT", "Hardware", "Cloud", "Arduino", "Raspberry Pi"],
    certificateAvailable: true,
    modules: [
        {
            id: "week-1",
            title: "Week 1: IoT Fundamentals & Connectivity Basics",
            order: 1,
            lessons: [
                {
                    id: "w1-lec1",
                    title: "Introduction to IoT - I",
                    type: "text",
                    content: {
                        type: "pdf",
                        markdown: "Introduction to Internet of Things, Architecture, and Use Cases.",
                        resources: [{ title: "Lecture PDF", url: "/pdfs/lec1.pdf", type: "pdf" }]
                    }
                },
                {
                    id: "w1-lec2",
                    title: "Introduction to IoT - II",
                    type: "text",
                    content: { type: "text", markdown: "IoT Enabling Technologies, Sensors, Actuators." }
                },
                {
                    id: "w1-quiz",
                    title: "Week 1 Assessment",
                    type: "quiz",
                    content: {
                        type: "quiz",
                        questions: [
                            { question: "What is the projected number of 'Things' connected to the Internet?", options: ["5 billion", "10 billion", "Over 20 billion", "50 million"], correctOptionIndex: 2, id: "w1q1", explanation: "Estimates suggest over 20 billion devices." }
                        ]
                    }
                }
            ]
        },
        {
            id: "week-2",
            title: "Week 2: IoT Connectivity & Sensor Networks",
            order: 2,
            lessons: [
                { id: "w2-lec1", title: "Connectivity Technologies V", type: "text", content: { type: "text", markdown: "Z-wave, ISA100.11a, Mesh Networks." } },
                { id: "w2-quiz", title: "Week 2 Assessment", type: "quiz", content: { type: "quiz", questions: [{ id: "w2q1", question: "What does MQTT stand for?", options: ["Message Query Telemetry Transport", "Message Queue Telemetry Transport"], correctOptionIndex: 1 }] } }
            ]
        },
        {
            id: "week-3",
            title: "Week 3: Advanced Sensor Networks",
            order: 3,
            lessons: [
                { id: "w3-lec1", title: "UAV Networks", type: "text", content: { type: "text", markdown: "Unmanned Aerial Vehicles communication and networks." } }
            ]
        },
        {
            id: "week-4",
            title: "Week 4: Arduino Basics",
            order: 4,
            lessons: [
                { id: "w4-lec1", title: "Introduction to Arduino", type: "text", content: { type: "text", markdown: "Arduino board basics, hardware components, and IDE setup." } }
            ]
        },
        {
            id: "week-5",
            title: "Week 5: Python for IoT",
            order: 5,
            lessons: [
                { id: "w5-lec1", title: "Python Basics", type: "text", content: { type: "text", markdown: "Variables, Control Structures, Functions in Python." } }
            ]
        },
        {
            id: "week-6",
            title: "Week 6: Raspberry Pi",
            order: 6,
            lessons: [
                { id: "w6-lec1", title: "Raspberry Pi Setup", type: "text", content: { type: "text", markdown: "OS Setup, GPIO basics, Python on Pi." } }
            ]
        },
        {
            id: "week-7",
            title: "Week 7: SDN for IoT",
            order: 7,
            lessons: [
                { id: "w7-lec1", title: "SDN Fundamentals", type: "text", content: { type: "text", markdown: "Software Defined Networking basics and Control Planes." } }
            ]
        },
        {
            id: "week-8",
            title: "Week 8: Cloud, Fog & Edge",
            order: 8,
            lessons: [
                { id: "w8-lec1", title: "Cloud Computing Basics", type: "text", content: { type: "text", markdown: "IaaS, PaaS, SaaS, and deployment models." } }
            ]
        },
        {
            id: "week-9",
            title: "Week 9: Smart Systems",
            order: 9,
            lessons: [
                { id: "w9-lec1", title: "Smart Cities", type: "text", content: { type: "text", markdown: "Smart city components and infrastructure." } }
            ]
        },
        {
            id: "week-10",
            title: "Week 10: Industrial IoT",
            order: 10,
            lessons: [
                { id: "w10-lec1", title: "IIoT Introduction", type: "text", content: { type: "text", markdown: "Industry 4.0 and Industrial protocols." } }
            ]
        },
        {
            id: "week-11",
            title: "Week 11: Emerging Tech",
            order: 11,
            lessons: [
                { id: "w11-lec1", title: "Digital Twins", type: "text", content: { type: "text", markdown: "Digital Twin concepts and virtual modeling." } }
            ]
        }
    ]
}

export const ALL_COURSES_DATA = [pythonCourse, iotCourse];
