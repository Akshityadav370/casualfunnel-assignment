# CasualFunnel – Analytics & Heatmap Demo

This is a simple frontend analytics system that tracks user interactions (clicks), groups them by session, and exposes data that can be visualized as a heatmap.

The project is split into:

- a **demo client** where events are tracked
- an **admin client** to view analytics
- a small **tracking script (SDK)**
- an **Express backend** that stores and aggregates events

---

## Live URLs

**Admin App**  
http://104.248.75.249/

**Demo App**  
http://64.227.155.0/

**Backend Base URL**  
http://104.248.75.249/api/v1/events

---

## Folder Structure

```
casualfunnel-assignment/
├── client-admin
├── client-demo
├── lib
├── server
└── README.md
```

---

## Tech Stack

**Frontend**

- React
- Vite
- TypeScript
- Tailwind CSS

**Backend**

- Node.js
- Express
- MongoDB

---

## How to Run Locally

### Backend

```
cd server
npm install
npm run dev
```

Create a `.env` file in `server/`:

```
PORT=3001
MONGO_DB_URI=<mongodb-uri>
```

---

### Client (Admin / Demo)

Repeat for both `client-admin` and `client-demo`:

```
npm install
npm run dev
```

---

## Backend APIs

All analytics-related APIs are exposed under `/api/events`.

### 1. POST /api/events

Creates a new analytics event (click, interaction, etc).

Used by the tracking script inside the demo app.

---

### 2. GET /api/events/sessions

Returns all unique session IDs that have been recorded.

---

### 3. GET /api/events/session/:sessionId

Fetches all events for a given session.

---

### 4. GET /api/events/heatmap

Returns aggregated click data used to render heatmaps.

---

## Tracking Script (`lib/`)

The `lib` folder contains a small client-side tracking script that:

- generates a sessionId
- listens for click events
- captures metadata (x, y, page URL, element info)
- sends data to the backend

This is meant to simulate how real analytics tools expose an SDK that can be plugged into any app.

---

## Assumptions / Trade-offs

- Session handling is simplified  
  A random `sessionId` is generated instead of implementing real user sessions or auth.

- Click coordinates are relative  
  `x` and `y` values are taken relative to the clicked element’s container instead of absolute screen coordinates.  
  This keeps heatmaps consistent across different screen sizes and resolutions.

- Data attributes for tracking  
  Clickable elements use `data-*` attributes to make event tracking simpler and more reliable.

- Heatmap rendering is query-based  
  Heatmap view is controlled using query params for ease of development instead of a full UI toggle.
