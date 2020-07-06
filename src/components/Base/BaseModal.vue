<template>
  <div :class="['modal-bg', { hide: !show }]" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">
          {{ title }}
        </div>
        <div class="modal-close" @click="closeModal">
          <ion-icon name="close-circle-sharp"></ion-icon>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "show",
    event: "change"
  },
  name: "BaseModal",
  props: {
    title: String,
    show: Boolean
  },
  methods: {
    closeModal: function() {
      this.$emit("change", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  z-index: 1500;
  height: 100vh;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    z-index: 1600;
    opacity: 1;
    background-color: #ccc;
    border-radius: 10px;
    color: #282c34;
    width: calc(32vmin + 780px);
    height: 80%;
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 20px;
      font-weight: 600;
      .modal-title {
        margin-top: 30px;
        margin-bottom: 5px;
        margin-left: 25px;
      }
      .modal-close {
        font-size: 1.5em;
        margin-top: 30px;
        margin-bottom: 5px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }

  &.hide {
    opacity: 0;
    pointer-events: none;

    .modal {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
