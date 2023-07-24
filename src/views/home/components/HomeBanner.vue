<template>
  <div class="banner-home w-full h-full grid 2xl:flex xl:flex">
    <div
      class="left mb-32 2xl:w-1/2 xl:w-1/2 lg:w-full sm:w-full flex items-center sm:order-2 2xl:order-1 xl:order-1"
    >
      <div class="cover">
        <img class="logo-banner" :src="logo" />
        <p class="banner-text syne-bold">
          The Perfect Place For <span class="color-text syne-bold"> UI/UX Talent</span>,
          <span class="color-text syne-bold"> Quality Services </span>
          and<span class="color-text syne-bold"> Enterprises</span>!
        </p>
        <button class="join-button">Join us</button>
      </div>
    </div>
    <div
      class="right 2xl:w-1/2 xl:w-1/2 lg:w-full sm:w-full h-screen lg:ml-20 sm:order-1 2xl:order-2 xl:order-2"
    >
      <div class="cover-right left-1/2 -translate-x-1/2">
        <img class="layer" :src="layer" />
        <img class="banner-img img1" :src="img1" />
        <img class="banner-img img2" :src="img2" />
        <img class="banner-img img3" :src="img3" />
        <img class="icon secure-icon" :src="secure" />
        <img class="icon team-icon" :src="team" />
        <img class="icon check-icon" :src="checked" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '@/assets/images/logo.png'
import layer from '@/assets/images/layer.png'
import img1 from '@/assets/images/banner-img1.png'
import img2 from '@/assets/images/banner-img2.png'
import img3 from '@/assets/images/banner-img3.png'
import checked from '@/assets/icons/PinkCheckedIcon.svg'
import secure from '@/assets/icons/SecureIcon.svg'
import team from '@/assets/icons/TeamIcon.svg'

export default defineComponent({
  name: 'HomeBanner',
  data() {
    return {
      logo,
      layer,
      img1,
      img2,
      img3,
      checked,
      secure,
      team,
    }
  },
  // props: {
  //   msg: { type: String, default: 'Welcome!' },
  // },
})
</script>
<style lang="scss">
.banner-home {
  position: relative;
  .left {
    .logo-banner {
      width: 264px;
      height: 131.47;
    }
    .banner-text {
      font-size: 38px;
      color: #0e0b33;
      margin-bottom: 50px;
    }
    .join-button {
      cursor: pointer;
      font-size: 24px;
      font-weight: 700;
      color: #ffff;
      display: flex;
      width: 212px;
      height: 63px;
      padding: 19.007px;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      gap: 16px;
      flex-shrink: 0;
      border-radius: 20px;
      background: linear-gradient(156deg, #ff56bb 0%, #ff8f77 100%);
    }
  }
  .right {
    position: relative;
    .cover-right {
      position: relative;
    }
    .layer {
      position: absolute;
    }
    .banner-img {
      position: absolute;
    }

    .img1 {
      top: 60px;
      left: 105px;
      transform: translateY(0px);
      animation: float-down 6s ease-in-out infinite;
    }
    .img2 {
      top: 400px;
      left: 105px;
      transform: translateY(0px);
      animation: float-down 6s infinite ease-in-out;
    }
    .img3 {
      top: 145px;
      left: 415px;
      transform: translateY(0px);
      animation: float-up 6s infinite ease-in-out;
    }

    .icon {
      position: absolute;
      z-index: 2;
    }

    .secure-icon {
      top: 420px;
      left: 0;
    }
    .check-icon {
      top: 615px;
      left: 65px;
    }
    .team-icon {
      top: 520px;
      left: 640px;
    }
  }
}
@media (max-width: 1510px) {
  .left {
    width: 40% !important;
  }
  .right {
    width: 60% !important;
  }
}

@media (max-width: 1296px) {
  .left {
    width: 100% !important;
  }
  .right {
    width: 100% !important;
  }
}
@media (max-width: 780px) {
  .img1 {
    left: 5% !important;
  }
  .img2 {
    top: 90px;
    left: 5% !important;
  }
  .img3 {
    top: -440px;
    left: 57% !important;
  }
  .secure-icon {
    top: 310px !important;
    left: -40px !important;
  }
  .check-icon {
    top: 615px !important;
    left: -7px !important;
  }
  .team-icon {
    top: 520px !important;
    left: 530px !important;
  }
}
@keyframes float-down {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes float-up {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
