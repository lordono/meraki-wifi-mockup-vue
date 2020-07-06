// utility functions
/**
 * Aggregate a hash object insde mock data to
 * get average values for day/week/month
 */
const aggregateSingleHash = (fromHash, toHash) => {
  const num = toHash.numPoints;
  const timeArr = ["day", "week", "month"];
  const attrArr = [
    "uptime",
    "latency",
    "utilization",
    "success",
    "association",
    "authentication",
    "dhcp",
    "dns"
  ];
  // loop through time and attribute
  for (let time of timeArr) {
    for (let attr of attrArr) {
      const value = parseFloat(fromHash[time][attr]);
      if (attr in Object.keys(toHash[time])) {
        // average out the attribute score
        toHash[time][attr] = (toHash[time][attr] * num + value) / (num + 1);
      } else toHash[time][attr] = value;
      // make value become integer for non-uptime
      if (attr !== "uptime") toHash[time][attr] = Math.ceil(toHash[time][attr]);
    }
  }
  return toHash;
};

// getters
export default {
  groupDatabyDistrict: state => {
    return state.data.reduce((acc, cur) => {
      if (!(cur.district in acc)) {
        acc[cur.district] = {
          district: cur.district,
          numPoints: 0,
          week: {},
          day: {},
          month: {}
        };
      }
      acc[cur.district] = {
        ...aggregateSingleHash(cur, acc[cur.district])
      };
      acc[cur.district].numPoints += 1;
      return acc;
    }, {});
  }
};
