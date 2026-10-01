# AptMaintain - Co-operative Housing Society Maintenance & Service Ticket Portal

Full-Stack MERN portal developed for 3rd-Year IT Web Technology (Sem V) covering Practical Experiments 1 to 10.

## Tech Stack
- **Frontend**: React 18 (Vite), React Router v6, Bootstrap 5.3.3 (CDN), Axios
- **Backend**: Node.js core (`http`, `events`, `fs` streams), Express 4, Mongoose 8, `cors`, `dotenv`
- **Database**: MongoDB & Mongoose Schemas (supports both local MongoDB and **Free Cloud MongoDB Atlas** with 0 MB local storage)

---

## ⚡ Running Without Local MongoDB (0 MB Storage Required)

If you **do not have MongoDB installed** on your computer and have no disk space to install it:

1. **Option 1 (Instant Local Fallback - No setup needed):**
   * The backend contains an automatic **Zero-Storage In-Memory Fallback**.
   * Simply run `npm start` in `backend/`. If MongoDB is not detected locally, the server activates the in-memory store automatically and continues running on port 5000 without crashing!
   * All API routes, registration, and ticket tracking work immediately.

2. **Option 2 (Free Cloud MongoDB Atlas - 0 MB Disk Used, Real Cloud DB):**
   * Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up for free.
   * Create a free **M0 Cluster** (Free forever, hosted on AWS/GCP, 0 bytes on your laptop).
   * Under **Database Access**, create a user (e.g., `aptadmin` / `yourPassword`).
   * Under **Network Access**, add IP `0.0.0.0/0` (Allow from anywhere).
   * Click **Connect** -> **Drivers** and copy your URI:
     ```
     mongodb+srv://aptadmin:<password>@cluster0.xxxxx.mongodb.net/aptmaintain?retryWrites=true&w=majority
     ```
   * Create a file named `.env` inside `backend/` and paste:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://aptadmin:yourPassword@cluster0.xxxxx.mongodb.net/aptmaintain?retryWrites=true&w=majority
     ```
   * When you start the backend, it connects over the cloud automatically!

---

## 🚀 How to Run Locally

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```
*Server starts on `http://localhost:5000`*

### Step 2: Start Frontend (Terminal 2 - Project Root)
```bash
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## ☁️ Free Cloud Deployment Options

Can you connect backend and frontend by hosting online for free? **Yes!**
* **Why not GitHub Pages for backend?** GitHub Pages only serves static frontend files (HTML/CSS/JS). It cannot execute Node.js servers or run databases.
* **100% Free Cloud Setup (0 MB disk space):**
  1. **Database**: MongoDB Atlas (Free M0 cloud tier).
  2. **Backend**: [Render.com](https://render.com) (Free Node.js Web Service deployed from your GitHub repository). Set environment variables `PORT=5000` and `MONGO_URI`.
  3. **Frontend**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com) (Free React hosting deployed from your GitHub repository). Set `VITE_API_URL` to your Render backend URL.

---

## 📚 10 Practical Experiments Syllabus Mapping

| Experiment # | Topic / Syllabus Requirement | Implementation Details |
|---|---|---|
| **Exp 1** | Responsive Registration Form with JS Regex | Bootstrap 5 form in `index.html` with regex validation for Name, Email, Wing, Flat No, and Indian Mobile. |
| **Exp 2** | ES6 Features & Maintenance Math | ES6 `map`, `filter`, `reduce`, arrow functions, and penalty math in `src/components/MaintenanceCalculator.jsx`. |
| **Exp 3** | React Functional Components, Props & `useState` | Modular components (`RaiseTicket.jsx`, `TicketCard.jsx`) managing state with `useState` and passing callbacks/props. |
| **Exp 4** | Single Page Application (SPA) with React Router v6 | `BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`, and `useEffect` in `App.jsx` and pages. |
| **Exp 5 & 6** | MongoDB & Mongoose Schemas with Connection Logic | `Resident` and `Ticket` models with schemas, constraints, regex, and `mongoose.connect()` in `backend/server.js`. |
| **Exp 7** | Node.js Core Features (`http`, `fs` logging, `events`/streams) | `http.createServer(app)`, `EventEmitter` for ticket lifecycle actions, `fs.createWriteStream` for file logging in `backend/utils/logger.js`, and `fs.createReadStream` for `/api/tickets/logs/stream`. |
| **Exp 8** | Express REST API with Full HTTP Verbs | `GET`, `POST`, `PUT`, `DELETE /api/tickets` implemented with status filters and validations in `backend/routes/ticketRoutes.js`. |
| **Exp 9** | React-Express Integration using Axios | Dynamic data fetching, CRUD operations, and reactive UI updates in `src/pages/Tickets.jsx` via `src/services/api.js`. |
| **Exp 10** | Production Deployment Readiness | Multi-origin CORS setup (`localhost:5173`, `localhost:3000`), `dotenv` support, and `.env.example` configurations. |
