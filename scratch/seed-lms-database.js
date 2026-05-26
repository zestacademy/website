const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// 1. Read and parse the .env file in the project root
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error(`Error: .env file not found at ${envPath}`);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');

// Parse keys
const projectIdMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=([^\r\n]+)/);
const clientEmailMatch = envContent.match(/FIREBASE_CLIENT_EMAIL=([^\r\n]+)/);
const privateKeyMatch = envContent.match(/(-----BEGIN PRIVATE KEY-----[\s\S]+?-----END PRIVATE KEY-----)/);

if (!projectIdMatch || !clientEmailMatch || !privateKeyMatch) {
  console.error("Error: Could not parse Firebase credentials from .env");
  console.log("Parsed Project ID:", projectIdMatch ? projectIdMatch[1] : "not found");
  console.log("Parsed Client Email:", clientEmailMatch ? clientEmailMatch[1] : "not found");
  console.log("Parsed Private Key:", privateKeyMatch ? "Found" : "Not Found");
  process.exit(1);
}

const projectId = projectIdMatch[1].trim();
const clientEmail = clientEmailMatch[1].trim();
let privateKey = privateKeyMatch[1].trim();

// Format private key newlines correctly
privateKey = privateKey.replace(/\\n/g, '\n');

console.log("Initializing Firebase Admin SDK...");
console.log("Project ID:", projectId);
console.log("Client Email:", clientEmail);

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: projectId,
      clientEmail: clientEmail,
      privateKey: privateKey,
    })
  });
} catch (err) {
  console.error("Failed to initialize Firebase Admin SDK:", err);
  process.exit(1);
}

const db = admin.firestore();

// 2. Define Mock Data
const MOCK_COURSES = [
  {
    id: "embedded-systems-rtos",
    title: "Mastering Embedded Systems & RTOS",
    description: "Deep dive into bare-metal firmware engineering, register-level architecture programming, and thread scheduling using Real-Time Operating Systems (RTOS) on ARM Cortex-M microcontrollers.",
    level: "intermediate",
    thumbnailUrl: "https://images.unsplash.com/photo-1608420312520-209166f272a0?auto=format&fit=crop&w=600&q=80",
    tags: ["Embedded", "ARM Cortex", "C/C++", "RTOS"],
    duration: "8 Hours",
    rating: 4.8,
    status: "published"
  },
  {
    id: "ai-agents-rag",
    title: "Advanced AI Agents & RAG Architectures",
    description: "Design and orchestrate production-grade autonomous agent systems, integrate advanced Retrieval-Augmented Generation (RAG) pipelines, and implement vector databases for semantic search.",
    level: "advanced",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    tags: ["AI & ML", "LLMs", "Vector DBs", "LangChain"],
    duration: "12 Hours",
    rating: 4.9,
    status: "published"
  },
  {
    id: "digital-electronics-101",
    title: "Introduction to Digital Electronics",
    description: "A foundational course covering Boolean algebra, logic gate design, combinational circuitry, flip-flops, registers, and synchronous state machines.",
    level: "beginner",
    thumbnailUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=600&q=80",
    tags: ["Hardware", "Digital", "Foundations", "Circuitry"],
    duration: "4 Hours",
    rating: 4.6,
    status: "published"
  }
];

const MOCK_CHAPTERS = {
  "embedded-systems-rtos": [
    {
      id: "es-ch1",
      courseId: "embedded-systems-rtos",
      title: "Cortex-M Bootup & registers",
      description: "Understand hardware interrupt vectors, start scripts, and bare-metal registers.",
      order: 1,
      lessonIds: ["es-l1", "es-l2"]
    },
    {
      id: "es-ch2",
      courseId: "embedded-systems-rtos",
      title: "Real-Time Scheduling & RTOS",
      description: "Master priority-based scheduling, semaphores, mutexes, and queues.",
      order: 2,
      lessonIds: ["es-l3", "es-l4"]
    }
  ],
  "ai-agents-rag": [
    {
      id: "ai-ch1",
      courseId: "ai-agents-rag",
      title: "Semantic Embedding & Vector Search",
      description: "How to chunk, embed, and store textual knowledge for high-efficiency querying.",
      order: 1,
      lessonIds: ["ai-l1", "ai-l2"]
    },
    {
      id: "ai-ch2",
      courseId: "ai-agents-rag",
      title: "Multi-Agent Systems & Tool-Calling",
      description: "Implement routing, feedback loops, and function calling workflows.",
      order: 2,
      lessonIds: ["ai-l3"]
    }
  ],
  "digital-electronics-101": [
    {
      id: "de-ch1",
      courseId: "digital-electronics-101",
      title: "Boolean Algebra & Gates",
      description: "Universal gates, logic equations, and De Morgan's theorems.",
      order: 1,
      lessonIds: ["de-l1", "de-l2"]
    }
  ]
};

