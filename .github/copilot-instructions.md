# Vite + React + TypeScript Project

This is a modern React development environment using Vite, React 18, and TypeScript.

## Project Overview
- **Build Tool**: Vite (fast, modern bundler)
- **Framework**: React 18
- **Language**: TypeScript
- **Dev Server**: Vite dev server with HMR

## Quick Start

### Development
```bash
npm run dev
```
Starts the development server on http://localhost:5173

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` directory

### Preview
```bash
npm run preview
```
Preview the production build locally

## Project Structure
```
src/
├── App.tsx           # Main App component
├── App.css          # App styles
├── main.tsx         # Entry point
└── vite-env.d.ts    # Vite environment types
public/             # Static assets
index.html         # HTML entry point
vite.config.ts     # Vite configuration
tsconfig.json      # TypeScript configuration
```

## Key Features
- ⚡ Instant HMR (Hot Module Replacement) with Vite
- 🎯 Full TypeScript support
- 📦 Optimized production builds
- 🚀 Fast development experience

## Customization
- Edit `vite.config.ts` to customize Vite settings
- Update `tsconfig.json` for TypeScript options
- Modify `src/App.tsx` to start building your app

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run code linting (if configured)
