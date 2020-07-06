<template>
  <div class="overlay">
    <div class="overlay-options">
      <div class="title">Options</div>
      <div class="options-content">
        <slot name="option"></slot>
      </div>
    </div>
    <slot name="legend"></slot>
  </div>
</template>

<script>
export default {
  name: "BaseOverlay"
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  z-index: 1000;
  bottom: 20px;
  right: 20px;
  .overlay-options {
    width: calc(10vmin + 100px);
    height: 100%;
    border-radius: 10px;
    padding: 20px 10px;
    background-color: rgba(255, 255, 255, 0.65);
    color: #4a4a4a;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: calc(0.75vmin + 6px);
    .title {
      font-size: calc(0.75vmin + 7px);
      font-weight: 600;
    }
  }
}
</style>
