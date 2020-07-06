<template>
  <base-overlay>
    <template #option>
      <base-overlay-option
        :options="typeOptions"
        label="Type"
        @input="$emit('type-input', $event)"
        :value="type"
      />
    </template>
    <template #legend>
      <base-legend :type="type"></base-legend>
    </template>
  </base-overlay>
</template>

<script>
// import components
import BaseOverlay from "../Base/BaseOverlay";
import BaseOverlayOption from "../Base/BaseOverlayOption";
import BaseLegend from "../Base/BaseLegend";

export default {
  name: "PeriodOverlay",
  components: {
    BaseOverlay,
    BaseOverlayOption,
    BaseLegend
  },
  props: {
    type: String
  },
  data() {
    return {
      typeOptions: [
        { name: "Availability", value: "uptime" },
        { name: "Latency", value: "latency" },
        { name: "Utilization", value: "utilization" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
