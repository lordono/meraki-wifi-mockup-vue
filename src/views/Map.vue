<template>
  <div class="app-map-content">
    <div class="app-map-chart" ref="map"></div>
    <map-overlay
      :type="type"
      :time="time"
      @time-input="time = $event"
      @type-input="type = $event"
    ></map-overlay>
  </div>
</template>

<script>
// import vuex components
import { mapState } from "vuex";
// import components
import MapOverlay from "@/components/Map/Overlay";
// leaflet imports
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RedMarker from "@/assets/red-marker.png";
import OrangeMarker from "@/assets/orange-marker.png";
import GreenMarker from "@/assets/green-marker.png";
// correct leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// create standard icons
const StandardIcon = L.Icon.extend({
  options: {
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [-3, -76]
  }
});

export default {
  name: "ViewMap",
  components: {
    MapOverlay
  },
  data() {
    return {
      mapCenter: [
        this.$route.query.lat || 1.34127,
        this.$route.query.lng || 103.825969
      ],
      mapObject: null,
      redIcon: new StandardIcon({ iconUrl: RedMarker }),
      orangeIcon: new StandardIcon({ iconUrl: OrangeMarker }),
      greenIcon: new StandardIcon({ iconUrl: GreenMarker }),
      type: "uptime",
      time: "day",
      markers: []
    };
  },
  mounted() {
    // initialize the map
    this.mapObject = L.map(this.$refs.map, {
      center: this.mapCenter,
      zoom: 9
    });
    // zoom effect
    this.setZoom(this.mapObject);
    // setup the tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapObject);
    // add in the markers
    for (let point of this.data) {
      const marker = L.marker([point.lat, point.lng], {
        icon: this.chooseMarker(point)
      }).addTo(this.mapObject);
      this.setPopup({ marker, point });
      this.markers.push({ marker, point });
    }
  },
  computed: {
    // compute zoom figure for map
    zoom: function() {
      const width = this.width;
      if (width > 1920) return 13;
      else if (width >= 1024 && width <= 1920) return 12;
      else if (width >= 768 && width < 1024) return 11;
      return 10;
    },
    ...mapState(["data", "width"])
  },
  watch: {
    // set zoom on map whenever zoom is re-computed
    zoom: function() {
      this.setZoom(this.mapObject);
    },
    // change in type
    type: function() {
      for (let marker of this.markers) {
        this.setMarker(marker);
      }
    },
    // change in time
    time: function() {
      for (let marker of this.markers) {
        this.setMarker(marker);
      }
    }
  },
  methods: {
    setZoom: function(mapObject) {
      mapObject.setZoom(this.zoom);
    },
    // choose the marker color accordingly
    chooseMarker: function(point) {
      const time = this.time;
      const type = this.type;
      const value = parseFloat(point[time][type]);
      if (type === "uptime") {
        if (value >= 95.0) return this.greenIcon;
        else if (value >= 85 && value < 95.0) return this.orangeIcon;
        else return this.redIcon;
      } else if (type === "latency") {
        if (value > 200) return this.redIcon;
        else if (value <= 200 && value >= 70) return this.orangeIcon;
        else return this.greenIcon;
      } else if (type === "utilization") {
        if (value > 60) return this.redIcon;
        else if (value > 20 && value <= 60) return this.orangeIcon;
        else return this.greenIcon;
      }
      return this.greenIcon;
    },
    setMarker: function(item) {
      const { marker, point } = item;
      marker.setIcon(this.chooseMarker(point));
      this.setPopup(item);
    },
    setPopup: function(item) {
      const { marker, point } = item;
      let text = `${point.name} - ${point[this.time][this.type]}`;
      if (this.type === "uptime") text += "%";
      else if (this.type === "utilization") text += "mbps";
      else text += "ms";
      marker.bindPopup(text);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-map-content {
  width: 100%;
  height: calc(100% - 110px);
  .app-map-chart {
    height: 100%;
    width: 100%;
  }
}
</style>
