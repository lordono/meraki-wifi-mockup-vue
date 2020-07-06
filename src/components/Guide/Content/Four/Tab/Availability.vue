<template>
  <div>
    <div v-if="loading" class="guide-tab-loading">
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
    <div v-else class="guide-tab-content">
      <div class="guide-tab-title">Availability Data</div>
      <div class="guide-card-helper">
        GET /availability/devices
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
  name: "GuideContentFourTabAvailability",
  props: {
    organization: Object,
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
      if (apiDataKeys.length === 0 || "uptime" in this.apiData) {
        return JSON.stringify(this.apiData.uptime, undefined, 2);
      } else return JSON.stringify({}, undefined, 2);
    }
  },
  methods: {
    fetchUptime: async function() {
      const token = sessionStorage.getItem("token");
      const device = this.device;
      const organization = this.organization;
      const url = `/organizations/${organization.id}/deviceStatuses`;
      const response = await serverCall(url, token);

      if (response !== null) {
        const uptime = response.data.find(i => i.serial === device.serial);
        this.$emit("set-apidata", "uptime", uptime);
      } else {
        this.$emit("set-apidata", "uptime", this.fakeData.uptime);
      }
      this.loading = false;
    }
  },
  mounted() {
    const apiDataKeys = Object.keys(this.apiData);
    if (apiDataKeys.length === 0 || !("uptime" in this.apiData)) {
      this.fetchUptime();
    } else {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
