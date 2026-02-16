# OnTym - To-Do List Application

A To-do list web application built with React and Firebase. OnTym allows users to create accounts, authenticate securely, and manage their daily tasks efficiently.

## Features

**User Authentication**
- Sign up with email and password
- Secure login with Firebase Authentication
- Session management with logout functionality

**To-Do Management**
- Add new tasks
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Real-time synchronization with Firebase Realtime Database

**User-Friendly Interface**
- Clean and intuitive UI
- Toast notifications for user feedback

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- A Firebase project (for backend services)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AnishXCode/onTym.git
cd onTym/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

#### About `firebaseConfig.js` **IMPORTANT**

Create a file named `firebaseConfig.js` in the location given below and this file contains your Firebase project credentials. This file is essential for connecting your React application to Firebase services.

**Location:** `src/firebaseConfig.js`

**Configuration Keys:**
- `apiKey` - Public API key for authenticating requests to Firebase
- `authDomain` - Firebase authentication domain
- `projectId` - Unique identifier for your Firebase project
- `storageBucket` - Cloud Storage bucket for file uploads
- `messagingSenderId` - Firebase Cloud Messaging sender ID
- `appId` - Unique identifier for your Firebase web app
- `databaseURL` - URL for Firebase Realtime Database

**Example Configuration:**
```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_REALTIME_DATABASE_URL" // this has to be created seperately in the firebase console
};
```

### 4. Firebase Setup Instructions

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create Project" and follow the setup wizard

2. **Enable Authentication:**
   - In Firebase Console, navigate to "Authentication"
   - Click "Get Started"
   - Enable "Email/Password" provider
   - Configure sign-in methods as needed

3. **Enable Firestore Database:**
   - Go to "Firestore Database"
   - Click "Create Database"
   - Start in test mode (for development)
   - Create the `users` collection to store user profiles

4. **Enable Realtime Database:**
   - Go to "Realtime Database"
   - Click "Create Database"
   - Set location to your preferred region
   - This will store user tasks in real-time

5. **Get Your Config:**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Select the web app
   - Copy the config object
   - Replace the values in `firebaseConfig.js`

## Running the Application

### Development Mode

```bash
npm start
```
The application will open in your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```
This creates an optimized production build in the `build/` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── auth/
│   │   ├── firebase.js         # Firebase initialization
│   │   ├── login.js            # Login page component
│   │   └── signup.js           # Sign up page component
│   ├── pages/
│   │   └── dashboard.js        # Main dashboard/to-do list page
│   ├── App.js                  # Main app component
│   ├── App.css                 # Global styles
│   ├── index.js                # React entry point
│   └── firebaseConfig.js       # Firebase configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Usage

### 1. Create an Account
- Navigate to the Sign Up page
- Enter your email, first name, last name, and password
- Click "Sign Up"
- Your account will be created and you'll be directed to the dashboard

### 2. Log In
- Enter your email and password
- Click "Login"
- You'll be directed to your to-do list dashboard

### 3. Manage Tasks
- **Add Task:** Type task name in the input field and click "Add"
- **Complete Task:** Check the checkbox next to the task
- **Edit Task:** Click the "Edit" button and enter the new task text
- **Delete Task:** Click the "Delete" button to remove the task

### 4. Log Out
- Click the "Logout" button at the bottom of the dashboard
- You'll be redirected to the login page

## Technologies Used

- **React** (v19.2.4) - UI framework
- **Firebase** (v12.9.0) - Backend services
  - Authentication - User login/signup
  - Firestore - User data storage
  - Realtime Database - Task storage and sync
- **React Router DOM** (v7.13.0) - Navigation
- **React Toastify** (v11.0.5) - Toast notifications
- **CSS3** - Styling and animations

## Dependencies

All dependencies are listed in `package.json`:

```json
{
  "firebase": "^12.9.0",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.13.0",
  "react-scripts": "5.0.1",
  "react-toastify": "^11.0.5"
}
```

Run `npm install` to install all dependencies.

## Environment Variables

Currently, the project uses `firebaseConfig.js` to store configuration. For production, consider using environment variables:

1. Create a `.env` file in the root directory:
```
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
...
```

2. Update `firebaseConfig.js` to use environment variables:
```javascript
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  ...
};
```

## Database Structure

### Firestore (Users)
```
users/
  └── {uid}/
      ├── uid: string
      ├── email: string
      ├── firstName: string
      ├── lastName: string
      ├── isDisabled: boolean
      └── createdAt: timestamp
```

### Realtime Database (Tasks)
```
todos/
  └── {uid}/
      └── {taskId}/
          ├── id: number
          ├── text: string
          └── completed: boolean
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Firebase Connection Issues
- Ensure `firebaseConfig.js` contains correct credentials
- Check Firebase Console for any error messages
- Verify that Authentication and Realtime Database are enabled

### Tasks Not Loading
- Check browser console for errors
- Verify Realtime Database rules allow read/write access
- Ensure user is properly authenticated

### Build Errors
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Clear the `build` folder if it exists

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Version:** 0.1.0  
**Last Updated:** February 2026
