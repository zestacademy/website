# 🎓 Zest Academy - E-Learning Platform

A modern, full-featured e-learning platform built with Next.js 16, React 19, and Firebase. This platform offers structured courses, interactive quizzes, article publishing, community features, and a comprehensive learning management system (LMS).

## 📑 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Pages & Routes](#-pages--routes)
- [Services & Utilities](#-services--utilities)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Configuration Files](#-configuration-files)

## ✨ Features

### 🔐 Authentication & Identity
- **Firebase Authentication**: Seamless login via Email/Password and Google Sign-In
- **Zest ID System**: Unique user identifiers (e.g., `ZU0005`) auto-generated for each user
- **Smart Onboarding**: Welcome flow showcasing new Zest ID with feature spotlights
- **Profile Management**: Edit bio, social links, and display Zest ID

### 📚 Learning Management System (LMS)
- **Structured Courses**: Multi-module courses with organized lessons (Python, IoT, JavaScript, etc.)
- **Course Enrollment**: Track user enrollments and learning progress
- **Interactive Lessons**: Rich content with code editors, videos, and text
- **Quiz System**: Multiple-choice quizzes with explanations and instant feedback
- **Progress Tracking**: Visual progress indicators and completion tracking
- **Resume Learning**: Continue from where you left off
- **Monaco Code Editor**: In-browser code editing with syntax highlighting

### 🌐 Community & Content
- **Tech News**: Real-time technology news updates (via NewsAPI)
- **Job Board**: Integrated job search for developers (via JSearch/RapidAPI)
- **Article Publishing**: Educational blog system with 11+ articles
- **Community Topics**: Discussion forums for various tech topics
- **Comments System**: Discussion threads on courses and articles
- **Developer Profiles**: Showcase mentors and instructors

### 🎨 User Experience
- **Dark Mode**: Theme switching with next-themes
- **PWA Support**: Offline-first progressive web app capabilities
- **Push Notifications**: Firebase Cloud Messaging for updates
- **Responsive Design**: Mobile-first with TailwindCSS
- **Animations**: Smooth transitions and micro-interactions
- **Reading Progress**: Article reading progress bar
- **XP & Gamification**: Experience points and achievement animations
- **Instant Search**: Fast search across courses and content
- **AI Chatbot**: Interactive chatbot for user assistance

### 🔧 Admin & Tools
- **Admin Dashboard**: Content management interface
- **UI Demo**: Component showcase for testing
- **SEO Optimization**: JSON-LD structured data, meta tags
- **Analytics**: Firebase Analytics integration
- **Ad Integration**: AdUnit component for monetization

## 🛠️ Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.0 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **React DOM** | 19.2.3 | React rendering |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| **TailwindCSS** | v4 | Utility-first CSS framework |
| **PostCSS** | 4 | CSS processing |
| **Radix UI** | Various | Accessible component primitives |
| **shadcn/ui** | 3.6.2 | Pre-built component library |
| **Lucide React** | 0.562.0 | Icon library |
| **next-themes** | 0.4.6 | Dark mode support |
| **class-variance-authority** | 0.7.1 | Component variants |
| **tailwind-merge** | 3.4.0 | Merge Tailwind classes |
| **clsx** | 2.1.1 | Conditional classes |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Firebase** | 12.7.0 | Backend platform |
| **Firebase Admin** | 13.6.0 | Server-side Firebase SDK |
| **Firestore** | - | NoSQL database |
| **Firebase Auth** | - | User authentication |
| **Firebase Analytics** | - | User analytics |
| **Firebase Messaging** | - | Push notifications |

### Developer Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **Monaco Editor** | 4.7.0 | In-browser code editor |
| **sql.js** | 1.13.0 | SQL database in browser |
| **Axios** | 1.13.2 | HTTP client |
| **react-share** | 5.2.2 | Social sharing buttons |
| **Next PWA** | 10.2.9 | Progressive Web App support |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9 | Code linting |
| **Babel React Compiler** | 1.0.0 | React optimization |

## 🏗️ Project Structure

```
/home/runner/work/website/website/
├── 📁 app/                          # Next.js App Router (Pages & Routes)
│   ├── 📁 (auth)/                   # Auth pages group
│   │   ├── forgot-password/         # Password recovery
│   │   ├── login/                   # Login page
│   │   └── register/                # Registration page
│   ├── 📁 about-us/                 # About page
│   ├── 📁 admin/                    # Admin dashboard
│   ├── 📁 api/                      # API routes
│   │   ├── auth/                    # Auth API endpoints
│   │   ├── compile/                 # Code compilation (JDoodle)
│   │   ├── jobs/                    # Job search API
│   │   └── news/                    # News API integration
│   ├── 📁 articles/                 # Educational articles (11 articles)
│   │   ├── ai-tools-guide/
│   │   ├── comprehensive-guide-to-ai/
│   │   ├── digital-electronics-interview-questions/
│   │   ├── electronics-to-embedded-mastery/
│   │   ├── how-to-become-an-entrepreneur/
│   │   ├── microhabits-that-can-change-your-life/
│   │   ├── placement-interview-questions/
│   │   ├── resistor-guide/
│   │   ├── what-is-api/
│   │   └── what-is-quantum-computing/
│   ├── 📁 categories/               # Course categories
│   ├── 📁 community/                # Community hub
│   │   └── [topicId]/              # Topic-specific discussions
│   ├── 📁 contact/                  # Contact form
│   ├── 📁 cookie-policy/            # Cookie policy
│   ├── 📁 courses/                  # Course pages
│   │   └── [courseId]/
│   │       ├── page.tsx             # Course details
│   │       └── learn/
│   │           └── [lessonId]/      # Individual lessons
│   ├── 📁 developers/               # Developer profiles
│   │   └── [developerId]/
│   ├── 📁 explore/                  # Explore/discovery page
│   ├── 📁 my-learning/              # User dashboard
│   ├── 📁 onboarding/               # User onboarding flow
│   ├── 📁 privacy-policy/           # Privacy policy
│   ├── 📁 terms-conditions/         # Terms & conditions
│   ├── 📁 ui-demo/                  # UI component showcase
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── robots.ts                    # robots.txt generator
│   ├── sitemap.ts                   # Sitemap generator
│   └── not-found.tsx               # 404 page
├── 📁 components/                   # React Components (60+ components)
│   ├── 📁 articles/                 # Article components
│   │   ├── ArticleFooter.tsx
│   │   ├── ArticleHeader.tsx
│   │   ├── DownloadPDF.tsx
│   │   └── ShareButtons.tsx
│   ├── 📁 community/                # Community components
│   │   ├── JobsSection.tsx
│   │   └── NewsSection.tsx
│   ├── 📁 courses/                  # Course components
│   │   ├── AllCourses.tsx
│   │   ├── CourseCard.tsx
│   │   ├── CourseHero.tsx
│   │   ├── CourseLanding.tsx
│   │   ├── LessonUI.tsx
│   │   ├── ResumeLearning.tsx
│   │   └── SidebarClient.tsx
│   ├── 📁 explore/                  # Explore page components
│   │   ├── CategoryGrid.tsx
│   │   ├── ExploreHero.tsx
│   │   ├── FeaturedArticles.tsx
│   │   └── TrendingCourses.tsx
│   ├── 📁 home/                     # Home page sections
│   │   ├── CategoriesSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── ExploreSection.tsx
│   │   ├── FeaturedCoursesSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── StructuredCoursesSection.tsx
│   ├── 📁 layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationToggle.tsx
│   │   └── UserProfile.tsx
│   ├── 📁 ui/                       # UI primitives (20+ components)
│   │   ├── accordion.tsx
│   │   ├── animated-counter.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── celebration-effect.tsx
│   │   ├── circular-progress.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── feature-spotlight.tsx
│   │   ├── input.tsx
│   │   ├── instant-search.tsx
│   │   ├── label.tsx
│   │   ├── onboarding-flow.tsx
│   │   ├── progress.tsx
│   │   ├── reading-progress-bar.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast-provider.tsx
│   │   ├── tooltip.tsx
│   │   └── xp-gain-animation.tsx
│   ├── AdUnit.tsx                   # Advertisement component
│   ├── AIChatbot.tsx                # AI chatbot interface
│   ├── CommentsSection.tsx          # Comments/discussions
│   ├── JsonLd.tsx                   # SEO structured data
│   ├── Leaderboard.tsx              # Gamification leaderboard
│   ├── QuizSection.tsx              # Quiz component
│   └── ThemeProvider.tsx            # Theme context provider
├── 📁 hooks/                        # Custom React Hooks
│   ├── useAnimatedCounter.ts        # Animated number counter
│   ├── useAuth.ts                   # Firebase authentication
│   ├── useFcmToken.ts               # FCM token management
│   └── useScrollProgress.ts         # Scroll progress tracking
├── 📁 lib/                          # Utilities & Configuration
│   ├── 📁 hooks/                    # Additional hooks
│   │   ├── useCourseProgress.ts     # Course progress
│   │   ├── useQuiz.ts               # Quiz logic
│   │   └── useUserEnrollments.ts    # User enrollments
│   ├── animations.ts                # Animation configurations
│   ├── courses.ts                   # Course utilities
│   ├── developers-data.ts           # Developer profiles data
│   ├── firebase-admin.ts            # Firebase Admin SDK
│   ├── firebase.ts                  # Firebase client config
│   ├── lms-data.ts                  # Complete LMS course data
│   └── utils.ts                     # Utility functions
├── 📁 services/                     # Business Logic Services
│   └── lms-service.ts               # LMS operations
├── 📁 types/                        # TypeScript Definitions
│   ├── course.ts                    # Course types
│   ├── developer.ts                 # Developer types
│   └── user.ts                      # User types
├── 📁 functions/                    # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts                 # Cloud functions entry
│   ├── package.json
│   └── tsconfig.json
├── 📁 public/                       # Static Assets
│   ├── 📁 icons/                    # PWA icons
│   ├── 📁 images/                   # Images
│   ├── auth-hero-desktop-hq.jpg
│   ├── favicon.ico
│   ├── logo.png
│   ├── manifest.json                # PWA manifest
│   └── sw.js                        # Service worker
├── .gitignore                       # Git ignore rules
├── components.json                  # shadcn/ui config
├── eslint.config.mjs                # ESLint configuration
├── firebase.json                    # Firebase config
├── firestore.rules                  # Firestore security rules
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies
├── postcss.config.mjs               # PostCSS config
├── tsconfig.json                    # TypeScript config
├── CODE_OF_CONDUCT.md               # Code of conduct
├── LICENSE                          # MIT License
├── README.md                        # This file
└── SECURITY.md                      # Security policy
```

## 🧩 Components

### Layout Components (4)
- **Navbar.tsx** - Navigation bar with theme toggle, search, user profile
- **Footer.tsx** - Footer with links and social media
- **UserProfile.tsx** - User profile dropdown menu
- **NotificationToggle.tsx** - Notification settings toggle

### Course Components (7)
- **CourseCard.tsx** - Individual course card display
- **CourseHero.tsx** - Course hero/banner section
- **CourseLanding.tsx** - Course landing page layout
- **AllCourses.tsx** - All courses listing page
- **LessonUI.tsx** - Lesson display interface with content
- **ResumeLearning.tsx** - Resume course button
- **SidebarClient.tsx** - Course navigation sidebar

### Home Page Components (7)
- **HeroSection.tsx** - Landing page hero with animated quotes
- **FeaturedCoursesSection.tsx** - Featured courses carousel
- **CategoriesSection.tsx** - Course categories grid
- **HowItWorksSection.tsx** - How it works section
- **CoursesSection.tsx** - Courses overview
- **ExploreSection.tsx** - Explore CTA section
- **StructuredCoursesSection.tsx** - Structured learning path

### Explore Page Components (4)
- **ExploreHero.tsx** - Explore page hero
- **TrendingCourses.tsx** - Trending courses display
- **FeaturedArticles.tsx** - Featured articles grid
- **CategoryGrid.tsx** - Category browsing grid

### Community Components (2)
- **NewsSection.tsx** - Tech news display
- **JobsSection.tsx** - Job listings display

### Article Components (4)
- **ArticleHeader.tsx** - Article header with metadata
- **ArticleFooter.tsx** - Article footer with CTA
- **ShareButtons.tsx** - Social share buttons
- **DownloadPDF.tsx** - PDF download functionality

### UI Components (25+)
**Core Input/Display:**
- button.tsx, input.tsx, textarea.tsx, label.tsx
- card.tsx, badge.tsx, avatar.tsx
- select.tsx, dropdown-menu.tsx

**Feedback & Progress:**
- progress.tsx, circular-progress.tsx
- toast-provider.tsx, tooltip.tsx

**Navigation & Overlays:**
- dialog.tsx, sheet.tsx, tabs.tsx
- accordion.tsx, scroll-area.tsx

**Interactive Features:**
- instant-search.tsx, animated-counter.tsx
- xp-gain-animation.tsx, celebration-effect.tsx
- reading-progress-bar.tsx

**Onboarding:**
- onboarding-flow.tsx, feature-spotlight.tsx

**Other:**
- table.tsx, separator.tsx

### Feature Components (5)
- **QuizSection.tsx** - Interactive quiz component
- **Leaderboard.tsx** - User rankings and leaderboard
- **AIChatbot.tsx** - AI-powered chatbot
- **CommentsSection.tsx** - Comments and discussions
- **JsonLd.tsx** - SEO structured data
- **AdUnit.tsx** - Advertisement integration
- **ThemeProvider.tsx** - Theme management

## 🗺️ Pages & Routes

### Authentication (4 routes)
- `/login` - User login page
- `/register` - New user registration
- `/forgot-password` - Password recovery
- `/onboarding` - New user onboarding flow

### Learning (5 routes)
- `/courses` - All courses listing
- `/courses/[courseId]` - Course details page
- `/courses/[courseId]/learn` - Course learning interface
- `/courses/[courseId]/learn/[lessonId]` - Individual lesson viewer
- `/my-learning` - User's enrolled courses dashboard

### Discovery (3 routes)
- `/explore` - Explore page with trending content
- `/categories` - Browse course categories
- `/community` - Community hub
- `/community/[topicId]` - Topic-specific discussions

### Articles (11 routes)
- `/articles/ai-tools-guide`
- `/articles/what-is-api`
- `/articles/comprehensive-guide-to-ai`
- `/articles/digital-electronics-interview-questions`
- `/articles/electronics-to-embedded-mastery`
- `/articles/resistor-guide`
- `/articles/what-is-quantum-computing`
- `/articles/placement-interview-questions`
- `/articles/how-to-become-an-entrepreneur`
- `/articles/microhabits-that-can-change-your-life`

### Informational (5 routes)
- `/about-us` - About the platform
- `/contact` - Contact form
- `/privacy-policy` - Privacy policy
- `/terms-conditions` - Terms and conditions
- `/cookie-policy` - Cookie policy

### Other (5 routes)
- `/` - Home/landing page
- `/developers` - Developer profiles listing
- `/developers/[developerId]` - Individual developer profile
- `/admin` - Admin dashboard
- `/ui-demo` - UI component showcase

### Generated Routes (3)
- `/sitemap.xml` - XML sitemap
- `/robots.txt` - Robots.txt file
- `/404` - Custom 404 page

## 🔧 Services & Utilities

### Services
- **lms-service.ts** - LMS operations (get courses, lessons, progress tracking)

### Custom Hooks
**Root Hooks:**
- **useAuth.ts** - Firebase authentication state management
- **useAnimatedCounter.ts** - Animated number counter hook
- **useFcmToken.ts** - Firebase Cloud Messaging token management
- **useScrollProgress.ts** - Page scroll progress tracking

**Lib Hooks:**
- **useUserEnrollments.ts** - User course enrollment management
- **useCourseProgress.ts** - Course progress tracking and updates
- **useQuiz.ts** - Quiz state and logic management

### Utilities
- **lib/utils.ts** - Utility functions (cn for className merging)
- **lib/animations.ts** - Animation configurations
- **lib/courses.ts** - Course data and helper functions
- **lib/developers-data.ts** - Developer profiles dataset
- **lib/lms-data.ts** - Complete LMS course data (Python, IoT, JavaScript, C, etc.)
- **lib/firebase.ts** - Firebase SDK initialization (Auth, Firestore, Messaging, Analytics)
- **lib/firebase-admin.ts** - Firebase Admin SDK for server-side operations

### Type Definitions
- **types/course.ts** - Course, Module, Lesson, Quiz types
- **types/developer.ts** - Developer profile types
- **types/user.ts** - User profile and progress types

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Firebase project with Firestore, Authentication, and Messaging enabled

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zestacademy/website.git
cd website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory (see [Environment Variables](#-environment-variables))

4. **Run the development server**
```bash
npm run dev
```

5. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server (Webpack mode)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Client Config (Public - exposed to browser)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# News API (Get from newsapi.org)
NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key

# RapidAPI (Get from rapidapi.com for JSearch)
RAPIDAPI_KEY=your-rapidapi-key
RAPIDAPI_HOST=jsearch.p.rapidapi.com

# JDoodle API (For code compilation features)
NEXT_PUBLIC_JDOODLE_CLIENT_ID=your-jdoodle-client-id
NEXT_PUBLIC_JDOODLE_CLIENT_SECRET=your-jdoodle-client-secret
```

### How to Get API Keys

**Firebase:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication, Firestore, Realtime Database, and Cloud Messaging
4. Get client config from Project Settings > General
5. Get Admin SDK credentials from Project Settings > Service Accounts

**NewsAPI:**
1. Sign up at [newsapi.org](https://newsapi.org/)
2. Copy your API key from the dashboard

**RapidAPI (JSearch):**
1. Sign up at [rapidapi.com](https://rapidapi.com/)
2. Subscribe to JSearch API
3. Copy your API key

**JDoodle:**
1. Sign up at [jdoodle.com](https://www.jdoodle.com/)
2. Get your Client ID and Secret from the API section

## ⚙️ Configuration Files

### next.config.ts
Next.js configuration with:
- PWA support (@ducanh2912/next-pwa)
- Image optimization
- React compiler optimization
- Turbopack for fast development
- Webpack fallback for builds

### tsconfig.json
TypeScript configuration with:
- Path alias `@/*` for imports
- Strict mode enabled
- Modern ES2020 target

### components.json
shadcn/ui configuration:
- Component style: New York
- Base color: Neutral
- CSS variables for theming
- Tailwind utilities

### tailwind.config.ts
TailwindCSS v4 configuration with custom theme

### firebase.json
Firebase hosting and functions configuration

### firestore.rules
Security rules for Firestore database

### eslint.config.mjs
ESLint configuration for code quality

## 📦 Key Dependencies

### Production
```json
{
  "next": "16.1.0",
  "react": "19.2.3",
  "firebase": "12.7.0",
  "@monaco-editor/react": "4.7.0",
  "@radix-ui/*": "Various",
  "tailwindcss": "4",
  "lucide-react": "0.562.0",
  "axios": "1.13.2"
}
```

### Development
```json
{
  "typescript": "5.9.3",
  "eslint": "9",
  "shadcn": "3.6.2",
  "babel-plugin-react-compiler": "1.0.0"
}
```

## 🎯 Core Features Breakdown

### LMS Courses Available
The platform includes complete structured courses:
- **Python Programming** - Beginner to advanced Python
- **IoT (Internet of Things)** - Hardware and software integration
- **JavaScript** - Modern JavaScript and ES6+
- **C Programming** - Systems programming fundamentals
- **And more** - Check `lib/lms-data.ts` for complete list

### Firestore Collections
- `users` - User profiles and metadata
- `courses` - Course information
- `enrollments` - User course enrollments
- `progress` - Learning progress tracking
- `comments` - Discussion threads
- `notifications` - User notifications

### Firebase Features Used
- **Authentication** - Email/Password, Google OAuth
- **Firestore** - NoSQL database with offline persistence
- **Realtime Database** - Real-time data synchronization
- **Cloud Messaging** - Push notifications
- **Analytics** - User behavior tracking
- **Hosting** - Web app deployment
- **Cloud Functions** - Serverless backend (in `/functions`)

## 🔒 Security

- Firestore security rules configured in `firestore.rules`
- Environment variables for sensitive data
- Firebase Admin SDK for secure server-side operations
- Authentication required for protected routes
- See `SECURITY.md` for security policy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct.

## 📞 Support

For support, contact the development team or open an issue on GitHub.

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Backend powered by [Firebase](https://firebase.google.com/)

---

**Zest Academy** - Empowering learners with quality education 🎓