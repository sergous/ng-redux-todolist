import { initUser, MOCK_USER_KEY, ASYNC_DELAY, SESSION_TOKEN, ERRORS } from "../constants";
import { IUser } from "../interfaces";

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

function localStoreUser(user: IUser) {
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify( user ));
}

const Auth = {
  current: () => {
    const user = JSON.parse(localStorage.getItem(MOCK_USER_KEY));
    return new Promise((resolve) => {
      const result = () => resolve( {user} );
      setTimeout(result, ASYNC_DELAY);
    });
  },
  validate: (token: string) => {
    const user = JSON.parse(localStorage.getItem(MOCK_USER_KEY));
    const valid = user && user.token === token;
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: ERRORS.AUTH.SESSION_NOT_FOUND}]});
      setTimeout(result, ASYNC_DELAY);
    });
  },
  login: (email, password) => {
    const user = JSON.parse(localStorage.getItem(MOCK_USER_KEY)) || localStoreUser(initUser);
    const valid = user && email === user.email && password === user.password;
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: ERRORS.AUTH.USER_NOT_FOUND}]});
      return setTimeout(result, ASYNC_DELAY);
    });
  },
  register: (username, email, password) => {
    const existingUser = JSON.parse(localStorage.getItem(MOCK_USER_KEY));
    const user = {
      username,
      email,
      password,
      token: SESSION_TOKEN
    };
    const valid = user.email !== existingUser.email;
    if (valid) localStoreUser(user);
    return new Promise((resolve, reject) => {
      const result = () => valid ? resolve( {user} ) : reject({errors: [{message: ERRORS.AUTH.USER_EXIST}]});
      setTimeout(result, ASYNC_DELAY);
    });
  },
  save: user => {
    localStoreUser(user);
    return new Promise((resolve) => {
      const result = () => resolve( {user} );
      setTimeout(result, ASYNC_DELAY);
    });
  }
};

export default {
  Auth,
  setToken: _token => { token = _token; }
};
