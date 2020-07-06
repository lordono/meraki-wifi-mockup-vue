<template>
  <base-overlay>
    <template #option>
      <base-overlay-option
        :options="typeOptions"
        label="Type"
        @input="$emit('type-input', $event)"
        :value="type"
      />
      <base-overlay-option
        :options="timeOptions"
        label="Time"
        @input="$emit('time-input', $event)"
        :value="time"
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
  name: "MapOverlay",
  components: {
    BaseOverlay,
    BaseOverlayOption,
    BaseLegend
  },
  props: {
    type: String,
    time: String
  },
  data() {
    return {
      typeOptions: [
        { name: "Availability", value: "uptime" },
        { name: "Latency", value: "latency" },
        { name: "Utilization", value: "utilization" }
      ],
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
