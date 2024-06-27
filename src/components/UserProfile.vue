<template>
  <div class="user-profile">
    <div v-if="user" class="profile-details">
    <h2>Profil użytkownika:</h2>
      <img :src="user.photoURL || defaultPhoto" alt="Profile Picture" class="profile-picture" />
      <p>Email: {{ user.email }}</p>
      <p>Name: {{ user.displayName }}</p>
      <form @submit.prevent="uploadPhoto">
        <input type="file" @change="onFileChange" />
        <button type="submit">Prześlij zdjęcie</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      user: null,
      file: null,
      defaultPhoto: '/1.jpg' // Zamień na ścieżkę do domyślnego zdjęcia
    };
  },
  created() {
    const auth = getAuth();
    this.user = auth.currentUser;
  },
  methods: {
    async logout() {
      const auth = getAuth();
      await auth.signOut();
      this.$router.push('/login');
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadPhoto() {
      if (this.file) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${this.user.uid}`);
        await uploadBytes(storageRef, this.file);
        const photoURL = await getDownloadURL(storageRef);

        // Zaktualizuj profil użytkownika
        await updateProfile(this.user, { photoURL });

        // Zaktualizuj dane w Firestore
        const db = getFirestore();
        const userDoc = doc(db, "users", this.user.uid);
        await updateDoc(userDoc, { photoURL });

        // Odśwież dane użytkownika
        this.user = getAuth().currentUser;
      }
    }
  }
};
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.profile-details {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
}

button {
  font-size: 1.2rem;
  padding: 10px 20px;
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

p {
  margin: 10px 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

input[type="file"] {
  margin-bottom: 10px;
}
</style>
