<template>
  <nav class="nav-bar">
    <div class="title">Meraki Wifi for StarHub</div>
    <ul>
      <li
        v-for="option in options"
        @click="clickMenu(option)"
        :class="{ selected: selected.id === option.id }"
        :key="option.id"
      >
        <ion-icon :name="option.icon"></ion-icon>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TheMenu",
  components: {},
  data() {
    return {
      options: [
        { id: 1, icon: "map", route: "/" },
        { id: 2, icon: "calendar", route: "/period" },
        { id: 3, icon: "grid", route: "/detail" },
        { id: 4, icon: "reorder-four-sharp", route: "/table" },
        { id: 5, icon: "add-circle-sharp", route: "/guide" }
      ],
      selected: { id: 1, icon: "map", route: "/" }
    };
  },
  methods: {
    clickMenu: function(option) {
      if (this.$router.history.current.path !== option.route) {
        this.$router.push(option.route);
      }
    },
    watchRoute: function(newValue) {
      const path = newValue.path;
      const index = this.options.findIndex(option => option.route === path);
      if (index < 0) {
        this.selected = this.options[0];
      } else this.selected = this.options[index];
    }
  },
  watch: {
    $route: {
      handler: "watchRoute",
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 110px;
  width: 100%;
  font-size: calc(10px + 1vmin);
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-weight: 600;
    line-height: 1.1;
  }
  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    li {
      font-size: calc(10px + 1vmin);
      margin: 0 2.5px;
      padding: 10px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.15s ease-in;

      &:hover {
        background-color: #61aafb;
      }

      &.selected {
        background-color: #61aafb;
      }
    }
  }
}
</style>
