<template>
  <div class="register">
    <h2>Zarejestruj się</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Hasło</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="name">Nazwa</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="file">Zdjęcie profilowe</label>
        <input type="file" @change="onFileSelected" />
      </div>
      <button type="submit">Zarejestruj się</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      file: null,
      error: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.file = event.target.files[0];
    },
    async register() {
      this.error = null;
      const auth = getAuth();
      const db = getFirestore();
      const storage = getStorage();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // Update the user's profile with the display name
        await updateProfile(user, {
          displayName: this.name,
        });

        // Upload profile picture
        let photoURL = null;
        if (this.file) {
          const storageRef = ref(storage, `profilePictures/${user.uid}/${this.file.name}`);
          await uploadBytes(storageRef, this.file);
          photoURL = await getDownloadURL(storageRef);
          await updateProfile(user, { photoURL });
        }

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: this.name,
          photoURL: photoURL,
        });

        this.$emit('login', true);
        this.$router.push('/profile');
      } catch (err) {
        this.error = "Błąd rejestracji: " + err.message;
      }
    }
  }
};
</script>

<style scoped>
.register {
  color: black;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"],
input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4a6da7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
