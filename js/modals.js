// Modals management
class ModalsManager {
    constructor() {
        this.container = document.getElementById('modals-container');
    }

    showAddTeacherModal() {
        this.container.innerHTML = `
            <div class="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900">Add New Teacher</h2>
                        <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form id="add-teacher-form" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input type="text" name="name" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter teacher's full name" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input type="email" name="email" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter teacher's email" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <input type="text" name="department" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Computer Science" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <input type="text" name="subject" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Data Structures" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input type="password" name="password" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Create temporary password" required minlength="6" />
                            </div>
                            <p class="text-xs text-gray-500 mt-1">The teacher can change this password after first login</p>
                        </div>

                        <div id="add-teacher-error" class="hidden bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"></div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" id="cancel-add-teacher" class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                            <button type="submit" id="submit-add-teacher" class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Add Teacher</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.attachAddTeacherListeners();
    }

    showEditTeacherModal(teacher) {
        this.container.innerHTML = `
            <div class="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-md w-full">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900">Edit Teacher</h2>
                        <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form id="edit-teacher-form" class="p-6 space-y-4">
                        <input type="hidden" name="teacherId" value="${teacher.id}" />
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input type="text" name="name" value="${teacher.name}" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input type="email" name="email" value="${teacher.email}" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <input type="text" name="department" value="${teacher.department}" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <input type="text" name="subject" value="${teacher.subject}" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                            </div>
                        </div>

                        <div id="edit-teacher-error" class="hidden bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"></div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" id="cancel-edit-teacher" class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                            <button type="submit" id="submit-edit-teacher" class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Update Teacher</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.attachEditTeacherListeners();
    }

