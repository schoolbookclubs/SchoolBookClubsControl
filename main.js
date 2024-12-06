document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const menuIcon = sidebarCollapse.querySelector('i');

    sidebarCollapse.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Hide sidebar after clicking a link on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Add School Form Handler
    const addSchoolForm = document.getElementById('addSchoolForm');
    if (addSchoolForm) {
        addSchoolForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loadingSpinner = document.getElementById('loadingSpinner');
            const buttonText = document.getElementById('buttonText');
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            const modalMessage = document.getElementById('modalMessage');

            // Show loading state
            submitBtn.disabled = true;
            loadingSpinner.classList.remove('d-none');
            buttonText.textContent = 'جاري الإنشاء...';

            try {
                const schoolData = {
                    name: document.getElementById('schoolName').value,
                    code: document.getElementById('schoolCode').value
                };

                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/school/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(schoolData)
                });

                const data = await response.json();

                if (response.ok) {
                    modalMessage.textContent = data.message;
                    modalMessage.className = 'message-text mb-4 text-success';
                    document.querySelector('.success-icon').style.display = 'inline-block';
                    document.querySelector('.error-icon').style.display = 'none';
                    addSchoolForm.reset();
                } else {
                    throw new Error(data.message || 'حدث خطأ أثناء إنشاء المدرسة');
                }
            } catch (error) {
                modalMessage.textContent = error.message || 'حدث خطأ أثناء إنشاء المدرسة';
                modalMessage.className = 'message-text mb-4 text-danger';
                document.querySelector('.success-icon').style.display = 'none';
                document.querySelector('.error-icon').style.display = 'inline-block';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                loadingSpinner.classList.add('d-none');
                buttonText.textContent = 'إنشاء مدرسة جديدة';
                
                // Show message modal
                messageModal.show();
            }
        });
    }

    // Add Supervisor Form Handler
    const addSupervisorForm = document.getElementById('addSupervisorForm');
    if (addSupervisorForm) {
        addSupervisorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loadingSpinner = document.getElementById('loadingSpinner');
            const buttonText = document.getElementById('buttonText');
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            const modalMessage = document.getElementById('modalMessage');

            // Show loading state
            submitBtn.disabled = true;
            loadingSpinner.classList.remove('d-none');
            buttonText.textContent = 'جاري الإنشاء...';

            try {
                const supervisorData = {
                    name: document.getElementById('supervisorName').value,
                    email: document.getElementById('supervisorEmail').value,
                    schoolCode: document.getElementById('schoolCode').value,
                    role: "مشرف" // Fixed role value
                };

                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/Supervisor/signupSupervisor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(supervisorData)
                });

                const data = await response.json();
                console.log('API Response:', data);

                if (response.ok) {
                    const messageElement = document.querySelector('.message-text');
                    messageElement.textContent = data.message || 'تم إنشاء المشرف بنجاح';
                    messageElement.className = 'message-text mb-4 text-success';
                    document.querySelector('.success-icon').style.display = 'inline-block';
                    document.querySelector('.error-icon').style.display = 'none';
                    addSupervisorForm.reset();
                } else {
                    throw new Error(data.message || 'حدث خطأ أثناء إنشاء المشرف');
                }
            } catch (error) {
                const messageElement = document.querySelector('.message-text');
                messageElement.textContent = error.message || 'حدث خطأ أثناء إنشاء المشرف';
                messageElement.className = 'message-text mb-4 text-danger';
                document.querySelector('.success-icon').style.display = 'none';
                document.querySelector('.error-icon').style.display = 'inline-block';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                loadingSpinner.classList.add('d-none');
                buttonText.textContent = 'إنشاء مشرف جديد';
                
                // Show message modal
                messageModal.show();
            }
        });
    }

    // Add Teacher Form Handler
    const addTeacherForm = document.getElementById('addTeacherForm');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const loadingSpinner = document.getElementById('loadingSpinner');
            const buttonText = document.getElementById('buttonText');
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            const messageText = document.querySelector('.message-text');
            const successIcon = document.querySelector('.success-icon');
            const errorIcon = document.querySelector('.error-icon');

            // Show loading state
            submitBtn.disabled = true;
            loadingSpinner.classList.remove('d-none');
            buttonText.textContent = 'جاري الإنشاء...';

            try {
                const teacherData = {
                    name: document.getElementById('teacherName').value,
                    email: document.getElementById('teacherEmail').value,
                    schoolCode: document.getElementById('schoolCode').value,
                    role: "معلم" // Fixed role value
                };

                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/Teacher/signupTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(teacherData)
                });

                const data = await response.json();

                if (response.ok) {
                    messageText.textContent = data.message ;
                    messageText.className = 'message-text mb-4 text-success';
                    successIcon.style.display = 'inline-block';
                    errorIcon.style.display = 'none';
                    addTeacherForm.reset();
                } else {
                    throw new Error(data.message || 'حدث خطأ أثناء إنشاء المعلم');
                }
            } catch (error) {
                messageText.textContent = error.message || 'حدث خطأ أثناء إنشاء المعلم';
                messageText.className = 'message-text mb-4 text-danger';
                successIcon.style.display = 'none';
                errorIcon.style.display = 'inline-block';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                loadingSpinner.classList.add('d-none');
                buttonText.textContent = 'إنشاء معلم جديد';
                
                // Show message modal
                messageModal.show();
            }
        });
    }

    // Supervisors Page Functionality
    const supervisorsTableBody = document.getElementById('supervisorsTableBody');
    if (supervisorsTableBody) {
        // Function to show/hide loading
        function toggleLoading(show) {
            const loadingElement = document.getElementById('loading');
            const contentElement = document.getElementById('supervisorsContent');
            if (show) {
                loadingElement.style.display = 'flex';
                contentElement.style.display = 'none';
            } else {
                loadingElement.style.display = 'none';
                contentElement.style.display = 'block';
            }
        }

        // Load supervisors on page load
        async function loadSupervisors() {
            toggleLoading(true);
            try {
                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/Supervisor/');
                if (!response.ok) {
                    throw new Error('فشل في تحميل البيانات من السيرفر');
                }
                const data = await response.json();
                
                if (!data.data || !Array.isArray(data.data)) {
                    throw new Error('تنسيق البيانات غير صحيح');
                }

                supervisorsTableBody.innerHTML = data.data.map(supervisor => `
                    <tr>
                        <td>${supervisor.name}</td>
                        <td>${supervisor.email}</td>
                        <td>${supervisor.role}</td>
                        <td>${supervisor.schoolCode}</td>
                        <td>${supervisor.schoolId ? supervisor.schoolId.name : 'غير محدد'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary ms-2" onclick="editSupervisor('${supervisor._id}', '${supervisor.name}', '${supervisor.email}', '${supervisor.schoolCode}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteSupervisor('${supervisor._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error loading supervisors:', error);
                supervisorsTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-danger">
                            ${error.message || 'حدث خطأ أثناء تحميل بيانات المشرفين'}
                        </td>
                    </tr>
                `;
            } finally {
                toggleLoading(false);
            }
        }

        // Call loadSupervisors when page loads
        loadSupervisors();

        // Global functions for edit and delete
        window.editSupervisor = function(id, name, email, schoolCode) {
            document.getElementById('editSupervisorId').value = id;
            document.getElementById('editSupervisorName').value = name;
            document.getElementById('editSupervisorEmail').value = email;
            document.getElementById('editSchoolCode').value = schoolCode;
            new bootstrap.Modal(document.getElementById('editSupervisorModal')).show();
        };

        window.deleteSupervisor = async function(id) {
            if (confirm('هل أنت متأكد من حذف هذا المشرف؟')) {
                try {
                    const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/Supervisor/${id}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('فشل في حذف المشرف');
                    }

                    const data = await response.json();
                    const messageElement = document.querySelector('.message-text');
                    messageElement.textContent = data.message || 'تم حذف المشرف بنجاح';
                    messageElement.className = 'message-text mb-4 text-success';
                    document.querySelector('.success-icon').style.display = 'inline-block';
                    document.querySelector('.error-icon').style.display = 'none';
                    
                    // Reload supervisors list
                    loadSupervisors();
                    
                    // Show message modal
                    new bootstrap.Modal(document.getElementById('messageModal')).show();
                } catch (error) {
                    const messageElement = document.querySelector('.message-text');
                    messageElement.textContent = error.message || 'حدث خطأ أثناء حذف المشرف';
                    messageElement.className = 'message-text mb-4 text-danger';
                    document.querySelector('.success-icon').style.display = 'none';
                    document.querySelector('.error-icon').style.display = 'inline-block';
                    new bootstrap.Modal(document.getElementById('messageModal')).show();
                }
            }
        };

        // Edit Supervisor Form Handler
        const editSupervisorForm = document.getElementById('editSupervisorForm');
        if (editSupervisorForm) {
            editSupervisorForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const supervisorId = document.getElementById('editSupervisorId').value;
                const supervisorData = {
                    name: document.getElementById('editSupervisorName').value,
                    email: document.getElementById('editSupervisorEmail').value,
                    schoolCode: document.getElementById('editSchoolCode').value,
                    role: "مشرف" // Keep the role fixed
                };

                try {
                    const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/Supervisor/${supervisorId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(supervisorData)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        const messageElement = document.querySelector('.message-text');
                        messageElement.textContent = data.message || 'تم تحديث بيانات المشرف بنجاح';
                        messageElement.className = 'message-text mb-4 text-success';
                        document.querySelector('.success-icon').style.display = 'inline-block';
                        document.querySelector('.error-icon').style.display = 'none';
                        
                        // Close edit modal
                        bootstrap.Modal.getInstance(document.getElementById('editSupervisorModal')).hide();
                        
                        // Reload supervisors list
                        loadSupervisors();
                    } else {
                        throw new Error(data.message || 'حدث خطأ أثناء تحديث بيانات المشرف');
                    }
                } catch (error) {
                    const messageElement = document.querySelector('.message-text');
                    messageElement.textContent = error.message || 'حدث خطأ أثناء تحديث بيانات المشرف';
                    messageElement.className = 'message-text mb-4 text-danger';
                    document.querySelector('.success-icon').style.display = 'none';
                    document.querySelector('.error-icon').style.display = 'inline-block';
                } finally {
                    // Show message modal
                    new bootstrap.Modal(document.getElementById('messageModal')).show();
                }
            });
        }
    }

    // Schools Page Functionality
    const schoolsTableBody = document.getElementById('schoolsTableBody');
    if (schoolsTableBody) {
        // Function to show/hide loading
        function toggleLoading(show) {
            const loadingElement = document.getElementById('loading');
            const contentElement = document.getElementById('schoolsContent');
            if (show) {
                loadingElement.style.display = 'flex';
                contentElement.style.display = 'none';
            } else {
                loadingElement.style.display = 'none';
                contentElement.style.display = 'block';
            }
        }

        // Load schools on page load
        async function loadSchools() {
            toggleLoading(true);
            try {
                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/school/');
                if (!response.ok) {
                    throw new Error('فشل في تحميل البيانات من السيرفر');
                }
                const data = await response.json();
                if (!data.data || !Array.isArray(data.data)) {
                    throw new Error('تنسيق البيانات غير صحيح');
                }
                schoolsTableBody.innerHTML = data.data.map(school => `
                    <tr>
                        <td>${school.name}</td>
                        <td>${school.code}</td>
                        <td>
                            <button class="btn btn-sm btn-primary ms-2" onclick="editSchool('${school._id}', '${school.name}', '${school.code}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteSchool('${school._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error loading schools:', error);
                schoolsTableBody.innerHTML = `
                    <tr>
                        <td colspan="3" class="text-center text-danger">
                            ${error.message || 'حدث خطأ أثناء تحميل بيانات المدارس'}
                        </td>
                    </tr>
                `;
            } finally {
                toggleLoading(false);
            }
        }

        // Call loadSchools when page loads
        loadSchools();

        // Global functions for edit and delete
        window.editSchool = function(id, name, code) {
            document.getElementById('editSchoolId').value = id;
            document.getElementById('editSchoolName').value = name;
            document.getElementById('editSchoolCode').value = code;
            new bootstrap.Modal(document.getElementById('editSchoolModal')).show();
        };

        window.deleteSchool = async function(id) {
            if (confirm('هل أنت متأكد من حذف هذه المدرسة؟')) {
                try {
                    const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/school/delete/${id}`, {
                        method: 'DELETE'
                    });
                    const data = await response.json();
                    
                    if (response.ok) {
                        showMessage(data.message, true);
                        loadSchools(); // Reload the schools list
                    } else {
                        throw new Error(data.message || 'حدث خطأ أثناء حذف المدرسة');
                    }
                } catch (error) {
                    showMessage(error.message || 'حدث خطأ أثناء حذف المدرسة', false);
                }
            }
        };

        // Edit School Form Handler
        const editSchoolForm = document.getElementById('editSchoolForm');
        editSchoolForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = editSchoolForm.querySelector('button[type="submit"]');
            const loadingSpinner = document.getElementById('editLoadingSpinner');
            const buttonText = document.getElementById('editButtonText');

            // Show loading state
            submitBtn.disabled = true;
            loadingSpinner.classList.remove('d-none');
            buttonText.textContent = 'جاري الحفظ...';

            try {
                const schoolId = document.getElementById('editSchoolId').value;
                const schoolData = {
                    name: document.getElementById('editSchoolName').value,
                    code: document.getElementById('editSchoolCode').value
                };

                const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/school/update/${schoolId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(schoolData)
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage(data.message, true);
                    loadSchools(); // Reload the schools list
                    bootstrap.Modal.getInstance(document.getElementById('editSchoolModal')).hide();
                } else {
                    throw new Error(data.message || 'حدث خطأ أثناء تحديث بيانات المدرسة');
                }
            } catch (error) {
                showMessage(error.message || 'حدث خطأ أثناء تحديث بيانات المدرسة', false);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                loadingSpinner.classList.add('d-none');
                buttonText.textContent = 'حفظ التغييرات';
            }
        });
    }

    // Teachers Page Functionality
    const teachersTableBody = document.getElementById('teachersTableBody');
    if (teachersTableBody) {
        // Function to toggle loading state
        function toggleLoading(show) {
            const loadingContainer = document.getElementById('loading');
            const teachersContent = document.getElementById('teachersContent');
            
            if (show) {
                loadingContainer.style.display = 'flex';
                teachersContent.style.display = 'none';
            } else {
                loadingContainer.style.display = 'none';
                teachersContent.style.display = 'block';
            }
        }

        // Function to load teachers
        async function loadTeachers() {
            toggleLoading(true);
            try {
                const response = await fetch('https://school-book-clubs-backend.vercel.app/api/Teacher');
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('Teachers data:', data); // Debug log

                teachersTableBody.innerHTML = data.data.map(teacher => `
                    <tr>
                        <td>${teacher.name}</td>
                        <td>${teacher.email}</td>
                        <td>${teacher.role}</td>
                        <td>${teacher.schoolCode}</td>
                        <td>${teacher.schoolId ? teacher.schoolId.name : ''}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editTeacher('${teacher._id}', '${teacher.name}', '${teacher.email}', '${teacher.schoolCode}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTeacher('${teacher._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
            } catch (error) {
                console.error('Error loading teachers:', error); // Debug log
                showMessage(`حدث خطأ أثناء تحميل بيانات المعلمين: ${error.message}`, false);
            } finally {
                toggleLoading(false);
            }
        }

        // Function to show message modal
        function showMessage(message, isSuccess) {
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            const messageText = document.querySelector('.message-text');
            const successIcon = document.querySelector('.success-icon');
            const errorIcon = document.querySelector('.error-icon');

            messageText.textContent = message;
            successIcon.style.display = isSuccess ? 'inline-block' : 'none';
            errorIcon.style.display = isSuccess ? 'none' : 'inline-block';
            messageText.className = `message-text mb-4 ${isSuccess ? 'text-success' : 'text-danger'}`;

            messageModal.show();
        }

        // Global functions for edit and delete
        window.editTeacher = function(id, name, email, schoolCode) {
            const editModal = new bootstrap.Modal(document.getElementById('editTeacherModal'));
            document.getElementById('editTeacherId').value = id;
            document.getElementById('editTeacherName').value = name;
            document.getElementById('editTeacherEmail').value = email;
            document.getElementById('editSchoolCode').value = schoolCode;
            editModal.show();
        };

        window.deleteTeacher = async function(id) {
            if (confirm('هل أنت متأكد من حذف هذا المعلم؟')) {
                try {
                    const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/Teacher/${id}`, {
                        method: 'DELETE'
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showMessage(data.message, true);
                        loadTeachers();
                    } else {
                        throw new Error(data.message || 'حدث خطأ أثناء حذف المعلم');
                    }
                } catch (error) {
                    showMessage(error.message || 'حدث خطأ أثناء حذف المعلم', false);
                }
            }
        };

        // Edit Teacher Form Handler
        const editTeacherForm = document.getElementById('editTeacherForm');
        if (editTeacherForm) {
            editTeacherForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const teacherId = document.getElementById('editTeacherId').value;
                const teacherData = {
                    name: document.getElementById('editTeacherName').value,
                    email: document.getElementById('editTeacherEmail').value,
                    schoolCode: document.getElementById('editSchoolCode').value,
                    role: "معلم" // Fixed role value
                };

                try {
                    const response = await fetch(`https://school-book-clubs-backend.vercel.app/api/Teacher/${teacherId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(teacherData)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        showMessage(data.message, true);
                        bootstrap.Modal.getInstance(document.getElementById('editTeacherModal')).hide();
                        loadTeachers();
                    } else {
                        throw new Error(data.message || 'حدث خطأ أثناء تحديث بيانات المعلم');
                    }
                } catch (error) {
                    showMessage(error.message || 'حدث خطأ أثناء تحديث بيانات المعلم', false);
                }
            });
        }

        // Call loadTeachers when page loads
        loadTeachers();
    }

    // Function to show message modal
    function showMessage(message, isSuccess) {
        const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
        const messageText = document.querySelector('.message-text');
        const successIcon = document.querySelector('.success-icon');
        const errorIcon = document.querySelector('.error-icon');

        messageText.textContent = message;
        successIcon.style.display = isSuccess ? 'inline-block' : 'none';
        errorIcon.style.display = isSuccess ? 'none' : 'inline-block';
        messageText.className = `message-text mb-4 ${isSuccess ? 'text-success' : 'text-danger'}`;

        messageModal.show();
    }
});