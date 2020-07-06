<template>
  <div class="guide-card-form">
    <div class="guide-card-helper">
      GET /organizations
      <a :href="guideLink" target="_blank">
        <ion-icon name="help-circle-sharp" />
      </a>
    </div>
    <div v-if="loading" class="guide-card-loading">
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
    <div v-else>
      <div class="guide-card-helper small">
        Choose one of the organizations found
      </div>
      <div class="guide-card-ul">
        <div
          class="guide-card-li"
          v-for="organization in organizations"
          :key="organization.id"
          @click="$emit('set-organization', organization)"
        >
          {{ organization.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverCall } from "@/helpers/http";

export default {
  name: "GuideContentTwo",
  props: {
    organizations: Array
  },
  data() {
    return {
      loading: true,
      guideLink:
        "https://documenter.getpostman.com/view/7928889/SVmsVg6K?version=latest#18e62fd9-402a-4768-ab5e-f11a44651cfe"
    };
  },
  methods: {
    fetchOrganizations: async function() {
      const token = sessionStorage.getItem("token");
      const response = await serverCall("/organizations", token);
      if (response !== null) {
        this.$emit("set-organizations", response.data);
        this.loading = false;
      }
    }
  },
  mounted() {
    if (this.organizations.length === 0) {
      this.fetchOrganizations();
    } else this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
