# Multi-Language Compiler Deployment Guide

This guide explains how to deploy the JavaScript and SQL compiler backend endpoints to Firebase Cloud Functions.

## Prerequisites

1. Firebase CLI installed: `npm install -g firebase-tools`
2. Firebase project configured (already done: zest-academy)
3. Node.js 18+ installed

## Deployment Steps

### 1. Install Dependencies

```bash
cd functions
npm install
```

### 2. Build Functions

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `lib/` directory.

### 3. Deploy Functions

Deploy all functions:
```bash
firebase deploy --only functions
```

Or deploy specific functions:
```bash
firebase deploy --only functions:executeJavascript
firebase deploy --only functions:executeSql
```

### 4. Verify Deployment

After deployment, you should see URLs like:
- `https://us-central1-zest-academy.cloudfunctions.net/executeJavascript`
- `https://us-central1-zest-academy.cloudfunctions.net/executeSql`

Test the JavaScript endpoint:
```bash
curl -X POST https://us-central1-zest-academy.cloudfunctions.net/executeJavascript \
  -H "Content-Type: application/json" \
  -d '{"code":"console.log(\"Hello from Cloud Functions!\")"}'
```

Test the SQL endpoint:
```bash
curl -X POST https://us-central1-zest-academy.cloudfunctions.net/executeSql \
  -H "Content-Type: application/json" \
  -d '{"query":"SELECT * FROM users LIMIT 3"}'
```

## Environment Configuration

### Frontend Configuration (Optional)

If deploying to a different Firebase project, update the environment variable:

Create `.env.local` in the project root:
```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net
```

The default is: `https://us-central1-zest-academy.cloudfunctions.net`

## Security Features

### JavaScript Execution
- 5-second timeout limit
- 128MB memory limit
- Isolated process execution
- Minimal environment variables (PATH, NODE_ENV only)
- No network access
- Temporary file cleanup after execution

### SQL Execution
- Temporary database per query
- Pre-loaded test schema (users, products, orders)
- Automatic database cleanup after execution
- Query timeout protection via SQLite settings

## Available Test Data

### Users Table
- 5 sample users with id, name, email, age, created_at

### Products Table
- 5 sample products with id, name, price, category, stock

### Orders Table
- 5 sample orders with id, user_id, product_id, quantity, order_date

### Example Queries

```sql
-- Get all users
SELECT * FROM users;

-- Join orders with users and products
SELECT 
    u.name as customer, 
    p.name as product, 
    o.quantity 
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;

-- Aggregate query
SELECT 
    category, 
    COUNT(*) as count,
    AVG(price) as avg_price
FROM products
GROUP BY category;
```

## Troubleshooting

### Functions won't deploy
- Ensure you're logged in: `firebase login`
- Check project: `firebase use zest-academy`
- Verify billing is enabled (required for Cloud Functions)

### CORS errors
- Functions automatically enable CORS with `Access-Control-Allow-Origin: *`
- If issues persist, check browser console for specific errors

### Timeout errors
- JavaScript execution has a 5-second limit
- SQL queries should be fast with test data
- Cloud Functions have a default 60-second timeout

## Cost Considerations

- Firebase Cloud Functions free tier: 2 million invocations/month
- Expected usage: Well within free tier for educational platform
- Each code execution = 1 function invocation

## Monitoring

View function logs:
```bash
firebase functions:log
```

Or in Firebase Console:
1. Go to Firebase Console
2. Select project: zest-academy
3. Navigate to Functions → Logs

## Architecture

```
User Browser
    ↓
Next.js Frontend (Port 3000)
    ↓
[Python → Pyodide (Client-side)]
[JavaScript → Cloud Function → Node.js Execution]
[SQL → Cloud Function → SQLite Execution]
    ↓
Results displayed in UI
```

## Notes

- Python execution remains client-side using Pyodide (no backend needed)
- JavaScript and SQL require backend for security and proper sandboxing
- All functions clean up temporary files/databases after execution
- Functions are stateless - each execution is independent
