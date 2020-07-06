import axios from "axios";

export const serverCall = async (url, token) => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_SERVER_URL}${url}`,
      {
        headers: {
          "X-Cisco-Meraki-API-Key": token
        }
      }
    );
    return response;
  } catch {
    console.log("fetch failed.");
    return null;
  }
};
