// Student page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentPage();
});

function initializeStudentPage() {
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

            if (!userDoc.exists) {
                await auth.signOut();
                window.location.href = 'index.html';
                return;
            }

            const userData = userDoc.data();

            // Check if user is student
            if (userData.role !== 'student') {
                await auth.signOut();
                window.location.href = 'index.html';
                return;
            }

            // Check if student is approved
            if (!userData.approved) {
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

            // Initialize student dashboard
            if (window.studentDashboard) {
                window.studentDashboard.render(document.getElementById('dashboard-content'));
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