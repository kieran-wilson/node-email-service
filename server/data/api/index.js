const axios = require('axios');

module.exports = class APIUtil {
  constructor(root) {
    this.root = root;
  }

  get(path, config) {
    return get(path, config, this.root);
  }

  post(path, data, config) {
    return post(path, data, config, this.root);
  }
}

/**
 * Get request
 *
 * @param path
 * @returns {AxiosPromise}
 */
function get(path, config = {}, root) {
  return axios.get(`${root}/${path}`, config);
}

/**
 * Post request
 *
 * @param path
 * @param data
 * @param config
 * @returns {AxiosPromise}
 */
function post(path, data, config = {}, root) {
  return axios.post(`${root}/${path}`, data, config);
}