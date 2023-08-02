<template>
  <span v-if="save" class="cursor-pointer">
    <svg
      width="21"
      height="29"
      viewBox="0 0 21 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="handleSave()"
    >
      <g id="Vector">
        <path
          d="M19.9273 0H1.07881C0.484238 0 0 0.473865 0 1.0557V26.9443C0 27.862 1.10946 28.3419 1.8021 27.7241L9.77671 20.6521C10.1874 20.2862 10.8126 20.2862 11.2233 20.6521L19.1979 27.7241C19.8905 28.3359 21 27.856 21 26.9443V1.0557C21 0.473865 20.5158 0 19.9212 0H19.9273Z"
          fill="white"
        />
        <path
          d="M19.9273 0H1.07881C0.484238 0 0 0.473865 0 1.0557V26.9443C0 27.862 1.10946 28.3419 1.8021 27.7241L9.77671 20.6521C10.1874 20.2862 10.8126 20.2862 11.2233 20.6521L19.1979 27.7241C19.8905 28.3359 21 27.856 21 26.9443V1.0557C21 0.473865 20.5158 0 19.9212 0H19.9273Z"
          fill="url(#paint0_linear_808_14349)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_808_14349"
          x1="3.10037"
          y1="-4.59342"
          x2="32.8355"
          y2="2.81963"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF56BB" />
          <stop offset="1" stop-color="#FF8F77" />
        </linearGradient>
      </defs>
    </svg>
  </span>
  <span v-else class="cursor-pointer">
    <svg
      fill="white"
      width="21"
      height="29"
      viewBox="0 0 21 29"
      xmlns="http://www.w3.org/2000/svg"
      @click="handleSave()"
    >
      <path
        d="M19.9273 0H1.07881C0.484238 0 0 0.473865 0 1.0557V26.9443C0 27.862 1.10946 28.3419 1.8021 27.7241L9.77671 20.6521C10.1874 20.2862 10.8126 20.2862 11.2233 20.6521L19.1979 27.7241C19.8905 28.3359 21 27.856 21 26.9443V1.0557C21 0.473865 20.5158 0 19.9212 0H19.9273Z"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { getDataOnCookies } from '@/utils'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SaveButton',
  props: {
    project: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const save = ref(false)
    const router = useRouter()
    async function handleSave() {
      if (getDataOnCookies('access_token')) {
        save.value = !save.value
        console.log(save.value)

        await axios
          .post(
            `http://127.0.0.1:8000/api/auth/v1/projects/${props.project.id}/save`,
            {},
            {
              headers: {
                'Content-Type': 'multipart/form-data',

                Authorization: `Bearer ${getDataOnCookies('access_token')}`,
              },
            }
          )
          .then((response) => {
            console.log(response)
          })
      } else {
        router.push({ name: 'Signin' })
      }
    }
    save.value = props.project?.users_saved?.some((item) => {
      if (localStorage.getItem('user'))
        return item.id == JSON.parse(localStorage.getItem('user') || '').id
    })
    return { save, handleSave }
  },
  data() {
    return {
      saved: false,
    }
  },
  // methods: {
  //   toggleSave() {
  //     this.saved = !this.saved
  //   },
  // },
})
</script>

<style lang="scss"></style>
