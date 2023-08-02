<template>
  <div class="signup">
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
              Create and account
            </h1>
            <form onsubmit="return false" class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your name</label
                >
                <input
                  id="name"
                  v-model="account.name"
                  type="name"
                  name="name"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Luiz Jackson"
                />
                <span v-if="errors?.name" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.name[0] }}</span
                >
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your phone number</label
                >
                <input
                  id="phone"
                  v-model="account.phone"
                  type="phone"
                  name="phone"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0123456789"
                />
                <span v-if="errors?.phone" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.phone[0] }}</span
                >
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  id="email"
                  v-model="account.email"
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
                  v-model="account.password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span v-if="errors?.password" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.password[0] }}</span
                >
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm password</label
                >
                <input
                  id="confirm-password"
                  v-model="account.confirmPassword"
                  type="password"
                  name="confirm-password"
                  placeholder="••••••••"
                  class="color-outline focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span v-if="errors?.confirmPassword" class="text-xs text-rose-500 h-fit"
                  >*{{ errors.confirmPassword }}</span
                >
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 dark:text-gray-300"
                    >I accept the
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      >Terms and Conditions</a
                    ></label
                  >
                </div>
              </div>
              <button
                type="submit"
                class="submit-button w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                @click="handleSubmit"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <router-link
                  to="/signin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign in here</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import logoSignin from '@/assets/images/logo-signin.png'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'SignupPage',
  setup() {
    const router = useRouter()
    const account = ref({})
    const errors = ref({})
    function validation() {
      // const emailPattern =
      //   /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.(-?[a-zA-Z0-9])+$/

      // if (account.value.email === '') {
      //   errors.value.email = 'Invalid Email'
      //   return false
      // } else if (!emailPattern.test(account.value.email)) {
      //   errors.value.email = 'Invalid Email'
      //   return false
      // } else {
      //   errors.value.email = ''
      // }
      if (account.value.confirmPassword !== account.value.password) {
        errors.value.confirmPassword = 'Confirm password not match'
        return false
      } else return true
    }
    async function handleSubmit() {
      errors.value = {}
      if (validation()) {
        await axios
          .post(
            `http://127.0.0.1:8000/api/auth/v1/register`,
            {
              name: account.value.name,
              phone: account.value.phone,
              email: account.value.email,
              password: account.value.password,
            },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          )
          .then((response) => {
            document.cookie = `access_token=${response.data.access_token}; max-age=${response.data.expires_in}; path=/;`
            localStorage.setItem('user', JSON.stringify(response.data.user))
            console.log(JSON.parse(localStorage.getItem('user')))
            router.push({ name: 'Signin' })
          })
          .catch((e) => {
            console.log(e)
            errors.value = e.response.data.errors
          })
      }
    }
    return { account, errors, handleSubmit }
  },
  data() {
    return {
      logoSignin,
    }
  },
})
</script>
<style lang="scss">
.signup {
  .color-outline:focus {
    --tw-ring-offset-color: #ff56bb;
    box-shadow: 0 0 0 0 #ff56bb, inset 0 0 0 calc(2px + 0px) #ff56bb;
  }
  .submit-button {
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
}
</style>
