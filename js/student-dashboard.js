// Student Dashboard
class StudentDashboard {
    constructor() {
        this.teachers = [];
        this.appointments = [];
        this.searchTerm = '';
        this.view = 'search';
    }

    async render(container) {
        await this.fetchData();
        
        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-blue-100">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
                    <p class="text-gray-600">Search for teachers and book appointments</p>
                </div>

                <!-- Navigation Tabs -->
                <div class="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
                    <div class="flex border-b border-gray-200">
                        <button
                            data-view="search"
                            class="view-tab px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                this.view === 'search'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }"
                        >
                            <svg class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search Teachers
                        </button>
                        <button
                            data-view="appointments"
                            class="view-tab px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                this.view === 'appointments'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }"
                        >
                            <svg class="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            My Appointments (${this.appointments.length})
                        </button>
                    </div>
                </div>

                ${this.view === 'search' ? this.renderSearchView() : this.renderAppointmentsView()}
            </div>
        `;

        this.attachEventListeners();
    }

    renderSearchView() {
        const filteredTeachers = this.teachers.filter(teacher =>
            teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            id="teacher-search"
                            placeholder="Search teachers by name, department, or subject..."
                            value="${this.searchTerm}"
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${filteredTeachers.map(teacher => `
                            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                                <div class="flex items-center mb-4">
                                    <div class="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        ${teacher.name.charAt(0)}
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="font-semibold text-gray-900">${teacher.name}</h3>
                                        <p class="text-sm text-gray-600">${teacher.email}</p>
                                    </div>
                                </div>
                                
                                <div class="space-y-2 mb-4">
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span class="text-sm text-gray-600">${teacher.department}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span class="text-sm text-gray-600">${teacher.subject}</span>
                                    </div>
                                </div>
                                
                                <button
                                    onclick="studentDashboard.bookAppointment('${teacher.id}')"
                                    class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${filteredTeachers.length === 0 ? `
                        <div class="text-center py-8">
                            <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p class="text-gray-500">No teachers found matching your search</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderAppointmentsView() {
        return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">My Appointments</h2>
                </div>
                
                <div class="divide-y divide-gray-200">
                    ${this.appointments.length === 0 ? `
                        <div class="p-8 text-center">
                            <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p class="text-gray-500">No appointments booked yet</p>
                            <button
                                onclick="studentDashboard.switchToSearch()"
                                class="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Search for teachers to book your first appointment
                            </button>
                        </div>
                    ` : this.appointments.map(appointment => this.renderAppointmentCard(appointment)).join('')}
                </div>
            </div>
        `;
    }

    renderAppointmentCard(appointment) {
        const statusClass = this.getStatusClass(appointment.status);

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="text-lg font-medium text-gray-900">${appointment.teacherName}</h3>
                            <span class="status-badge ${statusClass}">
                                <span class="capitalize">${appointment.status}</span>
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div class="flex items-center">
                                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                ${new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div class="flex items-center">
                                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                ${appointment.time}
                            </div>
                        </div>
                        
                        <div class="mb-2">
                            <p class="text-sm font-medium text-gray-700 mb-1">Purpose:</p>
                            <p class="text-sm text-gray-600">${appointment.purpose}</p>
                        </div>
                        
                        ${appointment.message ? `
                            <div>
                                <p class="text-sm font-medium text-gray-700 mb-1">Message:</p>
                                <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">${appointment.message}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const classes = {
            pending: 'status-pending',
            approved: 'status-approved',
            cancelled: 'status-cancelled',
            completed: 'status-completed'
        };
        return classes[status] || classes.pending;
    }

    attachEventListeners() {
        // View tabs
        document.querySelectorAll('.view-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.view = e.target.dataset.view;
                this.render(document.getElementById('dashboard-content'));
            });
        });

        // Search input
        document.getElementById('teacher-search')?.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.render(document.getElementById('dashboard-content'));
        });
    }

    async fetchData() {
    try {
        // ✅ Fetch teachers only
        const teachersSnapshot = await db.collection('users')
            .where('role', '==', 'teacher')
            .get();

        this.teachers = teachersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // ✅ Fetch appointments for the current student
        const appointmentsSnapshot = await db.collection('appointments')
            .where('studentId', '==', authManager.currentUser?.id)
            .get();

        this.appointments = appointmentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        logger.info('Student dashboard data fetched', authManager.currentUser?.id, authManager.currentUser?.role);
    } catch (error) {
        logger.error('Failed to fetch student dashboard data', authManager.currentUser?.id, authManager.currentUser?.role, error);
    }
}


    bookAppointment(teacherId) {
        const teacher = this.teachers.find(t => t.id === teacherId);
        if (teacher) {
            window.modals.showBookAppointmentModal(teacher);
        }
    }

    switchToSearch() {
        this.view = 'search';
        this.render(document.getElementById('dashboard-content'));
    }

    async handleBookAppointment(appointmentData) {
        try {
            const teacher = this.teachers.find(t => t.id === appointmentData.teacherId);
            if (!teacher || !authManager.currentUser) return;

            const newAppointment = {
                teacherId: appointmentData.teacherId,
                studentId: authManager.currentUser.id,
                teacherName: teacher.name,
                studentName: authManager.currentUser.name,
                date: appointmentData.date,
                time: appointmentData.time,
                purpose: appointmentData.purpose,
                message: appointmentData.message,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const docRef = await db.collection('appointments').add(newAppointment);
            const appointmentWithId = { ...newAppointment, id: docRef.id };
            
            this.appointments.unshift(appointmentWithId);
            this.view = 'appointments';
            this.render(document.getElementById('dashboard-content'));
            
            logger.info('Appointment booked successfully', authManager.currentUser.id, authManager.currentUser.role, { 
                teacherId: appointmentData.teacherId, 
                appointmentId: docRef.id 
            });
        } catch (error) {
            logger.error('Failed to book appointment', authManager.currentUser?.id, authManager.currentUser?.role, error);
            throw error;
        }
    }
}

// Initialize student dashboard
window.studentDashboard = new StudentDashboard();