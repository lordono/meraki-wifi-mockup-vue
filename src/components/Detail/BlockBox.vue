<template>
  <div :class="['detail-box', chooseColor(data, type)]">
    <div class="detail-box-desc">{{ data[type] }}</div>
    <div class="detail-box-title">{{ title }}</div>
  </div>
</template>

<script>
import chooseColor from "@/mixins/chooseColor";

export default {
  name: "DetailBlockBox",
  mixins: [chooseColor],
  props: {
    type: String,
    data: Object,
    title: String
  }
};
</script>

<style lang="scss" scoped>
.detail-box {
  width: calc(4vmin + 70px);
  height: calc(4vmin + 60px);
  margin: 5px;
  background-color: darken(#95de64, 30%);
  border-radius: 5px;
  text-align: center;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &.red {
    background-color: darken(#ff7875, 30%);
  }
  &.orange {
    background-color: darken(#ffc069, 30%);
  }
  .detail-box-desc {
    font-size: 1.5rem;
    margin-top: calc(2vmin + 10px);
    margin-bottom: calc(1vmin + 2.5px);
  }
  .detail-box-title {
    font-size: 0.7rem;
  }
}
</style>
