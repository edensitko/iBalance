# 💳 iBalance – Personal Expense Tracker

**iBalance** is a simple and intuitive web application designed to help users track their personal expenses and manage their finances effectively. Built with modern web technologies, iBalance provides a user-friendly interface for logging expenses, categorizing transactions, and visualizing spending habits.

---

## 🚀 Features

- 📝 **Expense Logging**: Quickly add and categorize your daily expenses.
- 📊 **Spending Overview**: Visualize your spending patterns with interactive charts.
- 🔍 **Transaction Search**: Easily search and filter past transactions.
- 🌐 **Responsive Design**: Access your expense tracker seamlessly on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **React.js**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Firebase**: Backend platform providing authentication and real-time database services.

---

## ▶️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/edensitko/iBalance.git
cd iBalance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase Configuration

Create a `.env` file in the root directory and add your Firebase configuration details:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the application locally.

---

## 📁 Project Structure

```
iBalance/
├── public/             # Public assets
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── assets/         # Images and static files
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point
│   └── styles/         # Tailwind CSS styles
├── .env                # Environment variables (not included in repo)
├── package.json
└── README.md
```

---

## 🌐 Live Demo

Experience the live application here: [https://ibalance.vercel.app](https://ibalance.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please fork the repository and submit a pull request.
