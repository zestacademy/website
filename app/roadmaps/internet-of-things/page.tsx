"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentsSection } from "@/components/comments-section"
import { Clock, Calendar, Target, CheckCircle2, Loader2, PlayCircle, Trophy, Download } from "lucide-react"
import { useRoadmapProgress } from "@/lib/hooks/useRoadmapProgress"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function InternetOfThingsRoadmapPage() {
    const router = useRouter()
    const { user, loading, progress, startRoadmap, toggleDayCompletion } = useRoadmapProgress("internet-of-things")

    const roadmapWeeks = [
        {
            week: 1,
            title: "IoT Fundamentals & Connectivity Basics",
            lectures: [
                {
                    number: 1,
                    title: "Introduction to IoT - I",
                    pdfUrl: "/pdfs/lec1.pdf",
                    topics: [
                        "What is Internet of Things",
                        "IoT architecture and components",
                        "IoT applications and use cases",
                        "IoT ecosystem overview"
                    ]
                },
                {
                    number: 2,
                    title: "Introduction to IoT - II",
                    pdfUrl: "/pdfs/lec2.pdf",
                    topics: [
                        "IoT enabling technologies",
                        "Sensors and actuators",
                        "Communication protocols",
                        "IoT platforms and services"
                    ]
                },
                {
                    number: 3,
                    title: "Connectivity Technologies - I",
                    pdfUrl: "/pdfs/lec3.pdf",
                    topics: [
                        "Wired vs wireless communication",
                        "Short-range wireless technologies",
                        "Wi-Fi and Bluetooth basics",
                        "Network topologies"
                    ]
                },
                {
                    number: 4,
                    title: "Connectivity Technologies - II",
                    pdfUrl: "/pdfs/lec4.pdf",
                    topics: [
                        "Zigbee protocol",
                        "LoRa and LoRaWAN",
                        "Low power wide area networks",
                        "Protocol comparison"
                    ]
                },
                {
                    number: 5,
                    title: "Connectivity Technologies - III",
                    pdfUrl: "/pdfs/lec5.pdf",
                    topics: [
                        "Cellular IoT (NB-IoT, LTE-M)",
                        "5G for IoT applications",
                        "Satellite communication",
                        "Network selection criteria"
                    ]
                },
                {
                    number: 6,
                    title: "Connectivity Technologies - IV",
                    pdfUrl: "/pdfs/lec6.pdf",
                    topics: [
                        "MQTT protocol",
                        "CoAP protocol",
                        "HTTP/HTTPS for IoT",
                        "Protocol selection guidelines"
                    ]
                },
                {
                    number: 7,
                    title: "IoT Data Management - I",
                    pdfUrl: "/pdfs/lec7.pdf",
                    topics: [
                        "Data collection methods",
                        "Data preprocessing",
                        "Data storage solutions",
                        "Time-series databases"
                    ]
                },
                {
                    number: 8,
                    title: "IoT Data Management - II",
                    pdfUrl: "/pdfs/lec8.pdf",
                    topics: [
                        "Data analytics for IoT",
                        "Real-time data processing",
                        "Data visualization techniques",
                        "Big data in IoT"
                    ]
                },
                {
                    number: 9,
                    title: "IoT Security - I",
                    pdfUrl: "/pdfs/lec9.pdf",
                    topics: [
                        "IoT security challenges",
                        "Authentication mechanisms",
                        "Encryption techniques",
                        "Secure boot and firmware updates"
                    ]
                },
                {
                    number: 10,
                    title: "IoT Security - II",
                    pdfUrl: "/pdfs/lec10.pdf",
                    topics: [
                        "Network security",
                        "Device management security",
                        "Privacy concerns",
                        "Security best practices"
                    ]
                },
                {
                    number: 11,
                    title: "IoT Standards and Protocols",
                    pdfUrl: "/pdfs/lec11.pdf",
                    topics: [
                        "IoT standards organizations",
                        "Industry standards overview",
                        "Compliance requirements",
                        "Interoperability standards"
                    ]
                },
                {
                    number: 12,
                    title: "IoT Architecture Patterns",
                    pdfUrl: "/pdfs/lec12.pdf",
                    topics: [
                        "Edge computing architecture",
                        "Gateway patterns",
                        "Cloud-native IoT",
                        "Hybrid architectures"
                    ]
                }
            ],
            assignment: "Research and document IoT architecture for a specific use case with connectivity requirements",
            assignmentPdfUrl: "/pdfs/assignment-week1.pdf"
        },
        {
            week: 2,
            title: "IoT Connectivity & Sensor Networks",
            lectures: [
                {
                    number: 13,
                    title: "Connectivity Technologies – V",
                    topics: [
                        "Z-wave protocol for home automation",
                        "ISA100.11a for industrial automation",
                        "Mesh network topology",
                        "RF signaling and control"
                    ]
                },
                {
                    number: 14,
                    title: "Sensor Networks – I",
                    topics: [
                        "Introduction to sensor networks",
                        "Sensors, transducers, and actuators",
                        "Network topology and coverage",
                        "Real-time monitoring"
                    ]
                },
                {
                    number: 15,
                    title: "Sensor Networks – II",
                    topics: [
                        "Stationary vs mobile sensor networks",
                        "Aerial mobile sensor networks",
                        "Network protocols",
                        "Data aggregation"
                    ]
                },
                {
                    number: 16,
                    title: "Sensor Networks - III",
                    topics: [
                        "Applications in agriculture",
                        "Healthcare applications",
                        "Space applications",
                        "Research use cases"
                    ]
                }
            ],
            assignment: "Set up a basic sensor network simulation and analyze different connectivity protocols",
            assignmentPdfUrl: "/pdfs/assignment-week2.pdf"
        },
        {
            week: 3,
            title: "Advanced Sensor Networks & Communication",
            lectures: [
                {
                    number: 17,
                    title: "Sensor Networks - IV",
                    topics: [
                        "Advanced network architectures",
                        "Energy efficiency",
                        "Routing protocols",
                        "Network optimization"
                    ]
                },
                {
                    number: 18,
                    title: "Sensor Networks - V",
                    topics: [
                        "Network security",
                        "Data integrity",
                        "Quality of Service",
                        "Performance metrics"
                    ]
                },
                {
                    number: 19,
                    title: "UAV Networks",
                    topics: [
                        "Unmanned Aerial Vehicles basics",
                        "UAV communication",
                        "Network applications",
                        "Challenges and solutions"
                    ]
                },
                {
                    number: 20,
                    title: "Machine to Machine Communication",
                    topics: [
                        "M2M fundamentals",
                        "Communication protocols",
                        "M2M architectures",
                        "Use cases and applications"
                    ]
                },
                {
                    number: 21,
                    title: "Interoperability in IoT",
                    topics: [
                        "Interoperability challenges",
                        "Standards and protocols",
                        "Data formats",
                        "Integration techniques"
                    ]
                }
            ],
            assignment: "Design a UAV-based sensor network for agricultural monitoring with M2M communication",
            assignmentPdfUrl: "/pdfs/assignment-week3.pdf"
        },
        {
            week: 4,
            title: "Arduino Basics & Integration",
            lectures: [
                {
                    number: 22,
                    title: "Introduction to Arduino - I",
                    topics: [
                        "Arduino board basics",
                        "Hardware components",
                        "IDE setup",
                        "First program"
                    ]
                },
                {
                    number: 23,
                    title: "Introduction to Arduino - II",
                    topics: [
                        "Digital I/O operations",
                        "Analog I/O",
                        "Arduino programming",
                        "Libraries and functions"
                    ]
                },
                {
                    number: 24,
                    title: "Arduino with Sensors & Actuators - I",
                    topics: [
                        "Sensor integration",
                        "Reading sensor data",
                        "Actuator control",
                        "Basic projects"
                    ]
                },
                {
                    number: 25,
                    title: "Arduino with Sensors & Actuators - II",
                    topics: [
                        "Advanced sensor projects",
                        "Motor control",
                        "Display integration",
                        "IoT applications"
                    ]
                }
            ],
            assignment: "Build an Arduino-based IoT device with multiple sensors and actuators",
            assignmentPdfUrl: "/pdfs/assignment-week4.pdf"
        },
        {
            week: 5,
            title: "Python Programming for IoT",
            lectures: [
                {
                    number: 26,
                    title: "Introduction to Python - I",
                    topics: [
                        "Python basics",
                        "Data types and variables",
                        "Control structures",
                        "Functions"
                    ]
                },
                {
                    number: 27,
                    title: "Introduction to Python - II",
                    topics: [
                        "Object-oriented programming",
                        "File handling",
                        "Libraries and modules",
                        "Error handling"
                    ]
                }
            ],
            assignment: "Write Python programs for data processing and IoT device communication",
            assignmentPdfUrl: "/pdfs/assignment-week5.pdf"
        },
        {
            week: 6,
            title: "Raspberry Pi & IoT Implementation",
            lectures: [
                {
                    number: 28,
                    title: "Introduction to Raspberry Pi - I",
                    topics: [
                        "Raspberry Pi hardware",
                        "Operating system setup",
                        "GPIO basics",
                        "Python on Pi"
                    ]
                },
                {
                    number: 29,
                    title: "Introduction to Raspberry Pi - II",
                    topics: [
                        "GPIO programming",
                        "Peripheral interfacing",
                        "Network configuration",
                        "Remote access"
                    ]
                },
                {
                    number: 30,
                    title: "IoT with Raspberry Pi - I",
                    topics: [
                        "Sensor integration with Pi",
                        "Data collection",
                        "Network communication",
                        "Basic IoT projects"
                    ]
                },
                {
                    number: 31,
                    title: "IoT with Raspberry Pi - II",
                    topics: [
                        "Web services on Pi",
                        "Database integration",
                        "Cloud connectivity",
                        "Advanced projects"
                    ]
                },
                {
                    number: 32,
                    title: "IoT with Raspberry Pi - III",
                    topics: [
                        "Real-time data processing",
                        "Analytics on Pi",
                        "Security considerations",
                        "Production deployment"
                    ]
                }
            ],
            assignment: "Create a complete IoT system using Raspberry Pi with cloud connectivity",
            assignmentPdfUrl: "/pdfs/assignment-week6.pdf"
        },
        {
            week: 7,
            title: "Software-Defined Networking for IoT",
            lectures: [
                {
                    number: 33,
                    title: "Software-Defined Networking - I",
                    topics: [
                        "SDN fundamentals",
                        "Control and data planes",
                        "OpenFlow protocol",
                        "SDN controllers"
                    ]
                },
                {
                    number: 34,
                    title: "Software-Defined Networking - II",
                    topics: [
                        "SDN architectures",
                        "Network virtualization",
                        "SDN applications",
                        "Performance"
                    ]
                },
                {
                    number: 35,
                    title: "Software-Defined IoT Networking - I",
                    topics: [
                        "SDN for IoT",
                        "IoT network challenges",
                        "SDN benefits for IoT",
                        "Architecture design"
                    ]
                },
                {
                    number: 36,
                    title: "Software-Defined IoT Networking - II",
                    topics: [
                        "Implementation strategies",
                        "Case studies",
                        "Performance optimization",
                        "Future trends"
                    ]
                }
            ],
            assignment: "Design an SDN-based IoT network architecture with OpenFlow",
            assignmentPdfUrl: "/pdfs/assignment-week7.pdf"
        },
        {
            week: 8,
            title: "Cloud, Fog & Edge Computing",
            lectures: [
                {
                    number: 37,
                    title: "Cloud Computing - Fundamentals",
                    topics: [
                        "Cloud computing basics",
                        "Service models (IaaS, PaaS, SaaS)",
                        "Deployment models",
                        "Key characteristics"
                    ]
                },
                {
                    number: 38,
                    title: "Cloud Computing - Service Models",
                    topics: [
                        "Infrastructure as a Service",
                        "Platform as a Service",
                        "Software as a Service",
                        "Comparison and use cases"
                    ]
                },
                {
                    number: 39,
                    title: "Cloud Computing - Management & Security",
                    topics: [
                        "Service management",
                        "Security challenges",
                        "Privacy concerns",
                        "Best practices"
                    ]
                },
                {
                    number: 40,
                    title: "Cloud Computing - Case Studies",
                    topics: [
                        "Real-world implementations",
                        "Industry examples",
                        "Success stories",
                        "Lessons learned"
                    ]
                },
                {
                    number: 41,
                    title: "Cloud Computing - Practical",
                    topics: [
                        "Hands-on cloud setup",
                        "Deploying applications",
                        "Resource management",
                        "Monitoring and scaling"
                    ]
                },
                {
                    number: 42,
                    title: "Sensor-Cloud - I",
                    topics: [
                        "Sensor-Cloud concept",
                        "Architecture design",
                        "Benefits and challenges",
                        "Data management"
                    ]
                },
                {
                    number: 43,
                    title: "Sensor-Cloud - II",
                    topics: [
                        "Implementation details",
                        "Use cases",
                        "Performance analysis",
                        "Future directions"
                    ]
                },
                {
                    number: 44,
                    title: "Fog Computing - I",
                    topics: [
                        "Fog computing basics",
                        "Edge vs Cloud vs Fog",
                        "Architecture",
                        "Key advantages"
                    ]
                },
                {
                    number: 45,
                    title: "Fog Computing - II",
                    topics: [
                        "Fog computing applications",
                        "Implementation",
                        "Case studies",
                        "Challenges"
                    ]
                }
            ],
            assignment: "Deploy an IoT application on cloud platform and implement fog computing layer",
            assignmentPdfUrl: "/pdfs/assignment-week8.pdf"
        },
        {
            week: 9,
            title: "IoT Applications: Smart Systems",
            lectures: [
                {
                    number: 46,
                    title: "Smart Cities and Smart Homes - I",
                    pdfUrl: "/pdfs/lec46.pdf",
                    topics: [
                        "Introduction to smart cities",
                        "Smart city components",
                        "Smart home basics",
                        "IoT in urban infrastructure"
                    ]
                },
                {
                    number: 47,
                    title: "Smart Cities and Smart Homes - II",
                    topics: [
                        "Smart home technologies",
                        "Automation systems",
                        "Energy management",
                        "Security systems"
                    ]
                },
                {
                    number: 48,
                    title: "Smart Cities and Smart Homes - III",
                    topics: [
                        "Smart city infrastructure",
                        "Urban IoT applications",
                        "Traffic management",
                        "Waste management"
                    ]
                },
                {
                    number: 49,
                    title: "Connected Vehicles - I",
                    topics: [
                        "Vehicle-to-vehicle communication",
                        "Vehicle-to-infrastructure",
                        "Connected car technologies",
                        "Safety applications"
                    ]
                },
                {
                    number: 50,
                    title: "Connected Vehicles - II",
                    topics: [
                        "Autonomous driving",
                        "VANET protocols",
                        "Real-time systems",
                        "Future of transportation"
                    ]
                },
                {
                    number: 51,
                    title: "Smart Grid - I",
                    topics: [
                        "Smart grid fundamentals",
                        "Components and architecture",
                        "Smart meters",
                        "Communication protocols"
                    ]
                },
                {
                    number: 52,
                    title: "Smart Grid - II",
                    topics: [
                        "Grid optimization",
                        "Renewable energy integration",
                        "Demand response",
                        "Security and privacy"
                    ]
                }
            ],
            assignment: "Final Project: Design a complete smart city solution or connected vehicle system",
            assignmentPdfUrl: "/pdfs/assignment-week9.pdf"
        },
        {
            week: 10,
            title: "Advanced IoT Topics & Industrial Applications",
            lectures: [
                {
                    number: 53,
                    title: "Industrial IoT - I",
                    pdfUrl: "/pdfs/lec53.pdf",
                    topics: [
                        "Introduction to IIoT",
                        "Industry 4.0 concepts",
                        "Industrial communication protocols",
                        "Manufacturing automation"
                    ]
                },
                {
                    number: 54,
                    title: "Industrial IoT - II",
                    pdfUrl: "/pdfs/lec54.pdf",
                    topics: [
                        "Predictive maintenance",
                        "Asset tracking",
                        "Quality control systems",
                        "IIoT case studies"
                    ]
                },
                {
                    number: 55,
                    title: "IoT Analytics & Machine Learning",
                    pdfUrl: "/pdfs/lec55.pdf",
                    topics: [
                        "ML for IoT data",
                        "Anomaly detection",
                        "Predictive analytics",
                        "Edge AI applications"
                    ]
                },
                {
                    number: 56,
                    title: "IoT Blockchain Integration",
                    pdfUrl: "/pdfs/lec56.pdf",
                    topics: [
                        "Blockchain basics",
                        "IoT and blockchain synergy",
                        "Supply chain applications",
                        "Decentralized IoT networks"
                    ]
                }
            ],
            assignment: "Develop an Industrial IoT solution with predictive analytics capabilities",
            assignmentPdfUrl: "/pdfs/assignment-week10.pdf"
        },
        {
            week: 11,
            title: "Emerging IoT Technologies & Future Trends",
            lectures: [
                {
                    number: 57,
                    title: "Digital Twins in IoT",
                    pdfUrl: "/pdfs/lec57.pdf",
                    topics: [
                        "Digital twin concepts",
                        "Virtual modeling",
                        "Real-time synchronization",
                        "Use cases and benefits"
                    ]
                },
                {
                    number: 58,
                    title: "IoT in Healthcare & Wearables",
                    pdfUrl: "/pdfs/lec58.pdf",
                    topics: [
                        "Healthcare IoT applications",
                        "Wearable devices",
                        "Remote patient monitoring",
                        "Health data analytics"
                    ]
                },
                {
                    number: 59,
                    title: "IoT Ethics & Regulations",
                    pdfUrl: "/pdfs/lec59.pdf",
                    topics: [
                        "Ethical considerations",
                        "Privacy regulations (GDPR)",
                        "Data governance",
                        "Responsible IoT deployment"
                    ]
                },
                {
                    number: 60,
                    title: "Future of IoT & Capstone",
                    pdfUrl: "/pdfs/lec60.pdf",
                    topics: [
                        "Emerging IoT trends",
                        "6G and beyond",
                        "Quantum computing for IoT",
                        "Career opportunities in IoT"
                    ]
                }
            ],
            assignment: "Capstone Project: Build a comprehensive IoT solution integrating multiple technologies learned",
            assignmentPdfUrl: "/pdfs/assignment-week11.pdf"
        },
        {
            week: 12,
            title: "Final Project & Assessment",
            lectures: [
                {
                    number: 61,
                    title: "Project Review & Best Practices",
                    topics: [
                        "Project review and feedback",
                        "Best practices in IoT development",
                        "Common pitfalls and solutions",
                        "Industry standards review"
                    ]
                },
                {
                    number: 62,
                    title: "IoT Project Documentation",
                    topics: [
                        "Technical documentation",
                        "Architecture diagrams",
                        "API documentation",
                        "User guides and manuals"
                    ]
                },
                {
                    number: 63,
                    title: "IoT Testing & Quality Assurance",
                    topics: [
                        "Testing strategies for IoT",
                        "Hardware testing",
                        "Integration testing",
                        "Performance testing"
                    ]
                },
                {
                    number: 64,
                    title: "Final Assessment & Next Steps",
                    topics: [
                        "Course review and recap",
                        "Final assessment guidelines",
                        "Career path in IoT",
                        "Continuing education resources"
                    ]
                }
            ],
            assignment: "Final Assessment: Complete a comprehensive IoT project with documentation and presentation",
            assignmentPdfUrl: "/pdfs/assignment-week12.pdf"
        }
    ]

    const bonusTips = [
        "Build hands-on projects with Arduino and Raspberry Pi",
        "Experiment with different IoT protocols and connectivity technologies",
        "Deploy IoT applications on cloud platforms (AWS IoT, Azure IoT, Google Cloud IoT)",
        "Practice with real sensors and actuators",
        "Join IoT communities and hackathons",
        "Explore open-source IoT platforms like ThingsBoard or Home Assistant"
    ]

    const totalWeeks = roadmapWeeks.length
    const completionPercentage = progress ? Math.round((progress.completedDays.length / totalWeeks) * 100) : 0
    const isEnrolled = !!progress

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-purple-50 to-background dark:from-purple-950/20 dark:to-background border-b relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Badge className="bg-purple-500 text-white border-0">Intermediate</Badge>
                        <Badge className="bg-blue-500 text-white border-0">12 Weeks</Badge>
                        <Badge className="bg-teal-500 text-white border-0">64 Lectures</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Internet of Things (IoT) Learning Roadmap
                    </h1>
                    <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                        Master the Internet of Things from fundamentals to advanced applications. Learn sensor networks, 
                        Arduino, Raspberry Pi, cloud computing, and build real-world IoT solutions for smart cities, 
                        connected vehicles, and smart grids through 12 weeks of comprehensive study.
                    </p>

                    {/* Action Area */}
                    <div className="flex flex-col items-center justify-center gap-6 mt-8">
                        {loading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        ) : !user ? (
                            <div className="text-center space-y-4">
                                <p className="text-muted-foreground">Log in to track your progress and earn certificates.</p>
                                <Button size="lg" onClick={() => router.push('/login')} className="font-semibold shadow-lg">
                                    Login to Start Learning
                                </Button>
                            </div>
                        ) : !isEnrolled ? (
                            <div className="text-center space-y-4">
                                <Button size="lg" onClick={() => startRoadmap(totalWeeks)} className="font-semibold shadow-lg text-lg px-8 bg-purple-600 hover:bg-purple-700">
                                    <PlayCircle className="mr-2 h-5 w-5" /> Start This Roadmap
                                </Button>
                                <p className="text-sm text-muted-foreground">Join thousands of students learning IoT.</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-md space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Your Progress</span>
                                    <span>{completionPercentage}% ({progress.completedDays.length}/{totalWeeks} Weeks)</span>
                                </div>
                                <Progress value={completionPercentage} className="h-3" />
                                {completionPercentage === 100 && (
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2 justify-center mt-4 border border-green-200 dark:border-green-800">
                                        <Trophy className="h-5 w-5" />
                                        <span className="font-bold">Course Completed! Great job!</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Clock className="h-8 w-8 text-purple-500" />
                            <div>
                                <p className="text-2xl font-bold">3-5 hours</p>
                                <p className="text-sm text-muted-foreground">Per week</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-2xl font-bold">12 Weeks</p>
                                <p className="text-sm text-muted-foreground">Total duration</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Target className="h-8 w-8 text-teal-500" />
                            <div>
                                <p className="text-2xl font-bold">12 Projects</p>
                                <p className="text-sm text-muted-foreground">Hands-on practice</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background flex-1">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Weekly Learning Path</h2>
                            <p className="text-muted-foreground">
                                Follow this structured 12-week curriculum covering 64 comprehensive lectures on IoT.
                            </p>
                        </div>
                    </div>

                    {/* Roadmap Weeks */}
                    <div className="space-y-6">
                        {roadmapWeeks.map((week, idx) => {
                            const isCompleted = progress?.completedDays.includes(week.week) || false

                            return (
                                <Card key={idx} className={`transition-all ${isCompleted ? 'border-green-500/50 bg-green-50/10' : 'hover:border-purple-500/50'}`}>
                                    <CardHeader>
                                        <div className="flex items-start gap-4">
                                            <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-br from-purple-500 to-blue-600'}`}>
                                                {isCompleted ? <CheckCircle2 className="h-8 w-8" /> : week.week}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className={`text-2xl mb-2 ${isCompleted ? 'text-green-700 dark:text-green-400' : ''}`}>
                                                            Week {week.week}: {week.title}
                                                        </CardTitle>
                                                        <div className="flex gap-2 flex-wrap mb-2">
                                                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                                                                {week.lectures.length} Lectures
                                                            </Badge>
                                                            {isCompleted && (
                                                                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Completed</Badge>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {isEnrolled && (
                                                        <Button
                                                            variant={isCompleted ? "outline" : "default"}
                                                            onClick={() => toggleDayCompletion(week.week)}
                                                            className={isCompleted ? "border-green-500 text-green-600 hover:bg-green-50" : ""}
                                                        >
                                                            {isCompleted ? "Mark Incomplete" : "Mark as Done"}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Lectures */}
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                                Lectures Covered
                                            </h4>
                                            <div className="space-y-3">
                                                {week.lectures.map((lecture, lectureIdx) => (
                                                    <div key={lectureIdx} className="bg-muted/50 p-3 rounded-lg">
                                                        <div className="flex items-start justify-between gap-2 mb-2">
                                                            <h5 className="font-medium text-foreground">
                                                                Lecture {lecture.number}: {lecture.title}
                                                            </h5>
                                                            {lecture.pdfUrl && (
                                                                <a 
                                                                    href={lecture.pdfUrl} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 whitespace-nowrap"
                                                                    aria-label={`Download PDF for Lecture ${lecture.number}: ${lecture.title}`}
                                                                >
                                                                    <Download className="h-4 w-4" />
                                                                    <span>PDF</span>
                                                                </a>
                                                            )}
                                                        </div>
                                                        <ul className="space-y-1 ml-4">
                                                            {lecture.topics.map((topic, topicIdx) => (
                                                                <li key={topicIdx} className="text-sm text-muted-foreground list-disc">
                                                                    {topic}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Assignment */}
                                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                                    <Target className="h-4 w-4 text-purple-500" />
                                                    Weekly Assignment
                                                </h4>
                                                {week.assignmentPdfUrl && (
                                                    <a 
                                                        href={week.assignmentPdfUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 whitespace-nowrap font-medium"
                                                        aria-label={`Download assignment PDF for Week ${week.week}`}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        <span>Download Assignment</span>
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-foreground">{week.assignment}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Bonus Tips Section */}
                    <Card className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <span>🎯</span> Bonus Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {bonusTips.map((tip, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">What&apos;s Next?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                After completing this 12-week IoT roadmap, you&apos;ll have comprehensive knowledge of 
                                Internet of Things technologies and applications. Here are recommended next steps:
                            </p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li>Build a complete end-to-end IoT solution with real hardware</li>
                                <li>Explore advanced topics like edge AI and machine learning on IoT devices</li>
                                <li>Contribute to open-source IoT projects on GitHub</li>
                                <li>Learn about IoT security best practices and implement secure IoT systems</li>
                                <li>Experiment with industrial IoT (IIoT) protocols and applications</li>
                                <li>Get certified in IoT platforms (AWS IoT, Azure IoT, Google Cloud IoT)</li>
                                <li>Join IoT communities, attend conferences, and participate in hackathons</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Comments Section */}
                    <div className="mt-12">
                        <CommentsSection courseId="internet-of-things-roadmap" />
                    </div>
                </div>
            </section>
        </div>
    )
}
