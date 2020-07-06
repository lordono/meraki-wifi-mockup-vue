<template>
  <div class="guide-card">
    <div class="guide-card-title">{{ title }}</div>
    <div class="guide-card-content">
      <transition name="fade" mode="out-in">
        <slot name="content"></slot>
      </transition>
    </div>
    <div class="guide-card-footer">
      <div :class="navBackClass" @click="$emit('go-back')">
        <ion-icon name="caret-back-circle-sharp"></ion-icon>
      </div>
      <div :class="navNextClass" @click="$emit('go-next')">
        <ion-icon name="caret-forward-circle-sharp"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideCard",
  props: {
    step: Number,
    maxStep: Number,
    title: String,
    navNextDisabled: Boolean
  },
  computed: {
    navBackClass: function() {
      if (this.step !== 1) return "guide-card-nav";
      else return "guide-card-nav disabled";
    },
    navNextClass: function() {
      if (this.step === this.maxStep) return "guide-card-nav disabled";
      else if (this.navNextDisabled) return "guide-card-nav disabled";
      else return "guide-card-nav";
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-card {
  height: 550px;
  width: 320px;
  margin: 5px;
  padding: 10px 20px;
  background-color: #fafafa;
  border-radius: 10px;
  color: #282c34;

  .guide-card-title {
    font-size: 32px;
    font-weight: 900;
    text-align: left;
    margin: 20px 0;
  }

  .guide-card-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    .guide-card-nav {
      cursor: pointer;
      margin: 0 5px;
      font-size: 35px;
      &.disabled {
        color: #888;
        pointer-events: none;
      }
    }
  }
  .guide-card-content {
    width: 100%;
    height: 400px;
    margin-bottom: 5px;
    overflow-y: auto;
    font-size: 22.5px;
    position: relative;

    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #333;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
</style>
