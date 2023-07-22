const app = Vue.createApp({
    data() {
        return {
            surname: '',
            name: '',
            position: '',
            descr: '',

            projects: [],
            newProject: {
                name: '',
                description: '',
                url: '',
            },

            newExperience: {
                companyName: '',
                position: '',
                workPeriod: '',
                responsibilities: '',
            },
            experiences: [],

            university: '',
            specialty: '',
            educationDate: '',
            country: '',

            softSkills: [],
            techSkills: [],

            contacts: {
                phone: '',
                email: '',
            },
        };
    },
    methods: {
        addProject() {
            // Перевірка на заповненість полів проекту перед додаванням
            if (this.newProject.name && this.newProject.description && this.newProject.url) {
                // Генеруємо унікальний ідентифікатор для нового проекту
                const newId = this.projects.length + 1;
                this.newProject.id = newId;

                // Додаємо новий проект до масиву projects
                this.projects.push(this.newProject);

                // Очищаємо дані з форми
                this.newProject = {
                    name: '',
                    description: '',
                    url: '',
                };
            } else {
                alert('Будь ласка, заповніть всі поля проекту.');
            }
        },

    addExperience() {
        // Перевірка на заповненість полів досвіду роботи перед додаванням
        if (
            this.newExperience.companyName &&
            this.newExperience.position &&
            this.newExperience.workPeriod &&
            this.newExperience.responsibilities
        ) {
            // Додаємо новий досвід роботи до масиву experiences
            this.experiences.push(this.newExperience);

            // Очищаємо дані з форми
            this.newExperience = {
                companyName: '',
                position: '',
                workPeriod: '',
                responsibilities: '',
            };
        } else {
            alert('Будь ласка, заповніть всі поля досвіду роботи.');
        }
    },

        addSoftSkill() {
            this.softSkills.push('');
        },
        removeSoftSkill(index) {
            this.softSkills.splice(index, 1);
        },
        //     tech skill
        addTechSkill() {
            this.techSkills.push('');
        },
        removeTechSkill(index) {
            this.techSkills.splice(index, 1);
        },

        formatPhoneNumber() {
            // Форматуємо номер телефону, видаляючи всі символи, крім цифр та знака "+"
            this.contacts.phone = this.contacts.phone.replace(/[^0-9+]/g, '');
        },

        formatEmail() {
            // Валідація для адреси електронної пошти з використанням регулярного виразу
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            if (!emailRegex.test(this.contacts.email)) {
                // Якщо адреса не відповідає формату, очищаємо поле
                this.contacts.email = '';
            }
        },

        computed: {
            telLink() {
                return 'tel:' + this.contacts.phone.replace(/[^0-9]/g, '');
            },
            emailLink() {
                return 'mailto:' + this.contacts.email;
            },
        },
    },
});

app.mount('#app')