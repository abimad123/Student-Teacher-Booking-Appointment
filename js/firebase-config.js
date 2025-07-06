// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASLA72cUtT_-BTA988uc1udS4KZNKNew0",
    authDomain: "student-teacherbooking.firebaseapp.com",
    projectId: "student-teacherbooking",
    storageBucket: "student-teacherbooking.firebasestorage.app",
    messagingSenderId: "4453977917",
    appId: "1:4453977917:web:a067ae03f8404a59267f54"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .then(() => {
        console.log("Offline persistence enabled successfully");
    })
    .catch((err) => {
        console.warn("Offline persistence failed, continuing with online-only mode", err);
    });

// Logger utility
class Logger {
    constructor() {
        this.logs = [];
    }

    createLogEntry(level, action, userId, userRole, details) {
        return {
            timestamp: new Date().toISOString(),
            level,
            action,
            userId,
            userRole,
            details
        };
    }

    info(action, userId, userRole, details) {
        const entry = this.createLogEntry('info', action, userId, userRole, details);
        this.logs.push(entry);
        console.log(`[INFO] ${entry.timestamp} - ${action}`, details || '');
    }

    warn(action, userId, userRole, details) {
        const entry = this.createLogEntry('warn', action, userId, userRole, details);
        this.logs.push(entry);
        console.warn(`[WARN] ${entry.timestamp} - ${action}`, details || '');
    }

    error(action, userId, userRole, details) {
        const entry = this.createLogEntry('error', action, userId, userRole, details);
        this.logs.push(entry);
        console.error(`[ERROR] ${entry.timestamp} - ${action}`, details || '');
    }

    getLogs() {
        return [...this.logs];
    }

    clearLogs() {
        this.logs = [];
    }
}

const logger = new Logger();