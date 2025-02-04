# Blog App Next.js

A modern blog application built with [Next.js 13](https://nextjs.org/) using the new App Router and [Tailwind CSS](https://tailwindcss.com/). This project demonstrates a full-featured blog platform with server-side API routes, dynamic routing, CRUD operations, pagination, search functionality, and a polished, animated UI inspired by professional blogging platforms.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations:**  
  Create, read, update, and delete blog posts via API routes and dynamic pages.

- **Search and Pagination:**  
  Filter posts by title and navigate through pages with a responsive, intuitive interface.

- **Modern UI & Animations:**  
  A professional color palette with subtle hover effects and smooth fade-in animations powered by Tailwind CSS.

- **Next.js App Router & API Routes:**  
  Leverages the latest Next.js 13 features for a clean file-based routing system and serverless API endpoints.

- **Responsive Design:**  
  Designed to work seamlessly on desktops, tablets, and mobile devices.

## Screenshots

![Blog Home Page](https://github.com/user-attachments/assets/9cecbb30-81c5-42d9-8ff4-d4081e641a6c)

![Create Blog](https://github.com/user-attachments/assets/cfefa60d-4548-43d7-973f-ca1fa882c3cd)

![View Blog](https://github.com/user-attachments/assets/72fb778d-befd-4625-b995-afca0f014598)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/blog-app-next-js.git
   cd blog-app-next-js
   ```

````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment (Optional):**
   Create a `.env.local` file in the project root if you need to override any API URLs or environment variables. For example:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000/blog](http://localhost:3000/blog) to start using the blog app.

## Usage

- **Homepage:**
  View a list of blog posts, search by title, and use pagination controls to navigate between pages.

- **Create Blog Post:**
  Click the "Create Blog" button to navigate to a form for adding a new post.

- **View & Manage Post:**
  Click on a blog post to view its details. Use the update form to edit the post or open a confirmation modal to delete it.

- **Animations & UI:**
  Enjoy smooth transitions and modern styling throughout the app.

## Project Structure

```plaintext
blog-app-next-js
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ tailwind.config.ts          # Tailwind CSS configuration with custom theme and animations
├─ next.config.ts              # Next.js configuration
├─ public                      # Public static assets (images, icons, screenshots, etc.)
│  ├─ file.svg
│  └─ ...
├─ src
│  ├─ app
│  │  ├─ layout.tsx           # Global layout for all pages
│  │  ├─ globals.css          # Global styles
│  │  └─ page.tsx             # Landing page (redirect or welcome screen)
│  │
│  └─ app
│     └─ blog                # Blog routes
│        ├─ page.tsx         # Blog homepage (list posts, search, pagination)
│        ├─ create
│        │  └─ page.tsx      # Create new blog post page
│        └─ posts
│           └─ [id]
│              └─ page.tsx   # Dynamic route for viewing/updating/deleting a post
│
├─ src
│  └─ app
│     └─ api
│        ├─ posts
│        │  └─ route.ts     # API endpoint for GET (list/search/pagination) and POST (create)
│        └─ posts
│           └─ [id]
│              └─ route.ts   # API endpoint for GET, PUT, DELETE for individual posts
│
└─ src
   └─ components
      ├─ PostCard.tsx        # Reusable card component for displaying blog post summary
      └─ Modal.tsx           # Reusable modal component for confirmations
```

## Contributing

Contributions are welcome! If you have ideas, improvements, or bug fixes, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Please ensure your code follows our existing style guidelines and includes appropriate tests (if applicable).

## License

This project is licensed under the [MIT License](LICENSE).

---

_Happy coding and enjoy building with Next.js and Tailwind CSS!_

```
````
