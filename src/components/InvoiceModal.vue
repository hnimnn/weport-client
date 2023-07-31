<template>
  <div
    class="background-modal fixed w-full h-full mt-[-50px] z-20"
    :class="{ invisible: !isOpenInvoice }"
  >
    <div class="modal bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-20">
      <h1 class="font-bold text-2xl mt-0 mb-4 text-center color-text">Invoice</h1>
      <hr class="mb-2" />
      <div class="flex justify-between mb-6">
        <div class="justify-end text-gray-700">
          <div>Date: {{ date }}</div>
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-lg font-bold mb-4">Bill To:</h2>
        <div class="text-gray-700 mb-2">{{ user.name }}</div>
        <div class="text-gray-700 mb-2">{{ user.phone }}</div>
        <div class="text-gray-700">{{ user.email }}</div>
      </div>
      <div class="w-full mb-8 pr-10">
        <div class="flex justify-between">
          <div class="text-lg font-bold">{{ info.name }}</div>
          <div class="text-gray-700">${{ info.price }}</div>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          class="buy inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white focus:shadow hover:bg-gray-800"
          @click="handleBuy"
        >
          Buy!
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  name: 'InvoiceModal',
  components: {},
  props: {
    isOpenInvoice: {
      type: Boolean,
      default() {
        return false
      },
    },
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  emits: ['close', 'buy'],
  setup(props, { emit }) {
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let user = {}
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user') || '')
    }
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('background-modal')) {
        emit('close')
      }
    }
    // Attach event listener when component is mounted
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    // Remove event listener when component is unmounted
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    return { user, date, handleClickOutside }
  },

  methods: {
    async handleBuy() {
      this.$emit('buy')
    },
  },
})
</script>
<style lang="scss">
.background-modal {
  background-color: rgba(81, 81, 81, 0.471);
  .buy {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    color: #ffff;
    display: flex;
    width: 80px;
    height: 40px;
    padding: 19.007px;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    flex-shrink: 0;
    border-radius: 12px;
    background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
  }
}
</style>
