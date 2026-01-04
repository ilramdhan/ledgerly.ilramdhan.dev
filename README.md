# Ledgerly - Financial Tracking Application

A modern, soft-UI financial dashboard built with React, TypeScript, and Tailwind CSS.

## Getting Started

1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev`
3. **Build for Production**: `npm run build`

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, clsx (for conditional classes)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animation**: CSS animations (animate-in)

## Project Structure

- `/components`: Reusable UI atoms and domain-specific widgets.
- `/pages`: Route views (Dashboard, Transactions).
- `/utils`: Formatters and helpers.
- `types.ts`: Global TypeScript interfaces.
- `constants.ts`: Mock data seeds.

## API Contracts (Stub)

The backend is currently mocked in `constants.ts`. For a real implementation, adhere to the following contracts:

### Authentication
`POST /api/v1/auth/login`
- Request: `{ "email": "user@example.com", "password": "..." }`
- Response: `{ "token": "jwt_string", "user": { ... } }`

### Transactions
`GET /api/v1/transactions`
- Query Params: `limit`, `offset`, `search`, `type`
- Response: 
```json
{
  "data": [
    {
      "id": "t1",
      "amount": -150.00,
      "merchant": "Target",
      "date": "2023-10-25"
    }
  ],
  "meta": { "total": 120 }
}
```

### OCR Parsing
`POST /api/v1/ocr/scan`
- Body: Multipart Form Data (Image)
- Response: `{ "merchant": "Starbucks", "amount": 12.45, "confidence": 0.98 }`

## Accessibility Notes

- All numeric data uses `tabular-nums` for alignment.
- Semantic HTML tags (`<main>`, `<aside>`, `<nav>`) are used.
- Colors pass WCAG AA contrast standards for text.
