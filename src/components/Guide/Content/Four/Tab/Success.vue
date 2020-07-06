<template>
  <div>
    <div v-if="loading" class="guide-tab-loading">
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
    <div v-else class="guide-tab-content">
      <div class="guide-tab-title">Connection Stat Data</div>
      <div class="guide-card-helper">
        GET /connection/devices
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
  name: "GuideContentFourTabSuccess",
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
      loading: true,
      fakeData: fakeData,
      guideLink:
        "https://documenter.getpostman.com/view/7928889/SVmsVg6K?version=latest#51d19ca2-71bc-4b1c-94b8-0699e22f3360"
    };
  },
  computed: {
    jsonData: function() {
      const apiDataKeys = Object.keys(this.apiData);
      if (apiDataKeys.length === 0 || "success" in this.apiData) {
        return JSON.stringify(this.apiData.success, undefined, 2);
      } else return JSON.stringify({}, undefined, 2);
    }
  },
  methods: {
    fetchSuccess: async function() {
      const token = sessionStorage.getItem("token");
      const device = this.device;
      const url = `/networks/${device.networkId}/devices/${device.serial}/connectionStats?timespan=14400`;
      const response = await serverCall(url, token);
      if (
        response !== null &&
        "data" in response &&
        Object.keys(response.data).length !== 0
      ) {
        this.$emit("set-apidata", "success", response.data);
      } else {
        const fakeData = { ...this.fakeData.success, serial: device.serial };
        this.$emit("set-apidata", "success", fakeData);
      }
      this.loading = false;
    }
  },
  mounted() {
    const apiDataKeys = Object.keys(this.apiData);
    if (apiDataKeys.length === 0 || !("success" in this.apiData)) {
      this.fetchSuccess();
    } else {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
