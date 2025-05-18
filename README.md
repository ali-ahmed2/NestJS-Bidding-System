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


## 🧠 Concurrency Handling

To ensure consistency and avoid race conditions when multiple users place bids at the same time:

#### 💡 Ideas:
- **Message Queue:**
  - Integrate a message queue where each bid is placed with its epoch timestamp by client-side. 
  - These bids will be eventually be consumed by the backend at its own leisure to minimize CPU utilization (e.g. chunk_size=100).
  - Each bid will be processed in the increasing order of their timestamps to ensure first come first serve principle.
  - Invalid bids will be discarded based on highest bid & auction time validations.
  - **FLAWS:** Our system requires user-friendly & meaningful error messages which will not be possible since the client-side will successfully push the bid onto the queue but it will be validated at a later time. In this case, it will require integration of push notifications to inform the user of their discarded bids.
  - **DECISION:** Due to small number of users (100 in our case), we do not expect a large number of concurrent bids on the same item. Therefore, the integration of distributed message queue & push notifications can be done later as part of a scaling activity.

- **Serial Transactions:**
  - Set `SERIALIZABLE` isolation level on transactions to optimistically execute transactions concurrently and rollback one or all transactions based on conflicts.
  - **FLAWS:** Running all transactions concurrently with optimism means that CPU will be utilized at its full and chances of conflicts are high since we need to validate current bid's amount with the latest bid's amount that will change with every new bid being committed against an item.
  - **DECISION:** Due to high CPU utilization & need of implementing a retry mechanism for large number of rolled back transactions (not handled by typeorm), this design was discarded.

- **Read Committed Transactions with Pessimistic Write Lock on Item:**
  - Set `READ_COMMITTED` isolation level on transactions to ensure transactions read only committed data for validating that the highest bid and auction time.
  - Acquire a **pessimistic_write lock** on the respective `Item` row during bid placement.
  - Ensures only one bid transaction can be processed at a time per item.
  - Other transactions concerned with the same item will wait for the lock to be released.
  - **DECISION:** This strategy allows bids to be placed on DIFFERENT items simultaneously and reduces the chances of rollbacks. It also minimizes CPU utilization by making the transactions wait for the lock to be released instead of executing them optimistically. Due to reduced chances of conflicts, we also don't need to implement a retry mechanism for V1.

---

<!-- ## 🔄 Real-Time Bid Updates

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
npm run start:dev # Migrations will run automatically on server spin up
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```



