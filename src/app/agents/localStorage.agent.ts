const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const asyncDelay = 500;

const Auth = {
  current: () => {
    const user = JSON.parse(localStorage.getItem('mockUser'));
    return new Promise((resolve) => {
      const result = () => resolve( {user} );
      setTimeout(result, asyncDelay);
    });
  },
  validate: (token: string) => {
    const user = JSON.parse(localStorage.getItem('mockUser'));
    const valid = user && user.token === token;
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: 'Session not found'}]});
      setTimeout(result, asyncDelay);
    });
  },
  login: (email, password) => {
    const user = JSON.parse(localStorage.getItem('mockUser'));
    const valid = user && email === user.email && password === user.password;
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: 'User not found'}]});
      return setTimeout(result, asyncDelay);
    });
  },
  register: (username, email, password) => {
    const existingUser = JSON.parse(localStorage.getItem('mockUser'));
    const user = {
      username,
      email,
      password,
      token: 'TOKENEXAMPLE'
    };
    const valid = user.email !== existingUser.email;
    if (valid) localStorage.setItem('mockUser', JSON.stringify( user ));
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: 'User already exist'}]});
      setTimeout(result, asyncDelay);
    });
  },
  save: user => {
    localStorage.setItem('mockUser', JSON.stringify( user ));
    return new Promise((resolve) => {
      const result = () => resolve( {user} );
      setTimeout(result, asyncDelay);
    });
  }
};

export default {
  Auth,
  setToken: _token => { token = _token; }
};
