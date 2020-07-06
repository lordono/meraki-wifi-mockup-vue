<template>
  <div class="table-row">
    <div class="table-row-title">{{ data.name }}</div>
    <div class="table-box-container">
      <table-view-row-column :data="data[time]" type="uptime" />
      <table-view-row-column :data="data[time]" type="latency" />
      <table-view-row-column :data="data[time]" type="utilization" />
      <table-view-row-column :data="data[time]" type="success" />
      <table-view-row-column :data="data[time]" type="association" />
      <table-view-row-column :data="data[time]" type="authentication" />
      <table-view-row-column :data="data[time]" type="dhcp" />
      <table-view-row-column :data="data[time]" type="dns" />
    </div>
  </div>
</template>

<script>
import TableViewRowColumn from "./TableViewRowColumn";

export default {
  name: "TableViewRow",
  components: { TableViewRowColumn },
  props: {
    data: Object,
    time: String
  }
};
</script>

<style lang="scss" scoped>
.table-row {
  padding: 15px 20px;
  border-radius: 10px;
  font-size: calc(1vmin + 5px);
  width: calc(32vmin + 680px);
  height: calc(1vmin + 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .table-row-title {
    font-weight: 100;
    font-size: 13px;
    text-align: left;

    width: 10rem;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
  }
  .table-box-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .table-border {
      border-radius: 5px;
      border: 0.5px solid lighten(#282c34, 15%);
      padding: 5px;
      margin: 0 5px;
      .table-border-title {
        font-weight: 200;
        font-size: 0.75rem;
        text-align: left;
        padding-left: 5px;
      }
      .table-border-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
