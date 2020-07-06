<template>
  <div :class="formColorCss(type)">
    <div class="table-box-desc">{{ data[type] }}</div>
  </div>
</template>

<script>
import chooseColor from "@/mixins/chooseColor";

export default {
  name: "TableViewRowColumn",
  mixins: [chooseColor],
  props: {
    data: Object,
    type: String
  },
  methods: {
    formColorCss: function(type) {
      return ["table-box", this.chooseColor(this.data, type)];
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  width: calc(3vmin + 60px);
  height: calc(1vmin + 25px);
  margin: 5px;
  background-color: darken(#95de64, 30%);
  border-radius: 5px;
  text-align: center;
  transition: all 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.05);
  }
  &.red {
    background-color: darken(#ff7875, 30%);
  }
  &.orange {
    background-color: darken(#ffc069, 30%);
  }
  .table-box-desc {
    font-size: 1rem;
    color: #fafafa;
  }
}
</style>
