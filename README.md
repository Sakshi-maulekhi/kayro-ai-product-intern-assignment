# Kayro AI Product Intern Assignment

A polished appointment booking and management prototype for a nutritionist/wellness practice, designed to make appointment management easier for clients and reduce missed consultations.

## 🔗 Live Demo

**https://kayro-ai-product-intern-assignment.vercel.app/**

## 📌 Overview

The product has two connected views that work with the same appointment data:

- **Client App** — clients can view, book, reschedule, cancel, and confirm upcoming appointments.
- **Nutritionist App** — the nutritionist can view appointments, add appointments manually, filter today's appointments, and update appointment status.

The prototype also includes an attendance-confirmation flow designed to help reduce no-shows.

## ✨ Key Features

### Client

- Friendly, mobile-first home screen
- Displays the next upcoming appointment
- Book a consultation by selecting:
  - Date
  - Available time slot
  - Name
  - Phone number
- Prevents double booking of the same slot
- View upcoming and past appointments
- Reschedule upcoming appointments
- Cancel upcoming appointments
- Confirm attendance for an upcoming appointment
- Responsive layout for mobile and desktop

### Nutritionist

- Appointment list with:
  - Client name
  - Phone number
  - Date
  - Time
  - Status
- Appointment statuses:
  - 🟢 Booked
  - 🔵 Done
  - 🔴 No-show
- Change appointment status
- Add appointments manually
- Filter appointments for today
- Client-side bookings appear in the nutritionist view
- Nutritionist-created appointments appear in the client view
- Preloaded sample appointment data

## 🧩 No-Show Prevention

The product includes an appointment confirmation flow.

When an upcoming appointment is within the reminder window, the client sees a prompt to confirm attendance. This gives the client an explicit opportunity to confirm that they plan to attend and creates a simple mechanism that could later be connected to WhatsApp/SMS reminders.

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React
- React Context + `useReducer`
- Browser `localStorage` for persistent prototype data
- Vercel for deployment

## 💡 Product Decisions

### Lightweight data layer

This assignment was designed as a short product prototype, so a separate backend/database was not introduced. Appointment state is shared between the client and nutritionist views within the application and persisted using browser `localStorage`.

For a production version, this would be replaced with a backend API and persistent database so appointments could be accessed securely across different users and devices.

### Sample data

The appointment records provided in the assignment were used as the initial seed data.

An additional `confirmed` field was introduced to support the attendance-confirmation/no-show prevention flow.

## 📂 Project Structure

```text
src/
├── client/
│   ├── ClientApp.jsx
│   ├── HomeScreen.jsx
│   ├── BookingForm.jsx
│   ├── AppointmentsList.jsx
│   └── RescheduleModal.jsx
│
├── nutritionist/
│   ├── NutritionistApp.jsx
│   ├── AppointmentTable.jsx
│   └── AddAppointmentModal.jsx
│
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── StatusBadge.jsx
│   └── ConfirmationBanner.jsx
│
├── context/
│   └── AppointmentContext.jsx
│
├── data/
│   └── seed.js
│
├── utils/
│   └── dateHelpers.js
│
├── App.jsx
└── main.jsx
```

## 🚀 Running Locally

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/Sakshi-maulekhi/kayro-ai-product-intern-assignment.git

cd kayro-ai-product-intern-assignment

npm install
```

### Start development server

```bash
npm run dev
```

The application will be available at the local Vite development URL shown in the terminal.

### Production build

```bash
npm run build
```

## 📋 Sample Appointment Data

The prototype is initialized with the sample appointments provided in the assignment:

| Client | Phone | Date | Time | Status |
|---|---|---|---|---|
| Riya Shah | 98200 11111 | 24/10/2026 | 10:00 | Booked |
| Arjun Mehta | 98200 22222 | 24/10/2026 | 11:30 | Booked |
| Riya Shah | 9820011111 | 25/10/2026 | 4:00 PM | Booked |
| Meera Iyer | — | 23/10/2026 | 09:00 | Done |
| Kabir Rao | 98200 33333 | 22/10/2026 | 14:00 | No-show |

## 🔍 Prototype Scope

This implementation focuses on the core user experience and product flow requested in the assignment.

Potential production extensions could include:

- Backend API and database
- User authentication
- WhatsApp/SMS appointment reminders
- Automated reminder scheduling
- Real-time synchronization across devices
- Calendar integration
- Analytics for no-show rates
- Automated follow-ups for cancelled/no-show appointments

## 👩‍💻 Author

**Sakshi Maulekhi**

BTech Information Technology  
AI / GenAI / Automation-focused developer

---

Built as part of the **Kayro AI Product Intern assignment**.