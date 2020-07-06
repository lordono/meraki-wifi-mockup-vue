<template>
  <div class="legend">
    <div class="title">Legend</div>
    <div class="content">
      <div
        v-for="option in options[type].data"
        class="legend-row"
        :key="option.name"
      >
        <div class="block" :style="{ backgroundColor: option.color }"></div>
        <div class="text">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLegend",
  props: {
    type: String
  },
  data() {
    return {
      colors: {
        high: "#ff7875",
        mid: "#ffc069",
        low: "#95de64"
      }
    };
  },
  computed: {
    options: function() {
      return {
        uptime: {
          name: "Availability",
          data: [
            { color: this.colors.low, name: "95%-100%" },
            { color: this.colors.mid, name: "85%-95%" },
            { color: this.colors.high, name: "<85%" }
          ]
        },
        latency: {
          name: "Latency",
          data: [
            { color: this.colors.low, name: "< 70ms" },
            { color: this.colors.mid, name: "70ms-200ms" },
            { color: this.colors.high, name: "> 200ms" }
          ]
        },
        utilization: {
          name: "Utilization",
          data: [
            { color: this.colors.low, name: "<20mbps" },
            { color: this.colors.mid, name: "20-60mbps" },
            { color: this.colors.high, name: ">60mbps" }
          ]
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.legend {
  width: calc(10vmin + 100px);
  height: 100%;
  border-radius: 10px;
  padding: 20px 10px;
  background-color: rgba(255, 255, 255, 0.65);
  color: #4a4a4a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: calc(0.75vmin + 7px);
    font-weight: 600;
  }
  .content {
    font-size: calc(0.75vmin + 6px);
    .legend-row {
      display: flex;
      margin: 7.5px 0;
      align-items: center;
      .block {
        width: calc(0.75vmin + 60px);
        height: calc(0.5vmin + 15px);
        margin-right: 10px;
      }
    }
  }
}
</style>
