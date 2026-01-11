<p align="center">
  <img src="https://ui-avatars.com/api/?name=Ledgerly&background=5B86E5&color=fff&size=128&rounded=true" alt="Ledgerly Logo" />
</p>

<h1 align="center">💰 Ledgerly</h1>

<p align="center">
  <strong>A modern, soft-UI personal finance dashboard built with React 19, TypeScript, and Tailwind CSS</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## 📖 Overview

**Ledgerly** is a comprehensive personal finance tracking application that helps users manage their money, track expenses, set budgets, and achieve financial goals. Built with modern web technologies, it features a beautiful soft-UI design with dark/light theme support, responsive layouts, and intuitive interactions.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Overview of net worth, income/expenses, and recent transactions with interactive charts |
| 💳 **Transaction Management** | Add, edit, delete, and search transactions with category filtering |
| 💰 **Budget Tracking** | Create and monitor category-based budgets with visual progress indicators |
| 🎯 **Financial Goals** | Set savings goals with target amounts and deadlines |
| 📈 **Reports & Analytics** | Monthly trend charts, spending breakdowns, and export functionality |
| 🔄 **Subscription Tracking** | Monitor recurring expenses and subscription costs |
| 🌓 **Dark/Light Mode** | System-aware theme with manual toggle and persistence |
| 📱 **Responsive Design** | Mobile-first approach with optimized layouts for all screen sizes |
| 📄 **Export Options** | Download transaction data as CSV or PDF reports |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ledgerly.git
cd ledgerly

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI component library |
| **TypeScript** | 5.8.x | Static type checking |
| **Vite** | 6.2.x | Build tool and development server |
| **Tailwind CSS** | 3.x (CDN) | Utility-first styling |

### Key Libraries

| Library | Purpose |
|---------|---------|
| **Recharts** | Interactive charts and data visualization |
| **Lucide React** | Beautiful, consistent iconography |
| **React Router DOM** | Client-side routing |
| **jsPDF** | PDF generation for reports |
| **jspdf-autotable** | Tabular data in PDF exports |

---

## 📁 Project Structure

```
ledgerly/
├── 📄 index.html          # Entry HTML with Tailwind config
├── 📄 index.tsx           # React entry point
├── 📄 App.tsx             # Root component with routing logic
├── 📄 types.ts            # TypeScript interfaces & types
├── 📄 constants.ts        # Mock data seeds (users, transactions, budgets)
├── 📄 utils.ts            # Helper functions (formatters, chart data, exports)
├── 📄 vite.config.ts      # Vite configuration
├── 📄 tsconfig.json       # TypeScript configuration
│
├── 📂 components/
│   ├── 📂 ui/             # Reusable UI components
│   │   ├── Badge.tsx      # Status badges
│   │   ├── Button.tsx     # Styled buttons
│   │   ├── Card.tsx       # Card container
│   │   ├── DateRangePicker.tsx  # Date selection
│   │   └── Toast.tsx      # Notification toasts
│   │
│   ├── 📂 layout/
│   │   └── Sidebar.tsx    # Main navigation sidebar
│   │
│   ├── 📂 modals/
│   │   ├── AddMoneyModal.tsx       # Add funds to goals
│   │   ├── AddTransactionModal.tsx # Create/edit transactions
│   │   ├── BudgetDetailsModal.tsx  # Budget breakdown
│   │   ├── CreateBudgetModal.tsx   # New budget form
│   │   ├── CreateGoalModal.tsx     # New goal form
│   │   └── LinkAccountModal.tsx    # Connect bank accounts
│   │
│   ├── 📂 charts/
│   │   └── SpendingChart.tsx       # Income/expense bar charts
│   │
│   ├── 📂 data/
│   │   └── TransactionList.tsx     # Transaction table component
│   │
│   ├── 📂 widgets/
│   │   └── CalendarWidget.tsx      # Mini calendar view
│   │
│   └── StubOCR.tsx        # Receipt scanning placeholder
│
├── 📂 pages/
│   ├── Dashboard.tsx      # Main dashboard view
│   ├── TransactionsPage.tsx   # Transaction management
│   ├── BudgetsPage.tsx    # Budget overview & creation
│   ├── GoalsPage.tsx      # Financial goals tracker
│   ├── ReportsPage.tsx    # Analytics & exports
│   ├── SettingsPage.tsx   # User preferences
│   ├── SubscriptionsPage.tsx  # Recurring expenses
│   ├── LoginPage.tsx      # User authentication
│   ├── RegisterPage.tsx   # Account creation
│   ├── LandingPage.tsx    # Public homepage
│   ├── PublicPages.tsx    # Pricing, About, Blog, etc.
│   ├── PrivacyPolicy.tsx  # Privacy policy page
│   └── TermsOfService.tsx # Terms of service page
│
└── 📂 contexts/
    └── DataContext.tsx    # Global state management
```

---

## 🏗️ Architecture

### State Management

Ledgerly uses **React Context API** with `DataContext` providing centralized state for:

```typescript
interface DataContextType {
  // Data
  user: User;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  categories: string[];
  metrics: Metric[];
  
  // Auth
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  
  // CRUD Operations
  addTransaction, editTransaction, deleteTransaction,
  addAccount, editAccount, deleteAccount,
  addBudget, editBudget, deleteBudget,
  addGoal, editGoal, updateGoal, deleteGoal,
  addCategory, deleteCategory,
  updateUser, resetData
}
```

### Data Persistence

All data is persisted to **localStorage** with the following keys:

