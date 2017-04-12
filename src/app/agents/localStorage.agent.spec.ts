import { initUser, MOCK_USER_KEY, ASYNC_DELAY, SESSION_TOKEN, ERRORS } from "../constants";
import { IUser } from "../interfaces";
import agent from './localStorage.agent';

const user: IUser = {
  username: 'user',
  email: 'user@host.com',
  password: 'password',
  token: 'TOKENEXAMPLE'
};
const promise = new Promise(resolve => resolve({user}));
const store = {
  [MOCK_USER_KEY]: JSON.stringify(user)
};

describe('localStorage agent', () => {
  beforeEach(function() {
    spyOn(localStorage, 'setItem').and.callFake((args) => null);
  });

  describe('localStoreUser', () => {
    it('should read from localStorage item ' + MOCK_USER_KEY, () => {
      agent.localStoreUser(user);
      expect(localStorage.setItem).toHaveBeenCalledWith(MOCK_USER_KEY, store[MOCK_USER_KEY]);
    });
  });

  describe('Auth', () => {
    beforeEach(function() {
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    describe('current', () => {
      it('should return promise', () => {
        expect(agent.Auth.current()).toEqual(promise);
      });

      it('should read from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem');
        spyOn(JSON, 'parse').and.callFake(key => user);
        agent.Auth.current();
        expect(localStorage.getItem).toHaveBeenCalled();
      });

      it('should get from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        spyOn(JSON, 'parse').and.callThrough();
        agent.Auth.current();
        expect(JSON.parse).toHaveBeenCalledWith(store[MOCK_USER_KEY]);
      });
    });

    describe('validate', () => {
      it('should return promise', () => {
        expect(agent.Auth.validate(user.token)).toEqual(promise);
      });

      it('should read from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem');
        spyOn(JSON, 'parse').and.callFake(key => user);
        agent.Auth.validate(user.token);
        expect(localStorage.getItem).toHaveBeenCalled();
      });

      it('should get from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        spyOn(JSON, 'parse').and.callThrough();
        agent.Auth.validate(user.token);
        expect(JSON.parse).toHaveBeenCalledWith(store[MOCK_USER_KEY]);
      });

      it('should pass with valid token', () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        const payload = agent.Auth.validate(user.token);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.then(result => expect(result).toEqual({user}));
      });

      it('should fail with wrong token', () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        const payload = agent.Auth.validate('wrongtoken');
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.catch(reason => expect(reason).toEqual({errors: [{message: ERRORS.AUTH.SESSION_NOT_FOUND}]}));
      });
    });

    describe('login', () => {
      it('should return promise', () => {
        expect(agent.Auth.login(user.email, user.password)).toEqual(promise);
      });

      it('should read from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem');
        spyOn(JSON, 'parse').and.callFake(key => user);
        agent.Auth.login(user.email, user.password);
        expect(localStorage.getItem).toHaveBeenCalled();
      });

      it('should get from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        spyOn(JSON, 'parse').and.callThrough();
        agent.Auth.login(user.email, user.password);
        expect(JSON.parse).toHaveBeenCalledWith(store[MOCK_USER_KEY]);
      });

      it('should create default user if not exists', () => {
        spyOn(localStorage, 'getItem').and.callFake(key => null);
        agent.Auth.login(user.email, user.password);
        expect(localStorage.setItem).toHaveBeenCalledWith(MOCK_USER_KEY, store[MOCK_USER_KEY]);
      });

      it('should pass with valid credentials', () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        const payload = agent.Auth.login(user.email, user.password);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.then(result => expect(result).toEqual({user}));
      });

      it('should fail with wrong credentials', () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        const payload = agent.Auth.login(user.email, 'wrongpassword');
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.catch(reason => expect(reason).toEqual({errors: [{message: ERRORS.AUTH.USER_NOT_FOUND}]}));
      });
    });

    describe('register', () => {
      it('should return promise', () => {
        expect(agent.Auth.register(user.username, user.email, user.password)).toEqual(promise);
      });

      it('should read from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem');
        spyOn(JSON, 'parse').and.callFake(key => user);
        agent.Auth.register(user.username, user.email, user.password);
        expect(localStorage.getItem).toHaveBeenCalled();
      });

      it('should get from localStorage item ' + MOCK_USER_KEY, () => {
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        spyOn(JSON, 'parse').and.callThrough();
        agent.Auth.register(user.username, user.email, user.password);
        expect(JSON.parse).toHaveBeenCalledWith(store[MOCK_USER_KEY]);
      });

      it('should pass for new user', () => {
        spyOn(agent.Auth, 'register').and.callThrough();
        const payload = agent.Auth.register(user.username, user.email, user.password);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.then(result => expect(result).toEqual({user}));
      });

      it('should fail for user with same email', () => {
        spyOn(agent.Auth, 'register').and.callThrough();
        spyOn(localStorage, 'getItem').and.callFake(key => store[key]);
        const payload = agent.Auth.register(user.username, user.email, user.password);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.catch(reason => expect(reason).toEqual({errors: [{message: ERRORS.AUTH.USER_EXIST}]}));
      });
    });

    describe('save', () => {
      it('should return promise', () => {
        expect(agent.Auth.save(user)).toEqual(promise);
      });

      it('should set localStorage item ' + MOCK_USER_KEY, () => {
        agent.Auth.save(user);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        expect(localStorage.setItem).toHaveBeenCalledWith(MOCK_USER_KEY, store[MOCK_USER_KEY]);
      });

      it('should resolve valid user', () => {
        spyOn(agent.Auth, 'save').and.callFake(user => promise);
        const payload = agent.Auth.save(user);
        jasmine.clock().tick(ASYNC_DELAY + 1);
        payload.then(result => expect(result).toEqual({user}));
      });
    });
  });
});
