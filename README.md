<a href="https://next-mobbin-clone.vercel.app">
  <img alt="next mobbin clone" src="public/ui of todo app.PNG">
  <h1 align="center">Todo App</h1>
</a>


<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a> ·
  <a href="#credits"><strong>Credits</strong></a>
</p>
<br/>

## Introduction

This project has been undertaken with the goal of enhancing my skills in user interface (UI) development and putting the cutting-edge features of shadcn-ui to the test. 
<br/>


<!-- > [!NOTE]  
> This project contains UI Only - Just for testing shadcn's components. -->

## Installation

Clone & create this repo locally with the following command:

```bash
npx create-next-app my-name-project --example "https://github.com/Sohail-crypto-collab/Assignment-no-2-Todo-App"
```

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Start the development server:

```sh
pnpm dev
```


## Tech Stack + Features

https://github.com/user-attachments/assets/e0e171d2-4388-4596-a09f-ad92b4a4f1e3

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git

### Core Features:

- Task management (add, edit, delete, complete/incomplete)
- Rich task data (title, description, due date, priority, category)
- Local storage persistence
- Sorting and filtering capabilities
- Search functionality
- Dark/light theme support

### Technical Implementation:

- Next.js 13 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for UI components
- Local storage for data persistence
- Form validation with Zod
- Responsive design for all screen sizes

### Components:

- TaskForm: Handles task creation and editing
- TaskList: Displays tasks with sorting and filtering
- TaskFilters: Provides filtering options
- ThemeProvider: Manages dark/light theme
- Priority levels (high/medium/low) with color coding
- Categories (work, personal, shopping, health, other)
- Due date selection with calendar
- Search and filter functionality
- Overdue task indicators
- Task completion tracking
- Delete confirmation dialog
- Theme toggle (dark/light)
- Responsive layout
- Smooth animations and transitions


- [shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience

### Hooks and Utilities

- [React Hook Form](https://react-hook-form.com/) – Flexible and extensible forms with easy-to-use validation
- [Zod](https://zod.dev/) – TypeScript-first schema validation with static type inference
- [date-fns](https://date-fns.org/) – Modern JavaScript date utility library
====== 
ThemeProvider: Manages dark/light theme
SearchBar: Provides search functionality
TaskItem: Represents a single task with actions


### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript




