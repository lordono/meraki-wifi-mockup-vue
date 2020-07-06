<template>
  <div class="app-detailvis-content">
    <detail-block
      v-for="data in aggregatedData"
      :key="data.district"
      :data="data"
      :time="time"
      @click-district="clickDistrict"
    ></detail-block>
    <detail-overlay :time="time" @time-input="time = $event"></detail-overlay>
    <base-modal :title="modalTitle" v-model="modal">
      <template #content>
        <table-view :data="modalData" :time="modalTime" />
      </template>
    </base-modal>
  </div>
</template>

<script>
// import store components
import { mapGetters, mapState } from "vuex";
// import mixin
import tableModal from "@/mixins/tableModal";
// import components
import DetailOverlay from "@/components/Detail/Overlay";
import DetailBlock from "@/components/Detail/Block";
export default {
  name: "Detail",
  mixins: [tableModal],
  components: { DetailOverlay, DetailBlock },
  data() {
    return {
      time: "day"
    };
  },
  computed: {
    ...mapGetters({
      aggregatedData: "groupDatabyDistrict"
    }),
    ...mapState(["data"])
  },
  methods: {
    clickDistrict: function(event) {
      this.showModal(event, this.time);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-detailvis-content {
  width: calc(100% - 20px);
  height: calc(100% - 130px);
  overflow-y: auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

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
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
</style>
