import axios from 'axios';

class AccountClient {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.ADMIN_URL,
      timeout: 5000,
      headers: {
        Accept: 'application/json'
      }
    });
  }

  requestSession(email) {
    return this.http.post(`/sessions`, { email });
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
