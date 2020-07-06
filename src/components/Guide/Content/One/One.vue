<template>
  <div class="guide-card-form">
    <div class="guide-card-helper mb-big">
      Follow the
      <a :href="guideLink" target="_blank">guide</a> to get your token
    </div>
    <div class="guide-card-input-group">
      <input
        class="guide-card-input"
        type="text"
        placeholder="Token"
        v-model="token"
      />
    </div>
    <div class="guide-card-form-footer">
      <button class="guide-card-button wide" @click="$emit('set-token', token)">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideContentOne",
  props: {},
  data() {
    return {
      token: sessionStorage.getItem("token") || "",
      buttonText: "Save Token",
      guideLink:
        "https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API#:~:text=For%20access%20to%20the%20API,with%20a%20Dashboard%20administrator%20account."
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/guide/content.scss";
</style>
