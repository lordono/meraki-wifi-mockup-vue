<template>
  <div class="guide-card-form">
    <div class="guide-card-helper">
      GET /organizations/:orgId/devices
      <a :href="guideLink" target="_blank">
        <ion-icon name="help-circle-sharp" />
      </a>
    </div>
    <div v-if="loading" class="guide-card-loading">
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
    <div v-else>
      <div class="guide-card-helper small">Choose one of the devices found</div>
      <div class="guide-card-input-group">
        <input class="guide-card-input" type="text" placeholder="Filter" v-model="filter" />
      </div>
      <div class="guide-card-ul">
        <div
          :class="[
            'guide-card-li',
            { disabled: !device.model.startsWith('MR') }
          ]"
          v-for="device in filteredDevices"
          :key="device.serial"
          @click="setDevice(device)"
        >
          <div class="guide-card-li-header">
            <span>{{ device.model }}</span>
            <span>{{ device.serial }}</span>
          </div>
          <div class="guide-card-li-content">{{ device.name || "-- no name --" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverCall } from "@/helpers/http";

export default {
  name: "GuideContentThree",
  props: {
    organization: Object,
    devices: Array
  },
  data() {
    return {
      filter: "",
      loading: true,
      guideLink:
        "https://documenter.getpostman.com/view/7928889/SVmsVg6K?version=latest#51d19ca2-71bc-4b1c-94b8-0699e22f3360"
    };
  },
  computed: {
    /**
     * compute the devices filtered via the filter input by the user
     */
    filteredDevices: function() {
      if (this.filter) {
        const filter = this.filter.toLowerCase();
        return this.devices.filter(i => {
          return (
            i.model.toLowerCase().includes(filter) ||
            i.serial.toLowerCase().includes(filter) ||
            i.name.toLowerCase().includes(filter)
          );
        });
      } else return this.devices;
    }
  },
  methods: {
    /**
     * fetch organization's devices through meraki api
     */
    fetchDevices: async function() {
      const token = sessionStorage.getItem("token");
      const url = `/organizations/${this.organization.id}/devices`;
      const response = await serverCall(url, token);
      if (response !== null) {
        this.$emit("set-devices", response.data);
        this.loading = false;
      }
    },
    setDevice: function(device) {
      const switchDevice = this.devices.find(i => i.model.startsWith("MS"));
      this.$emit("set-device", device, switchDevice);
    }
  },
  mounted() {
    if (this.devices.length === 0) {
      this.fetchDevices();
    } else this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
