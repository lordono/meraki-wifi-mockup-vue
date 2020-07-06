<template>
  <div class="guide-card-form">
    <div class="guide-card-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        :class="['guide-card-tab', { selected: tab.value === currentTab }]"
        @click="currentTab = tab.value"
      >
        <ion-icon :name="tab.icon" />
      </div>
    </div>
    <guide-content-four-tab-availability
      v-show="currentTab === 'Availability'"
      :organization="organization"
      :device="device"
      :apiData="apiData"
      @set-apidata="setApiData"
    />
    <guide-content-four-tab-latency
      v-show="currentTab === 'Latency'"
      :device="device"
      :apiData="apiData"
      @set-apidata="setApiData"
    />
    <guide-content-four-tab-utilization
      v-show="currentTab === 'Utilization'"
      :device="switchDevice"
      :apiData="apiData"
      @set-apidata="setApiData"
    />
    <guide-content-four-tab-success
      v-show="currentTab === 'Connection Status'"
      :device="device"
      :apiData="apiData"
      @set-apidata="setApiData"
    />
    <div class="guide-card-button" @click="addPointToDashboard">
      Add Point to Dashboard
    </div>
  </div>
</template>

<script>
// import store helper functions
import { mapActions } from "vuex";
// import components
import GuideContentFourTabAvailability from "./Tab/Availability";
import GuideContentFourTabLatency from "./Tab/Latency";
import GuideContentFourTabUtilization from "./Tab/Utilization";
import GuideContentFourTabSuccess from "./Tab/Success";

export default {
  name: "GuideContentFour",
  components: {
    GuideContentFourTabAvailability,
    GuideContentFourTabLatency,
    GuideContentFourTabSuccess,
    GuideContentFourTabUtilization
  },
  props: {
    organization: Object,
    device: Object,
    switchDevice: Object,
    apiData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      currentTab: "Availability",
      tabs: [
        { value: "Availability", icon: "thumbs-up-outline" },
        { value: "Utilization", icon: "card-outline" },
        { value: "Connection Status", icon: "wifi-outline" },
        { value: "Latency", icon: "speedometer-outline" }
      ],
      params: "?ip=8.8.8.8&timespan=2592000&resolution=3600"
    };
  },
  methods: {
    setApiData: function(attribute, value) {
      this.$emit("set-apidata", attribute, value);
    },
    constructPoint: function() {
      const { latency, utilization, uptime, success } = this.apiData;
      const timeData = {
        uptime: uptime.status === "online" ? "100" : "0",
        latency: latency.latencyStats.backgroundTraffic.avg,
        utilization: Math.round(utilization.usageInKb.total / 1024).toFixed(2),
        success: success.connectionStats.success,
        authentication: success.connectionStats.auth,
        association: success.connectionStats.assoc,
        dhcp: success.connectionStats.dhcp,
        dns: success.connectionStats.dns
      };
      return {
        lat: this.device.lat,
        lng: this.device.lng,
        name: this.device.name,
        district: "USER CREATED",
        week: timeData,
        month: timeData,
        day: timeData
      };
    },
    addPointToDashboard: function() {
      // ensure there is data before adding point
      if (Object.keys(this.apiData).length > 0) {
        // construct point and add into data;
        this.addData(this.constructPoint());
        this.$router.push({
          path: "/",
          query: { lat: this.device.lat, lng: this.device.lng }
        });
      }
    },
    ...mapActions(["addData"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";

.guide-card-tabs {
  display: flex;
  justify-content: center;
  border-bottom: 0.25px solid darken(#fafafa, 15%);
  .guide-card-tab {
    padding: 5px 10px 0px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      background-color: darken(#fafafa, 5%);
    }
    &.selected {
      background-color: darken(#fafafa, 15%);
    }
  }
}
.guide-card-button {
  text-align: center;
}
</style>
