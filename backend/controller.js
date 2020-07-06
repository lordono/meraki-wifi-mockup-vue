const axios = require("axios");

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const httpcall = async (req, res, method) => {
  const url = req.url;
  const data = req.body ? req.body : {};
  try {
    const response = await axios({
      method,
      baseURL: process.env.MERAKI_URL,
      url,
      data,
      headers: {
        "X-Cisco-Meraki-API-Key": req.headers["x-cisco-meraki-api-key"]
      }
    });
    return res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      const waitFor = error.response.headers["Retry-After"];
      console.log(`Status Code 429 - Waiting for ${waitFor} secs`);
      await sleep(waitFor * 1000);
      return httpcall(req, method);
    } else {
      return res.status(error.response.status).json(error.response.data);
    }
  }
};

exports.http_get = (req, res) => {
  return httpcall(req, res, "get");
};

exports.http_post = (req, res) => {
  return httpcall(req, res, "post");
};

exports.http_delete = (req, res) => {
  return httpcall(req, res, "delete");
};

exports.http_put = (req, res) => {
  return httpcall(req, res, "put");
};

exports.http_patch = (req, res) => {
  return httpcall(req, res, "patch");
};
