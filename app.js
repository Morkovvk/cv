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
    },
});

app.mount('#app')