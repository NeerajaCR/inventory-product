# Smart Product Grid Monorepo

A production-quality product management system featuring a Web app (React + Vite) and a Mobile app (React Native CLI) powered by a shared core logic package.

## Features

- **Product Grid/List**: Responsive display of products with title, price, category, and rating.
- **Advanced Filtering**: Search by title and filter by category.
- **Dynamic Sorting**: Sort products by price or rating.
- **Optimistic UI Updates**: Category changes reflect immediately with background sync and automatic rollback on failure.
- **Undo/Redo History**: Reliable state management for category changes.
- **Simulated Real-world API**: Handles network delays and random failures gracefully.
- **Periodic Data Sync**: Automatically updates prices and ratings every 10-15 seconds without overwriting local manual changes.

## Architecture Decisions

### Monorepo with Turborepo
Used Turborepo to manage the monorepo structure efficiently. This allows for shared dependencies, high-performance builds, and a clear separation of concerns.

### Shared Core Logic (`packages/shared`)
Centralizing business logic ensuring consistency across both platforms:
- **Zustand**: Lightweight state management for global app state and history.
- **TanStack React Query**: Efficient API caching and data fetching.
- **Axios**: Robust HTTP client for API interactions.

### Performance Optimizations
- **React.memo**: Prevents unnecessary re-renders of product items.
- **useMemo/useCallback**: Optimized derived state and stable event handlers.
- **FlatList**: Native-grade list performance on mobile.
- **Optimistic Updates**: Zero-latency UI feedback for user actions.

## Tech Stack

- **Web**: React 18, Vite, Tailwind CSS, Lucide React.
- **Mobile**: React Native (CLI), Lucide React Native.
- **Shared**: TypeScript, Zustand, React Query, Axios, Lodash.

## Setup Instructions

### Running the Apps
- **Web**: `npm run dev`
- **Mobile**:
  - `cd apps/mobile`
  - Android: `npm run android`
  - iOS: `npm run ios` (Requires Mac and CocoaPods)

## Tradeoffs & Considerations
- **React 18 vs 19**: Used React 18 for the web app to ensure compatibility with `lucide-react` and other standard libraries in the current ecosystem.
- **Simulated Failures**: Added a 20% random failure rate to product updates to demonstrate robust error handling and optimistic UI rollbacks.
