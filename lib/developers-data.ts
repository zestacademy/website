export interface DeveloperProject {
    title: string;
    tech: string;
    description: string;
    prize?: string;
    link?: string;
}

export interface DeveloperEducation {
    degree: string;
    institution: string;
    score: string;
    period: string;
}

export interface DeveloperExperience {
    role: string;
    organization: string;
    period: string;
    details: string[];
}

export interface Developer {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    resume: string;
    email: string;
    location: string;
    links: {
        github?: string;
        website?: string;
        linkedin?: string;
        twitter?: string;
        telegram?: string;
        resume?: string;
    };
    skills: string[];
    about: string;
    expertise: string[];
    projects: DeveloperProject[];
    experience: DeveloperExperience[];
    education: DeveloperEducation[];
    certifications: string[];
    contributions: string[];
    achievements: string[];
}

export const developers: Developer[] = [
    {
        id: "srinivasa-manikanta",
        name: "Srinivasa Manikanta Rajapantula",
        role: "Electrical & Electronics Engineering Student | Embedded Systems & IoT",
        bio: "Final-year EEE student with hands-on experience across embedded systems, industrial power infrastructure, and IoT product development. Winner of 2nd Prize at A-HACKS 2026 (Hardware Category).",
        avatar: "https://github.com/Rsmk27.png",
        resume: "/resumes/srinivasa-manikanta-resume.pdf",
        email: "srinivasmanikantarajapantula@gmail.com",
        location: "Srikakulam, Andhra Pradesh, India",
        links: {
            github: "https://github.com/Rsmk27",
            website: "http://rsmk.me",
            linkedin: "https://www.linkedin.com/in/srinivasamanikanta/",
            twitter: "https://x.com/SrinivasManik20",
            telegram: "https://t.me/RSMK_27",
            resume: "/resumes/srinivasa-manikanta-resume.pdf"
        },
        skills: [
            "Embedded C",
            "C",
            "Python",
            "MATLAB & Simulink",
            "ESP32 & Arduino",
            "IoT System Design",
            "Firebase RTDB",
            "UART / I²C / SPI / MQTT",
            "Power Systems & Substations",
            "Power Electronics & PWM",
            "Electrical Machines",
            "React Native & Next.js"
        ],
        about: "Final-year Electrical & Electronics Engineering student with hands-on experience spanning embedded systems, industrial power infrastructure, and end-to-end IoT product development. Built and deployed 4+ complete hardware/software projects, including an award-winning IoT wearable (2nd Prize, A-HACKS 2026 Hardware Category). Completed rigorous industrial training on 132kV/11kV substation operations and 5MW turbo-generator systems at Coromandel International Limited. Seeking full-time roles in Embedded Systems, Industrial Automation, or IoT Engineering.",
        expertise: [
            "Embedded Systems & Firmware Development (ESP32, Arduino, C/Embedded C)",
            "Hardware Communication Protocols (UART, I²C, SPI, MQTT)",
            "IoT Architecture & Cloud Integration (Firebase RTDB, Real-Time Monitoring)",
            "Power Infrastructure & Substation Operations (132kV/11kV, 5MW Turbo Generator)",
            "Power Electronics, Converters, Inverters & PWM Motor Drives",
            "MATLAB & Simulink Modeling and Electrical Simulation"
        ],
        projects: [
            {
                title: "Firefighter Safety Monitoring Device (SFMD)",
                tech: "ESP32 · Firebase RTDB · Next.js · MPU-6050 · NEO-6M · MQ-2 · DHT11",
                description: "Engineered an IoT wearable combining fall detection (MPU-6050), GPS tracking (NEO-6M), and environmental sensing (MQ-2, DHT11) paired with a live Next.js cloud dashboard for real-time firefighter tracking. Authored complete technical documentation and academic research paper.",
                prize: "🥈 2nd Prize, Hardware Category — A-HACKS 2026"
            },
            {
                title: "Color Ohm Mobile App",
                tech: "React Native · Expo",
                description: "Built and published a mobile app for resistor color-code decoding and electronics reference. Shipped 3 iterative releases (v1.0.0 → v1.2.1) incorporating SMD code decoding, calculation history, and bookmarks."
            },
            {
                title: "Single-Axis Solar Tracker",
                tech: "LDR · Relay Logic · DC Gear Motor",
                description: "Designed a relay-based dual-LDR tracking circuit that boosted solar energy capture by ~30% over a standard fixed-panel baseline."
            },
            {
                title: "Automatic Exhaust Fan",
                tech: "Arduino UNO · MQ-2 · Relay",
                description: "Built an intelligent gas-sensing automated ventilation system with threshold-based auto-activation and manual override for safety compliance."
            }
        ],
        experience: [
            {
                role: "Industrial Trainee — Electrical & Electronics",
                organization: "Coromandel International Limited, Visakhapatnam",
                period: "6th Semester, 2024",
                details: [
                    "Analyzed 132kV/11kV substation operations, mapping comprehensive power distribution flows across multiple plant sections.",
                    "Studied the 5MW Turbo Generator (TG) station, evaluating waste-heat-to-power recovery mechanisms from the sulphuric acid plant process."
                ]
            }
        ],
        education: [
            {
                degree: "B.Tech in Electrical & Electronics Engineering",
                institution: "State University",
                score: "CGPA 7.5",
                period: "2024 – 2027"
            },
            {
                degree: "Diploma in Electrical & Electronics Engineering",
                institution: "State Board of Technical Education & Training",
                score: "75%",
                period: "2021 – 2024"
            },
            {
                degree: "Secondary School Certificate (Class 10)",
                institution: "AP State Board",
                score: "90.3%",
                period: "2021"
            }
        ],
        certifications: [
            "Electrified Systems Design Engineer (MathWorks)",
            "Industrial IoT (IIoT)",
            "Solar PV System Design",
            "Introduction to IoT (NPTEL)",
            "PLC and HMI Basics (Coursera)"
        ],
        contributions: [
            "Architecting core educational content and developer tooling for Zest Academy",
            "Built and deployed 4+ embedded systems and IoT engineering projects",
            "Contributing to open-source IoT firmware and hardware platforms",
            "Authoring technical research papers and documentation on smart IoT wearables"
        ],
        achievements: [
            "2nd Prize, Hardware Category — A-HACKS 2026 for Firefighter Safety Monitoring Device (SFMD)",
            "Authored academic paper and full technical documentation for SFMD wearable system",
            "Workshops completed in Drone Technology, 3D Printing, and Electric Vehicle (EV) Technology"
        ]
    },
    {
        id: "narlapati-ramu",
        name: "Ramu Narlapati",
        role: "Electrical & Electronics Engineering Student | Embedded Systems & AI",
        bio: "Passionate EEE student with hands-on experience in embedded systems, IoT, and real-world hardware projects, driven by applying engineering principles to solve practical challenges.",
        avatar: "https://github.com/ramunarlapati-13.png",
        resume: "/resumes/ramu-narlapati-resume.pdf",
        email: "ramunarlapati@gmail.com",
        location: "Vijayawada, Andhra Pradesh, India",
        links: {
            github: "https://github.com/ramunarlapati-13",
            website: "https://imramu.me/",
            linkedin: "https://www.linkedin.com/in/ramunarlapati/",
            twitter: "https://x.com/Ramu_19__",
            resume: "/resumes/ramu-narlapati-resume.pdf"
        },
        skills: [
            "Embedded Systems",
            "ESP32 & Arduino",
            "Embedded C & Assembly",
            "IoT System Design",
            "Firebase RTDB",
            "UART / I2C / SPI / MQTT",
            "AutoCAD Electrical",
            "Power Systems & Substation Design",
            "PLC & HMI Automation",
            "Python, MATLAB & Simulink",
            "Web Dev (React.js, Next.js)",
            "Mobile App Dev (React Native, Expo)"
        ],
        about: "Passionate Electrical & Electronics Engineering student at Andhra Loyola Institute of Engineering & Technology with extensive hands-on experience in embedded systems, microcontrollers, IoT architecture, and real-world hardware implementations. Motivated by solving practical engineering problems through the integration of electrical systems with modern cloud, AI, and web technologies.",
        expertise: [
            "Embedded Systems, Microcontrollers & Sensors (ESP32, Arduino, C/Embedded C)",
            "IoT System Architecture, Firebase RTDB & Real-Time Telemetry",
            "AutoCAD Electrical (Control Panel Designing & Power Systems)",
            "Core EEE: Power Systems, Power Electronics & Electrical Machines",
            "Industrial Automation with PLC & HMI Systems",
            "Full-Stack Web & Mobile Prototyping (Next.js, React Native, Firebase)"
        ],
        projects: [
            {
                title: "Firefighter Safety Device (FFSD)",
                tech: "ESP32 · Firebase RTDB · React/Vite Dashboard · Mobile Application",
                description: "Developed an emergency personnel monitoring system tracking vital telemetry, environment hazards, and movement in real time with synchronized web and mobile dashboard alerts.",
                prize: "🥈 2nd Prize — A-HACKS Hackathon (Hardware Category) & 1st in Department"
            },
            {
                title: "Dual Axis Solar Tracker (DAST)",
                tech: "LDR · Relays · Gear Motors",
                description: "Implemented a dual-axis solar tracking mechanism utilizing pure relay logic without microcontrollers, delivering ~40% theoretical boost in solar capture efficiency."
            }
        ],
        experience: [
            {
                role: "Summer Intern — Solar PV System Design",
                organization: "Vijayawada",
                period: "4th Semester, B.Tech — May 2026",
                details: [
                    "Learned end-to-end solar PV systems engineering, load calculations, and solar array design specifications."
                ]
            },
            {
                role: "Industrial Trainee — Electrical & Electronics",
                organization: "South Central Railway, Vijayawada",
                period: "6th Semester, Diploma — 2024",
                details: [
                    "Participated in scheduled maintenance, heavy repairs, and electrical overhauling of diesel locomotives and Diesel Electric Multiple Units (DEMUs)."
                ]
            }
        ],
        education: [
            {
                degree: "B.Tech in Electrical & Electronics Engineering",
                institution: "Andhra Loyola Institute of Engineering & Technology, Vijayawada",
                score: "CGPA 8.0 (Pursuing)",
                period: "2024 – 2027"
            },
            {
                degree: "Diploma in Electrical & Electronics Engineering",
                institution: "Vikas Polytechnic College, Vissannapeta",
                score: "90%",
                period: "2021 – 2024"
            },
            {
                degree: "Secondary School Certificate (Class 10)",
                institution: "ZPHS Marlapalem, AP State Board",
                score: "490/600 (81.6%)",
                period: "2021"
            }
        ],
        certifications: [
            "Building IoT Solutions with Embedded Systems",
            "Introduction to IoT (NPTEL) & Industrial IoT (IIoT)",
            "PLC and HMI from Scratch (Packt)",
            "Electrified Systems Design Engineer (MathWorks)",
            "Google AI Professional (Google) & AI Fundamentals (IBM)",
            "Solar PV System Design (SkillDzire)",
            "Drone Technology"
        ],
        contributions: [
            "Developing core interactive tools and web infrastructure for Zest Academy",
            "Building engineering calculators and utilities for students",
            "Engineering AI-powered and IoT applications for student learning",
            "Advancing hardware-software integration tutorials and guides"
        ],
        achievements: [
            "1st Place — IEI Student Chapter Paper Presentation",
            "2nd Place — A-HACKS College Hackathon (Hardware Category)",
            "Department 1st — Firefighter Safety Device Project"
        ]
    }
];
