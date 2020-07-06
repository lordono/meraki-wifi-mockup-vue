export default {
  data: function() {
    return {
      redCss: "red",
      greenCss: "green",
      orangeCss: "orange"
    };
  },
  methods: {
    /**
     * Choose the color of the value for given attribute.
     * This is based on the attribute type and the output can be red/green/orange.
     * @param {Object} data Data consist of the 7 attributes for the particular period
     * @param {String} type Attribute that is of concern here
     */
    chooseColor: function(data, type) {
      const value = data[type];
      if (type === "uptime") {
        if (value >= 95.0) return this.greenCss;
        else if (value >= 85 && value < 95.0) return this.orangeCss;
        else return this.redCss;
      } else if (type === "latency") {
        if (value > 200) return this.redCss;
        else if (value <= 200 && value >= 70) return this.orangeCss;
        else return this.greenCss;
      } else if (type === "utilization") {
        if (value > 60) return this.redCss;
        else if (value > 20 && value <= 60) return this.orangeCss;
        else return this.greenCss;
      } else {
        try {
          const dt = data;
          const statusTotal =
            parseInt(dt.success, 10) +
            parseInt(dt.association, 10) +
            parseInt(dt.dns, 10) +
            parseInt(dt.authentication, 10) +
            parseInt(dt.dhcp, 10);
          const percent = dt[type] / statusTotal;
          if (type === "success") {
            if (percent > 0.975) return this.greenCss;
            else if (percent > 0.85) return this.orangeCss;
            else return this.redCss;
          } else {
            if (percent < 0.005) return this.greenCss;
            else if (percent < 0.01) return this.orangeCss;
            else return this.redCss;
          }
        } catch (error) {
          console.log(error);
          return this.greenCss;
        }
      }
    }
  }
};
