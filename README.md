# Fast Snacks On Chain

A blockchain-powered snack ordering platform built on the Stellar network. Fast Snacks On Chain brings the convenience of online food ordering to Web3, offering curated snack packages with transparent pricing and secure cryptocurrency payments.

## Overview

Fast Snacks On Chain is a modern e-commerce platform that bridges traditional food delivery with blockchain technology. Users can browse and purchase curated snack packages across three categories (Budget, Middle, Bulk), pay with Stellar (XLM), and enjoy a seamless ordering experience.

## Features

- **Curated Snack Packages**: 9 carefully selected packages across 3 categories
  - Budget Packages (100-300 XLM)
  - Middle Packages (400-800 XLM)
  - Bulk Packages (5000-15000 XLM)

- **Shopping Cart**: Full-featured cart with quantity controls and real-time price updates

- **Category Filtering**: Browse products by category with intuitive navigation

- **Responsive Design**: Mobile-first design that works seamlessly on all devices

- **Modern UI**: Built with FastBuka design system (primary green #0faf62, secondary orange #ed1d24)

- **Type-Safe**: Full TypeScript implementation for better developer experience

## Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v3** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router v7** - Client-side routing
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

## Prerequisites

- Node.js 18+
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fast-snacks-on-chain
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
fast-snacks-on-chain/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   │   ├── Cart.tsx         # Shopping cart sidebar
│   │   ├── Checkout.tsx     # Checkout component
│   │   ├── ProductCard.tsx  # Product display card
│   │   └── WalletConnect.tsx # Wallet connection (placeholder)
│   ├── constants/
│   │   └── products.ts      # Product catalog data
│   ├── hooks/
│   │   └── useCart.ts       # Zustand cart store
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── Category.tsx     # Category filtering page
│   │   ├── CartPage.tsx     # Full cart view
│   │   └── OrderConfirm.tsx # Order confirmation
│   ├── styles/
│   │   └── globals.css      # Global styles & Tailwind directives
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Application entry point
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Design System

The project follows the FastBuka design system:

- **Primary Color**: Green (#0faf62) - Used for CTAs, primary actions
- **Secondary Color**: Orange (#ed1d24) - Used for accents, highlights
- **Accent Color**: Light Green (#f0fdf4) - Used for backgrounds
- **Typography**: Inter font family
- **Border Radius**: Rounded-full for buttons (following FastBuka style)

## Component Architecture

The project uses a **reusable component architecture** to maintain clean, maintainable code:

- **UI Components**: Base components (Button, Card, Input) with variants
- **Layout Components**: Consistent header and footer across pages
- **Feature Components**: Product cards, cart, checkout with isolated logic
- **Pages**: Composed from reusable components

## Future Features

- **Stellar Wallet Integration**: Connect with Freighter, Albedo, and other Stellar wallets
- **Smart Contract Integration**: On-chain order processing and payment verification
- **Order Tracking**: Real-time order status updates
- **User Profiles**: Save addresses and order history
- **Payment Processing**: Complete Stellar payment flow
- **Delivery Integration**: Real-time delivery tracking

## Development Notes

- All icons use **lucide-react** (no emoji icons)
- Components follow **TypeScript strict mode**
- Styling uses **Tailwind utility classes**
- State management via **Zustand** for simplicity
- Built with **reusability** and **maintainability** in mind

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of a hackathon submission for Stellar blockchain integration.

---

Built with ❤️ for the Stellar ecosystem
