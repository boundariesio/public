import axios from 'axios';

// const API_BASE_URL = 'https://api.boundaries.io';
const API_BASE_URL = 'http://localhost:3334';

class Client {
  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      timeout: 1000,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  setAPIKey(key) {
    this.http.defaults.headers.common['x-api-key'] = key;
  }

  collection(name) {
    this.currentCollection = name;
    return this;
  }

  whereami([lat, lng]) {
    return this.http.get(`/geographies/${this.currentCollection}/whereami`, {
      params: {
        lat,
        lng
      }
    });
  }
}

export default Client;
