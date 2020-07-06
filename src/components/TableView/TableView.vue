<template>
  <div class="app-table-content">
    <div class="table-sort-bar">
      <div class="table-sort-label">Sort by:</div>
      <select name="sort" id="sort-select" v-model="sort">
        <option value="">--Select one of the following--</option>
        <option value="uptime-desc">Uptime: High to Low</option>
        <option value="uptime-asc">Uptime: Low to High</option>
        <option value="latency-desc">Latency: High to Low</option>
        <option value="latency-asc">Latency: Low to High</option>
        <option value="utilization-desc">Utilization: High to Low</option>
        <option value="utilization-asc">Utilization: Low to High</option>
        <option value="success-desc">
          % Connection Success: High to Low
        </option>
        <option value="success-asc">% Connection Success: Low to High</option>
      </select>
    </div>
    <div class="table-header">
      <div class="table-header-col">AP Name</div>
      <div class="table-header-col">Uptime(%)</div>
      <div class="table-header-col">Latency(ms)</div>
      <div class="table-header-col">Usage(mbps)</div>
      <div class="table-header-col">Success</div>
      <div class="table-header-col">Association</div>
      <div class="table-header-col">Authentication</div>
      <div class="table-header-col">DHCP</div>
      <div class="table-header-col">DNS</div>
    </div>
    <div class="tables-container">
      <table-view-row
        v-for="data in sortedData"
        :key="data.name"
        :data="data"
        :time="time"
      />
    </div>
  </div>
</template>

<script>
// import components
import TableViewRow from "./TableViewRow";

export default {
  name: "TableView",
  components: { TableViewRow },
  props: {
    time: {
      type: String,
      default: "week"
    },
    data: Array,
    width: Number
  },
  data() {
    return {
      sort: ""
    };
  },
  computed: {
    sortedData: function() {
      const newData = JSON.parse(JSON.stringify(this.data));
      const sort = this.sort;
      const time = this.time;
      if (sort) {
        if (sort === "uptime-desc") {
          newData.sort((a, b) => this.cmpAttr(b, a, time, "uptime"));
        } else if (sort === "uptime-asc") {
          newData.sort((a, b) => this.cmpAttr(a, b, time, "uptime"));
        } else if (sort === "latency-desc") {
          newData.sort((a, b) => this.cmpAttr(b, a, time, "latency"));
        } else if (sort === "latency-asc") {
          newData.sort((a, b) => this.cmpAttr(a, b, time, "latency"));
        } else if (sort === "utilization-desc") {
          newData.sort((a, b) => this.cmpAttr(b, a, time, "utilization"));
        } else if (sort === "utilization-asc") {
          newData.sort((a, b) => this.cmpAttr(a, b, time, "utilization"));
        } else if (sort === "success-desc") {
          newData.sort(
            (a, b) =>
              this.countSuccessPercent(b[time]) -
              this.countSuccessPercent(a[time])
          );
        } else if (sort === "success-asc") {
          newData.sort(
            (a, b) =>
              this.countSuccessPercent(a[time]) -
              this.countSuccessPercent(b[time])
          );
        }
      }
      return newData;
    }
  },
  methods: {
    countSuccessPercent: function(dt) {
      const statusTotal =
        parseInt(dt.success, 10) +
        parseInt(dt.association, 10) +
        parseInt(dt.dns, 10) +
        parseInt(dt.authentication, 10) +
        parseInt(dt.dhcp, 10);
      return parseInt(dt.success) / statusTotal;
    },
    cmpAttr: function(a, b, time, attr) {
      return parseFloat(a[time][attr]) - parseFloat(b[time][attr]);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-table-content {
  width: 100%;
  height: calc(100% - 130px);

  padding: 0;

  .table-sort-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .table-sort-label {
      font-size: 15px;
      margin-right: 10px;
    }
  }

  .table-header {
    display: flex;
    justify-content: center;
    align-items: center;
    .table-header-col {
      width: calc(3vmin + 60px);
      margin: 5px;
      font-size: 0.75rem;
      text-align: left;
      &:first-child {
        margin: 0;
        width: 10rem;
      }
    }
  }

  .tables-container {
    width: 100%;
    height: calc(100% - 62.5px);
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
  }
}
</style>
