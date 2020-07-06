<template>
  <div class="time-block">
    <div class="time-block-title">{{ data.district }}</div>
    <div class="time-box-container">
      <div
        :class="[chooseColor(data.month, type), 'time-box']"
        @click="$emit('click-time', data.district, 'month')"
      >
        <div class="time-box-title">Monthly({{ suffix }})</div>
        <div class="time-box-desc">{{ data.month[type] }}</div>
      </div>
      <div
        :class="[chooseColor(data.week, type), 'time-box']"
        @click="$emit('click-time', data.district, 'week')"
      >
        <div class="time-box-title">Weekly({{ suffix }})</div>
        <div class="time-box-desc">{{ data.week[type] }}</div>
      </div>
      <div
        :class="[chooseColor(data.day, type), 'time-box']"
        @click="$emit('click-time', data.district, 'day')"
      >
        <div class="time-box-title">Daily({{ suffix }})</div>
        <div class="time-box-desc">{{ data.day[type] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import chooseColor from "@/mixins/chooseColor";

export default {
  name: "PeriodBlock",
  mixins: [chooseColor],
  props: {
    data: Object,
    type: String
  },
  computed: {
    suffix: function() {
      if (this.type === "uptime") return "%";
      else if (this.type === "utilization") return "mbps";
      else if (this.type === "latency") return "ms";
      else return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.time-block {
  border: 0.5px solid lighten(#282c34, 15%);
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  font-size: calc(0.5vmin + 12px);
  width: calc(15vmin + 240px);
  height: calc(4.5vmin + 150px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .time-block-title {
    font-weight: 600;
    margin-bottom: 10px;
  }
  .time-box-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .time-box {
      width: calc(5vmin + 70px);
      height: calc(1.5vmin + 120px);
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
      .time-box-desc {
        font-size: 2.25rem;
      }
      .time-box-title {
        font-size: 0.75rem;
        margin-top: calc(0.5vmin + 10px);
        margin-bottom: calc(1vmin + 10px);
      }
    }
  }
}
</style>
