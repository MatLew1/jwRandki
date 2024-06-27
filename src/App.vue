<template>
  <div id="app">
    <header>
      <h1>Witaj w jwRandki</h1>
      <img src="/1.jpg" class="header-background" alt="Header Background" />
      <nav v-if="!isLoggedIn">
        <button @click="goToLogin">Zaloguj się</button>
        <button @click="goToRegister">Zarejestruj się</button>
      </nav>
      <nav v-else>
        <button @click="goToProfile">Profil</button>
        <button @click="logout">Wyloguj się</button>
      </nav>
    </header>
    <main>
      <router-view @login="handleLogin"></router-view>
    </main>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  data() {
    return {
      isLoggedIn: false,
      user: null
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
      } else {
        this.isLoggedIn = false;
        this.user = null;
      }
    });
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    async logout() {
      const auth = getAuth();
      await signOut(auth);
      this.isLoggedIn = false;
      this.user = null;
      this.$router.push('/login');
    },
    handleLogin(status) {
      this.isLoggedIn = status;
    }
  }
};
</script>

<style scoped>
#app {
  border-radius: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #292929;
}

.container {
  max-width: 600px;
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.button-container button {
  margin: 0 10px;
}

.form-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  padding-top: 20px;
  margin-left: 20px;
  display: block;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 1rem;
  width: 80%;
  padding: 10px;
  background-color: #4a6da7;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.header-background {
  width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 10px;
}
</style>
