<template>
  <div class="signin">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <router-link to="/">
          <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-16 h-8 mr-2" :src="logoSignin" alt="logo" />
            <p class="mt-2 ml-[-5px] font-bold">port</p>
          </div>
        </router-link>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" onsubmit="return false">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@gmail.com"
                />
                <span v-if="errors?.email" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.email[0] }}</span
                >
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span v-if="errors?.password" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.password[0] }}</span
                >
              </div>
              <div class="flex items-center float-right justify-between">
                <!-- <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 dark:text-gray-300"
                      >Remember me</label
                    >
                  </div>
                </div> -->
                <a
                  href="#"
                  class="text-sm font-medium flex-end text-primary-600 hover:underline dark:text-primary-500"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                class="submit-button w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="handleLogin"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <router-link
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign up</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  <vue-basic-alert ref="alert" :duration="300" :close-in="5000" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import logoSignin from '@/assets/images/logo-signin.png'
import VueBasicAlert from 'vue-basic-alert'
import axios from 'axios'
export default defineComponent({
  name: 'SigninPage',
  components: { VueBasicAlert },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    async function handleLogin() {
      await axios
        .post(
          `http://127.0.0.1:8000/api/auth/v1/login`,
          {
            email: email.value,
            password: password.value,
          },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((response) => {
          var now = new Date()
          var timeExpires = new Date(now.getTime() + response.data.expires_in * 1000)
          document.cookie = `access_token=${response.data.access_token}; max-age=${response.data.expires_in}; path=/;`
          document.cookie = `refresh_token=${response.data.refresh_token}; max-age=${
            response.data.expires_in * 24 * 30
          }; path=/;`

          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token_expires', JSON.stringify(timeExpires))

          router.push({ name: 'Home' })
        })
        .catch((e) => {
          if (e.response.data.error == 'Unauthorized') {
            errors.value.password = ['Email or Password invald']
          } else errors.value = e.response.data

          console.log(e)
        })
    }
    return { email, password, errors, handleLogin }
  },
  data() {
    return {
      logoSignin,
    }
  },
})
</script>
<style lang="scss">
.signin {
  .color-outline:focus {
    --tw-ring-offset-color: #ff56bb;
    box-shadow: 0 0 0 0 #ff56bb, inset 0 0 0 calc(2px + 0px) #ff56bb;
  }
  .submit-button {
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
}
</style>
