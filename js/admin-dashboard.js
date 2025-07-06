class AdminDashboard {
    constructor() {
        this.teachers = [];
        this.pendingStudents = [];
        this.students = [];
        this.searchTerm = '';
    }

    async render(container) {
    await this.fetchData();

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-blue-100">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p class="text-gray-600">Manage teachers and approve student registrations</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div class="flex items-center">
                        <div class="bg-blue-100 p-3 rounded-lg">
                            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Teachers</p>
                            <p class="text-2xl font-bold text-gray-900">${this.teachers.length}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div class="flex items-center">
                        <div class="bg-green-100 p-3 rounded-lg">
                            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Students</p>
                            <p class="text-2xl font-bold text-gray-900">${this.students.length}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div class="flex items-center">
                        <div class="bg-yellow-100 p-3 rounded-lg">
                            <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Pending Approvals</p>
                            <p class="text-2xl font-bold text-gray-900">${this.pendingStudents.length}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <button
                        id="add-teacher-btn"
                        class="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Add New Teacher
                    </button>
                </div>
            </div>

            ${this.renderPendingStudents()}
            ${this.renderTeachersManagement()}
            ${this.renderStudentsManagement()}
        </div>
    `;

    this.attachEventListeners();
}


    renderPendingStudents() {
        if (this.pendingStudents.length === 0) return '';

        return `
            <div class="bg-white rounded-xl shadow-sm mb-8 border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Pending Student Approvals</h2>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        ${this.pendingStudents.map(student => `
                            <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div>
                                    <h3 class="font-medium text-gray-900">${student.name}</h3>
                                    <p class="text-sm text-gray-600">${student.email}</p>
                                </div>
                                <button
                                    onclick="adminDashboard.approveStudent('${student.id}')"
                                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Approve
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderTeachersManagement() {
        const filteredTeachers = this.teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-900">Teachers Management</h2>
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                id="teacher-search"
                                placeholder="Search teachers..."
                                value="${this.searchTerm}"
                                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${filteredTeachers.map(teacher => `
                            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div class="flex items-center mb-4">
                                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        ${teacher.name.charAt(0)}
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="font-medium text-gray-900">${teacher.name}</h3>
                                        <p class="text-sm text-gray-600">${teacher.email}</p>
                                    </div>
                                </div>
                                <div class="space-y-2 mb-4">
                                    <p class="text-sm"><span class="font-medium">Department:</span> ${teacher.department}</p>
                                    <p class="text-sm"><span class="font-medium">Subject:</span> ${teacher.subject}</p>
                                </div>
                                <div class="flex space-x-2">
                                    <button onclick="adminDashboard.editTeacher('${teacher.id}')" class="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 text-sm">Edit</button>
                                    <button onclick="adminDashboard.deleteTeacher('${teacher.id}')" class="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 text-sm">Delete</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderStudentsManagement() {
        if (this.students.length === 0) return '';
        return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">All Students</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.students.map(student => `
                            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h3 class="font-medium text-gray-900">${student.name}</h3>
                                <p class="text-sm text-gray-600">${student.email}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('add-teacher-btn')?.addEventListener('click', () => window.modals.showAddTeacherModal());
        document.getElementById('teacher-search')?.addEventListener('input', e => {
            this.searchTerm = e.target.value;
            this.render(document.getElementById('dashboard-content'));
        });
    }

    async fetchData() {
        try {
            const teachersSnapshot = await db.collection('users').where('role', '==', 'teacher').get();
            this.teachers = teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const pendingSnapshot = await db.collection('users').where('role', '==', 'student').where('approved', '==', false).get();
            this.pendingStudents = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const studentsSnapshot = await db.collection('users').where('role', '==', 'student').where('approved', '==', true).get();
            this.students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            logger.info('Admin dashboard data fetched', authManager.currentUser?.id);
        } catch (error) {
            logger.error('Failed to fetch admin dashboard data', error);
        }
    }

    async approveStudent(studentId) {
        try {
            await db.collection('users').doc(studentId).update({ approved: true });
            this.pendingStudents = this.pendingStudents.filter(s => s.id !== studentId);
            await this.fetchData();
            this.render(document.getElementById('dashboard-content'));
        } catch (error) {
            logger.error('Failed to approve student', error);
        }
    }

    async deleteTeacher(teacherId) {
        if (!confirm('Are you sure?')) return;
        try {
            await db.collection('teachers').doc(teacherId).delete().catch(() => {});
            await db.collection('users').doc(teacherId).delete();
            this.teachers = this.teachers.filter(t => t.id !== teacherId);
            this.render(document.getElementById('dashboard-content'));
        } catch (error) {
            logger.error('Failed to delete teacher', error);
        }
    }

    editTeacher(teacherId) {
        const teacher = this.teachers.find(t => t.id === teacherId);
        if (teacher) window.modals.showEditTeacherModal(teacher);
    }

    async refreshData() {
        await this.fetchData();
        this.render(document.getElementById('dashboard-content'));
    }
}

// Initialize admin dashboard
window.adminDashboard = new AdminDashboard();
