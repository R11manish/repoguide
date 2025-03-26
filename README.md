# RepoGuide

RepoGuide is a modern web application built with Next.js that helps users analyze and understand their code repositories. The project features a beautiful and responsive user interface powered by Tailwind CSS and various UI components from Radix UI.

## Features

- Modern and responsive UI with Tailwind CSS
- Rich set of UI components from Radix UI
- Type-safe development with TypeScript
- AI-powered analysis capabilities
- Dark mode support
- Interactive data visualization with Recharts
- Form handling with React Hook Form and Zod validation
- Markdown rendering support
- Toast notifications with Sonner
- Command palette functionality with CMDK

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Hooks
- **AI Integration**: OpenAI SDK
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Date Handling**: date-fns
- **Markdown**: react-markdown

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/repoguide.git
cd repoguide
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
repoguide/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── analyze/           # Analysis pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── styles/               # Additional styles
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
