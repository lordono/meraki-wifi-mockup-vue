<template>
  <base-overlay>
    <template #option>
      <base-overlay-option
        :options="timeOptions"
        label="Time"
        @input="$emit('time-input', $event)"
        :value="time"
      />
    </template>
  </base-overlay>
</template>

<script>
// import components
import BaseOverlay from "../Base/BaseOverlay";
import BaseOverlayOption from "../Base/BaseOverlayOption";

export default {
  name: "DetailOverlay",
  components: {
    BaseOverlay,
    BaseOverlayOption
  },
  props: {
    time: String
  },
  data() {
    return {
      timeOptions: [
        { name: "Daily", value: "day" },
        { name: "Weekly", value: "week" },
        { name: "Monthly", value: "month" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
