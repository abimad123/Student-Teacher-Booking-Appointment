// Simplified Authentication management for separate pages
class AuthManager {
    constructor() {
        this.currentUser = null;
    }

    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            let userData;

            const userDoc = await db.collection('users').doc(userCredential.user.uid).get();

            if (userDoc.exists) {
                userData = userDoc.data();
            } else {
                if (userCredential.user.email === 'admin@gmail.com') {
                    userData = {
                        id: userCredential.user.uid,
                        email: userCredential.user.email,
                        name: 'Administrator',
                        role: 'admin',
                        approved: true,
                        createdAt: new Date().toISOString()
                    };

                    await db.collection('users').doc(userData.id).set(userData);
                    logger.info('Admin user document created during login', userData.id, userData.role);
                } else {
                    throw new Error('User data not found. Please register first.');
                }
            }

            this.currentUser = { id: userCredential.user.uid, ...userData };
            logger.info('User logged in successfully', userData.id, userData.role);
            return userData;
        } catch (error) {
            if (error.code === 'unavailable') {
                logger.error('Login failed due to network unavailability', undefined, undefined, error);
            } else {
                logger.error('Login failed', undefined, undefined, error);
            }
            throw error;
        }
    }

    async register(userData, password) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(userData.email, password);

            const newUser = {
                id: userCredential.user.uid,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                approved: userData.role === 'admin' ? true : false,
                createdAt: new Date().toISOString()
            };

            await db.collection('users').doc(newUser.id).set(newUser);

            if (userData.role === 'teacher') {
                await db.collection('teachers').doc(newUser.id).set({
                    ...newUser,
                    department: userData.department,
                    subject: userData.subject
                });
            } else if (userData.role === 'student') {
                await db.collection('students').doc(newUser.id).set({
                    ...newUser,
                    studentId: userData.studentId
                });
            }

            logger.info('User registered successfully', newUser.id, newUser.role);
            this.currentUser = newUser;
            return newUser;
        } catch (error) {
            logger.error('Registration failed', undefined, undefined, error);
            throw error;
        }
    }

    async logout() {
        try {
            const currentUser = this.currentUser;
            await auth.signOut();
            this.currentUser = null;
            logger.info('User logged out', currentUser?.id, currentUser?.role);
        } catch (error) {
            logger.error('Logout failed', this.currentUser?.id, this.currentUser?.role, error);
            throw error;
        }
    }
}

// Initialize auth manager
const authManager = new AuthManager();