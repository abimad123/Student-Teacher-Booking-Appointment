document.addEventListener('DOMContentLoaded', function() {
    initializeRegisterPage();
});

function initializeRegisterPage() {
    auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            window.location.href = 'index.html';
        }
    });

    const registerForm = document.getElementById('register-form-element');
    const registerError = document.getElementById('register-error');
    const registerSubmit = document.getElementById('register-submit');
    const roleSelect = document.getElementById('register-role');
    const teacherFields = document.getElementById('teacher-fields');
    const studentFields = document.getElementById('student-fields');

    // Show/hide fields based on role
    roleSelect.addEventListener('change', (e) => {
        if (e.target.value === 'teacher') {
            teacherFields.classList.remove('hidden');
            studentFields.classList.add('hidden');
            document.getElementById('register-department').required = true;
            document.getElementById('register-subject').required = true;
            document.getElementById('register-student-id').required = false;
        } else {
            teacherFields.classList.add('hidden');
            studentFields.classList.remove('hidden');
            document.getElementById('register-department').required = false;
            document.getElementById('register-subject').required = false;
            document.getElementById('register-student-id').required = true;
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            registerError.textContent = 'Passwords do not match';
            registerError.classList.remove('hidden');
            return;
        }

        if (data.password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters';
            registerError.classList.remove('hidden');
            return;
        }

        registerSubmit.disabled = true;
        registerSubmit.textContent = 'Creating Account...';
        registerError.classList.add('hidden');

        try {
            // Create user in Firebase Auth
            const userCredential = await auth.createUserWithEmailAndPassword(data.email, data.password);
            const uid = userCredential.user.uid;

            // Common user data
            const newUser = {
                id: uid,
                email: data.email,
                name: data.name,
                role: data.role,
                approved: data.role === 'admin' ? true : false,
                createdAt: new Date().toISOString()
            };

            // Save to 'users' collection
            await db.collection('users').doc(uid).set(newUser);

            // Save to 'students' or 'teachers' collection
            if (data.role === 'teacher') {
                await db.collection('teachers').doc(uid).set({
                    ...newUser,
                    department: data.department,
                    subject: data.subject
                });
            } else if (data.role === 'student') {
                await db.collection('students').doc(uid).set({
                    ...newUser,
                    studentId: data.studentId
                });
            }

            window.location.href = 'index.html';
        } catch (error) {
            registerError.textContent = error.message || 'Failed to register';
            registerError.classList.remove('hidden');
        } finally {
            registerSubmit.disabled = false;
            registerSubmit.textContent = 'Create Account';
        }
    });
}
