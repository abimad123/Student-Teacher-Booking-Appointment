// Teacher Dashboard
class TeacherDashboard {
    constructor() {
        this.appointments = [];
        this.filter = 'all';
    }

    async render(container) {
        await this.fetchAppointments();
        
        const stats = this.calculateStats();
        
        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-blue-100">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
                    <p class="text-gray-600">Manage your appointments and schedule</p>
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
                                <p class="text-sm font-medium text-gray-600">Total Appointments</p>
                                <p class="text-2xl font-bold text-gray-900">${stats.total}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div class="flex items-center">
                            <div class="bg-yellow-100 p-3 rounded-lg">
                                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Pending</p>
                                <p class="text-2xl font-bold text-gray-900">${stats.pending}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div class="flex items-center">
                            <div class="bg-green-100 p-3 rounded-lg">
                                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Approved</p>
                                <p class="text-2xl font-bold text-gray-900">${stats.approved}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <button
                            id="manage-schedule-btn"
                            class="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                        >
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Manage Schedule
                        </button>
                    </div>
                </div>

                ${this.renderFilterTabs()}
                ${this.renderAppointmentsList()}
            </div>
        `;

        this.attachEventListeners();
    }

    renderFilterTabs() {
        const filters = [
            { key: 'all', label: 'All', count: this.appointments.length },
            { key: 'pending', label: 'Pending', count: this.appointments.filter(a => a.status === 'pending').length },
            { key: 'approved', label: 'Approved', count: this.appointments.filter(a => a.status === 'approved').length },
            { key: 'completed', label: 'Completed', count: this.appointments.filter(a => a.status === 'completed').length }
        ];

        return `
            <div class="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
                <div class="flex border-b border-gray-200">
                    ${filters.map(filter => `
                        <button
                            data-filter="${filter.key}"
                            class="filter-tab px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                this.filter === filter.key
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }"
                        >
                            ${filter.label} (${filter.count})
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderAppointmentsList() {
        const filteredAppointments = this.appointments.filter(apt => 
            this.filter === 'all' || apt.status === this.filter
        );

        return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Appointments</h2>
                </div>
                
                <div class="divide-y divide-gray-200">
                    ${filteredAppointments.length === 0 ? `
                        <div class="p-8 text-center">
                            <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p class="text-gray-500">No appointments found</p>
                        </div>
                    ` : filteredAppointments.map(appointment => this.renderAppointmentCard(appointment)).join('')}
                </div>
            </div>
        `;
    }

    renderAppointmentCard(appointment) {
        const statusIcon = this.getStatusIcon(appointment.status);
        const statusClass = this.getStatusClass(appointment.status);

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h3 class="text-lg font-medium text-gray-900">${appointment.studentName}</h3>
                            <span class="status-badge ${statusClass}">
                                ${statusIcon}
                                <span class="ml-1 capitalize">${appointment.status}</span>
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
                        
                        <div class="mb-3">
                            <p class="text-sm font-medium text-gray-700 mb-1">Purpose:</p>
                            <p class="text-sm text-gray-600">${appointment.purpose}</p>
                        </div>
                        
                        ${appointment.message ? `
                            <div class="mb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Message:</p>
                                <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">${appointment.message}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${appointment.status === 'pending' ? `
                        <div class="flex space-x-2 ml-4">
                            <button
                                onclick="teacherDashboard.updateAppointmentStatus('${appointment.id}', 'approved')"
                                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center"
                            >
                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Approve
                            </button>
                            <button
                                onclick="teacherDashboard.updateAppointmentStatus('${appointment.id}', 'cancelled')"
                                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                            >
                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getStatusIcon(status) {
        const icons = {
            pending: '<svg class="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            approved: '<svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            cancelled: '<svg class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>',
            completed: '<svg class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        };
        return icons[status] || icons.pending;
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
        // Manage schedule button
        document.getElementById('manage-schedule-btn')?.addEventListener('click', () => {
            window.modals.showScheduleModal();
        });

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.filter = e.target.dataset.filter;
                this.render(document.getElementById('dashboard-content'));
            });
        });
    }

    async fetchAppointments() {
        try {
            const appointmentsSnapshot = await db.collection('appointments')
                .where('teacherId', '==', authManager.currentUser?.id)
                .get();
            
            this.appointments = appointmentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            logger.info('Teacher appointments fetched', authManager.currentUser?.id, authManager.currentUser?.role);
        } catch (error) {
            logger.error('Failed to fetch teacher appointments', authManager.currentUser?.id, authManager.currentUser?.role, error);
        }
    }

    async updateAppointmentStatus(appointmentId, status) {
        try {
            await db.collection('appointments').doc(appointmentId).update({
                status,
                updatedAt: new Date().toISOString()
            });
            
            const appointment = this.appointments.find(apt => apt.id === appointmentId);
            if (appointment) {
                appointment.status = status;
            }
            
            this.render(document.getElementById('dashboard-content'));
            logger.info('Appointment status updated', authManager.currentUser?.id, authManager.currentUser?.role, { appointmentId, status });
        } catch (error) {
            logger.error('Failed to update appointment status', authManager.currentUser?.id, authManager.currentUser?.role, { appointmentId, status, error });
        }
    }

    calculateStats() {
        return {
            total: this.appointments.length,
            pending: this.appointments.filter(a => a.status === 'pending').length,
            approved: this.appointments.filter(a => a.status === 'approved').length,
            completed: this.appointments.filter(a => a.status === 'completed').length
        };
    }
}

// Initialize teacher dashboard
window.teacherDashboard = new TeacherDashboard();