| Key | Data |
|-----|------|
| `ledgerly_token` | Authentication token |
| `ledgerly_theme` | Theme preference (dark/light) |
| `ledgerly_user` | User profile |
| `ledgerly_accounts` | Linked financial accounts |
| `ledgerly_transactions` | Transaction history |
| `ledgerly_budgets` | Budget configurations |
| `ledgerly_goals` | Financial goals |
| `ledgerly_categories` | Custom categories |

### Type Definitions

```typescript
// Core Types
type AccountType = 'bank' | 'cash' | 'credit' | 'investment';
type TransactionType = 'income' | 'expense' | 'transfer';
type PageRoute = 'dashboard' | 'transactions' | 'budgets' | 'goals' | 'reports' | 'settings' | 'subscriptions';

interface User {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatarUrl?: string;
}

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  accountId: string;
  status: 'pending' | 'posted';
  type: TransactionType;
  isRecurring?: boolean;
  recurringPeriod?: 'monthly' | 'yearly';
}

interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  period: 'monthly' | 'yearly';
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  color: string;
}
```

---

## 🎨 Design System

### Color Palette

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| **Primary** | `#5B86E5` | `#5B86E5` | Buttons, links, highlights |
| **Background** | `#F7F9FB` | `#0F1724` | Page background |
| **Card** | `#FFFFFF` | `#1E293B` | Card backgrounds |
| **Text Primary** | `#0F172A` | `#F1F5F9` | Headings, body text |
| **Text Secondary** | `#64748B` | `#94A3B8` | Labels, hints |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Numeric Display**: `tabular-nums` for aligned numbers

### Shadows

```css
/* Soft shadow for cards */
box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);

/* Glow effect for primary elements */
box-shadow: 0 0 15px rgba(91, 134, 229, 0.3);
```

---

## 🌐 Routing Structure

### Public Routes (Unauthenticated)

| Route State | Page |
|-------------|------|
| `landing` | Homepage with hero & features |
| `login` | User sign-in form |
| `register` | Account creation form |
| `pricing` | Pricing plans |
| `about` | About the company |
| `blog` | Blog listing |
| `contact` | Contact form |
| `privacy` | Privacy policy |
| `tos` | Terms of service |
| `roadmap` | Product roadmap |

### Protected Routes (Authenticated)

| Route | Page | Description |
|-------|------|-------------|
| `dashboard` | Dashboard | Financial overview |
| `transactions` | Transactions | Transaction list & management |
| `budgets` | Budgets | Budget tracking |
| `goals` | Goals | Savings goals |
| `reports` | Reports | Analytics & exports |
| `subscriptions` | Subscriptions | Recurring expenses |
| `settings` | Settings | User preferences |

---

## 📊 Utility Functions

### Currency Formatting

```typescript
formatCurrency(1234.56, 'USD');  // → $1,234.56
formatCurrency(1000000, 'IDR');  // → Rp 1.000.000
```

Supports: USD, EUR, GBP, IDR, JPY, SGD, AUD

### Date Formatting

```typescript
formatDate('2024-01-15');  // → Jan 15, 2024
```

### Chart Data Generation

```typescript
// Get daily income/expense data for last N days
getChartData(transactions, 7);

// Get monthly trend data for last 6 months
getMonthlyTrendData(transactions);
```

### Export Functions

```typescript
// Export transactions to CSV
exportToCSV(transactions, 'my_transactions.csv');

// Export transactions to PDF
exportToPDF(transactions, 'Monthly Report');
```

---

## 🔌 API Contracts (Stub)

The backend is currently mocked with localStorage. For a real implementation, use the following API contracts:

### Authentication

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "..."
}
```

Response:
```json
{
  "token": "jwt_string",
  "user": { "id": "u1", "name": "Alex", "email": "..." }
}
```

### Transactions

```http
GET /api/v1/transactions?limit=20&offset=0&type=expense&search=coffee
```

Response:
```json
{
  "data": [
    {
      "id": "t1",
      "amount": -150.00,
      "merchant": "Target",
      "date": "2024-01-25"
    }
  ],
  "meta": { "total": 120 }
}
```

### OCR Parsing

```http
POST /api/v1/ocr/scan
Content-Type: multipart/form-data

file: <receipt_image>
```

Response:
```json
{
  "merchant": "Starbucks",
  "amount": 12.45,
  "confidence": 0.98
}
```

---

## ♿ Accessibility

- **Semantic HTML**: Uses `<main>`, `<aside>`, `<nav>`, `<section>` appropriately
- **Tabular Numbers**: All monetary values use `font-variant-numeric: tabular-nums`
- **Color Contrast**: Meets WCAG AA standards
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Visible focus states for accessibility

---

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| **Mobile** (< 768px) | Single column, bottom FAB, hamburger menu |
| **Desktop** (≥ 768px) | Sidebar navigation, multi-column grids |

### Mobile Features

- Floating Action Button (FAB) for quick transaction entry
- Slide-in mobile menu
- Touch-optimized interactions

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for optional API integration:

```env
GEMINI_API_KEY=your_api_key_here  # For OCR features
```

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',  // Accessible on network
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
```

---

## 🧪 Demo Data

The application ships with realistic mock data including:

- **User**: Alex Sterling with USD currency
- **4 Accounts**: Chase Sapphire (Credit), Checking, Savings, Wallet
- **14 Transactions**: Mix of income, expenses, and transfers over the past month
- **3 Budgets**: Food & Dining, Entertainment, Shopping
- **2 Goals**: Emergency Fund, New Laptop
- **8 Categories**: Food, Transportation, Housing, Entertainment, Shopping, Utilities, Income, Transfer

To reset to demo data, use the "Reset Data" option in Settings.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Made with ❤️ by the Ledgerly Team
</p>
