<template>
  <table-view :data="data" :time="time" />
</template>

<script>
import { mapState } from "vuex";
import TableView from "@/components/TableView/TableView";

export default {
  name: "Table",
  components: {
    TableView
  },
  data() {
    return {
      time: "week"
    };
  },
  computed: {
    ...mapState(["data"])
  }
};
</script>

<style lang="scss" scoped></style>
