<template>

  <div id="app">
    <h1>Resume constructor</h1>
    <!--    <img src="C:\cv\img\portret.png">-->
    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="My photo" width="300px" class="my-photo">

    <!--    запитати як додати картинку у в'ю, бо не показувало її-->
    <!--     сайдбар-->
    <!--     тут вагалась, що брати: v-model чи v-bind. чат порекомендував v-model-->
    <div>
      <h1>
        <label> {{surname}}</label>
        &nbsp;
        <label> {{name}} </label>
      </h1>
      <h4>
        <label>{{position}} </label>
      </h4>
      <p>About you: <br> {{descr}} </p>
      <input type="text" v-model="surname" placeholder="Your surname"><br>
      <input type="text" v-model="name" placeholder="Your name"><br>
      <input type="text" v-model="position" placeholder="Your position"/><br>
      <textarea type="text" v-model="descr"  placeholder="About yourself"></textarea>
    </div>

    <!--my project-->
    <div>
      <h3>My projects</h3>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <a :href="project.url">{{ project.name }}</a>
          <p>{{ project.description }}</p>
        </li>
      </ul>

      <form @submit.prevent="addProject">
        <label for="project-name"></label>
        <input type="text" id="project-name" v-model="newProject.name" placeholder="Project name:"><br>
        <label for="project-description"></label>
        <input type="text" id="project-description" v-model="newProject.description" placeholder="Project description:"><br>
        <label for="project-url"></label>
        <input type="text" id="project-url" v-model="newProject.url" placeholder="Project URL:"><br>

        <button type="submit">Add Project</button>
      </form>
    </div>

    <!-- Work Experience -->

    <div>
      <h3>Work Experience</h3>
      <div v-if="experiences.length > 0">
        <h4>Registered experience:</h4>
        <ul>
          <li v-for="(experience, index) in experiences" :key="index">
            <p><strong>Company:</strong> {{ experience.companyName }}</p>
            <p><strong>Position:</strong> {{ experience.position }}</p>
            <p><strong>Work period:</strong> {{ experience.workPeriod }}</p>
            <p><strong>Responsibilities:</strong> {{ experience.responsibilities }}</p>
          </li>
        </ul>
      </div>

      <form @submit.prevent="addExperience">
        <label for="company-name"></label>
        <input type="text" id="company-name" v-model="newExperience.companyName" placeholder="Company name"><br>

        <label for="position"></label>
        <input type="text" id="position" v-model="newExperience.position" placeholder="Position"><br>

        <label for="work-period"></label>
        <input type="text" id="work-period" v-model="newExperience.workPeriod" placeholder="work-period"><br>

        <label for="responsibilities"></label>
        <textarea id="responsibilities" v-model="newExperience.responsibilities" placeholder="Responsibilities"></textarea><br>

        <button type="submit">Add experience</button>
      </form>
    </div>

    <!--    education -->
    <div>
      <h3 class="main-content-title">Education</h3>

      <label for="university"> {{ university }}</label><br>
      <label for="specialty"> {{ specialty }}</label><br>
      <label for="education-date"> {{ educationDate }}</label><br>
      <label for="country"> {{ country }}</label><br><br>

      <input type="text" id="university" v-model="university" placeholder="University"/><br>
      <input type="text" id="specialty" v-model="specialty" placeholder="Specialty:" /><br>
      <input type="text" id="education-date" v-model="educationDate" placeholder="Date:" /><br>
      <input type="text" id="country" v-model="country" placeholder="Country:"/>
    </div>

    <!--  Soft Skills-->
    <div>
      <h3 class="main-content-title">Soft Skills</h3>

      <div v-if="softSkills.length > 0">
        <h4>Registered Soft Skills: </h4>
        <ul>
          <li v-for="(skill, index) in softSkills" :key="index">{{ skill }}</li>
        </ul>
      </div>

      <div v-for="(skill, index) in softSkills" :key="index">
        <input type="text" v-model="softSkills[index]" />
        <button @click="removeSoftSkill(index)">Delete</button>
      </div>
      <button @click="addSoftSkill">Add Soft Skill</button>
    </div>

    <!--  Tech Skills  -->

    <div>
      <h3 class="main-content-title">Tech Skills</h3>

      <div v-if="techSkills.length > 0">
        <h4>Registered Tech Skills: </h4>
        <ul>
          <li v-for="(skill, index) in techSkills" :key="index">{{ skill }}</li>
        </ul>
      </div>

      <div v-for="(skill, index) in techSkills" :key="index">
        <input type="text" v-model="techSkills[index]" />
        <button @click="removeTechSkill(index)">Delete</button>
      </div>
      <button @click="addTechSkill">Add Tech Skill</button>
    </div>

    <div class="contacts">
      <h3 class="sidebar-title">Contacts</h3>
      <p class="contacts-item">
        <span class="contacts-type">N: </span>
        <input v-model="contacts.phone" class="contacts-number" @input="formatPhoneNumber" maxlength="13" placeholder="Your phone number" />
      </p>
      <p class="contacts">
        <span class="contacts-type">E: </span>
        <input v-model="contacts.email" class="contacts-email" @input="formatEmail" placeholder="Your e-mail" />
      </p>
    </div>

  </div>
</template>

<script>
export default {
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
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
