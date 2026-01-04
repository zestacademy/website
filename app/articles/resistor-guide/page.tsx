"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentsSection } from "@/components/comments-section"
import { Zap, Settings, Activity, CircuitBoard, Gauge, Radio } from "lucide-react"
import Image from "next/image"

export default function ResistorGuidePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background border-b">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Complete Guide to Resistors: Understanding the Foundation of Electronics
                    </h1>
                    <p className="text-lg text-muted-foreground text-center">
                        Master resistors from basic principles to advanced applications in modern circuit design
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg dark:prose-invert max-w-none">

                        {/* Hero Image */}
                        <div className="mb-8 rounded-lg overflow-hidden border">
                            <Image 
                                src="/articles/resistor-guide/hero.png" 
                                alt="Resistor Guide Overview" 
                                width={1200} 
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Introduction Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <CircuitBoard className="h-8 w-8 text-blue-500" />
                                    What is a Resistor?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    A <strong>resistor</strong> is a basic yet vital electronic component that limits or controls the flow of electric current in a circuit. It&apos;s a passive device that plays a key role in managing voltage, current, and signal conditions across various electrical and electronic systems.
                                </p>
                                <p>
                                    Whether you&apos;re building a simple LED circuit or designing complex analog systems, understanding resistors is fundamental to electronics. They are one of the most common components you&apos;ll encounter, appearing in virtually every electronic device from smartphones to industrial control systems.
                                </p>
                            </CardContent>
                        </Card>

                        {/* How it Works Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Zap className="h-8 w-8 text-yellow-500" />
                                    How Does a Resistor Work?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    A resistor is a passive component used to oppose or limit current flow in an electrical circuit. The core principle governing resistor behavior is <strong>Ohm&apos;s Law</strong>:
                                </p>
                                
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800 my-6">
                                    <h4 className="text-2xl font-bold text-center text-foreground mb-2">Ohm&apos;s Law</h4>
                                    <p className="text-3xl font-bold text-center text-foreground my-4">V = I × R</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        <div className="text-center">
                                            <p className="font-semibold text-foreground">V (Voltage)</p>
                                            <p className="text-sm">Measured in Volts (V)</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-foreground">I (Current)</p>
                                            <p className="text-sm">Measured in Amperes (A)</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-foreground">R (Resistance)</p>
                                            <p className="text-sm">Measured in Ohms (Ω)</p>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Resistors dissipate electrical energy as heat and are used for multiple purposes including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong className="text-foreground">Voltage Division:</strong> Splitting voltage across components</li>
                                    <li><strong className="text-foreground">Biasing:</strong> Setting operating points for transistors and other active devices</li>
                                    <li><strong className="text-foreground">Signal Conditioning:</strong> Adjusting signal levels and impedance</li>
                                    <li><strong className="text-foreground">Circuit Protection:</strong> Limiting current to protect sensitive components</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Types of Resistors Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Settings className="h-8 w-8 text-green-500" />
                                    Types of Resistors
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-muted-foreground">
                                <p>
                                    Resistors come in various types, each designed for specific applications based on their construction, performance characteristics, and power handling capabilities.
                                </p>

                                {/* First set of types */}
                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <Image 
                                        src="/articles/resistor-guide/types-carbon-metal-wirewound.png" 
                                        alt="Carbon, Metal Film, and Wirewound Resistors" 
                                        width={1000} 
                                        height={800}
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">1. Carbon Composition Resistors</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Mixture of carbon particles and binder material</p>
                                        <p><strong className="text-foreground">Pros:</strong> Low cost, good for handling high-energy pulses</p>
                                        <p><strong className="text-foreground">Cons:</strong> Poor tolerance, high noise levels</p>
                                        <p><strong className="text-foreground">Applications:</strong> General purpose circuits, surge protection</p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">2. Metal Film Resistors</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Vacuum-deposited metal layer on ceramic core</p>
                                        <p><strong className="text-foreground">Pros:</strong> High accuracy, low noise, excellent temperature stability</p>
                                        <p><strong className="text-foreground">Cons:</strong> More expensive than carbon composition</p>
                                        <p><strong className="text-foreground">Applications:</strong> Precision analog circuits, measurement equipment</p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">3. Wirewound Resistors</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Metal wire wound around a ceramic or fiberglass core</p>
                                        <p><strong className="text-foreground">Pros:</strong> High power handling, very stable</p>
                                        <p><strong className="text-foreground">Cons:</strong> Inductive at high frequencies</p>
                                        <p><strong className="text-foreground">Applications:</strong> Power supplies, motor drives, high-current applications</p>
                                    </div>
                                </div>

                                {/* Second set of types */}
                                <div className="mb-6 rounded-lg overflow-hidden border mt-8">
                                    <Image 
                                        src="/articles/resistor-guide/types-smd-foil-variable.png" 
                                        alt="SMD, Foil, and Variable Resistors" 
                                        width={1000} 
                                        height={800}
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">4. Thick/Thin Film SMD Resistors</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Printed resistive material on ceramic substrate</p>
                                        <p><strong className="text-foreground">Pros:</strong> Compact size, cost-effective for mass production</p>
                                        <p><strong className="text-foreground">Cons:</strong> Limited power rating</p>
                                        <p><strong className="text-foreground">Applications:</strong> Consumer electronics, high-density PCBs, mobile devices</p>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">5. Foil Resistors</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Etched metal foil on ceramic substrate</p>
                                        <p><strong className="text-foreground">Pros:</strong> Extremely precise, very low temperature coefficient, minimal drift</p>
                                        <p><strong className="text-foreground">Cons:</strong> Expensive</p>
                                        <p><strong className="text-foreground">Applications:</strong> Precision instrumentation, medical devices, aerospace</p>
                                    </div>

                                    <div className="border-l-4 border-teal-500 pl-4">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">6. Variable Resistors (Potentiometers)</h3>
                                        <p><strong className="text-foreground">Structure:</strong> Movable contact on resistive track</p>
                                        <p><strong className="text-foreground">Pros:</strong> Adjustable resistance value</p>
                                        <p><strong className="text-foreground">Cons:</strong> Subject to mechanical wear</p>
                                        <p><strong className="text-foreground">Applications:</strong> User-adjustable settings (volume controls, brightness), calibration circuits</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Parameters Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Gauge className="h-8 w-8 text-purple-500" />
                                    Key Parameters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    When selecting and using resistors, several key parameters must be considered to ensure proper circuit operation and reliability.
                                </p>

                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <Image 
                                        src="/articles/resistor-guide/key-parameters.png" 
                                        alt="Key Resistor Parameters" 
                                        width={1000} 
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Resistance Value (R)</h4>
                                        <p className="text-sm">The fundamental property measured in Ohms (Ω). Common values are standardized in E12, E24, E96, and E192 series.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Tolerance</h4>
                                        <p className="text-sm">Maximum deviation from nominal value (±1%, ±5%, ±10%, etc.). Precision applications require tighter tolerances.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Power Rating</h4>
                                        <p className="text-sm">Maximum power dissipation (1/8W, 1/4W, 1/2W, 1W, etc.). Must not exceed this value to prevent overheating.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Temperature Coefficient</h4>
                                        <p className="text-sm">Change in resistance per degree Celsius (ppm/°C). Lower values indicate better stability across temperature ranges.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Voltage Rating</h4>
                                        <p className="text-sm">Maximum voltage that can be applied. Exceeding this can cause arcing or breakdown.</p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Noise</h4>
                                        <p className="text-sm">Unwanted voltage fluctuations. Critical in low-level signal applications like audio and sensor interfaces.</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
                                    <p className="text-sm font-semibold text-foreground mb-2">Important Derived Values:</p>
                                    <ul className="text-sm space-y-1">
                                        <li><strong>Power Dissipation:</strong> P = I²R = V²/R</li>
                                        <li><strong>Current:</strong> I = V/R</li>
                                        <li><strong>Voltage Drop:</strong> V = IR</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Frequency Behavior Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Radio className="h-8 w-8 text-red-500" />
                                    Frequency Behavior
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    Resistors behave ideally only at low frequencies. At high frequencies, parasitic capacitance and inductance become significant, affecting circuit performance.
                                </p>

                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <Image 
                                        src="/articles/resistor-guide/frequency-behavior.png" 
                                        alt="Frequency Behavior of Resistors" 
                                        width={1000} 
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-foreground mb-2">High Frequency Effects</h4>
                                        <p>At high frequencies, resistors exhibit:</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                            <li><strong className="text-foreground">Parasitic Capacitance:</strong> Between leads and body, creating unwanted capacitive coupling</li>
                                            <li><strong className="text-foreground">Parasitic Inductance:</strong> In wirewound and through-hole resistors, especially with long leads</li>
                                            <li><strong className="text-foreground">Skin Effect:</strong> Current concentration at conductor surface at high frequencies</li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Rule of Thumb:</p>
                                        <p className="text-sm">
                                            Use non-inductive resistors or surface mount resistors for RF and GHz applications. Metal film SMD resistors typically perform best at high frequencies due to minimal parasitic effects.
                                        </p>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-foreground mb-2">Frequency Guidelines</h4>
                                        <ul className="text-sm space-y-1">
                                            <li><strong>DC to 100 kHz:</strong> Most resistor types work well</li>
                                            <li><strong>100 kHz to 10 MHz:</strong> Prefer metal film or SMD resistors</li>
                                            <li><strong>10 MHz to 1 GHz:</strong> Use SMD resistors with short leads</li>
                                            <li><strong>Above 1 GHz:</strong> Special RF resistors with minimal parasitics</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* How to Choose Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Activity className="h-8 w-8 text-teal-500" />
                                    How to Choose a Resistor
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    Selecting the right resistor involves considering multiple factors to ensure reliable circuit operation and longevity.
                                </p>

                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <Image 
                                        src="/articles/resistor-guide/how-to-choose.png" 
                                        alt="How to Choose a Resistor" 
                                        width={1000} 
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-foreground">Selection Criteria:</h4>
                                    
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">1. Calculate Required Resistance</h5>
                                            <p className="text-sm">Use Ohm&apos;s Law (R = V/I) to determine the resistance value needed for your application.</p>
                                        </div>

                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">2. Determine Power Rating</h5>
                                            <p className="text-sm">Calculate power dissipation (P = I²R or P = V²/R). Choose a resistor with power rating at least 2× the calculated value for safety margin.</p>
                                        </div>

                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">3. Select Appropriate Tolerance</h5>
                                            <p className="text-sm">±5% for general applications, ±1% or better for precision circuits, measurement equipment, and filter designs.</p>
                                        </div>

                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">4. Consider Temperature Range</h5>
                                            <p className="text-sm">Check temperature coefficient (ppm/°C) if the circuit will experience temperature variations. Metal film resistors offer excellent temperature stability.</p>
                                        </div>

                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">5. Evaluate Package Type</h5>
                                            <p className="text-sm">Through-hole (THT) for prototyping and high power, SMD for production and high-density designs.</p>
                                        </div>

                                        <div className="border border-border rounded-lg p-4">
                                            <h5 className="font-semibold text-foreground mb-2">6. Check Frequency Response</h5>
                                            <p className="text-sm">For high-frequency applications, use low-parasitic SMD resistors or specialized RF resistors.</p>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border-l-4 border-orange-500 mt-6">
                                        <p className="text-sm font-semibold text-foreground mb-2">Derating Rule:</p>
                                        <p className="text-sm">
                                            Reduce power rating by 50% for every 25°C above 70°C ambient temperature. This prevents thermal damage and ensures long-term reliability.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Applications Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl">Essential Circuit Applications</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8 text-muted-foreground">
                                <p>
                                    Resistors serve critical functions in numerous circuit applications. Here are five essential real-world examples with detailed calculations and design considerations.
                                </p>

                                {/* Voltage Divider */}
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">1. Voltage Divider for ADC Input</h3>
                                    
                                    <div className="mb-6 rounded-lg overflow-hidden border">
                                        <Image 
                                            src="/articles/resistor-guide/voltage-divider.png" 
                                            alt="Voltage Divider for ADC Input" 
                                            width={1000} 
                                            height={800}
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    <p className="mb-4">
                                        <strong className="text-foreground">Application:</strong> Scaling high voltages (like battery voltage) down to safe levels for microcontroller ADC inputs.
                                    </p>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Example: Monitoring 12V Battery</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Given:</strong></p>
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Max battery voltage = 12V</li>
                                                <li>Desired ADC input = ≤3.3V</li>
                                                <li>Choose R1 = 6.8kΩ</li>
                                            </ul>
                                            <p className="mt-3"><strong>Formula:</strong></p>
                                            <p className="font-mono">V_out = V_in × (R2 / (R1 + R2))</p>
                                            <p className="mt-3"><strong>Calculation:</strong></p>
                                            <p>3.3V = 12V × (R2 / (6.8kΩ + R2))</p>
                                            <p>R2 ≈ 2.58kΩ → Use standard value: 2.2kΩ</p>
                                            <p className="mt-3"><strong>Result:</strong></p>
                                            <p>V_out = 12V × (2.2kΩ / 9kΩ) ≈ 2.93V ✓</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Design Tips:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Ensure scaled voltage stays within ADC limits with margin for variations</li>
                                            <li>• Use precision resistors (1% or better) for accurate measurements</li>
                                            <li>• Add a low-pass filter capacitor parallel to R2 to reduce ADC noise</li>
                                            <li>• Verify ADC input impedance is much higher than the divider resistance</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* I2C Pull-up */}
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">2. Pull-up Resistor on I²C Line</h3>
                                    
                                    <div className="mb-6 rounded-lg overflow-hidden border">
                                        <Image 
                                            src="/articles/resistor-guide/i2c-pullup.png" 
                                            alt="I2C Pull-up Resistor" 
                                            width={1000} 
                                            height={800}
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    <p className="mb-4">
                                        Pull-up resistors are essential for I²C bus operation. The I²C protocol uses an open-drain configuration where devices can only pull lines LOW—resistors are needed to pull them HIGH.
                                    </p>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Why Pull-ups Are Needed:</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• I²C is open-drain: devices can pull LOW but not drive HIGH</li>
                                            <li>• Without pull-ups, lines would float with undefined logic levels</li>
                                            <li>• Pull-ups define the idle (HIGH) state and enable proper transitions</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">I²C Speed vs. Pull-up Values</h4>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2">Speed Mode</th>
                                                    <th className="text-left py-2">Max Rise Time</th>
                                                    <th className="text-left py-2">Typical Pull-up</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2">Standard (100 kHz)</td>
                                                    <td className="py-2">1000 ns</td>
                                                    <td className="py-2">4.7kΩ to 10kΩ</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Fast (400 kHz)</td>
                                                    <td className="py-2">300 ns</td>
                                                    <td className="py-2">2.2kΩ to 4.7kΩ</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">Fast+ (1 MHz)</td>
                                                    <td className="py-2">120 ns</td>
                                                    <td className="py-2">1kΩ to 2.2kΩ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Calculation Example</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Given:</strong></p>
                                            <ul className="list-disc list-inside ml-4">
                                                <li>V_CC = 3.3V</li>
                                                <li>Bus capacitance ≈ 100pF</li>
                                                <li>I²C speed = 100kHz (Standard mode)</li>
                                                <li>Recommended pull-up = 4.7kΩ</li>
                                            </ul>
                                            <p className="mt-3"><strong>Check Rise Time:</strong></p>
                                            <p className="font-mono">τ = R × C = 4.7kΩ × 100pF = 470ns</p>
                                            <p>Rise time ≈ 2.2τ = 1034ns (within 1000ns spec ✓)</p>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Design Considerations:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Lower resistors = faster rise times but higher current consumption</li>
                                            <li>• Higher resistors = lower current but slower rise times</li>
                                            <li>• Maximum sink current per I²C spec is 3mA</li>
                                            <li>• For 3.3V systems, minimum recommended: R ≥ 1.1kΩ</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Op-Amp Feedback */}
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">3. Op-Amp Feedback Resistor</h3>
                                    
                                    <div className="mb-6 rounded-lg overflow-hidden border">
                                        <Image 
                                            src="/articles/resistor-guide/opamp-feedback.png" 
                                            alt="Op-Amp Feedback Resistor" 
                                            width={1000} 
                                            height={800}
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    <p className="mb-4">
                                        The feedback resistor is critical in operational amplifier circuits, controlling gain, bandwidth, and stability. It regulates how much of the output signal returns to the input.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-foreground mb-2">Non-Inverting Amplifier</h4>
                                            <p className="text-sm mb-2">Gain Formula:</p>
                                            <p className="font-mono text-sm">A_v = 1 + (R_f / R_in)</p>
                                            <p className="text-sm mt-2">Example: R_f = 10kΩ, R_in = 1kΩ</p>
                                            <p className="font-mono text-sm">Gain = 1 + (10k/1k) = 11</p>
                                        </div>

                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <h4 className="font-semibold text-foreground mb-2">Inverting Amplifier</h4>
                                            <p className="text-sm mb-2">Gain Formula:</p>
                                            <p className="font-mono text-sm">A_v = -(R_f / R_in)</p>
                                            <p className="text-sm mt-2">Example: R_f = 10kΩ, R_in = 2kΩ</p>
                                            <p className="font-mono text-sm">Gain = -(10k/2k) = -5</p>
                                            <p className="text-xs mt-1">(Negative = 180° phase shift)</p>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Design Example: Gain = 10 Non-Inverting</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Target:</strong> Voltage gain of 10×</p>
                                            <p><strong>Formula:</strong> 10 = 1 + (R_f / R_in)</p>
                                            <p><strong>Solve:</strong> R_f / R_in = 9</p>
                                            <p><strong>Choose:</strong> R_in = 1kΩ, then R_f = 9kΩ</p>
                                            <p><strong>Application:</strong> Audio preamps, sensor signal conditioning</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border-l-4 border-purple-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Practical Design Tips:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Typical range: R_f = 1kΩ to 100kΩ</li>
                                            <li>• Use precision resistors (1% or 0.1%) for stable, accurate gain</li>
                                            <li>• Lower values (1-10kΩ) for high-speed op-amps to minimize parasitic effects</li>
                                            <li>• Higher values increase thermal noise and input offset errors</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Signal Termination */}
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">4. Signal Line Termination</h3>
                                    
                                    <div className="mb-6 rounded-lg overflow-hidden border">
                                        <Image 
                                            src="/articles/resistor-guide/signal-termination.png" 
                                            alt="Signal Line Termination" 
                                            width={1000} 
                                            height={800}
                                            className="w-full h-auto"
                                        />
                                    </div>

                                    <p className="mb-4">
                                        Signal line termination prevents reflections in high-speed or long PCB traces, especially when trace length is electrically significant relative to the signal wavelength.
                                    </p>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Why Terminate Signal Lines?</h4>
                                        <p className="text-sm mb-2">Without proper termination, signals reflect back from the end of the trace, causing:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Data errors and timing violations</li>
                                            <li>• Signal integrity problems (ringing, overshoot)</li>
                                            <li>• Increased electromagnetic interference (EMI)</li>
                                            <li>• Reduced noise margins</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Common Termination Types</h4>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2">Type</th>
                                                    <th className="text-left py-2">Configuration</th>
                                                    <th className="text-left py-2">Use Case</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2">Series</td>
                                                    <td className="py-2">Resistor near driver</td>
                                                    <td className="py-2">Point-to-point, short traces</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Parallel</td>
                                                    <td className="py-2">To ground/Vcc at receiver</td>
                                                    <td className="py-2">DDR, SDRAM, clock lines</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2">Thevenin</td>
                                                    <td className="py-2">Pull-up/pull-down combo</td>
                                                    <td className="py-2">Bidirectional buses</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">AC</td>
                                                    <td className="py-2">Resistor + capacitor</td>
                                                    <td className="py-2">RF, clock lines</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Series Termination Example</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Given:</strong></p>
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Trace impedance: Z₀ = 50Ω</li>
                                                <li>Driver output impedance: 20Ω</li>
                                            </ul>
                                            <p className="mt-2"><strong>Calculate:</strong></p>
                                            <p className="font-mono">R_series = Z₀ - Z_driver = 50Ω - 20Ω = 30Ω</p>
                                            <p className="mt-2"><strong>Result:</strong> Place 30Ω resistor close to the driver</p>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Typical Termination Values</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Single-ended (TTL/CMOS): 33Ω – 100Ω</li>
                                            <li>• Differential (Ethernet, USB): 49.9Ω – 100Ω per line</li>
                                            <li>• High-speed clocks: 33Ω – 50Ω</li>
                                            <li>• RF lines (50Ω traces): 50Ω matched termination</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border-l-4 border-green-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Best Practices:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• Match termination resistor to trace impedance</li>
                                            <li>• Place series resistors near the driver</li>
                                            <li>• For differential signals, terminate at receiver with differential impedance (typically 100Ω)</li>
                                            <li>• Use simulation tools (SI/PI analysis) for critical high-speed designs</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Snubber Resistor */}
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-4">5. Snubber Resistor in Relay Driver</h3>
                                    
                                    <p className="mb-4">
                                        When driving inductive loads like relays, motors, or solenoids, turning off the switch generates high-voltage spikes due to the collapsing magnetic field. A snubber circuit absorbs or dissipates this energy to protect switching devices.
                                    </p>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Why Use a Snubber?</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Limits voltage spikes across switching transistors/MOSFETs</li>
                                            <li>• Protects devices from inductive kickback damage</li>
                                            <li>• Reduces electromagnetic interference (EMI)</li>
                                            <li>• Prevents arcing across switch contacts</li>
                                            <li>• Improves relay life and system reliability</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Common Configurations</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>1. Flyback Diode (Most Common):</strong></p>
                                            <p className="ml-4">Simple diode across coil provides current path when switch opens. Effective and minimal power loss.</p>
                                            
                                            <p className="mt-3"><strong>2. RC Snubber:</strong></p>
                                            <p className="ml-4">Resistor and capacitor in series across the relay coil. Faster switching than diode alone.</p>
                                            
                                            <p className="mt-3"><strong>3. RCD Snubber:</strong></p>
                                            <p className="ml-4">Adds diode for more precise energy dissipation and faster response.</p>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">RC Snubber Calculation</h4>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Given:</strong></p>
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Relay coil inductance: L = 1mH</li>
                                                <li>Operating current: I = 0.5A</li>
                                                <li>Target time constant: τ = 10μs</li>
                                            </ul>
                                            <p className="mt-3"><strong>Step 1:</strong> Choose capacitor C = 100nF</p>
                                            <p className="mt-2"><strong>Step 2:</strong> Calculate resistor</p>
                                            <p className="font-mono">R = τ / C = 10μs / 100nF = 100Ω</p>
                                            <p className="mt-3"><strong>Result:</strong> Use 100Ω, 0.5W resistor + 100nF capacitor in series across relay coil</p>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-foreground mb-2">Snubber vs. Diode Comparison</h4>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2">Protection Type</th>
                                                    <th className="text-left py-2">Voltage Suppression</th>
                                                    <th className="text-left py-2">Switching Speed</th>
                                                    <th className="text-left py-2">Power Loss</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2">Flyback Diode</td>
                                                    <td className="py-2">Very effective</td>
                                                    <td className="py-2">Slower</td>
                                                    <td className="py-2">Minimal</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">RC Snubber</td>
                                                    <td className="py-2">Effective</td>
                                                    <td className="py-2">Faster</td>
                                                    <td className="py-2">Moderate</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border-l-4 border-red-500">
                                        <p className="text-sm font-semibold text-foreground mb-2">Important Notes:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• A flyback diode is often sufficient for basic protection</li>
                                            <li>• RC snubbers are used for faster switching or reduced contact bounce</li>
                                            <li>• Snubbers increase power loss—proper sizing is essential</li>
                                            <li>• For high-speed or sensitive circuits, simulate switching behavior</li>
                                            <li>• Use fast recovery diodes for best performance</li>
                                        </ul>
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
                                    Resistors are fundamental building blocks of electronic circuits, essential for controlling current, dividing voltages, and protecting sensitive components. Understanding their characteristics, types, and applications is crucial for successful circuit design.
                                </p>
                                <p>
                                    From simple LED current limiting to complex analog signal processing, resistors play critical roles in virtually every electronic system. The key to effective resistor selection lies in considering all relevant parameters: resistance value, power rating, tolerance, temperature coefficient, and frequency behavior.
                                </p>
                                <p>
                                    The real-world applications covered in this guide—voltage dividers for ADC inputs, I²C pull-up resistors, op-amp feedback networks, signal line termination, and snubber circuits—represent essential design patterns you&apos;ll encounter repeatedly in electronics engineering. Master these fundamentals, and you&apos;ll have a solid foundation for tackling more complex circuit design challenges.
                                </p>
                                <p>
                                    As you continue your journey in electronics, remember that proper resistor selection and placement can make the difference between a circuit that works reliably and one that fails under real-world conditions. Always calculate power dissipation, consider derating for temperature, and choose quality components appropriate for your application&apos;s requirements.
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
                                    <li><strong className="text-foreground">Ohm&apos;s Law (V = IR)</strong> is the fundamental relationship governing resistor behavior</li>
                                    <li><strong className="text-foreground">Six main types</strong> of resistors serve different applications: carbon composition, metal film, wirewound, SMD, foil, and variable</li>
                                    <li><strong className="text-foreground">Key parameters</strong> include resistance value, tolerance, power rating, temperature coefficient, and frequency response</li>
                                    <li><strong className="text-foreground">Power dissipation</strong> must be calculated (P = I²R or V²/R) and derated for temperature and safety</li>
                                    <li><strong className="text-foreground">High-frequency effects</strong> require special consideration—use SMD resistors for RF applications</li>
                                    <li><strong className="text-foreground">Voltage dividers</strong> scale voltages for ADC inputs and signal conditioning</li>
                                    <li><strong className="text-foreground">Pull-up resistors</strong> are essential for I²C and open-drain buses</li>
                                    <li><strong className="text-foreground">Feedback resistors</strong> control op-amp gain in precision analog circuits</li>
                                    <li><strong className="text-foreground">Termination resistors</strong> prevent reflections in high-speed digital signals</li>
                                    <li><strong className="text-foreground">Snubber circuits</strong> protect switches from inductive kickback when driving relays</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <CommentsSection courseId="resistor-guide" />

                    </article>
                </div>
            </section>
        </div>
    )
}