const MOCK_LESSONS = {
  "es-l1": {
    id: "es-l1",
    chapterId: "es-ch1",
    courseId: "embedded-systems-rtos",
    title: "ARM Cortex-M Memory Map",
    contentType: "text",
    contentBody: "## Embedded Memory Architectures\n\nIn ARM Cortex-M microcontrollers, memory is mapped into a single unified 4GB address space. This address space is segmented into standard regions:\n\n1. **Flash Memory (Code)**: Begins at `0x00000000`. Contains the vector table, start-up code, and application binaries.\n2. **SRAM (RAM)**: Begins at `0x20000000`. Used for dynamic variables, stack, and heap.\n3. **Peripherals**: Begins at `0x40000000`. Maps physical peripheral registers (GPIO, timers, USART) directly to memory addresses.\n\n### Accessing Registers in C\nTo access registers directly, we cast raw memory addresses to volatile pointers:\n\n```c\n#define GPIOA_ODR *((volatile uint32_t*)0x40020014)\n\nvoid toggle_pin() {\n    GPIOA_ODR ^= (1 << 5); // Toggles pin 5\n}\n```",
    order: 1
  },
  "es-l2": {
    id: "es-l2",
    chapterId: "es-ch1",
    courseId: "embedded-systems-rtos",
    title: "Register-Level GPIO Controls",
    contentType: "video",
    videoUrl: "https://www.youtube.com/embed/3V9a1E0w_j0",
    contentBody: "Watch this interactive register programming demonstration explaining how clock routing and configuration flags enable simple LED pulsing on an STM32 board.",
    order: 2
  },
  "es-l3": {
    id: "es-l3",
    chapterId: "es-ch2",
    courseId: "embedded-systems-rtos",
    title: "RTOS Task Scheduling & Context Switching",
    contentType: "text",
    contentBody: "## Real-Time Schedulers\n\nAn RTOS kernel manages task execution through priority-based scheduling. Tasks reside in three principal states:\n\n* **Running**: The CPU is currently executing this task.\n* **Ready**: The task can run but a higher priority task is active.\n* **Blocked**: The task is waiting for an event (timer, semaphore, queue).\n\n### The Scheduler Mechanism\nDuring a context switch, the kernel triggers a **PendSV** exception. The CPU pushes core registers (`R0-R3`, `R12`, `LR`, `PC`, `xPSR`) to the stack. The software then stores the remaining registers (`R4-R11`) to the current task's Stack Pointer (SP) and restores the target task's stack registers before exiting the exception.",
    order: 1
  },
  "es-l4": {
    id: "es-l4",
    chapterId: "es-ch2",
    courseId: "embedded-systems-rtos",
    title: "RTOS Concurrency Quiz",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "Which mechanism avoids priority inversion in RTOS environments?",
        options: [
          "Spinlocks",
          "Priority Inheritance",
          "First-In First-Out (FIFO)",
          "Round-Robin Slicing"
        ],
        correctOptionIndex: 1,
        explanation: "Priority Inheritance temporarily raises the priority of the low-priority lock-holding task to match the high-priority waiting task, resolving inversion bottlenecks."
      },
      {
        questionText: "What register maps the dynamic stack frame address during active thread runtime?",
        options: [
          "R15 (PC)",
          "R14 (LR)",
          "R13 (SP)",
          "R0 (Return)"
        ],
        correctOptionIndex: 2,
        explanation: "R13 acts as the Stack Pointer (SP) holding the active address boundary of the dynamic call stack."
      }
    ],
    order: 2
  },
  "ai-l1": {
    id: "ai-l1",
    chapterId: "ai-ch1",
    courseId: "ai-agents-rag",
    title: "Intro to Retrieval-Augmented Generation",
    contentType: "text",
    contentBody: "## What is RAG?\n\nRetrieval-Augmented Generation (RAG) optimizes LLM processing by pulling semantic background information from an external vector index to supplement the active prompt.\n\n### The Core RAG Workflow\n1. **Ingest & Process**: Clean documents, split them into optimal semantic chunks (e.g. 500-1000 characters).\n2. **Vector Ingestion**: Generate dense math vectors from chunks using embedding engines (e.g., text-embedding-ada-002) and write to a vector table.\n3. **Query Retrieval**: Perform Cosine Similarity or K-Nearest Neighbors search using the user's prompt as the search target.\n4. **Supplement & Generate**: Inject retrieved chunks into the LLM system context as dynamic grounding context, then request completion.\n\n```python\n# Conceptual representation of prompt enhancement\ncontext = vector_db.similarity_search(user_query, k=3)\nfull_prompt = f\"Context: {context}\\n\\nQuestion: {user_query}\"\nresponse = llm.generate(full_prompt)\n```",
    order: 1
  },
  "ai-l2": {
    id: "ai-l2",
    chapterId: "ai-ch1",
    courseId: "ai-agents-rag",
    title: "Chunking Strategies & Context Poisoning",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "What vector operation is commonly evaluated to gauge semantic similarity between two chunk vectors?",
        options: [
          "Dot Product scaling",
          "Cosine Similarity / Dot Product on normalized coordinates",
          "Euclidean Distance summation",
          "Cross-product integration"
        ],
        correctOptionIndex: 1,
        explanation: "Cosine Similarity evaluates the angle between high-dimensional embedding vectors, making it size-invariant and perfect for assessing semantic similarity."
      }
    ],
    order: 2
  },
  "ai-l3": {
    id: "ai-l3",
    chapterId: "ai-ch2",
    courseId: "ai-agents-rag",
    title: "Building Router Agents from Scratch",
    contentType: "text",
    contentBody: "## Router Architectures\n\nRouter agents inspect user input and dynamically direct the request to specialized model interfaces, local tools, or distinct sub-graph agents.\n\n### Implementation Template (Typescript)\n\n```typescript\ntype TargetAgent = 'EmbeddedExpert' | 'AIEngineer' | 'GeneralHelp';\n\nasync function routeRequest(prompt: string): Promise<TargetAgent> {\n  const checkPrompt = `Examine this request: \"${prompt}\"\\nRoute it to one of: EmbeddedExpert, AIEngineer, GeneralHelp. Return ONLY the category name.`;\n  const response = await llm.complete(checkPrompt);\n  return response.trim() as TargetAgent;\n}\n```",
    order: 1
  },
  "de-l1": {
    id: "de-l1",
    chapterId: "de-ch1",
    courseId: "digital-electronics-101",
    title: "Fundamentals of Logic Gates",
    contentType: "text",
    contentBody: "## Logic Foundations\n\nAll digital computers rely on three core logical operations:\n\n* **AND**: Output is high ONLY if all inputs are high (`Y = A • B`).\n* **OR**: Output is high if at least one input is high (`Y = A + B`).\n* **NOT**: Inverts the input (`Y = A'`).\n\n### The NAND Universal Gate\nNAND (`(A • B)'`) and NOR (`(A + B)'`) gates are classified as **universal gates**. This is because any standard Boolean equation can be wired using exclusively NAND or exclusively NOR gates.",
    order: 1
  },
  "de-l2": {
    id: "de-l2",
    chapterId: "de-ch1",
    courseId: "digital-electronics-101",
    title: "Truth Tables & Gates Assessment",
    contentType: "quiz",
    quizQuestions: [
      {
        questionText: "Which gate outputs high only when inputs are mismatched (one high, one low)?",
        options: [
          "NAND",
          "XOR",
          "NOR",
          "XNOR"
        ],
        correctOptionIndex: 1,
        explanation: "XOR (Exclusive OR) outputs a 1 if and only if the inputs differ (e.g. 1 and 0, or 0 and 1)."
      }
    ],
    order: 2
  }
};

async function seed() {
  console.log("Seeding courses into Firestore...");
  for (const course of MOCK_COURSES) {
    const courseId = course.id;
    const courseRef = db.collection('lmsCourses').doc(courseId);
    await courseRef.set({
      ...course,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`- Course seeded: ${courseId}`);
  }

  console.log("Seeding chapters into Firestore...");
  for (const courseId of Object.keys(MOCK_CHAPTERS)) {
    const chapters = MOCK_CHAPTERS[courseId];
    for (const chapter of chapters) {
      const chapterId = chapter.id;
      const chapterRef = db.collection('lmsChapters').doc(chapterId);
      await chapterRef.set(chapter, { merge: true });
      console.log(`- Chapter seeded: ${chapterId}`);
    }
  }

  console.log("Seeding lessons into Firestore...");
  for (const lessonId of Object.keys(MOCK_LESSONS)) {
    const lesson = MOCK_LESSONS[lessonId];
    const lessonRef = db.collection('lmsLessons').doc(lessonId);
    await lessonRef.set(lesson, { merge: true });
    console.log(`- Lesson seeded: ${lessonId}`);
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
