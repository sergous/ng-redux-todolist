const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const Auth = {
  current: () => {
    const user = JSON.parse(localStorage.getItem('mockUser'));
    return new Promise((resolve) => resolve( {user} ));
  },
  login: (email, password) => {
    const user = JSON.parse(localStorage.getItem('mockUser'));
    return new Promise((resolve) => resolve( {user} ));
  },
  register: (username, email, password) => {
    const user = {
      username,
      email,
      password,
      token: 'TOKENEXAMPLE'
    };
    localStorage.setItem('mockUser', JSON.stringify( user ));
    return new Promise((resolve) => resolve( {user} ));
  },
  save: user => {
    localStorage.setItem('mockUser', JSON.stringify( user ));
    return new Promise((resolve) => resolve( {user} ));
  }
};

export default {
  Auth,
  setToken: _token => { token = _token; }
};
