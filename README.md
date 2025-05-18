# Bidding System

A real-time auction platform where users can place bids on items and view live updates of the highest bid per item.

---

## 🧱 Tech Stack

### Frontend
- **ReactJS** (with Vite)
- Styled using **Tailwind CSS**
- **Antd** for form fields & toast messages
- **React Query & Mutation** for CRUD & minimalistic global state management
- **React Hook Form** for form state & error handling
- Real-time bid updates via **Server-Sent Events (SSE)**

### Backend
- **NestJS**
- **TypeORM**
- **MySQL**
- **Docker** for spinning up DB instance
- **Pessimistic locks** for concurrency control
- **SSE (Server-Sent Events)** for live bid updates

---

## ⚙️ Features

### Frontend (React + Vite)

- ✅ Dashboard view:
  - List all auction items
  - Shows:
    - Item name
    - Description

- ✅ Create auction item form:
  - Add a new item to be auctioned

- ✅ Auction detail page:
  - Starting At price
  - Remaining time of auction (in seconds)
  - Real-time highest bid via SSE
  - Place new bid form
    - Select user
    - Enter bid amount
  - Error messages for invalid actions

- ✅ Responsive & User-friendly UI

---

### Backend (NestJS + TypeORM + MySQL)

- ✅ Add items to the auction
  - Each item includes: `ID`, `name`, `description`, `startingAmount`, and `auctionDurationInMinutes`

- ✅ Retrieve all items for auction
  
- ✅ Hardcoded 100 Users
  - Pre-populated during migration/seed. No user registration or login required.

- ✅ Place a bid:
  - Validations:
    - Must be greater than current highest bid
    - Must be within the auction duration

- ✅ Auction expiration:
  - Automatically rejects bids after auction duration ends

- ✅ Concurrency control
  - `READ COMMITTED` isolation level set for each transaction to avoid dirty reads
  - `pessimistic_write` locking on the `Item` row to avoid race conditions

- ✅ Real time highest-bid updates (via SSE)

- ✅ Performance Optimizations:
  - Composite index on `Bid(itemID, time)` for fast latest bid lookups

---


<!-- ## 🧠 Concurrency Handling

To ensure consistency and avoid race conditions when multiple users place bids at the same time:

- Acquires a **pessimistic write lock** on the `Item` row during bid placement
- Ensures only one bid transaction can be processed at a time per item
- Other transactions wait for the lock to release

---

## 🔄 Real-Time Bid Updates

- Implemented using **Server-Sent Events (SSE)**
- Frontend keeps an open connection to receive latest bid updates for individual auctions
- Backend publishes latest bids on the SSE stream whenever a new valid bid is placed

--- -->

## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker Desktop
- MySQL
- npm

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
docker compose up
npm run start:dev # Migrations will run automatically on server startup
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```



