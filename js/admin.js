// Admin page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPage();
});

function initializeAdminPage() {
    // Check authentication and role
    auth.onAuthStateChanged(async (firebaseUser) => {
        const loadingScreen = document.getElementById('loading-screen');
        const dashboardContainer = document.getElementById('dashboard-container');

        if (!firebaseUser) {
            window.location.href = 'index.html';
            return;
        }

        try {
            const userDoc = await db.collection('users').doc(firebaseUser.uid).get();
            let userData;

            if (userDoc.exists) {
                userData = userDoc.data();
            } else {
                // Handle admin case
                if (firebaseUser.email === 'admin@gmail.com') {
                    userData = {
                        id: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: 'Administrator',
                        role: 'admin',
                        approved: true,
                        createdAt: new Date().toISOString()
                    };
                    await db.collection('users').doc(userData.id).set(userData);
                } else {
                    await auth.signOut();
                    window.location.href = 'index.html';
                    return;
                }
            }

            // Check if user is admin
            if (userData.role !== 'admin') {
                await auth.signOut();
                window.location.href = 'index.html';
                return;
            }

            // Set current user for auth manager
            authManager.currentUser = userData;

            // Update header
            document.getElementById('user-name').textContent = userData.name;

            // Show dashboard
            loadingScreen.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');

            // Initialize admin dashboard
            if (window.adminDashboard) {
                window.adminDashboard.render(document.getElementById('dashboard-content'));
            }

        } catch (error) {
            console.error('Error checking user:', error);
            window.location.href = 'index.html';
        }
    });

    // Initialize logout
    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    });
}