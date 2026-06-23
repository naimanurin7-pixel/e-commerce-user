# LumiCart - Modern E-Commerce Web Application

LumiCart is a fully functional, responsive E-Commerce Web Application built with modern React architecture. It features a sleek, user-friendly interface for browsing products, managing a shopping cart, and simulating a checkout process.

## Features

- **Modern UI/UX**: Clean, mobile-first design built with Tailwind CSS.
- **Product Browsing**: Fetches products from the Fake Store API. Includes search, category filtering, and sorting.
- **Shopping Cart**: Add/remove items, update quantities, and auto-calculate totals.
- **Checkout Simulation**: Shipping form with validation and order summary.
- **Authentication (UI Only)**: Mock user session management (login, register, logout) persisted in `localStorage`.
- **Protected Routes**: Checkout and Admin Dashboard are protected.
- **State Management**: Robust state handling with Redux Toolkit.
- **Persistence**: Cart and Auth states survive page reloads.

## Tech Stack

- **Frontend Framework**: React.js (Vite)
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Icons**: Lucide React
- **Testing**: Vitest & React Testing Library

## Folder Structure

```
src/
├── app/                  # Redux store configuration
├── components/           # Reusable UI components (Navbar, ProductCard, etc.)
├── features/             # Redux slices (auth, cart, products)
├── pages/                # Route-level components (Home, Products, Checkout)
├── routes/               # Application routing configuration
├── setupTests.js         # Testing setup
├── App.jsx               # Main App component
└── main.jsx              # React entry point
```

## Installation & Setup

1. **Clone or Download the Repository**
2. **Navigate to the Project Directory**:
   ```bash
   cd e-commerce
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open in Browser**: The application will typically be available at `http://localhost:5173`.

## Environment Variables
No specific environment variables are required as this project relies on a public mock API (`https://fakestoreapi.com`).

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally previews the production build.
- `npm test`: Runs the Vitest test suite.

## Testing
The application includes unit tests for Redux slices using Vitest. To run tests:
```bash
npm test
```

## Deployment Steps

This project is built with Vite and is optimized for deployment on platforms like Vercel or Netlify.

### Vercel Deployment
1. Push your code to a Git repository (GitHub/GitLab/Bitbucket).
2. Go to Vercel and import the repository.
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Click **Deploy**.

### Netlify Deployment
1. Connect your repository to Netlify.
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. Click **Deploy Site**.

Ensure you configure rewrite rules for React Router if needed, though Vite and Vercel/Netlify handle typical SPA routing seamlessly by redirecting all traffic to `index.html`.
