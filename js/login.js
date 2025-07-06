// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

function initializeLoginPage() {
    // Check if user is already logged in
    auth.onAuthStateChanged(async (firebaseUser) => {
        const loadingScreen = document.getElementById('loading-screen');
        const loginForm = document.getElementById('login-form');
        const pendingApproval = document.getElementById('pending-approval');

        if (firebaseUser) {
            try {
                const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
                
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    
                    // Check if student needs approval
                    if (userData.role === 'student' && !userData.approved) {
                        loadingScreen.classList.add('hidden');
                        pendingApproval.classList.remove('hidden');
                        return;
                    }
                    
                    // Redirect to appropriate dashboard
                    redirectToDashboard(userData.role);
                } else {
                    // Handle admin case
                    if (firebaseUser.email === 'admin@gmail.com') {
                        redirectToDashboard('admin');
                    } else {
                        await auth.signOut();
                        showLoginForm();
                    }
                }
            } catch (error) {
                console.error('Error checking user:', error);
                showLoginForm();
            }
        } else {
            showLoginForm();
        }
    });

    // Initialize login form
    const loginFormElement = document.getElementById('login-form-element');
    const loginError = document.getElementById('login-error');
    const loginSubmit = document.getElementById('login-submit');

    loginFormElement?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        loginSubmit.disabled = true;
        loginSubmit.textContent = 'Signing in...';
        loginError.classList.add('hidden');

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
                } else {
                    throw new Error('User data not found. Please register first.');
                }
            }

            // Check if student needs approval
            if (userData.role === 'student' && !userData.approved) {
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('pending-approval').classList.remove('hidden');
                return;
            }

            // Redirect to appropriate dashboard
            redirectToDashboard(userData.role);
        } catch (error) {
            loginError.textContent = error.message || 'Failed to login';
            loginError.classList.remove('hidden');
        } finally {
            loginSubmit.disabled = false;
            loginSubmit.textContent = 'Sign In';
        }
    });

    // Initialize pending approval logout
    document.getElementById('pending-logout')?.addEventListener('click', async () => {
        try {
            await auth.signOut();
            showLoginForm();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    });
}
   
function showLoginForm() {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('pending-approval').classList.add('hidden');
}

function redirectToDashboard(role) {
    switch (role) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'teacher':
            window.location.href = 'teacher.html';
            break;
        case 'student':
            window.location.href = 'student.html';
            break;
        default:
            console.error('Unknown user role:', role);
            showLoginForm();
    }
}