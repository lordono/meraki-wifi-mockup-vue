<template>
  <div class="app-timevis-content">
    <period-block
      v-for="data in aggregatedData"
      :key="data.district"
      :data="data"
      :type="type"
      @click-time="showModal"
    ></period-block>
    <period-overlay :type="type" @type-input="type = $event"></period-overlay>
    <base-modal :title="modalTitle" v-model="modal">
      <template #content>
        <table-view :data="modalData" :time="modalTime" />
      </template>
    </base-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import mixin
import tableModal from "@/mixins/tableModal";
// import components
import PeriodOverlay from "@/components/Period/Overlay";
import PeriodBlock from "@/components/Period/Block";

export default {
  name: "Period",
  components: {
    PeriodOverlay,
    PeriodBlock
  },
  mixins: [tableModal],
  data() {
    return {
      type: "uptime"
    };
  },
  computed: {
    ...mapGetters({
      aggregatedData: "groupDatabyDistrict"
    }),
    ...mapState(["data"])
  }
};
</script>

<style lang="scss" scoped>
.app-timevis-content {
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
