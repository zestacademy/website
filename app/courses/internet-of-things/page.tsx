"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentsSection } from "@/components/comments-section"
import { Clock, Calendar, Target, CheckCircle2, Loader2, PlayCircle, Trophy, Download, BookOpen, Eye, EyeOff } from "lucide-react"
import { useCourseProgress } from "@/lib/hooks/useCourseProgress"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { QuizSection } from "@/components/QuizSection"

export default function InternetOfThingsCoursePage() {
    const router = useRouter()
    const { user, loading, progress, startCourse, toggleDayCompletion } = useCourseProgress("internet-of-things")

    const courseWeeks = [
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
            mcqs: [
                { question: "What is the projected number of \"Things\" connected to the Internet in the near future mentioned in the lectures?", options: ["5 billion", "10 billion", "Over 20 billion", "50 million"], answer: "c" },
                { question: "Which of the following is NOT listed as a component of the unification of technologies in IoT?", options: ["Cloud computing", "Machine learning", "Big-data", "Manual data entry"], answer: "d" },
                { question: "In the context of IoT addressing, why is there a need for IPv6?", options: ["Because IPv4 is too expensive", "Because of an address crunch due to the massive number of devices", "Because IPv6 is faster for streaming", "Because sensors cannot use IPv4"], answer: "b" },
                { question: "Machine-to-Machine (M2M) communication is primarily characterized by:", options: ["Frequent human intervention", "Being free of any human intervention", "Only wired connections", "Use exclusively in healthcare"], answer: "b" },
                { question: "Which protocol is specifically designed for low-power Wireless Personal Area Networks over IPv6?", options: ["HTTP", "6LoWPAN", "FTP", "SMTP"], answer: "b" },
                { question: "The 6LoWPAN protocol allows which type of devices to connect to the Internet?", options: ["High-power workstations only", "Smallest devices with limited processing ability", "Only routers", "Only smartphones"], answer: "b" },
                { question: "Which organization created the 6LoWPAN standard?", options: ["IEEE", "ISO", "IETF", "W3C"], answer: "c" },
                { question: "What is a primary characteristic of a Smart Grid consumer?", options: ["They can only consume energy, not monitor it", "They can program smart meters for load balancing and pricing choices", "They must manually read meters every day", "They cannot use electricity during peak hours"], answer: "b" },
                { question: "Which technology is often used for supply chain management and counterfeit prevention in pharmaceuticals?", options: ["Bluetooth", "RFID", "Z-Wave", "6LoWPAN"], answer: "b" },
                { question: "In an M2M overview, which layer comes immediately after the \"Sensors\" layer?", options: ["Processing", "Network", "Actuation", "Information Extraction"], answer: "b" }
            ]
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
            mcqs: [
                { question: "What does MQTT stand for?", options: ["Message Query Telemetry Transport", "Message Queue Telemetry Transport", "Management Queue Transport Tool", "Mobile Queue Telemetry Transfer"], answer: "b" },
                { question: "Which architecture model does MQTT utilize?", options: ["Request-Response", "Publish-Subscribe", "Peer-to-Peer", "Master-Slave"], answer: "b" },
                { question: "What is the role of the \"Broker\" in MQTT?", options: ["It generates the data", "It consumes the data", "It creates a direct link between client and server", "It is the central communication point that dispatches messages between senders and receivers"], answer: "d" },
                { question: "In MQTT, what character is used as a single-level wildcard?", options: ["#", "*", "+", "%"], answer: "c" },
                { question: "What does CoAP stand for?", options: ["Connection Application Protocol", "Constrained Application Protocol", "Computer Application Process", "Communication Access Protocol"], answer: "b" },
                { question: "CoAP is a web transfer protocol designed for use with:", options: ["High-speed fiber networks", "Constrained nodes and networks", "Video streaming servers", "Desktop computers only"], answer: "b" },
                { question: "Which transport layer protocol does CoAP typically run over?", options: ["TCP", "UDP", "SCTP", "ICMP"], answer: "b" },
                { question: "What does AMQP stand for?", options: ["Advanced Message Queuing Protocol", "Automated Message Query Process", "Application Message Queuing Point", "Advanced Mobile Query Protocol"], answer: "a" },
                { question: "What is the basic unit of data in AMQP?", options: ["Packet", "Datagram", "Frame", "Segment"], answer: "c" },
                { question: "Which feature is a main advantage of Secure MQTT (SMQTT)?", options: ["Faster data transfer", "Broadcast encryption where one message is encrypted and delivered to multiple nodes", "No need for a broker", "Uses HTTP instead of TCP"], answer: "b" }
            ]
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
            mcqs: [
                { question: "Which of the following is NOT a mode of operation for NFC?", options: ["Peer-to-peer mode", "Read/Write mode", "Card emulation mode", "Router mode"], answer: "d" },
                { question: "How many slaves can a single Bluetooth master connect to in a piconet?", options: ["Up to 5", "Up to 7", "Up to 10", "Unlimited"], answer: "b" },
                { question: "In Bluetooth networking, what is a \"Scatternet\"?", options: ["A single master and one slave", "A device that is turned off", "An interconnection of multiple piconets", "A security protocol"], answer: "c" },
                { question: "Which protocol is explicitly mentioned as suitable for industrial applications like closed-loop regulatory control?", options: ["Bluetooth", "ISA100.11a", "NFC", "RFID"], answer: "b" },
                { question: "Which IEEE standard defines the physical and MAC layers for Zigbee?", options: ["IEEE 802.11", "IEEE 802.3", "IEEE 802.15.4", "IEEE 802.16"], answer: "c" },
                { question: "In a Wireless Sensor Network (WSN), which unit powers the device?", options: ["Sensing unit", "Processing unit", "Communication unit", "Power unit"], answer: "d" },
                { question: "Ideally, sensor nodes should be:", options: ["Expensive and large", "Low cost and easily dispensable", "Wired only", "Incapable of adaptation"], answer: "b" },
                { question: "In the context of WSNs, \"Scalability\" refers to:", options: ["The physical size of the sensor", "Providing acceptable service levels in the presence of a large number of nodes", "The battery life of a single node", "Measuring weight"], answer: "b" },
                { question: "What is a \"Sink\" in a sensor network?", options: ["A node that generates data", "A node that acts as a gateway or collection point for data", "A broken sensor", "The power source"], answer: "b" },
                { question: "A \"multi-hop\" communication strategy in WSNs is used to:", options: ["Reduce the number of sensors", "Send data from a source node to a sink via intermediate nodes", "Avoid using batteries", "Increase the size of the sensors"], answer: "b" }
            ]
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
            mcqs: [
                { question: "In WSN target tracking, what is \"Push-based formulation\"?", options: ["Nodes compute the target position and periodically notify the sink", "The sink queries the nodes", "A tracker follows the trail", "The target sends its own coordinates"], answer: "a" },
                { question: "What is \"k-barrier coverage\"?", options: ["At least 1 sensor detects an intruder", "At least k sensors detect an intruder crossing a barrier", "Covering k different distinct points", "Using k sensors for the whole area"], answer: "b" },
                { question: "In \"Area Coverage,\" what is the objective?", options: ["To cover a specific line", "To cover only specific points", "To ensure each point in a region is monitored by at least one sensor", "To cover the barrier between two countries"], answer: "c" },
                { question: "If the communication range (Rc) is at least twice the sensing range (Rs), what does coverage imply?", options: ["Nothing", "Connectivity", "Interference", "Failure"], answer: "b" },
                { question: "In Wireless Multimedia Sensor Networks (WMSNs), why are Scalar Sensor (SS) nodes used alongside Camera Sensor (CS) nodes?", options: ["SS nodes are more expensive", "SS nodes detect events to trigger the power-hungry CS nodes", "CS nodes cannot detect motion", "SS nodes provide high-definition video"], answer: "b" },
                { question: "Which algorithm is used for minimizing overlap while covering crossings in WSNs?", options: ["TCP/IP", "OGDC (Optimal Geographical Density Control)", "Dijkstra's algorithm", "RSA encryption"], answer: "b" },
                { question: "What is \"Dead Reckoning\" used for in localization?", options: ["Calculating battery life", "Estimating position based on distance and angle from a known node", "Determining if a node is dead", "Counting the number of nodes"], answer: "b" },
                { question: "In \"Participatory Sensing,\" who forms the sensor network?", options: ["Fixed cameras on the street", "People carrying smartphones equipped with sensors", "Satellites", "Robots only"], answer: "b" },
                { question: "Which topology is typically used for UAV (Drone) networks to ensure reliability and flexibility?", options: ["Star topology", "Bus topology", "Mesh topology (Flat or Hierarchical)", "Ring topology"], answer: "c" },
                { question: "\"Topology Management\" in WSNs is primarily concerned with:", options: ["Painting the sensors", "Managing connectivity and coverage of the network over time", "Manufacturing the sensors", "Disposing of sensors"], answer: "b" }
            ]
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
            mcqs: [
                { question: "Which issue does \"Device Interoperability\" address?", options: ["User authentication", "Seamless operation between heterogeneous devices with different standards/protocols", "Increasing battery life", "Reducing the cost of devices"], answer: "b" },
                { question: "What is a \"Universal Middleware Bridge\" (UMB) used for?", options: ["Connecting the physical bridge to the internet", "Solving interoperability problems by creating virtual maps among physical devices", "Powering the Arduino", "Writing Python code"], answer: "b" },
                { question: "The Arduino platform consists of:", options: ["Only software", "Only hardware", "Both a programmable circuit board (hardware) and a software IDE", "Only a USB cable"], answer: "c" },
                { question: "Which function in Arduino is analogous to the `main()` function in C/C++?", options: ["`loop()`", "`start()`", "`setup()`", "`run()`"], answer: "c" },
                { question: "What does the `loop()` function in Arduino do?", options: ["It runs only once", "It initializes variables", "It iterates the specified task continuously", "It shuts down the board"], answer: "c" },
                { question: "To configure a pin as an output in Arduino, which function is used?", options: ["`digitalWrite()`", "`pinMode()`", "`analogRead()`", "`serial.begin()`"], answer: "b" },
                { question: "What does `digitalWrite(12, HIGH)` do?", options: ["Reads data from pin 12", "Sets pin 12 to a low voltage", "Sets pin 12 to a high voltage (turns it on)", "Measures the height of pin 12"], answer: "c" },
                { question: "What is the function of `delay(1000)` in an Arduino sketch?", options: ["Pauses the program for 1000 microseconds", "Pauses the program for 1000 seconds", "Pauses the program for 1000 milliseconds (1 second)", "Stops the program forever"], answer: "c" },
                { question: "Which Arduino board has more pins and 4 UARTs compared to the Uno?", options: ["Arduino Nano", "Arduino Mega", "Arduino Mini", "Arduino Lilypad"], answer: "b" },
                { question: "In the servo motor library for Arduino, what does the `write()` function typically control?", options: ["The speed of the motor", "The angle/position of the motor shaft (e.g., 0 to 180 degrees)", "The voltage of the motor", "The color of the motor"], answer: "b" }
            ]
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
            mcqs: [
                { question: "Which of the following is a characteristic of the Python programming language?", options: ["It requires strict syntax rules and complex compilation", "It is a versatile, easy-to-script, and easy-to-read language", "It cannot be used for IoT", "It is a closed-source software"], answer: "b" },
                { question: "In Python, what is a \"List\"?", options: ["An ordered sequence of items that can be changed", "An unordered collection of key-value pairs", "A sequence that cannot be changed", "A single integer"], answer: "a" },
                { question: "What is a \"Tuple\" in Python?", options: ["A mutable list", "An ordered sequence of items that cannot be changed once created", "A dictionary key", "A looping structure"], answer: "b" },
                { question: "Which keyword is used to define a function in Python?", options: ["`function`", "`fun`", "`def`", "`define`"], answer: "c" },
                { question: "How is a Raspberry Pi different from an Arduino?", options: ["Raspberry Pi is a microcontroller; Arduino is a full computer", "Raspberry Pi is a fully functional computer; Arduino is a microcontroller", "Raspberry Pi cannot run Python", "Arduino has an Operating System; Raspberry Pi does not"], answer: "b" },
                { question: "What is the default operating system used for Raspberry Pi in the lectures?", options: ["Windows 10", "macOS", "Raspbian (a Linux variant)", "Android"], answer: "c" },
                { question: "What does \"GPIO\" stand for in the context of Raspberry Pi?", options: ["General Purpose Input Output", "Graphics Processing Input Output", "Global Position Input Output", "General Power Input Output"], answer: "a" },
                { question: "To access the Raspberry Pi remotely via a command line, which protocol is commonly enabled?", options: ["FTP", "SSH", "HTTP", "SMTP"], answer: "b" },
                { question: "In Python, indentation is used for:", options: ["Comments", "Aesthetics only", "Defining blocks of code (like loops and functions)", "Nothing"], answer: "c" },
                { question: "Which library is used in Python for handling CSV files?", options: ["`import excel`", "`import csv`", "`import text`", "`import spreadsheet`"], answer: "b" }
            ]
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
            mcqs: [
                { question: "To interface a DHT sensor (Temperature/Humidity) with Raspberry Pi, which type of library is typically imported in Python?", options: ["`import cv2`", "`import Adafruit_DHT`", "`import socket`", "`import numpy`"], answer: "b" },
                { question: "When programming a UDP client in Python on Raspberry Pi, which socket type is used?", options: ["`SOCK_STREAM`", "`SOCK_DGRAM`", "`SOCK_RAW`", "`SOCK_SEQPACKET`"], answer: "b" },
                { question: "What does the function `socket.bind((IP, PORT))` do in a server script?", options: ["Connects to a remote server", "Associates the socket with a specific network interface and port number", "Sends data", "Closes the connection"], answer: "b" },
                { question: "In the context of the \"remote data logging\" case study, where is the sensor data stored?", options: ["Only on the sensor", "On the client Raspberry Pi only", "Sent to a server and saved in a file (e.g., DataLog.txt)", "It is discarded immediately"], answer: "c" },
                { question: "Which Python library is primarily used for plotting data (e.g., temperature graphs)?", options: ["`matplotlib.pyplot`", "`socket`", "`sys`", "`Adafruit_DHT`"], answer: "a" },
                { question: "In a Python script, what does `data.split(',')` do?", options: ["Deletes the data", "Splits a string into a list of substrings based on the comma delimiter", "Joins strings together with commas", "Plots the data"], answer: "b" },
                { question: "Why might one use `GPIO.BOARD` mode in a Raspberry Pi Python script?", options: ["To use the physical pin numbers on the header", "To use the Broadcom chip-specific pin numbers", "To disable the pins", "To use the board as a skateboard"], answer: "a" },
                { question: "In the implementation of the cooling fan system, what triggered the fan to turn on?", options: ["A random timer", "A manual switch only", "If the temperature reading exceeded a threshold (e.g., 20 degrees)", "If the humidity was zero"], answer: "c" },
                { question: "What is the purpose of `figure.canvas.draw()` in a matplotlib animation loop?", options: ["To close the window", "To save the image to a file", "To redraw the plot with new data without closing the window", "To stop the script"], answer: "c" },
                { question: "In the client-server architecture demonstrated, if you have 100 clients, where do you update the data processing logic?", options: ["On every single client manually", "On the single server script", "You have to buy new hardware", "You cannot update it"], answer: "b" }
            ]
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
            mcqs: [
                { question: "What is the main advantage of Cloud Computing described as \"Elasticity\"?", options: ["The hardware is made of rubber", "The ability to dynamically scale resources up or down based on demand", "The cost is fixed regardless of usage", "It only works for small applications"], answer: "b" },
                { question: "Which Cloud service model provides the consumer with the ability to deploy consumer-created applications?", options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "DaaS (Data as a Service)"], answer: "b" },
                { question: "In the SaaS model, who controls the underlying cloud infrastructure?", options: ["The end-user", "The service provider", "The government", "The hardware manufacturer only"], answer: "b" },
                { question: "Which deployment model involves a cloud infrastructure provisioned for exclusive use by a single organization?", options: ["Public Cloud", "Community Cloud", "Private Cloud", "Hybrid Cloud"], answer: "c" },
                { question: "Which simulator is described as a \"packet-level simulator\" that monitors energy consumption of data center components?", options: ["CloudSim", "GreenCloud", "CloudAnalyst", "iCanCloud"], answer: "b" },
                { question: "CloudSim is a simulation framework written in which environment?", options: ["C++", "Python", "Java", "Ruby"], answer: "c" },
                { question: "In Software Defined Networking (SDN) for IoT, what is \"Mobi-Flow\"?", options: ["A static routing protocol", "A proactive rule placement scheme depending on users' movement", "A battery saving mode", "A type of sensor"], answer: "b" },
                { question: "What does the \"Odin\" SDN framework use to communicate with the controller?", options: ["An agent placed at access points", "A direct wire to every device", "Satellite links", "Bluetooth only"], answer: "a" },
                { question: "Which characteristic of Cloud Computing ensures resource usage is monitored and billed accordingly?", options: ["Broad network access", "Measured service", "Resource pooling", "On-demand self-service"], answer: "b" },
                { question: "What is a \"Hybrid Cloud\"?", options: ["A cloud that runs on diesel and battery", "A composition of two or more distinct cloud infrastructures (private, community, or public)", "A cloud that is only for storage", "A cloud that is always offline"], answer: "b" }
            ]
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
            mcqs: [
                { question: "What is OpenStack?", options: ["A proprietary operating system", "A collection of open-source technologies to create a cloud infrastructure", "A database management system", "A type of sensor"], answer: "b" },
                { question: "Which OpenStack component is responsible for \"Identity Service\" (authentication and authorization)?", options: ["Nova", "Horizon", "Keystone", "Glance"], answer: "c" },
                { question: "What is the dashboard/GUI component of OpenStack called?", options: ["Horizon", "Neutron", "Cinder", "Swift"], answer: "a" },
                { question: "In OpenStack, what is \"Nova\" responsible for?", options: ["Image service", "Compute service (launching instances)", "Networking", "Block storage"], answer: "b" },
                { question: "Why is \"Caching\" important in a Sensor-Cloud environment?", options: ["To increase the energy consumption of sensors", "To serve multiple users requesting the same data without re-querying the physical sensors repeatedly", "To delete data faster", "To heat up the servers"], answer: "b" },
                { question: "In the context of Fog Computing, where are \"Time-sensitive\" data analyzed?", options: ["In the distant public cloud", "Very near to the data source (at the Fog node)", "In the archive", "They are not analyzed"], answer: "b" },
                { question: "Which of the following is a reason to use Fog Computing?", options: ["Cloud has infinite bandwidth", "Sending all data to the cloud consumes too much bandwidth and adds latency", "Fog nodes are more powerful than Cloud servers", "Fog computing eliminates the need for sensors"], answer: "b" },
                { question: "In the Sensor-Cloud architecture, what is a \"Virtual Sensor\"?", options: ["A fake sensor that produces random data", "An emulation/image of a physical sensor that users interact with", "A sensor that is broken", "A video game controller"], answer: "b" },
                { question: "What is \"Internal Caching\" in Sensor-Cloud?", options: ["Storing data on the user's laptop", "Caching data within the sensor-cloud infrastructure for different virtual sensors", "Storing data on the physical sensor node itself", "Printing the data"], answer: "b" },
                { question: "How does Fog computing assist in a medical emergency scenario?", options: ["By waiting weeks to process data", "By providing real-time analysis and immediate decision making at the edge", "By turning off the ambulance", "By encrypting data so no one can read it"], answer: "b" }
            ]
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
            mcqs: [
                { question: "Which of the following is a core objective of a Smart City?", options: ["To increase pollution", "To use ICT to offer advanced services to citizens (e.g., smart transport, healthcare)", "To stop people from using technology", "To remove all schools"], answer: "b" },
                { question: "In the context of connected vehicles, what does V2X stand for?", options: ["Vehicle to X (Everything/Infrastructure/Vehicle)", "Vehicle to X-ray", "Video to Xylophone", "Virtual to X"], answer: "a" },
                { question: "Which communication standard is specifically associated with Wireless Access in Vehicular Environments (WAVE)?", options: ["IEEE 802.11p (DSRC)", "IEEE 802.15.4", "Bluetooth Low Energy", "LoRaWAN"], answer: "a" },
                { question: "What is the role of \"Data Fusion\" in IoT?", options: ["To confuse the user", "To combine data from multiple sources to provide better insight and qualitative inferences", "To delete duplicate files", "To disconnect sensors"], answer: "b" },
                { question: "Which level of data fusion involves an \"ensemble of decisions\"?", options: ["Pixel level", "Feature level", "Decision level", "Signal level"], answer: "c" },
                { question: "What is a major challenge in Smart Cities related to \"Big Data\"?", options: ["There is not enough data", "Transfer, storage, and analytics of gigantic volumes of data are expensive and processing-intensive", "Data is always small and structured", "Computers are too fast"], answer: "b" },
                { question: "In Intelligent Connected Vehicles (ICV), how can cooperation between vehicles help?", options: ["By allowing them to collide", "By enabling decisions to keep safe distance and avoid collisions", "By racing each other", "By disconnecting from the network"], answer: "b" },
                { question: "What is \"Content Centric Networking\" (CCN) in the context of vehicular networks?", options: ["Routing based on IP addresses", "Routing based on the name of the content rather than the location", "Using only text messages", "A social network for cars"], answer: "b" },
                { question: "Which mathematical method is NOT typically used for Data Fusion?", options: ["Bayesian analysis", "Artificial Neural Networks (ANN)", "Theory of Evidence (Belief functions)", "Random guessing"], answer: "d" },
                { question: "In a smart city education scenario, how does the system improve safety?", options: ["By isolating the school from the city", "By connecting the school transport, traffic control, and hospitals to handle emergencies seamlessly", "By removing buses", "By stopping parents from tracking their children"], answer: "b" }
            ]
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
            mcqs: [
                { question: "What distinguishes a Smart Grid from a traditional electrical grid?", options: ["Smart Grid has one-way communication", "Smart Grid allows two-way communication and monitoring between utility and consumer", "Smart Grid uses only fossil fuels", "Smart Grid has no meters"], answer: "b" },
                { question: "What is \"Time-of-Use\" pricing in Smart Grids?", options: ["A fixed price all year round", "Pricing that varies based on peak and off-peak hours", "Free electricity at night", "Paying based on the time it takes to pay the bill"], answer: "b" },
                { question: "What is the role of the Meter Data Management System (MDMS) in a Smart Grid?", options: ["It is a physical meter in the house", "It generates electricity", "It is a centralized system that handles data from smart meters and decides pricing", "It cuts the wires"], answer: "c" },
                { question: "What does IIoT stand for?", options: ["International Internet of Things", "Industrial Internet of Things", "Intelligent Internet of Things", "Internal Internet of Things"], answer: "b" },
                { question: "The primary goal of IIoT is to create a ________ version of a physical plant.", options: ["Virtualized", "Paper", "Plastic", "Silent"], answer: "a" },
                { question: "How are robots expected to change in an IIoT environment?", options: ["They will replace all humans", "They will become less intelligent", "They will communicate, think, act, and work collaboratively with humans", "They will only do one task forever"], answer: "c" },
                { question: "What is \"Peak Load\" in the context of energy management?", options: ["The minimum energy used", "The time when energy demand is highest", "The weight of the transmission lines", "The cost of the meter"], answer: "b" },
                { question: "Which communication technology is noted as attractive for Smart Grid sensor networks due to low data rate and short range?", options: ["Satellite", "Fiber Optics", "Zigbee", "5G"], answer: "c" },
                { question: "What is a benefit of Smart Grid for stakeholders?", options: ["Increased power blackouts", "Reduced inefficiencies in energy delivery and better integration of renewables", "Higher cost of maintenance", "Less data availability"], answer: "b" },
                { question: "In IIoT, what does the convergence of technologies (Cloud, Big Data, M2M) enable?", options: ["Slower production", "Intelligent manufacturing and improved productivity", "Manual labor increase", "Isolation of machines"], answer: "b" }
            ]
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

    const totalWeeks = courseWeeks.length
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
                        <Badge className="bg-blue-500 text-white border-0">11 Weeks</Badge>
                        <Badge className="bg-teal-500 text-white border-0">60 Lectures</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Internet of Things (IoT) Learning Course
                    </h1>
                    <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
                        Master the Internet of Things from fundamentals to advanced applications. Learn sensor networks,
                        Arduino, Raspberry Pi, cloud computing, and build real-world IoT solutions for smart cities,
                        connected vehicles, and smart grids.
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
                                <Button size="lg" onClick={() => startCourse(totalWeeks)} className="font-semibold shadow-lg text-lg px-8 bg-purple-600 hover:bg-purple-700">
                                    <PlayCircle className="mr-2 h-5 w-5" /> Start This Course
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
                                <p className="text-2xl font-bold">11 Weeks</p>
                                <p className="text-sm text-muted-foreground">Total duration</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-card p-4 rounded-lg border shadow-sm">
                            <Target className="h-8 w-8 text-teal-500" />
                            <div>
                                <p className="text-2xl font-bold">11 Projects</p>
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
                                Follow this structured 11-week curriculum covering 60 comprehensive lectures on IoT.
                            </p>
                        </div>
                    </div>

                    {/* Course Weeks */}
                    <div className="space-y-6">
                        {courseWeeks.map((week, idx) => {
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
                                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <Target className="h-4 w-4 text-purple-500" />
                                                Weekly Assignment
                                            </h4>
                                            <p className="text-foreground">{week.assignment}</p>
                                        </div>

                                        {/* MCQ Section */}
                                        {week.mcqs && week.mcqs.length > 0 && (
                                            <>
                                                <Separator />
                                                <div className="mt-6">
                                                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                                                        <BookOpen className="h-5 w-5 text-blue-500" />
                                                        Weekly Assessment
                                                    </h4>
                                                    <QuizSection
                                                        weekNumber={week.week}
                                                        title={`Week ${week.week} Quiz`}
                                                        mcqs={week.mcqs}
                                                        courseId="internet-of-things"
                                                        isEnrolled={isEnrolled}
                                                    />
                                                </div>
                                            </>
                                        )}
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

                    {/* Bonus Quiz Section - Week 12: Data Handling, Analytics & Case Studies */}
                    <Card className="mt-8 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border-teal-200 dark:border-teal-800">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-teal-600" />
                                Bonus Quiz: Data Handling, Analytics & Case Studies
                            </CardTitle>
                            <p className="text-muted-foreground mt-2">
                                Test your knowledge on data handling, analytics techniques, and real-world IoT case studies with these additional questions.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <QuizSection
                                weekNumber={12}
                                title="Bonus Quiz: Data Handling, Analytics & Case Studies"
                                courseId="internet-of-things"
                                isEnrolled={isEnrolled}
                                mcqs={[
                                    { question: "Which \"V\" of Big Data refers to the speed of data generation?", options: ["Volume", "Variety", "Velocity", "Veracity"], answer: "c" },
                                    { question: "What is \"Hadoop\"?", options: ["A type of sensor", "An open-source software framework for distributed processing of large datasets", "A new internet protocol", "A video game"], answer: "b" },
                                    { question: "Qualitative analysis deals with data that is:", options: ["Numerical", "Descriptive/Categorical (e.g., text, audio)", "Statistical only", "Measured in kilograms"], answer: "b" },
                                    { question: "Which statistical technique is used to compare variances between two or more groups?", options: ["Regression", "ANOVA (Analysis of Variance)", "Dispersion", "Counting"], answer: "b" },
                                    { question: "In the \"AgriSens\" case study, which sensors were primarily used?", options: ["Heart rate sensors", "Soil moisture and water level sensors", "Accelerometers", "Traffic cameras"], answer: "b" },
                                    { question: "What action did the AgriSens system take when water levels were low?", options: ["It shut down", "It sent an SMS and could automatically turn on solenoid valves", "It called the police", "It increased the temperature"], answer: "b" },
                                    { question: "The \"AmbuSens\" system is designed for:", options: ["Agriculture monitoring", "Monitoring structural health of buildings", "Remote continuous monitoring of patients in ambulances", "Tracking wild animals"], answer: "c" },
                                    { question: "Which privacy-aware mechanism is used in AmbuSens for patient identity?", options: ["Broadcasting names openly", "Hashing and reverse hashing of patient ID", "No ID is used", "Using GPS only"], answer: "b" },
                                    { question: "In Activity Monitoring using smartphones, what happens to the Z-axis reading of the accelerometer when the phone is tilted?", options: ["It remains constant", "It changes (goes down/up) indicating orientation change relative to gravity", "It stops recording", "It becomes zero always"], answer: "b" },
                                    { question: "What is a potential application of activity monitoring mentioned in the lectures?", options: ["Fall detection for the elderly", "Cooking assistance", "Email filtering", "Weather forecasting"], answer: "a" }
                                ]}
                            />
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl">What&apos;s Next?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                After completing this 11-week IoT course, you&apos;ll have comprehensive knowledge of
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
                        <CommentsSection courseId="internet-of-things" />
                    </div>
                </div>
            </section>
        </div>
    )
}
