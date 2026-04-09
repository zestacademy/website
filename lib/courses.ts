
export const courses = [
  {
    slug: 'python-mastery',
    title: 'Python Mastery',
    instructor: 'Zest Academy Team',
    rating: 4.9,
    duration: '20 Days',
    estimatedHours: 40,
    price: 'Contact for details',
    difficulty: 'Beginner',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop',
    description:
      'Complete 20-day Python journey from basics to advanced. Build real projects and master Python fundamentals with hands-on learning.',
    learningOutcomes: [
      'Master Python syntax and core concepts',
      'Build real-world projects and applications',
      'Understand data structures and algorithms',
      'Work with files, databases, and APIs',
      'Develop problem-solving skills in Python',
    ],
    certificateName: 'Python Mastery Completion Certificate',
    startDate: 'TBA',
    classLink: '',
  },
  {
    slug: 'internet-of-things',
    title: 'Internet of Things Specialist',
    instructor: 'Zest Academy Team',
    rating: 4.8,
    duration: '12 Weeks',
    estimatedHours: 60,
    price: 'Contact for details',
    difficulty: 'Intermediate',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    description:
      'Master IoT from sensor networks to cloud computing. Learn Arduino, Raspberry Pi, and build smart systems for real-world applications.',
    learningOutcomes: [
      'Understand IoT architecture and protocols',
      'Work with Arduino and Raspberry Pi',
      'Build sensor networks and connected devices',
      'Implement cloud connectivity and data processing',
      'Develop end-to-end IoT solutions',
    ],
    certificateName: 'IoT Specialist Completion Certificate',
    startDate: 'TBA',
    classLink: '',
  },
  {
    slug: 'ai-foundation',
    title: 'AI Foundation',
    instructor: 'Zest Academy Team',
    rating: 4.9,
    duration: '30 Days',
    estimatedHours: 45,
    price: 'Contact for details',
    difficulty: 'Beginner',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop',
    description:
      'Build a practical AI base with core concepts in machine learning, model evaluation, and real-world use cases.',
    learningOutcomes: [
      'Understand supervised and unsupervised learning concepts',
      'Train and evaluate baseline machine learning models',
      'Work with structured datasets and feature engineering basics',
      'Present AI solutions for business and academic contexts',
    ],
    certificateName: 'AI Foundation Completion Certificate',
    startDate: 'TBA',
    classLink: '',
  },
  {
    slug: 'embedded-systems',
    title: 'Embedded Systems Design',
    instructor: 'Zest Academy Team',
    rating: 4.7,
    duration: '45 Days',
    estimatedHours: 50,
    price: 'Contact for details',
    difficulty: 'Intermediate',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop',
    description:
      'Learn embedded systems design from microcontroller programming to real-time operating systems and hardware interfacing.',
    learningOutcomes: [
      'Master microcontroller programming and interfacing',
      'Understand real-time systems and RTOS concepts',
      'Design embedded hardware and PCB layouts',
      'Implement communication protocols and networking',
      'Develop firmware for embedded applications',
    ],
    certificateName: 'Embedded Systems Design Certificate',
    startDate: 'TBA',
    classLink: '',
  },
]

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug) || null
}

export function getCourseById(courseId: string) {
  return getCourseBySlug(courseId)
}
