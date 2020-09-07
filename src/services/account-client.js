import axios from 'axios';

const API_BASE_URL = 'https://admin.boundaries.io';
// const API_BASE_URL = 'http://localhost:3334';

class AccountClient {
  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  requestSession(email) {
    return this.http.post(`/sessions`, {
      params: {
        email
      }
    });
  }

  register({ firstName, lastName, productId, email, zip }) {
    return this.http.post('/accounts', {
      firstName,
      lastName,
      email,
      zip,
      productId
    });
  }
}

export default AccountClient;
