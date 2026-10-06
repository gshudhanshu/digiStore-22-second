# DigiStore 22

A loyalty-rewards store built with the MERN stack. Customers sign up with their mobile number, scratch one digital scratch card a day to earn **DigiDollas**, and spend them on products in the store. Staff accounts run an in-store variant where a scratch card awards a physical prize against an uploaded purchase receipt.

## Features

- **Mobile number sign-up & login.** OTP verification through Twilio Verify, plus JWT-based sessions and password reset.
- **Daily scratch card.** One card per day (Barbados time zone). The DigiDollas range depends on the customer's mobile plan (7, 14 or 30-day Prime plans).
- **Store & checkout.** Product catalogue with search, pagination, reviews and a cart. Orders are paid with the DigiDollas balance.
- **Staff mode.** Staff scratch a card on behalf of a customer and get a random in-stock prize product, with the receipt image and customer number saved.
- **Admin.** In-app screens for managing users, products and orders, and an [AdminJS](https://adminjs.co/) dashboard at `/admin`.

## Tech stack

| Layer    | Tools |
|----------|-------|
| Frontend | React 18, Redux + Redux Thunk, React Router 6, React Bootstrap, SCSS |
| Backend  | Node.js, Express, Mongoose (MongoDB), JWT, Multer (image uploads) |
| Services | Twilio Verify (SMS OTP), AdminJS |
| Hosting  | Vercel (`vercel.json`) or Heroku/Render (`Procfile`) |

## Project structure

```
backend/
  config/        MongoDB connection
  controllers/   users, products, orders, scratch cards
  models/        User, Product, Order, ScratchCard, StaffScratchCard
  routes/        /api/users, /api/products, /api/orders, /api/cards, /api/upload, /admin
  seeder.js      sample users and products
frontend/
  src/screens/   page components (store, cart, checkout, scratch card, admin)
  src/actions/   Redux actions
  src/reducers/  Redux reducers
uploads/         uploaded product and receipt images
```

## Getting started

### Prerequisites

- Node.js 16.15 or later
- A MongoDB database (local or Atlas)
- A Twilio account with a Verify service (for OTP)

### Environment variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=
JWT_SECRET=

# Twilio Verify (OTP)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
VERIFY_SERVICE_SID=

# AdminJS dashboard
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_COOKIE_NAME=
ADMIN_COOKIE_PASS=
SESSION_SECRET=

PAYPAL_CLIENT_ID=
```

### Install and run

```bash
npm install
npm install --prefix frontend

# optional: load sample users and products
npm run data:import

# start the API (port 5000) and the React dev server together
npm run dev
```

| Script                 | What it does |
|------------------------|--------------|
| `npm run dev`          | Runs the backend (nodemon) and frontend concurrently |
| `npm run server`       | Backend only |
| `npm run client`       | Frontend only |
| `npm start`            | Backend in production mode (serves `frontend/build`) |
| `npm run data:import`  | Seeds the database with sample data |
| `npm run data:destroy` | Clears the seeded data |

## Credits

The storefront UI is based on the [Supro – Minimalist eCommerce React template](https://themeforest.net/item/supro-minimalist-ecommerce-reactjs-template/30236640).
