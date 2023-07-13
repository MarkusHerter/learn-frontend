<script setup lang="ts">
import { ref } from "vue";
import { signup } from "@/apicalls";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { token } from "@/store";
import isEmail from "validator/lib/isEmail";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const hidden = ref<boolean>(true);

const handleSubmit = async () => {
  if (!isEmail(email.value)) {
    errorMessage.value = "Bitte gib eine korrekte E-Mail Adresse an.";
    return;
  }
  if (password.value.length < 8) {
    errorMessage.value = "Das Passwort muss mindestens 8 Zeichen haben";
    return;
  }
  const response = await signup(name.value, email.value, password.value);
  if (response?.errorMessage) {
    errorMessage.value = response.errorMessage;
  } else {
    token.value = "";
    router.push("/login");
  }
};
</script>

<template>
  <div class="main">
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10vh;
      "
    >
      <h1 style="font-size: 300%; margin-bottom: 5rem; text-align: center">
        Markus' supertolle Lernboxenbox
      </h1>
      <h2 style="font-size: 2rem">Signup</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="Name" style="display: block; font-size: large"
            >Name:</label
          >
          <input
            type="text"
            id="name"
            style="
              font-size: large;
              width: 100%;
              padding: 0.2rem 0.1rem 0.2rem 0.1rem;
            "
            v-model="name"
            required
          />
        </div>
        <div>
          <label for="email" style="display: block; font-size: large"
            >Email:</label
          >
          <input
            id="email"
            style="
              font-size: large;
              width: 100%;
              padding: 0.2rem 0.1rem 0.2rem 0.1rem;
            "
            v-model="email"
            required
          />
        </div>
        <div>
          <label for="password" style="display: block; font-size: large"
            >Password:</label
          >
          <div style="position: relative">
            <input
              :type="hidden ? 'password' : 'text'"
              id="password"
              style="
                font-size: large;
                padding: 0.2rem 0.1rem 0.2rem 0.5rem;
                padding-right: 2.5rem;
              "
              v-model="password"
              required
            />
            <span
              style="
                position: absolute;
                right: 0.4rem;
                top: 50%;
                transform: translateY(-45%);
              "
            >
              <Icon
                style="color: var(--vt-c-text-light-2)"
                :width="30"
                :height="30"
                :icon="hidden ? 'fa:eye-slash' : 'fa:eye'"
                @click="() => (hidden = !hidden)"
              ></Icon>
            </span>
          </div>
        </div>
        <div style="display: flex; justify-content: center">
          <button
            type="submit"
            style="
              margin: 1rem 1rem 1rem 0;
              color: var(--color-text);
              font-size: large;
            "
            class="smallButton"
          >
            Signup
          </button>
          <button
            type="button"
            @click="() => router.push('/login')"
            style="
              margin: 1rem 0 1rem 1rem;
              color: var(--color-text);
              font-size: large;
            "
            class="smallButton"
          >
            Login
          </button>
        </div>
      </form>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>
