import axios from 'axios';

class Client {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.API_URL,
      timeout: 5000,
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
