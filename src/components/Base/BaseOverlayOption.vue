<template>
  <div class="options-input-block">
    <div class="label">{{ label }}:</div>
    <select
      :name="lowerLabel"
      :id="`label-select`"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >{{ option.name }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseOverlayOption",
  props: {
    options: Array,
    label: String,
    value: String
  },
  computed: {
    lowerLabel: function() {
      return this.label.toLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.options-input-block {
  display: flex;
  margin: 7.5px 0;
  .label {
    margin-right: 5px;
  }
}
</style>