    showBookAppointmentModal(teacher) {
        // Generate time slots
        const timeSlots = [];
        for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
                timeSlots.push({ value: time24, label: time12 });
            }
        }

        // Get minimum date (tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];

        this.container.innerHTML = `
            <div class="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-900">Book Appointment</h2>
                            <p class="text-sm text-gray-600">with ${teacher.name}</p>
                        </div>
                        <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form id="book-appointment-form" class="p-6 space-y-4">
                        <input type="hidden" name="teacherId" value="${teacher.id}" />
                        
                        <div class="bg-gray-50 rounded-lg p-4 mb-4">
                            <h3 class="font-medium text-gray-900 mb-2">${teacher.name}</h3>
                            <p class="text-sm text-gray-600">Department: ${teacher.department}</p>
                            <p class="text-sm text-gray-600">Subject: ${teacher.subject}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Preferred Date *
                            </label>
                            <input type="date" name="date" min="${minDate}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Preferred Time *
                            </label>
                            <select name="time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                                <option value="">Select a time</option>
                                ${timeSlots.map(slot => `<option value="${slot.value}">${slot.label}</option>`).join('')}
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Purpose of Appointment *
                            </label>
                            <input type="text" name="purpose" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Discuss assignment, Course guidance, Project review" required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Additional Message (Optional)
                            </label>
                            <textarea name="message" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Any additional details or questions..."></textarea>
                        </div>

                        <div id="book-appointment-error" class="hidden bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"></div>

                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p class="text-xs text-blue-700">
                                <strong>Note:</strong> Your appointment request will be sent to the teacher for review. 
                                You'll receive a notification once it's approved or if any changes are needed.
                            </p>
                        </div>

                        <div class="flex space-x-3 pt-4">
                            <button type="button" id="cancel-book-appointment" class="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                            <button type="submit" id="submit-book-appointment" class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Book Appointment</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.attachBookAppointmentListeners();
    }

    showScheduleModal() {
        this.container.innerHTML = `
            <div class="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                    <div class="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 class="text-xl font-semibold text-gray-900">Manage Schedule</h2>
                        <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-6">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div class="flex items-start">
                                <svg class="h-5 w-5 text-blue-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 class="text-sm font-medium text-blue-800 mb-1">Schedule Management</h3>
                                    <p class="text-sm text-blue-700">
                                        This feature allows you to set your availability hours and manage your appointment schedule. 
                                        Students will only be able to book appointments during your available time slots.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-gray-50 rounded-lg p-6">
                                <div class="flex items-center mb-4">
                                    <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h3 class="font-medium text-gray-900">Weekly Schedule</h3>
                                </div>
                                <p class="text-sm text-gray-600 mb-4">
                                    Set your available days and time slots for student appointments.
                                </p>
                                <div class="space-y-3">
                                    ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => `
                                        <div class="flex items-center justify-between p-3 bg-white rounded border">
                                            <span class="text-sm font-medium text-gray-700">${day}</span>
                                            <span class="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="bg-gray-50 rounded-lg p-6">
                                <div class="flex items-center mb-4">
                                    <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 class="font-medium text-gray-900">Time Slots</h3>
                                </div>
                                <p class="text-sm text-gray-600 mb-4">
                                    Configure appointment duration and buffer time between appointments.
                                </p>
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between p-3 bg-white rounded border">
                                        <span class="text-sm font-medium text-gray-700">Appointment Duration</span>
                                        <span class="text-sm text-gray-500">30 minutes</span>
                                    </div>
                                    <div class="flex items-center justify-between p-3 bg-white rounded border">
                                        <span class="text-sm font-medium text-gray-700">Buffer Time</span>
                                        <span class="text-sm text-gray-500">15 minutes</span>
                                    </div>
                                    <div class="flex items-center justify-between p-3 bg-white rounded border">
                                        <span class="text-sm font-medium text-gray-700">Max Daily Appointments</span>
                                        <span class="text-sm text-gray-500">8</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 class="font-medium text-yellow-800 mb-2">Coming Soon</h4>
                            <p class="text-sm text-yellow-700">
                                Advanced scheduling features including custom time slots, holiday management, and recurring availability 
                                patterns will be available in the next update.
                            </p>
                        </div>

                        <div class="flex justify-end pt-6">
                            <button id="close-schedule-modal" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachScheduleModalListeners();
    }

    closeModal() {
        this.container.innerHTML = '';
    }

    attachAddTeacherListeners() {
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancel-add-teacher').addEventListener('click', () => this.closeModal());
        
        document.getElementById('add-teacher-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            const submitBtn = document.getElementById('submit-add-teacher');
            const errorDiv = document.getElementById('add-teacher-error');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Adding...';
            errorDiv.classList.add('hidden');

            try {
                // Create Firebase Auth user
                const userCredential = await auth.createUserWithEmailAndPassword(data.email, data.password);
                
                // Create teacher object
                const teacher = {
                    id: userCredential.user.uid,
                    email: data.email,
                    name: data.name,
                    role: 'teacher',
                    department: data.department,
                    subject: data.subject,
                    approved: true,
                    createdAt: new Date().toISOString()
                };

                // Save to both users and teachers collections
                await db.collection('users').doc(teacher.id).set({
                    id: teacher.id,
                    email: teacher.email,
                    name: teacher.name,
                    role: teacher.role,
                    approved: teacher.approved,
                    createdAt: teacher.createdAt
                });

                await db.collection('user').doc(teacher.id).set(teacher);

                logger.info('Teacher added successfully by admin', authManager.currentUser?.id, authManager.currentUser?.role, { teacherId: teacher.id, teacherEmail: teacher.email });
                
                this.closeModal();
                if (window.adminDashboard) {
                    window.adminDashboard.refreshData();
                }
            } catch (err) {
                errorDiv.textContent = err.message || 'Failed to add teacher';
                errorDiv.classList.remove('hidden');
                logger.error('Failed to add teacher', authManager.currentUser?.id, authManager.currentUser?.role, { error: err.message, teacherEmail: data.email });
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Add Teacher';
            }
        });
    }

    attachEditTeacherListeners() {
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancel-edit-teacher').addEventListener('click', () => this.closeModal());
        
        document.getElementById('edit-teacher-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            const submitBtn = document.getElementById('submit-edit-teacher');
            const errorDiv = document.getElementById('edit-teacher-error');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Updating...';
            errorDiv.classList.add('hidden');

            try {
                // Update both users and teachers collections
                await db.collection('users').doc(data.teacherId).update({
                    name: data.name,
                    email: data.email
                });

                await db.collection('users').doc(data.teacherId).update({
                    name: data.name,
                    email: data.email,
                    department: data.department,
                    subject: data.subject
                });

                logger.info('Teacher updated successfully by admin', authManager.currentUser?.id, authManager.currentUser?.role, { teacherId: data.teacherId });
                
                this.closeModal();
                if (window.adminDashboard) {
                    window.adminDashboard.refreshData();
                }
            } catch (err) {
                errorDiv.textContent = err.message || 'Failed to update teacher';
                errorDiv.classList.remove('hidden');
                logger.error('Failed to update teacher', authManager.currentUser?.id, authManager.currentUser?.role, { error: err.message, teacherId: data.teacherId });
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Update Teacher';
            }
        });
    }

    attachBookAppointmentListeners() {
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancel-book-appointment').addEventListener('click', () => this.closeModal());
        
        document.getElementById('book-appointment-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            const submitBtn = document.getElementById('submit-book-appointment');
            const errorDiv = document.getElementById('book-appointment-error');
            
            if (!data.date || !data.time || !data.purpose) {
                errorDiv.textContent = 'Please fill in all required fields';
                errorDiv.classList.remove('hidden');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Booking...';
            errorDiv.classList.add('hidden');

            try {
                await window.studentDashboard.handleBookAppointment({
                    teacherId: data.teacherId,
                    date: data.date,
                    time: data.time,
                    purpose: data.purpose,
                    message: data.message
                });
                
                this.closeModal();
            } catch (err) {
                errorDiv.textContent = err.message || 'Failed to book appointment';
                errorDiv.classList.remove('hidden');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Book Appointment';
            }
        });
    }

    attachScheduleModalListeners() {
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('close-schedule-modal').addEventListener('click', () => this.closeModal());
    }
}

// Initialize modals manager
window.modals = new ModalsManager();