---
description: Workflow for adding a new article to the platform
---

# New Article Creation Workflow

Follow these steps when adding a new article to ensure consistency and full feature integration.

## 1. Create Article Page
- Create a new directory: `app/articles/[slug]/`
- Create `page.tsx`.
- Use the standard layout:
  - **Hero Section**: Title, Description, Gradient background.
  - **Content Card**: Main article content wrapped in `Card`.
  - **Reference Section**: Sources and links.

## 2. Add Interactions (Critical)
Every article MUST include the Comments Section to enable community discussion.

```tsx
import { CommentsSection } from "@/components/comments-section"

// ... inside the component JSX, at the bottom of the article:
<CommentsSection courseId="[slug]" />
```

## 3. Register Metadata
- Open `components/explore/FeaturedArticles.tsx`.
- Add a new `Link` and `Card` entry for the article.
- Ensure correct `href`, `title`, and `description`.

## 4. Notifications & Community
- **Manual**: Post a link to the new article in the Community "General Discussion" or relevant topic.
- **Newsletter**: If applicable, trigger a SendX campaign (manual process).
