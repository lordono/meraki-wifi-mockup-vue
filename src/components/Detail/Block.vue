<template>
  <div class="detail-block" @click="$emit('click-district', data.district)">
    <div class="detail-block-title">{{ data.district }}</div>
    <div class="detail-box-container">
      <div class="detail-border">
        <div class="detail-border-title">Availability</div>
        <div class="detail-border-container">
          <detail-block-box
            type="uptime"
            title="Uptime(%)"
            :data="data[time]"
          ></detail-block-box>
        </div>
      </div>
      <div class="detail-border">
        <div class="detail-border-title">Performance</div>
        <div class="detail-border-container">
          <detail-block-box
            type="latency"
            title="Latency(ms)"
            :data="data[time]"
          ></detail-block-box>
          <detail-block-box
            type="utilization"
            title="Usage(mbps)"
            :data="data[time]"
          ></detail-block-box>
          <detail-block-box
            type="success"
            title="Success"
            :data="data[time]"
          ></detail-block-box>
        </div>
      </div>
      <div class="detail-border">
        <div class="detail-border-title">Issues</div>
        <div class="detail-border-container">
          <detail-block-box
            type="association"
            title="Association"
            :data="data[time]"
          ></detail-block-box>
          <detail-block-box
            type="authentication"
            title="Authentication"
            :data="data[time]"
          ></detail-block-box>
          <detail-block-box
            type="dhcp"
            title="DHCP"
            :data="data[time]"
          ></detail-block-box>
          <detail-block-box
            type="dns"
            title="DNS"
            :data="data[time]"
          ></detail-block-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import components
import DetailBlockBox from "./BlockBox";

export default {
  name: "DetailBlock",
  components: { DetailBlockBox },
  props: {
    data: Object,
    time: String
  }
};
</script>

<style lang="scss" scoped>
.detail-block {
  padding: 15px 20px;
  border-radius: 10px;
  font-size: calc(1vmin + 5px);
  width: calc(32vmin + 680px);
  height: calc(4.5vmin + 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .detail-block-title {
    font-weight: 600;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
  }
  .detail-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-border {
      border-radius: 5px;
      border: 0.5px solid lighten(#282c34, 15%);
      padding: 5px;
      margin: 0 5px;
      .detail-border-title {
        font-weight: 200;
        font-size: 0.75rem;
        text-align: left;
        padding-left: 5px;
      }
      .detail-border-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
