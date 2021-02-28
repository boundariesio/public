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

  register(attrs) {
    return this.http.post('/accounts', attrs);
  }
}

export default AccountClient;
