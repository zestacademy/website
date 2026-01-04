"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentsSection } from "@/components/comments-section"
import { Cpu, Binary, CircuitBoard, Clock, Database, AlertTriangle, GitBranch, HardDrive } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function DigitalElectronicsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background border-b">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                        Digital Electronics Interview Questions &amp; Answers
                    </h1>
                    <p className="text-lg text-muted-foreground text-center">
                        Comprehensive guide covering 254 questions from binary systems to memory devices
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-4 bg-background rounded-lg">
                                <p className="text-3xl font-bold text-blue-500">254</p>
                                <p className="text-sm text-muted-foreground">Questions</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg">
                                <p className="text-3xl font-bold text-green-500">9</p>
                                <p className="text-sm text-muted-foreground">Topics</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg">
                                <p className="text-3xl font-bold text-purple-500">100+</p>
                                <p className="text-sm text-muted-foreground">Diagrams</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg">
                                <p className="text-3xl font-bold text-orange-500">All</p>
                                <p className="text-sm text-muted-foreground">Levels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Cpu className="h-8 w-8 text-blue-500" />
                                    About This Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>
                                    This comprehensive guide contains over 254 carefully curated interview questions and detailed answers covering all major topics in digital electronics.
                                </p>
                                <p>
                                    Topics range from fundamental concepts like binary number systems and logic gates to advanced subjects like timing analysis, memory systems, and VLSI design.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Binary className="h-8 w-8 text-blue-500" />
                                    Binary Number Systems
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    80 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q1-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> Define: (a) bit (b) nibble (c) byte (d) word
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            a. Bit: Binary digit (Either logic-1 or logic-0) b. Nibble: 4-bits together is called a nibble c. Byte: 8 bits or 2 nibbles d. Word: 16 bits or 2 bytes
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q2-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q2:</span> What is weighted code? Give example.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The weighted code will have a fixed weight for each position. For example, in normal binary system, the decimal equivalent can be obtained by multiplying the position value with position weight and adding them together.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q3-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q3:</span> Give an example for Non-weighted code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Unlike weighted code, non-weighted codes will not any weights. For example, Excess-3 code and Gray code. So the numbers that are represented using non-weighted code can not be directly converted to decimal equivalents.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q4:</span> What is the key feature of Excess-3 code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Self-complementing: The 9’s complement of an excess 3 number can be obtained simply by replacing its 1’s with 0’s and 0’s with 1’s.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q5-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q5:</span> In how many different ways can number 5 be represented using 2-4-2-1 code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            2-4-2-1 represents the weights corresponding to bit positions. So the two possible ways are: 1011, 0101 1/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q6-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q6:</span> What are all the BCD numbers that can be uniquely represented in 2-4-2-1 weighted code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            0, 1, 8 and 9 (Only these 4 numbers will have unique representations).
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q7-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q7:</span> How many unused combinations are there in the representation of BCD numbers using 7-4-2-1 weighted scheme? What are they?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            As BCD numbers range from 0 to 9, there are 5 unused combinations in 7-4-2-1 code. They are: 1011, 1100, 1101, 1110 and 1111.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q8-7">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q8:</span> What is the condition for a weighted code to be self-complementary?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A weighted code is self-complimentary if the sum of the weights equals to 9. E.g.: 2-4-2-1 code. Sum of the weights = 2+4+2+1 = 9
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q9-8">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q9:</span> Convert the binary number 011101010001 to octal and hexadecimal?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (a) Binary: 011 101 010 001 Octal: 3 5 2 1 (b) Binary: 0111 0101 0001 Hex: 7 5 1
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q10-9">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q10:</span> Formulate a simple procedure for converting base-3 numbers to base-9?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Consider (Xn-1 Xn-2 ……..X3 X2 X1 X0) a n bit base 3 number. The corresponding decimal equivalent is given by, 3n-1 Xn-1 + 3n-2 Xn-2 ….. + 33 X3 + 32X2 + 31X1 + 30X0 = 9(n-2)/2 (3 Xn-1 + Xn-2) + .............+ 91(3 X3 + X2) + 90(3X1 + X0) So take every to digits of base-3 number from LSB side, find their decimal equivalent, it will be the corresponding base-9 digit. (Similar to the procedure of con
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q13-10">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q13:</span> What is the 9’s complement of the BCD number 752?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            999 – 752 = 247
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q14-11">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q14:</span> Convert the Gray code number 11001 to binary code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Conversion from gray to binary: Retain the MSB as it as. XOR the current input bit with the previous output bit to get the new output bit. In this case, given gray code number is 11001 So, the required binary number is 10001.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q15-12">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q15:</span> Give the procedure for converting a binary number to Gray code?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Binary to Gray code conversion: Retain MSB. XOR Current bit of Binary input with the previous bit of Binary input to get new bit of Gray code Output.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q16-13">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q16:</span> Represent 45 in the number systems (a) binary (b) BCD (c) Excess-3 (d) Gray code
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (a) 101101 (b) To get BCD: Represent each digit separately in binary 0100 0101 (c) Excess-3: Add 3 to each digit and then represent them separately in binary 0111 1000 (d) Gray code: First convert to Binary and use the procedure shown in Q15: 111011 3/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q17-14">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q17:</span> Give the range of the numbers that can be represented using n bits in 2’s complement method?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            –(2 n – 1) to +(2 n – 1 – 1)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <div className="text-sm text-muted-foreground italic pt-4">
                                        ... and 65 more questions
                                    </div>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <CircuitBoard className="h-8 w-8 text-green-500" />
                                    Basic Gates and Boolean Algebra
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    78 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q1-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> Which gates are called universal gates? Why? 5/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            NAND and NOR gates are called universal gates. Because any other logical gate like AND, OR, NOT, XOR, XNOR etc. or any other Boolean function can be implemented only with NAND or NOR gates.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q4:</span> In how many ways can a NAND gate be converted into an inverter? Show all the possibilities?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A NAND gate can be converted into an inverter by using any of the following two methods:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q5-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q5:</span> How many number of 2 input AND gates are required to generate N I/P AND gate?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            N-1. For example to implement a 4 input AND gate we need three 2-input AND gates.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q7-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q7:</span> (a) If it is given that A &amp; B will not be 1 at the same time, what will be the equivalent logical gate for an XOR gate? (b) If any of the inputs of an XOR gate are inverted, XOR gate will work as ----
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (a) OR Gate. We can conclude this from truth table. Also from Boolean algebra as shown here : As A=B=1, can not occur, AB = 0 always. A XOR B = AB’ + A’B = A (AB)’ + B (AB)’ = A (0)’ + B(0)’ = A + B (b) XNOR Gate. A XOR B = AB’ + A’B Using this, A’ XOR B = AXOR B’ = A’B’ + AB = A XNOR B
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q8-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q8:</span> State the Shannon’s expansion theorem for representing a Boolean function by its co-factors?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            According to Shannon’s expansion theorem any Boolean function F(A,B,C,D….) can be represented as F = A FA + A’ FA’ , where the cofactors FA and FA’ are given as, FA = F(1,B,C,D….) and FA’ = F(0,B,C,D….)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q11-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> Mention the logical gates for which the 3 input implementation can not be obtained from two 2 input gates? How do you implement them?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            2^2^n For n inputs, the possible number of minterms are, k = 2^n. Any boolean function is combination of minterms. So all possible Boolean functions are k C0 + kC1 + kC2 + kC3 + ……. kCk = (1 + 1)^k = 2^k = 2^2^n
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q12-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q12:</span> What is OUT in the circuit shown below? 7/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            First XOR gate output = X XOR X’ = 1 Second XOR output = 1 XOR X = X’ Third XOR gate output = OUT = X’ XOR X = 1 OUT = 1 irrespective of X
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q13-7">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q13:</span> Give implementation of XOR using minimum number of NAND gates?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A XOR B = A’B + AB’ = A(AB)’ + B(AB)’ Answer: 6 A = Switch B=Sensor1 C=Sensor2 D=Sensor3 Pressed or sensor activated = 1 F=Shutdown=1 If you use K-Map and simplify, you will get F = A + BC + CD. The implementation of the same is shown below.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q16-8">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q16:</span> N number of XNOR gates are connected as shown below. How does this circuit work? Explain?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            This is circuit will work in two different ways based on N-value. (a) N is odd (b) N is even (a) If N is odd, there will be even number of XNOR gates in the circuit. Take an example of N=3, So there are 2 XNOR Gates. The two bubbles will get cancelled and this works as XOR. Same works for any odd N. So if N is odd it works as XOR Gate.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q17-9">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q17:</span> Show the implementation of XNOR gate using minimum number of NOR Gates?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Very much similar to Answer 13.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q19-10">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q19:</span> Which logical gates can be used as parity generators?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            XOR gate can be used as even parity generator and XNOR can be used as odd parity generator.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q20-11">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q20:</span> What is the parity of (i) 10111001 (ii) 11001010
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (i) ODD as the number of ones = 5, odd number (ii) EVEN, number of 1s =4,even
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q25-12">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q25:</span> What is the difference between NAND gate and negative AND gate?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q26-13">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q26:</span> How to obtain the dual of a Boolean equation?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Dual : Replacing AND (NAND) with OR(NOR) and OR (NOR) with AND(NAND) in a given boolean equation gives the dual. Answer: a) iv b) iii c) ii d) i K-Maps
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q3-14">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q3:</span> Write the POS from for a 3-input XNOR gate? Is it canonical?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            
                                        </AccordionContent>
                                    </AccordionItem>
                                    <div className="text-sm text-muted-foreground italic pt-4">
                                        ... and 63 more questions
                                    </div>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <GitBranch className="h-8 w-8 text-purple-500" />
                                    Combinational Logic
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    30 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q11-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> Convert (211101222211122)3 to base-9? 2/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Base-3:(2 11 10 12 22 21 11 22)3 Base-9: 2 4 3 5 8 7 4 8
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q12-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q12:</span> A number N has ‘n’ digits in a r-radix number system. What is its (r-1)’s complement and r’s complement?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (rn – 1)-N , (rn – N)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q22-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q22:</span> AB16 – 3E16 = ? 4/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            AB16 – 3E16 = (171) – (62) = (109) = 6D16
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q23-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q23:</span> Solve for x: (70)8 + (122)6 = (211)x?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            ) 2x2+ x + 1 = 56 + 50 = 106 =&gt; x (2x+1) = 105 = 7 x 15 =&gt; x = 7
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q24-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q24:</span> Solve for X in (135)12 = (X)8 + (78)9?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            (78)9 = 63 + 8 = (71)10 (135)12 = 144 + 36 + 5 = (181)10 (71)10 - (181)10 = (110)10 = (156)8 So, X = 156
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q2-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q2:</span> How many minterms or maxterms will be there for n-inputs?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            For n inputs, possible minterms/maxterms = 2n. For example, for 2 inputs the possible 4 minterms are A’B’, A’B, AB’, AB and maxterms are A+B, A’+B, A+B’, A’+B’.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q15-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q15:</span> Majority function is the one which gives 1 if the input has more 1s than 0s. Show the truth table and give the AOI for 3-input majority function? 8/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Truth table for 3-input majority function is shown below:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q2-7">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q2:</span> When is a SOP/POS form is called standard or canonical?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A SOP is called standard if each term is a minterm. Similarly a POS is called standard if each term is a maxterm.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q7-8">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q7:</span> How many cells will a n-input variable have in K-Map?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            2n. E.g.: 3 variables, 8 cells. Similarly..4 variables 16 cells.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q8-9">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q8:</span> How many dimensions (without projections) are there for n karnaugh map (n&gt;2)?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Ceiling (log2 n)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q9-10">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q9:</span> What do you mean by don’t care condition?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The don’t care condition set accommodates input patterns that never occur or outputs that will not be observed.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q10-11">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q10:</span> Y = A'C + AC'B' and you are given that A=C=1 will never occur. Simplify Y?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Y = A'C + AC'B' and the output will be don’t care for A = C = 1. So the K-map will be as follows: Thus the simplified expression for Y is AB’ + C
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q11-12">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> Y = ∑ ( 0,2,3,4,9,10,12,13) = d (6,8,14) .Simplify using KMap. Mention Prime Implicants &amp; Essential Prime Implicants?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            14/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q12-13">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q12:</span> Y = F(A,B,C,D) = ∑ (0,1,4,5,7,9,12). Express the same using П ? = d (6,8,14) .Simplify using KMap. Mention Prime Implicants &amp; Essential Prime Implicants?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Y = П (2,3,6,8,10,11,13,14,15)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q13-14">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q13:</span> If F(A,B,C,D,E) = B’E, how many terms will be there in the standard or canonical SOP representation of F?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            8 terms, F = B’E (A + A’) (C+C’) (D+D’)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <div className="text-sm text-muted-foreground italic pt-4">
                                        ... and 15 more questions
                                    </div>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Clock className="h-8 w-8 text-orange-500" />
                                    Sequential Circuits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    36 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q1-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> Mention two basic applications of flip-flops?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The major applications of flip-flops are: Data storage Data transfer Counting and Frequency division
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q3-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q3:</span> What is transparent latch?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            D-Latch is called transparent Latch. As it transfers the data as it is to the output on enable.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q6-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q6:</span> How to convert S-R Latch to transparent latch?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Transparent latch from S-R Latch:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q8-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q8:</span> Design a master-slave D-Flip flop using D-Latch?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            2 D-latches and an inverter are needed to get the master-slave configuration. The major advantage of master-slave configuration is avoiding the race-around condition as the input changes only at the edges.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q9-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q9:</span> What is race-around condition? Explain it in case of J-K Latch and solution to avoid that?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The race around condition means: the output oscillating between 0s &amp; 1s. This problem will occur in Latches especially if the clock is high for long time. In case of J-K Latch, J=K=1 gives Q(t+1) = Q(t)' . Consider the case when clock is high for long time and J=K=1. Then the output oscillates between 0 &amp; 1 continuously as long as the clock is high. To avoid this, use Master-Slave configuration wh
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q11-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> Give the characteristic table and characteristic equation for J-K Flip-flop?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The characteristic table for J-K flip flop is: To get the characteristic equation, we can use K-Map with 3 inputs, J,K and Q(t) and obtain,
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q13-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q13:</span> Implement T-flip flop from D-flip flop? 39/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            T-flip flop using DFF:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q14-7">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q14:</span> Show how to convert J-K flip flop into (a) T-flip flop (b) D-flip flop?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            T-flip flop using DFF:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q15-8">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q15:</span> What is excitation table?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            During the design process we usually know the transition from present state to the next state and wish to find the flip-flop input conditions that will cause the required transition. For this reason we will need a table that lists the required inputs for a given change of state. Such a list is called the excitation table.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q16-9">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q16:</span> Write the excitation table for T-flip flop?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The excitation table for T flip flop is shown below. 40/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q18-10">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q18:</span> Which flip-flop can be used as delay switch?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            As DFF transmits the data as it is to the output, it can be used to provide one clock delay.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q19-11">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q19:</span> Which flip-flop can be used as toggle switch?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            In TFF, if T=1, output just toggles between 1 and 0. So TFF can be used as toggle switch.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q21-12">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q21:</span> A AB flip flop has 4 operations: clear to 0, no change, compliment and set to 1, when inputs A and B are 00, 01, 10 and 11 respectively. Derive the characteristic equation?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q22-13">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q22:</span> Give the excitation table for the AB flip flop described in Q20?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q23-14">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q23:</span> Show how the AB flip-flop can be converted to a D flip-flop? 42/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            To get D from flip-flop from AB flop, just connect A=B=D. We can prove this from the characteristic equation ,
                                        </AccordionContent>
                                    </AccordionItem>
                                    <div className="text-sm text-muted-foreground italic pt-4">
                                        ... and 21 more questions
                                    </div>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Clock className="h-8 w-8 text-red-500" />
                                    Setup and Hold Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    2 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q5-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q5:</span> Design a circuit for clock frequency divided by 2 using DFF. Given the following information, find the maximum clock frequency that the circuit can handle? T_setup = 6ns , T_hold = 2ns and T_propagati
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            60/109 Using the same equation , T &gt;= Tcq + Tsu, T &gt;= 6 + 10. So T &gt;= 16ns. The maximum clock frequency = 1/16ns = 62.5MHz
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q6-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q6:</span> Is there any hold violation in the above circuit? When will the hold violation occur in a given circuit and how can it be solved in circuit level? Describe in detail.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            There are no hold violations in the above circuit. If the hold time is greater than the propagation delay then there will be hold violation for the above circuit. In that case, buffers (even number of inverters) will be used in the feedback path in order to delay the signal in reaching back to the input. Answer: (a) Thold &lt;= Tcq + dly. But here, 2ns &gt; 1.5 + 0.5 = 1.7ns. So there is a hold violat
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Database className="h-8 w-8 text-cyan-500" />
                                    Counters and Shift Registers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    6 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q10-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q10:</span> We have a circular wheel with half painted black and the other half painted white. There are 2 censors mounted 45 degree apart at the surface of this wheel( not touching the wheel) which give a "1" fo
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The sensor will give 1 for Black and 0 for white. First we will draw the outputs of the sensors assuming some position of the wheel. Assume that the initial position of the wheel is as shown in the figure with respect to the sensors. The output waveforms of S1 and S2 will be as follows. Both clock wise and counter clock wise wave forms are shown here. It is clear from the waveforms that there is a
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q9-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q9:</span> Give the circuit to extend the falling edge of the input by 2 clock pulses. The waveforms are shown in the following figure.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Shift register based: Assumed atleast 3 clock gaps between next falling edge. Shift register of width 2 is needed.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q28-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q28:</span> Design a counter using DFF that counts in the sequence: 0,4,2,7,0,4,2,7,0,4……?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The present state and next state values are shown in the table and the complete design is shown in the following diagram. 77/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q1-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> What are stuck-at problems? Explain the reason for their occurrence?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A fault in a manufactured circuit causing a node to be stuck at a logical value of 1 (stuck- at-1) or a logic value of 0 (stuck-at-0), independent of the input to the circuit. If any rail during the layout gets connected to either VDD or GND permanently, it will lead to these stuck at problems.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q14-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q14:</span> What is dual data ROM?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            DDR RAM or double-data-rate RAM is a type of memory integrated circuits used in computers. It achieves greater bandwidth than ordinary RAM by transferring data on both the rising and falling edges of the clock signal. This effectively nearly doubles the transfer rate without increasing the frequency of the front side bus. Thus a 100 MHz DDR system has an effective clock rate of 200 MHz when compar
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q22-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q22:</span> In a particular system, the sender sends data at the rate of 80 words / 100 clocks and the receiver can consume at the rate of 8 words / 10 clocks. Calculate the depth of FIFO so that no data is dropp
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            In the problem it is given that, out of 100 clocks the sender sends 80 words. The 80 words can occur in any of the 100 clocks. The worst case will be all 80 words coming continuously. So for 10 clocks, the sender sends 10 words where as the receiver can receive only 8 words. So we need to store 16 words in 100 cycles. Now if we look at the process for long time, the worst case is: During first 100
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                                    Fault Analysis and Hazards
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    2 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q16-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q16:</span> What are the two hazards that can be there in a combinational circuit?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A Static Hazard is defined when a single variable change at the input causes a momentary change in another variable [the output]. A Dynamic Hazard occurs when a change in the input causes multiple changes in the output [i.e. from 1 to 0 and back to 1]. In either case of a Static or Dynamic hazard the product produced is an unanticipated glitch [the hazard]. The resulting glitches in the circuit ma
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q23-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q23:</span> Find a hazard-free minimum cost implementation of the function: F(A,B,C,D) = ∑ (0,4,11,13,15) + d(2,3,5,10)
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            F(A,B,C,D) = ∑ (0,4,11,13,15) + d(2,3,5,10) From the K-Map shown below, the simplified expression for F is, F = ABD + A’C’D’ + B’C But to make it Hazard free, we need to add the redundant term, ACD to this. F = ABD + A’C’D’ + ACD (Note that B’C is removed from the equation) 87/109
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <Cpu className="h-8 w-8 text-indigo-500" />
                                    Digital Integrated Circuits
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    7 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q1-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> What do you mean by CMOS technology? Explain with a block diagram.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            CMOS(Complementary MOS) circuits consist of both types of MOS devices interconnected to form logic functions as shown in the following block diagram. The PUN(Pull up network) will charge the output node in case of Logic-1 and the PDN(Pull down network) will discharge by connecting the output node to ground, in this way the out put is connected either to VDD or GND continuously. PUN and PDN are dua
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q4:</span> Show the circuit for CMOS inverter and explain the basic operation?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            CMOS inverter: Basic operation: When input goes from 0 to 1, the PMOS will be off and the NMOS will be on. This makes the OUT to get connected with GND and goes to 0. Similarly when input is 0, the NMOS will be OFF and PMOS turns ON making the output logic to VDD. We will get full logic levels at the output.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q5-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q5:</span> Draw the VTC of a CMOS inverter?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Voltage Transfer Characteristics (VTC) of a CMOS inverter: 90/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q14-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q14:</span> Draw the CMOS implementation for the following circuit:
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            F = ( (A+B) . (C + D))’ 94/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q19-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q19:</span> Draw the stick diagram of CMOS inverter?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Stick diagram for CMOS inverter
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q28-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q28:</span> The output and input of a static CMOS inverter are connected as shown in the above figure. What is the output voltage? 99/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The NMOS transmits the same voltage from drain to source, as long as its value is less than 4V. So in the given diagram the output and input of the inverter are same. If we observe theVTC of an inverter, Vout=Vin at Vth = VDD/2 = 2.5V.So if there is no noise floor, the output will settle to 2.5V (This is theoretical analysis). However practically the circuit will oscillate.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q11-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> What are the advantages and disadvantages of DRAM when compared to SRAM?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            DRAM has 3 main advantages over SRAM: 1. DRAM memory cell (1 transistor and capacitor) is simple and smaller than SRAM (6 transistors).DRAM has more density (more cells per chip). The larger memories are always made of made of DRAMs only. ( Main memory) 2. DRAM is cheaper than SRAM. 3. DRAM dissipates lesser power. Disadvantages: 1. DRAM is slower than SRAM. Where speed is critical, SRAM will be
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-3xl flex items-center gap-3">
                                    <HardDrive className="h-8 w-8 text-pink-500" />
                                    Memory and Programmable Devices
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground mb-4">
                                    13 questions covering key concepts.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="q1-0">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> Define: SOP from and POS form? 12/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            SOP: Sum Of Products : OR of all ANDs Eg: F (A,B,C) = A + BC POS: Product Of sums: AND of all ORs Eg: F(A,B,C) = (A’+B’) (A’+C’)
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q18-1">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q18:</span> Use K-Map to simplify F = ∑ (0,1,2,6,7,8,9,10,14,15) in SOP from? Cross check the essential prime Implicants that are obtained in Q17.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            16/109
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q11-2">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q11:</span> Reduce the following state table:
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            To remove a state, we need to have another state with the same next state values and output values. If we observe the given state table, state g has all entries same as those of state a. So state g can be replaced with a everywhere. Once g is replaced with a, all the entries of f are same as those of c. Thus, replacing f with c, makes state d same as state b. So with all these changes the reduced
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4-3">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q4:</span> Explain the procedure for detecting a specific fault in a given circuit?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Assume that there is only fault in the given circuit. This is called single fault model. Now apply the input combination such that the correct and faulty circuits would give different outputs.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q1-4">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q1:</span> What is Volatile memory? Give an example.
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Any type of memory that requires power in order to store information is called volatile memory. RAM is volatile whereas ROM is non-volatile. That means ROM can store data without power also.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q2-5">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q2:</span> Differentiate between RAM and ROM?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Differences between RAM and ROM: 1. ROM: Read Only Memory. RAM : Random Access Memory 2. ROM has no write operation. RAM has both read and write operations 3. ROMs are non-volatile and RAMs are volatile.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q3-6">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q3:</span> How many address and data lines will be there for a memory of size, 1K X 8?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            1K = 210 , Number of address lines = 10 Number of data lines = 8
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4-7">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q4:</span> How many number of 16X8 size memories are needed to obtain a memory of size 256X16? 102/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            256/16 = 16, 16X8 memories are sufficient to get a memory of size 256 X 8. But to get 256 X 16, we need twice of that. So, the required number of 16 X 8 memories = 16 * 2 = 32
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q9-8">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q9:</span> Define memory access time?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            The time that is required for the data to be available at the memory output after receiving the new address at the input is called memory access time. It is a measure of a memory devices operating speed.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q10-9">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q10:</span> Which is faster: SRAM or DRAM? 105/109
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            SRAM is faster than DRAM
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q16-10">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q16:</span> What is the difference between PLA and PAL?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            In PLA both AND and OR arrays are programmable whereas PAL has programmable AND array and a hardwired OR array. When number of functions to be realized is low, PLA is costly. For those cases, PAL is much cheaper. Answer: (a) ii (b) iii (c) i Answer: F1 = A’BC + AB’C + B’C’ F2 = A’BC + AB’C F3 = B’C’
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q20-11">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q20:</span> Show the basic block diagram of FIFO and explain the basic signals or connections of a FIFO?
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A FIFO with all the necessary signal lines is shown in the following block diagram:
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q21-12">
                                        <AccordionTrigger className="text-left">
                                            <span className="font-semibold">Q21:</span> It is required to connect a Master, which generates data @ 200 Mega Samples/sec to a Slave which can receive the data @ 10 Mega Samples/Sec. If the data lasts in 10Micro Sec, what is the optimal size
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Duration of the data = 10 Microsec Input Data rate (Master) = 200 Mega samples Output Data rate (Slave) = 10 Mega samples Depth of FIFO = (Output rate – Input rate) * Duration = (200-10) * 10 = 1900
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>

                        <div className="mt-12">
                            <CommentsSection articleId="digital-electronics-interview-questions" />
                        </div>
                    </article>
                </div>
            </section>
        </div>
    )
}
