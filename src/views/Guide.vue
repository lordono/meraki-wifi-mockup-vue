<template>
  <div class="app-guide-content">
    <guide-card
      :step="step"
      :maxStep="titles.length"
      :title="titles[step - 1]"
      :navNextDisabled="navNext"
      @go-next="step += 1"
      @go-back="step -= 1"
    >
      <template #content>
        <guide-content-one v-if="step === 1" @set-token="setToken" />
        <guide-content-two
          v-if="step === 2"
          :organizations="organizations"
          @set-organization="setOrganization"
          @set-organizations="organizations = $event"
          @go-next="step += 1"
        />
        <guide-content-three
          v-if="step === 3"
          :organization="organization"
          :devices="devices"
          @set-device="setDevice"
          @set-devices="devices = $event"
          @go-next="step += 1"
        />
        <guide-content-four
          v-if="step === 4"
          :apiData="apiData"
          :organization="organization"
          :device="device"
          :switchDevice="switchDevice"
          @set-apidata="setApiData"
        />
      </template>
    </guide-card>
  </div>
</template>

<script>
// import components
import GuideCard from "@/components/Guide/Card.vue";
import GuideContentOne from "@/components/Guide/Content/One/One.vue";
import GuideContentTwo from "@/components/Guide/Content/Two/Two.vue";
import GuideContentThree from "@/components/Guide/Content/Three/Three.vue";
import GuideContentFour from "@/components/Guide/Content/Four/Four.vue";

export default {
  name: "Guide",
  components: {
    GuideCard,
    GuideContentOne,
    GuideContentTwo,
    GuideContentThree,
    GuideContentFour
  },
  data() {
    return {
      step: 1,
      nextStep: 1,
      organization: {},
      organizations: [],
      device: {},
      switchDevice: {},
      devices: [],
      apiData: {},
      titles: [
        "Get Token",
        "Get Organizations",
        "Get Devices",
        "Call API",
        "Transform Data"
      ]
    };
  },
  computed: {
    currentTab: function() {
      const step = this.step;
      let stepName = "one";
      if (step === 1) stepName = "one";
      else if (step === 2) stepName = "two";
      else if (step === 3) stepName = "three";
      else if (step === 4) stepName = "four";
      else if (step === 5) stepName = "five";
      return `guide-content-${stepName}`;
    },
    navNext: function() {
      const step = this.step;
      if (step === 1) {
        if (sessionStorage.getItem("token")) return false;
        else return true;
      } else if (step === 2) {
        if (Object.keys(this.organization).length > 0) return false;
        else return true;
      } else if (step === 3) {
        if (Object.keys(this.device).length > 0) return false;
        else return true;
      } else {
        return true;
      }
    }
  },
  mounted() {
    const token = sessionStorage.getItem("token");
    if (token) this.token = token;
  },
  methods: {
    setToken: function(event) {
      sessionStorage.setItem("token", event);
      this.organization = {};
      this.organizations = [];
      this.device = {};
      this.devices = [];
      this.apiData = {};
      this.step += 1;
    },
    setOrganization: function(event) {
      this.organization = event;
      this.device = {};
      this.devices = [];
      this.apiData = {};
      this.step += 1;
    },
    setDevice: function(device, switchDevice) {
      this.device = device;
      this.switchDevice = switchDevice;
      this.apiData = {};
      this.step += 1;
    },
    setApiData: function(attribute, value) {
      this.apiData[attribute] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-guide-content {
  width: calc(100% - 20px);
  height: calc(100% - 130px);
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #333;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}
</style>
