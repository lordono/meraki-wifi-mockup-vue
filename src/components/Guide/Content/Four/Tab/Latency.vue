<template>
  <div>
    <div v-if="loading" class="guide-tab-loading">
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
    <div v-else class="guide-tab-content">
      <div class="guide-tab-title">Latency Data</div>
      <div class="guide-card-helper">
        GET /latency/devices
        <a :href="guideLink" target="_blank">
          <ion-icon name="help-circle-sharp" />
        </a>
      </div>
      <pre class="json-html" v-html="jsonData" />
    </div>
  </div>
</template>

<script>
import { serverCall } from "@/helpers/http";
import { fakeData } from "@/data/guide/fakeData";

export default {
  name: "GuideContentFourTabLatency",
  props: {
    device: Object,
    apiData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      params: "?timespan=3600",
      loading: true,
      fakeData: fakeData,
      guideLink:
        "https://documenter.getpostman.com/view/7928889/SVmsVg6K?version=latest#51d19ca2-71bc-4b1c-94b8-0699e22f3360"
    };
  },
  computed: {
    jsonData: function() {
      const apiDataKeys = Object.keys(this.apiData);
      if (apiDataKeys.length === 0 || "latency" in this.apiData) {
        return JSON.stringify(this.apiData.latency, undefined, 2);
      } else return JSON.stringify({}, undefined, 2);
    }
  },
  methods: {
    fetchLatency: async function() {
      const token = sessionStorage.getItem("token");
      const device = this.device;
      const params = this.params;
      const url = `/networks/${device.networkId}/devices/${device.serial}/latencyStats`;
      const response = await serverCall(`${url}${params}`, token);

      if (
        response !== null &&
        "data" in response &&
        Object.keys(response.data).length !== 0
      ) {
        this.$emit("set-apidata", "latency", response.data);
      } else {
        this.$emit("set-apidata", "latency", {
          ...this.fakeData.latency,
          serial: this.device.serial
        });
      }
      this.loading = false;
    }
  },
  mounted() {
    const apiDataKeys = Object.keys(this.apiData);
    if (apiDataKeys.length === 0 || !("latency" in this.apiData)) {
      this.fetchLatency();
    } else {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
