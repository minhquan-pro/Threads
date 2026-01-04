# 🧵 Threads Clone

<div align="center">

![Threads Clone](https://img.shields.io/badge/Threads-Clone-purple)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

A Threads social media clone built with React, Redux Toolkit, Tailwind CSS, and modern technologies.

[Demo](#) · [Report Bug](https://github.com/username/threads/issues) · [Request Feature](https://github.com/username/threads/issues)

</div>

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [State Management](#-state-management)
- [Routing](#-routing)
- [Component Library](#-component-library)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Introduction

Threads Clone is a social media application that simulates Meta's Threads, allowing users to share thoughts, images, and interact with the community through posts, comments, likes, and reposts.

### 🌟 Highlights

- 🚀 **Performance**: Using Vite for blazing fast build times
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS and Shadcn UI
- 📱 **Responsive**: Works smoothly on all devices
- ⚡ **Optimistic Updates**: Instant UI updates for the best UX
- 🔐 **Secure**: JWT authentication with refresh token mechanism
- ♿ **Accessible**: Complies with WCAG 2.1 standards

---

## ✨ Features

### 🔐 Authentication & Authorization

- [x] Register account with email/username
- [x] Login with email/username
- [x] Instagram login (OAuth)
- [x] Logout and clear session
- [x] Auto refresh token when expired
- [x] Protected routes for authenticated users
- [x] Guest routes for unauthenticated users

### 📝 Posts Management

- [x] Create new post with text and media
- [x] Edit own posts
- [x] Delete own posts with confirmation dialog
- [x] Quote post (cite posts)
- [x] View post detail with full comments
- [x] Upload multiple images/videos
- [x] Preview media before posting
- [x] Optimistic UI updates

### 💬 Comments & Interactions

- [x] Comment on posts
- [x] Reply to comments (nested comments)
- [x] Delete own comments
- [x] Like/Unlike posts
- [x] Repost/Unrepost
- [x] View count of likes, comments, reposts
- [x] Real-time comment loading

### 👤 User Profile

- [x] View other users' profiles
- [x] Edit profile (avatar, bio, links)
- [x] View user's post list
- [x] View user's replies list
- [x] View followers/following lists
- [x] Follow/Unfollow users
- [x] Verified badge for users

### 🔍 Search & Discovery

- [x] Search users
- [x] Search posts/threads
- [x] Suggested users to follow
- [x] Trending topics
- [x] Activity feed (notifications)

### 🎨 UI/UX Features

- [x] Infinite scroll for feed
- [x] Skeleton loading states
- [x] Toast notifications
- [x] Modal dialogs
- [x] Dropdown menus
- [x] Image carousel
- [x] Copy link to clipboard
- [x] Smooth animations & transitions
- [x] Dark mode support (optional)

### 📱 Responsive Design

- [x] Mobile-first approach
- [x] Tablet optimization
- [x] Desktop layout
- [x] Touch-friendly interactions

---

## 🛠️ Tech Stack

### Core Technologies

| Technology                                     | Version | Description             |
| ---------------------------------------------- | ------- | ----------------------- |
| [React](https://react.dev/)                    | 18.3.1  | UI Library              |
| [Vite](https://vitejs.dev/)                    | 5.4.10  | Build Tool & Dev Server |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2.3.0   | State Management        |
| [React Router](https://reactrouter.com/)       | 7.0.1   | Routing                 |
| [Tailwind CSS](https://tailwindcss.com/)       | 3.4.14  | CSS Framework           |

### UI Components & Styling

| Package                                           | Description            |
| ------------------------------------------------- | ---------------------- |
| [Shadcn UI](https://ui.shadcn.com/)               | Component library      |
| [Radix UI](https://www.radix-ui.com/)             | Headless UI primitives |
| [Lucide React](https://lucide.dev/)               | Icon library           |
| [Embla Carousel](https://www.embla-carousel.com/) | Carousel component     |

### HTTP & Data Fetching

| Package                                              | Description             |
| ---------------------------------------------------- | ----------------------- |
| [Axios](https://axios-http.com/)                     | HTTP client             |
| [React Query](https://tanstack.com/query) (Optional) | Data fetching & caching |

### Utilities

| Package                                         | Description            |
| ----------------------------------------------- | ---------------------- |
| [date-fns](https://date-fns.org/)               | Date manipulation      |
| [clsx](https://github.com/lukeed/clsx)          | Conditional classnames |
| [uuid](https://github.com/uuidjs/uuid)          | UUID generation        |
| [react-hook-form](https://react-hook-form.com/) | Form validation        |

### Development Tools

| Tool       | Description            |
| ---------- | ---------------------- |
| ESLint     | Code linting           |
| Prettier   | Code formatting        |
| Husky      | Git hooks              |
| Commitlint | Commit message linting |

---

## 💻 System Requirements

### Minimum Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 or **yarn**: >= 1.22.0
- **OS**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB (recommended 8GB)
- **Disk**: 500MB free space

### Recommended

- **Node.js**: 20.x LTS
- **npm**: 10.x
- **RAM**: 8GB+
- **Modern browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 🚀 Installation

### 1️⃣ Clone Repository

```bash
# HTTPS
git clone https://github.com/username/threads.git

# SSH
git clone git@github.com:username/threads.git

# GitHub CLI
gh repo clone username/threads

cd threads
```

### 2️⃣ Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3️⃣ Configure Environment Variables

```bash
# Copy env example file
cp .env.example .env

# Edit .env file with your editor
nano .env
# or
code .env
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# ==========================================
# API Configuration
# ==========================================
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# ==========================================
# App Configuration
# ==========================================
VITE_APP_URL=http://localhost:5173
VITE_APP_NAME=Threads Clone
VITE_APP_DESCRIPTION=Social media app built with React

# ==========================================
# Features Flags
# ==========================================
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false

# ==========================================
# Authentication
# ==========================================
VITE_TOKEN_EXPIRY=3600000
VITE_REFRESH_TOKEN_EXPIRY=604800000

# ==========================================
# Upload Configuration
# ==========================================
VITE_MAX_FILE_SIZE=5242880
VITE_MAX_FILES=10
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,video/mp4

# ==========================================
# External Services (Optional)
# ==========================================
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
VITE_INSTAGRAM_CLIENT_ID=
```

### Environment Variables Explanation

| Variable               | Required | Default | Description                      |
| ---------------------- | -------- | ------- | -------------------------------- |
| `VITE_API_URL`         | ✅       | -       | Backend API base URL             |
| `VITE_API_TIMEOUT`     | ❌       | 30000   | API request timeout (ms)         |
| `VITE_APP_URL`         | ✅       | -       | Frontend app URL                 |
| `VITE_ENABLE_DEVTOOLS` | ❌       | false   | Enable Redux DevTools            |
| `VITE_MAX_FILE_SIZE`   | ❌       | 5MB     | Maximum file upload size (bytes) |

---

## 🏃 Running the Project

### Development Mode

```bash
# Start dev server
npm run dev

# Start with custom port
npm run dev -- --port 3000

# Start with host expose
npm run dev -- --host
```

Application will run at: **http://localhost:5173**

### Production Build

```bash
# Build production
npm run build

# Build with bundle analysis
npm run build -- --mode analyze

# Preview production build
npm run preview
```

### Lint & Format

```bash
# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

---

## 📁 Project Structure

```
threads/
├── .github/                    # GitHub workflows & configs
├── .husky/                     # Git hooks
├── .vscode/                    # VS Code settings
├── public/                     # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/                 # Images, fonts, icons
│   │   ├── icons/
│   │   └── images/
│   ├── components/             # Reusable components
│   │   ├── ui/                # Shadcn UI components
│   │   │   ├── button.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   └── ...
│   │   ├── AuthenticatedMenu/ # Feature components
│   │   ├── BaseModal/
│   │   ├── CommentItem/
│   │   ├── FeedItem/
│   │   ├── Loading/
│   │   ├── PostComposer/
│   │   ├── Posts/
│   │   │   └── components/
│   │   │       ├── PostContent/
│   │   │       ├── PostHeader/
│   │   │       ├── PostInteractions/
│   │   │       └── QuoteModal/
│   │   ├── ReplyModal/
│   │   ├── ThreadComposer/
│   │   ├── ThreadLine/
│   │   ├── UserAvatar/
│   │   ├── UserProfileDialog/
│   │   └── ...
│   ├── constants/              # App constants
│   │   ├── index.js
│   │   ├── menu.js
│   │   └── routes.js
│   ├── features/               # Redux slices (feature-based)
│   │   ├── auth/
│   │   │   ├── authSlice.js
│   │   │   ├── hooks.js
│   │   │   └── selectors.js
│   │   ├── posts/
│   │   │   ├── postSlice.js
│   │   │   ├── hooks.js
│   │   │   └── selectors.js
│   │   ├── comments/
│   │   │   └── commentSlice.js
│   │   └── users/
│   │       └── userSlice.js
│   ├── hooks/                  # Custom hooks
│   │   ├── index.js
│   │   ├── useCopyPostUrl.js
│   │   ├── useFetchPostDetail.js
│   │   ├── useMenuSubmenu.js
│   │   ├── useNavigation.js
│   │   ├── usePostActions.js
│   │   └── usePostForm.js
│   ├── layouts/                # Layout components
│   │   ├── AuthLayout/
│   │   │   └── index.jsx
│   │   └── DefaultLayout/
│   │       ├── index.jsx
│   │       └── components/
│   │           ├── Header.jsx
│   │           └── Sidebar.jsx
│   ├── pages/                  # Page components
│   │   ├── Activity/
│   │   ├── Home/
│   │   │   └── components/
│   │   │       └── HomeTabs.jsx
│   │   ├── ItemDetail/
│   │   │   └── components/
│   │   │       └── CommentSection.jsx
│   │   ├── Login/
│   │   ├── Profile/
│   │   ├── Search/
│   │   └── NotFound/
│   ├── services/               # API services
│   │   ├── api.js             # Axios instance
│   │   ├── auth.js
│   │   ├── Posts.js
│   │   ├── comment.js
│   │   └── user.js
│   ├── store/                  # Redux store
│   │   ├── index.js
│   │   └── middleware/
│   │       └── errorHandler.js
│   ├── utils/                  # Utility functions
│   │   ├── cn.js              # Tailwind merge utility
│   │   ├── formatTime.js
│   │   ├── storage.js
│   │   └── validators.js
│   ├── App.jsx                # App component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── .env.example               # Environment variables template
├── .eslintrc.cjs             # ESLint config
├── .gitignore
├── .prettierrc               # Prettier config
├── commitlint.config.js      # Commitlint config
├── index.html
├── package.json
├── postcss.config.js         # PostCSS config
├── tailwind.config.js        # Tailwind config
├── vite.config.js            # Vite config
└── README.md
```

### 📂 Code Organization Rules

#### Components

- **UI components** (`components/ui/`): Reusable primitive components
- **Feature components** (`components/`): Business logic components
- **Page components** (`pages/`): Route-level components

#### Redux Features

```
features/
└── [feature-name]/
    ├── [feature]Slice.js    # Redux slice
    ├── hooks.js             # Custom hooks
    ├── selectors.js         # Memoized selectors
    └── index.js             # Public exports
```

#### Services

```
services/
├── api.js                   # Axios instance & interceptors
├── [resource].js            # Resource-specific APIs
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:8000/api
Production: https://api.threads-clone.com/api
```

### Authentication Headers

```http
Authorization: Bearer {access_token}
Content-Type: application/json
```

### Endpoints

#### 🔐 Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

**Example: Login**

```javascript
// Request
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "avatar": "https://...",
    "verified": false
  }
}
```

#### 📝 Posts

```http
GET    /posts                   # List posts
GET    /posts/:id               # Get post detail
POST   /posts                   # Create post
PUT    /posts/:id               # Update post
DELETE /posts/:id               # Delete post
POST   /posts/:id/like          # Like/Unlike post
POST   /posts/:id/repost        # Repost/Unrepost
POST   /posts/:id/quote         # Quote post
GET    /posts/:id/likes         # Get post likes
GET    /posts/:id/reposts       # Get post reposts
```

**Example: Create Post**

```javascript
// Request
POST /posts
{
  "content": "Hello World!",
  "media_urls": ["https://..."],
  "reply_permission": "everyone"
}

// Response
{
  "id": 123,
  "content": "Hello World!",
  "media_urls": ["https://..."],
  "user": {...},
  "created_at": "2025-12-08T10:00:00Z",
  "likes_count": 0,
  "replies_count": 0,
  "reposts_and_quotes_count": 0
}
```

#### 💬 Comments

```http
GET    /posts/:postId/comments  # List comments
POST   /posts/:postId/comments  # Create comment
GET    /comments/:id/replies    # Get comment replies
DELETE /comments/:id            # Delete comment
POST   /comments/:id/like       # Like/Unlike comment
```

#### 👤 Users

```http
GET    /users/:username         # Get user profile
PUT    /users/me                # Update own profile
POST   /users/:id/follow        # Follow/Unfollow user
GET    /users/:id/followers     # Get followers
GET    /users/:id/following     # Get following
GET    /users/:id/posts         # Get user posts
GET    /users/search            # Search users
```

#### 📊 Activity

```http
GET    /activities              # Get user activities/notifications
PUT    /activities/:id/read     # Mark as read
DELETE /activities/:id          # Delete notification
```

### Response Format

#### Success Response

```json
{
  "data": {...},
  "message": "Success",
  "status": 200
}
```

#### Error Response

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "status": 400
}
```

### HTTP Status Codes

| Code | Meaning                                  |
| ---- | ---------------------------------------- |
| 200  | OK - Request succeeded                   |
| 201  | Created - Resource created               |
| 204  | No Content - Successful deletion         |
| 400  | Bad Request - Invalid input              |
| 401  | Unauthorized - Authentication required   |
| 403  | Forbidden - Insufficient permissions     |
| 404  | Not Found - Resource not found           |
| 422  | Unprocessable Entity - Validation failed |
| 429  | Too Many Requests - Rate limit exceeded  |
| 500  | Internal Server Error                    |

---

## 🗂️ State Management

### Redux Store Structure

```javascript
{
  auth: {
    currentUser: {...},
    token: "...",
    loading: false,
    error: null
  },
  posts: {
    byId: {
      "1": {...},
      "2": {...}
    },
    items: ["1", "2"],
    loading: false,
    loadingById: {},
    pagination: {
      page: 1,
      hasMore: true
    }
  },
  comments: {
    byPostId: {
      "1": ["comment1", "comment2"]
    },
    loading: {},
    pagination: {}
  },
  users: {
    byId: {...},
    loading: false
  }
}
```

### Redux Toolkit Patterns

#### 1. Normalized State

```javascript
// ✅ Good - Normalized
const state = {
  byId: {
    "1": { id: "1", title: "Post 1", author: "user1" },
    "2": { id: "2", title: "Post 2", author: "user1" }
  },
  items: ["1", "2"]
};

// ❌ Bad - Nested arrays
const state = {
  posts: [
    { id: "1", title: "Post 1", author: {...} },
    { id: "2", title: "Post 2", author: {...} }
  ]
};
```

#### 2. Optimistic Updates

```javascript
// Create post with optimistic UI
const idFake = `temp-${uuidv4()}`;

dispatch(createPost.pending({ content, idFake, user }));
// → UI shows fake post immediately

try {
  const realPost = await api.createPost({ content });
  dispatch(createPost.fulfilled({ idFake, realPost }));
  // → Replace fake post with real one
} catch (error) {
  dispatch(createPost.rejected({ idFake }));
  // → Remove fake post
}
```

#### 3. Selectors with Reselect

```javascript
import { createSelector } from "@reduxjs/toolkit";

// Memoized selector
export const selectPostsWithUsers = createSelector(
  [(state) => state.posts.byId, (state) => state.users.byId],
  (posts, users) => {
    return Object.values(posts).map((post) => ({
      ...post,
      user: users[post.userId],
    }));
  },
);
```

---

## 🧭 Routing

### Route Structure

```javascript
// src/App.jsx
const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/@:username", element: <Profile /> },
      { path: "/@:username/post/:postId", element: <ItemDetail /> },
      { path: "/search", element: <Search /> },
      { path: "/activity", element: <Activity /> },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
```

### Protected Routes

```javascript
function ProtectedRoute({ children }) {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Route Params & Query

```javascript
// URL: /@johndoe/post/123?comment=456
const { username, postId } = useParams();
const [searchParams] = useSearchParams();
const commentId = searchParams.get("comment");
```

---

## 🎨 Component Library

### Shadcn UI Components

The project uses [Shadcn UI](https://ui.shadcn.com/) - a dependency-free component library that you can copy-paste into your project.

#### Install new component

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
```

#### Custom components

```javascript
// components/ui/button.jsx
import { cn } from "@/utils/cn";

const Button = ({ className, variant, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        {
          "bg-primary text-white": variant === "default",
          "bg-red-500 text-white": variant === "destructive",
        },
        className,
      )}
      {...props}
    />
  );
};
```

### Tailwind Utilities

```javascript
// utils/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Structure

```javascript
// components/Button.test.jsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build
npm run build

# Output folder: dist/
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Netlify Deployment

**netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker Deployment

**Dockerfile**

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build & Run**

```bash
docker build -t threads-clone .
docker run -p 8080:80 threads-clone
```

---

## 📚 Best Practices

### Code Style

#### 1. Component Structure

```javascript
// ✅ Good
function PostItem({ post }) {
  // 1. Hooks
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // 2. Event handlers
  const handleClick = () => {
    setIsOpen(true);
  };

  // 3. Render helpers
  const renderContent = () => {
    return <div>{post.content}</div>;
  };

  // 4. Return JSX
  return <div onClick={handleClick}>{renderContent()}</div>;
}
```

#### 2. Naming Conventions

```javascript
// Components: PascalCase
function UserProfile() {}

// Hooks: useCamelCase
function useAuth() {}

// Constants: UPPER_SNAKE_CASE
const API_URL = "...";

// Functions: camelCase
function handleSubmit() {}

// Boolean props: is/has prefix
<Button isLoading hasIcon />;
```

#### 3. Props Destructuring

```javascript
// ✅ Good
function Button({ children, onClick, variant = "default" }) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Bad
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### Performance Optimization

#### 1. Memoization

```javascript
// Memo component
const PostItem = memo(({ post }) => {
  return <div>{post.content}</div>;
});

// useMemo for expensive calculations
const sortedPosts = useMemo(() => {
  return posts.sort((a, b) => b.created_at - a.created_at);
}, [posts]);

// useCallback for event handlers
const handleClick = useCallback(() => {
  dispatch(likePost(postId));
}, [dispatch, postId]);
```

#### 2. Code Splitting

```javascript
// Lazy load pages
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));

// With Suspense
<Suspense fallback={<Loading />}>
  <Profile />
</Suspense>;
```

#### 3. Debounce/Throttle

```javascript
import { debounce } from "lodash";

const handleSearch = debounce((query) => {
  dispatch(searchUsers(query));
}, 300);
```

### Security Best Practices

#### 1. XSS Prevention

```javascript
// ✅ React auto-escapes by default
<div>{userInput}</div>

// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Sanitize if needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

#### 2. Token Storage

```javascript
// ✅ Store in memory or httpOnly cookies
const [token, setToken] = useState(null);

// ❌ Don't store in localStorage for sensitive data
localStorage.setItem("token", token); // Vulnerable to XSS
```

#### 3. Input Validation

```javascript
// Client-side validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Validate before submit
const result = schema.safeParse(formData);
if (!result.success) {
  // Show errors
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Vite won't start

**Symptoms**: `Error: Cannot find module 'vite'`

**Solution**:

```bash
# Remove node_modules and cache
rm -rf node_modules package-lock.json
rm -rf .vite

# Reinstall dependencies
npm install

# Restart
npm run dev
```

#### 2. Tailwind not working

**Symptoms**: Classes have no effect

**Solution**:

```javascript
// Check tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure path is correct
  ],
  // ...
}

// Restart dev server
npm run dev
```

#### 3. Redux state not updating

**Symptoms**: UI doesn't re-render after dispatch

**Solution**:

```javascript
// ✅ Always return new state
reducers: {
  addPost: (state, action) => {
    state.items.push(action.payload); // ✅ Immer handles this
  };
}

// ❌ Don't mutate directly in non-Immer code
const newState = state;
newState.items.push(action.payload); // ❌ Bad
```

#### 4. API calls failing

**Symptoms**: 401/403 errors

**Solution**:

```javascript
// Check token in request
console.log(axios.defaults.headers.common["Authorization"]);

// Verify token not expired
const decoded = jwtDecode(token);
console.log("Expires:", new Date(decoded.exp * 1000));

// Check CORS
// Backend must allow origin: http://localhost:5173
```

#### 5. Infinite re-renders

**Symptoms**: Browser hangs, "Maximum update depth exceeded"

**Solution**:

```javascript
// ❌ Bad - creates new function every render
<Button onClick={() => handleClick()} />;

// ✅ Good
const handleClick = useCallback(() => {
  // ...
}, [deps]);

<Button onClick={handleClick} />;

// ❌ Bad - useEffect without deps
useEffect(() => {
  setState(newValue); // Infinite loop
});

// ✅ Good
useEffect(() => {
  setState(newValue);
}, [dependency]);
```

### Debug Tools

#### Redux DevTools

```javascript
// store/index.js
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
```

#### React DevTools

- Install browser extension
- Inspect component tree
- View props, state, hooks

#### Network Inspector

```javascript
// Log all axios requests
axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});
```

---

## 🤝 Contributing

We welcome all contributions! Please read the guidelines before submitting a PR.

### Development Workflow

```bash
# 1. Fork repository
# 2. Clone fork
git clone https://github.com/YOUR_USERNAME/threads.git

# 3. Create branch
git checkout -b feature/amazing-feature

# 4. Make changes & commit
git commit -m "feat: add amazing feature"

# 5. Push to fork
git push origin feature/amazing-feature

# 6. Create Pull Request
```

### Commit Convention

Using [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Add tests
- `chore`: Build/tooling changes

**Examples**:

```bash
feat(auth): add OAuth login
fix(posts): resolve infinite scroll bug
docs: update API documentation
refactor(components): simplify Button component
```

### Pull Request Guidelines

- ✅ Update documentation if needed
- ✅ Add tests for new features
- ✅ Ensure all tests pass
- ✅ Follow code style guidelines
- ✅ Keep PR focused on single feature/fix
- ✅ Write clear PR description

### Code Review Process

1. Automated checks run (lint, test, build)
2. Maintainer reviews code
3. Address feedback
4. PR merged to main

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors

- **Your Name** - _Initial work_ - [@username](https://github.com/username)

See the list of [contributors](https://github.com/username/threads/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official Redux toolset
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- Meta Threads - Design inspiration

---

## 📞 Support

If you encounter issues or have questions:

- 📧 Email: support@threads-clone.com
- 💬 Discord: [Join our server](https://discord.gg/...)
- 🐛 Issues: [GitHub Issues](https://github.com/username/threads/issues)
- 📖 Docs: [Documentation](https://docs.threads-clone.com)

---

## 🗺️ Roadmap

### Version 1.1 (Q1 2025)

- [ ] Direct Messages (DMs)
- [ ] Voice/Video posts
- [ ] Advanced search filters
- [ ] Bookmarks organization

### Version 1.2 (Q2 2025)

- [ ] Stories feature
- [ ] Live streaming
- [ ] Polls
- [ ] Scheduled posts

### Version 2.0 (Q3 2025)

- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] AI-powered content moderation
- [ ] Analytics dashboard

---

<div align="center">

**⭐ Star us on GitHub — it motivates us a lot!**

Made with ❤️ by [Your Name](https://github.com/username)

[⬆ Back to top](#-threads-clone)

</div>
