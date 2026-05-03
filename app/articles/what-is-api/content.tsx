"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentsSection } from "@/components/comments-section"
import { Code, Network, Globe } from "lucide-react"
import { ArticleHeader, ArticleFooter } from "@/components/articles"

export default function WhatIsAPIPage() {
    const articleTitle = "What Is an API? Understanding Application Programming Interfaces"
    const articleDescription = "Learn how APIs enable seamless communication between software applications and power modern digital experiences"
    const articleUrl = 'https://zestacademy.in/articles/what-is-api'

    return (
        <div className="flex flex-col min-h-screen">
            {/* Article Header with Share and Download */}
            <ArticleHeader 
                title={articleTitle}
                description={articleDescription}
                url={articleUrl}
            />

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background border-b">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        {articleTitle}
                    </h1>
                    <p className="text-lg text-muted-foreground text-center">
                        {articleDescription}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article id="article-content" className="prose prose-lg dark:prose-invert max-w-none">

                        {/* What is API Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Network className="h-8 w-8 text-blue-500" />
                                    What Is an API?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    <strong>API stands for Application Programming Interface.</strong> It is a set of rules and protocols that allows one piece of software to interact with another. APIs define the methods and data formats that applications can use to communicate with each other. This enables different systems to exchange information and functionalities seamlessly.
                                </p>
                                <p>
                                    Think of an API as a waiter in a restaurant. You (the client) look at the menu and decide what you want. The waiter (the API) takes your order to the kitchen (the server), where your food is prepared. Then, the waiter brings your meal back to you. Just like the waiter facilitates communication between you and the kitchen, an API facilitates communication between different software applications.
                                </p>
                                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500">
                                    <p className="text-sm font-semibold text-foreground mb-2">Key Concept:</p>
                                    <p className="text-sm">
                                        APIs abstract the complexity of underlying implementations, allowing developers to use functionality without needing to understand how it works internally.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* How APIs Work Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Globe className="h-8 w-8 text-green-500" />
                                    How APIs Work
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    APIs typically work over the web using <strong>HTTP/HTTPS protocols</strong>. They use endpoints, which are specific URLs, to provide access to certain functionalities or data. When a client (such as a web browser or mobile app) sends a request to an API endpoint, the server processes this request and returns the appropriate response, often in a format like <strong>JSON</strong> or <strong>XML</strong>.
                                </p>

                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-foreground mb-3">The API Request-Response Cycle</h3>
                                    <ol className="list-decimal list-inside space-y-3 ml-4">
                                        <li>
                                            <strong className="text-foreground">Client Makes a Request:</strong> The application sends an HTTP request to a specific API endpoint with necessary parameters and authentication
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Server Processes Request:</strong> The API receives the request, validates it, and processes the required operation (retrieve data, update records, etc.)
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Server Sends Response:</strong> The API returns a response with the requested data or confirmation of the operation, typically in JSON or XML format
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Client Processes Response:</strong> The application receives and processes the response data to display information or perform further actions
                                        </li>
                                    </ol>
                                </div>

                                <div className="mt-6 bg-muted/50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Common HTTP Methods</h4>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong className="text-foreground">GET:</strong> Retrieve data from the server</li>
                                        <li><strong className="text-foreground">POST:</strong> Send new data to the server</li>
                                        <li><strong className="text-foreground">PUT:</strong> Update existing data on the server</li>
                                        <li><strong className="text-foreground">DELETE:</strong> Remove data from the server</li>
                                        <li><strong className="text-foreground">PATCH:</strong> Partially update existing data</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Example Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Code className="h-8 w-8 text-purple-500" />
                                    Example of an API in Action
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    Let&apos;s consider a weather application that provides current weather information. This application might use a weather API to fetch the latest weather data from a remote server.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">1. API Endpoint</h3>
                                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <div className="space-y-2">
                                                <div><span className="text-blue-400">URL:</span> https://api.weather.com/v3/wx/conditions/current</div>
                                                <div><span className="text-blue-400">Method:</span> GET</div>
                                                <div><span className="text-blue-400">Parameters:</span> location, units, language, apiKey</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">2. API Request</h3>
                                        <p className="mb-3">
                                            The client (your weather application) sends an HTTP GET request to the API endpoint with the required parameters:
                                        </p>
                                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">
{`GET /v3/wx/conditions/current
Host: api.weather.com
Parameters:
  location: "New York, NY"
  units: "metric"
  apiKey: "your_api_key_here"`}
                                            </pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">3. API Response</h3>
                                        <p className="mb-3">
                                            The server processes the request and returns the weather data in JSON format:
                                        </p>
                                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">
{`{
  "location": {
    "city": "New York",
    "state": "NY"
  },
  "temperature": {
    "value": 25,
    "unit": "C"
  },
  "condition": "Clear",
  "humidity": 60
}`}
                                            </pre>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">4. Using the Response</h3>
                                        <p className="mb-3">
                                            The weather application receives this data and displays it to the user in a readable format:
                                        </p>
                                        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <div className="space-y-2">
                                                <p className="font-semibold text-foreground">Current Weather</p>
                                                <p><strong>Location:</strong> New York, NY</p>
                                                <p><strong>Temperature:</strong> 25°C</p>
                                                <p><strong>Condition:</strong> Clear</p>
                                                <p><strong>Humidity:</strong> 60%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Benefits Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Benefits of Using APIs</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-muted-foreground">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</span>
                                            Interoperability
                                        </h3>
                                        <p>
                                            APIs enable different systems and applications to work together, regardless of their underlying technologies. This allows businesses to integrate various services and platforms seamlessly.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">2</span>
                                            Efficiency
                                        </h3>
                                        <p>
                                            They allow developers to leverage existing functionalities without needing to build them from scratch. This saves time, reduces development costs, and accelerates time-to-market.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">3</span>
                                            Scalability
                                        </h3>
                                        <p>
                                            APIs can handle large volumes of requests, making it easier to scale applications. Cloud-based APIs particularly excel at distributing load and maintaining performance under high traffic.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">4</span>
                                            Flexibility
                                        </h3>
                                        <p>
                                            Developers can use APIs to integrate various services and features into their applications, enhancing functionality. This modular approach allows for easy updates and improvements.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">5</span>
                                            Security
                                        </h3>
                                        <p>
                                            APIs provide controlled access to data and functionality through authentication and authorization mechanisms, protecting sensitive information while enabling necessary integrations.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                            <span className="h-8 w-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm">6</span>
                                            Innovation
                                        </h3>
                                        <p>
                                            APIs enable developers to build upon existing platforms and services, fostering innovation and creating new applications that combine multiple data sources and functionalities.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Types of APIs Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Types of APIs</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-muted-foreground">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">REST APIs (Representational State Transfer)</h3>
                                        <p>
                                            The most common type of web API. REST APIs use standard HTTP methods and are stateless, meaning each request is independent. They typically return data in JSON format and are easy to understand and implement.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">SOAP APIs (Simple Object Access Protocol)</h3>
                                        <p>
                                            A protocol-based API that uses XML for message format. SOAP APIs are more rigid and complex but offer built-in security features and are often used in enterprise environments.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">GraphQL APIs</h3>
                                        <p>
                                            A query language for APIs that allows clients to request exactly the data they need. GraphQL provides more flexibility than REST, reducing over-fetching and under-fetching of data.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">WebSocket APIs</h3>
                                        <p>
                                            Enable real-time, bidirectional communication between client and server. Perfect for applications like chat systems, live updates, and collaborative tools.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Real-World Applications Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Real-World API Applications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>APIs power countless services we use daily. Here are some common examples:</p>
                                
                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="text-lg font-semibold text-foreground">Social Media Integration</h4>
                                        <p>When you sign in to a website using your Google or Facebook account, that&apos;s an API at work—OAuth APIs enable secure authentication without sharing passwords.</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="text-lg font-semibold text-foreground">Payment Processing</h4>
                                        <p>Services like Stripe, PayPal, and Square provide payment APIs that allow e-commerce sites to process transactions securely without building payment infrastructure from scratch.</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="text-lg font-semibold text-foreground">Maps and Location Services</h4>
                                        <p>Google Maps API powers location features in countless apps, from ride-sharing services to food delivery platforms, providing maps, directions, and geolocation data.</p>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h4 className="text-lg font-semibold text-foreground">Cloud Storage</h4>
                                        <p>Dropbox, Google Drive, and AWS S3 APIs allow applications to store and retrieve files in the cloud, enabling seamless file synchronization across devices.</p>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h4 className="text-lg font-semibold text-foreground">Messaging and Communication</h4>
                                        <p>Twilio and SendGrid APIs enable applications to send SMS messages, emails, and voice calls programmatically, powering notifications and communication features.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Best Practices Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">API Best Practices</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>When working with or designing APIs, consider these best practices:</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Use Clear Naming Conventions</h4>
                                        <p className="text-sm">Endpoints should be intuitive and follow consistent patterns, making the API easy to understand and use.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Implement Proper Authentication</h4>
                                        <p className="text-sm">Use API keys, OAuth, or JWT tokens to secure your API and control access to resources.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Version Your API</h4>
                                        <p className="text-sm">Include version numbers in your API endpoints to maintain backward compatibility when making changes.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Provide Comprehensive Documentation</h4>
                                        <p className="text-sm">Clear documentation with examples helps developers understand and integrate your API quickly.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Handle Errors Gracefully</h4>
                                        <p className="text-sm">Return meaningful error messages and appropriate HTTP status codes to help developers debug issues.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Implement Rate Limiting</h4>
                                        <p className="text-sm">Protect your API from abuse and ensure fair usage by limiting the number of requests per time period.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Conclusion Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Conclusion</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    APIs are the backbone of modern software development, enabling seamless communication between applications and services. They power the digital experiences we interact with daily—from social media and online shopping to navigation and cloud services.
                                </p>
                                <p>
                                    Understanding how APIs work is essential for developers, as they provide the building blocks for creating integrated, scalable, and efficient applications. Whether you&apos;re consuming third-party APIs or designing your own, following best practices ensures secure, reliable, and user-friendly integrations.
                                </p>
                                <p>
                                    As technology continues to evolve, APIs will remain crucial in connecting systems, enabling innovation, and creating the interconnected digital world we live in today. The ability to effectively work with APIs is a fundamental skill for any modern developer.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Key Takeaways Section */}
                        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200 dark:border-blue-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">Key Takeaways</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-muted-foreground">
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong className="text-foreground">APIs are interfaces</strong> that enable different software applications to communicate with each other</li>
                                    <li><strong className="text-foreground">They use HTTP/HTTPS protocols</strong> and typically return data in JSON or XML format</li>
                                    <li><strong className="text-foreground">Common HTTP methods</strong> include GET, POST, PUT, DELETE, and PATCH</li>
                                    <li><strong className="text-foreground">APIs provide numerous benefits</strong> including interoperability, efficiency, scalability, and flexibility</li>
                                    <li><strong className="text-foreground">Different types exist</strong> such as REST, SOAP, GraphQL, and WebSocket APIs</li>
                                    <li><strong className="text-foreground">Real-world applications</strong> include payment processing, social media integration, maps, and cloud storage</li>
                                    <li><strong className="text-foreground">Best practices</strong> include clear naming, proper authentication, versioning, and comprehensive documentation</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Article Footer with Branding */}
                        <ArticleFooter />

                        {/* Comments Section */}
                        <CommentsSection courseId="what-is-api" />

                    </article>
                </div>
            </section>
        </div>
    )
}
