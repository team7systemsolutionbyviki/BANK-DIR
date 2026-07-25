# Bank Directory Search System (Firebase Online Cloud System)

A complete, professional, real-time **Online Bank Directory Search System** built using **HTML5, CSS3, JavaScript (Vanilla JS), Bootstrap 5, DataTables.js, Firebase Realtime Database, and Font Awesome**.

The application operates **ONLINE** powered by Firebase Cloud Realtime Database, supporting live multi-client WebSocket synchronization across 100,000+ bank branches.

---

## 🌟 Key Online Features

### 🔥 Realtime Firebase Cloud Integration
- **Live Online Database**: Connected to Firebase Realtime Database (`bankdirectroy`).
- **Multi-Client WebSocket Sync**: Real-time updates when branches are added, edited, or deleted.
- **Automatic Cloud Seeding**: Seeds initial bank records automatically to Firebase Cloud on first connection.

### 🔑 User Authentication System
- **Sign In & Account Registration**: Create user accounts with Name, Email, Phone, and Password.
- **Super Admin Credentials**: Special Super Admin access (`VIKIR0200@GMAIL.COM` / `VIKI1101`) to manage bank branches.
- **Cloud User Sync**: User registrations sync to `users/` in Firebase Cloud.

### 📊 Online Dashboard & Metrics
- **Real-Time Counters**: Displays Total Banks, Total Branches, Total Districts, and Search Count.
- **Top Banks Network Grid**: Instant breakdown for top banking institutions.

### 🔍 Advanced Multi-Condition Search Engine
- **Instant & Case-Insensitive Filtering**: Filter by State, District, Bank Name, Branch Name, IFSC Code, MICR Code, or Address.
- **Auto-Suggestion & Autocomplete**: Real-time popovers for branch names.

### ⚡ DataTables Integration (Supports 100,000+ Records)
- **High Performance**: Deferred rendering (`deferRender: true`) for zero lag when dealing with 100,000+ records.
- **Actions Column**:
  - 📋 **Copy IFSC**: Instant clipboard copy.
  - 📍 **Copy Address**: Fast address text copy.
  - 📱 **QR Code & Details Modal**: Displays SVG QR code and direct Google Maps navigation link.
  - ⭐ **Bookmark / Favorite**: Save branches persistently.

---

## 🛠️ Super Admin Credentials

- **Super Admin Email**: `VIKIR0200@GMAIL.COM`
- **Super Admin Password**: `VIKI1101`

---

## 📁 Project Folder Structure

```
BankDirectory/
├── index.html               # Main HTML shell (Dashboard, Search, Views, Modals, Topbar, Sidebar)
├── style.css                # Custom CSS design system, glassmorphism, themes, animations
├── script.js                 # Complete Vanilla JS logic with Firebase Realtime DB integration
├── banks.json               # Initial dataset fallback
├── assets/
│   └── icons/
│       └── logo.png         # System branding icon
└── README.md                # Documentation and user guide
```
