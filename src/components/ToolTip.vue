<template>
  <div class="tooltip">
    <slot name="content"></slot>
    <span class="tooltiptext">{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolTip',
  props: {
    content: {
      type: String,
      default() {
        return ''
      },
    },
  },
})
</script>
<style lang="scss">
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: rgba(0, 0, 0, 0.793);
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: -10px;
  white-space: nowrap;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
