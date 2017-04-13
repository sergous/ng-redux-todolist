import * as types from "../constants/ActionTypes";
import { promiseMiddleware, isPromise } from './promise.middleware';
import { ASYNC_DELAY } from "../constants";

const promise = new Promise(resolve => null);
const func = resolve => null;

describe('promiseMiddleware', () => {
  let next: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;
  let getStateSpy: jasmine.Spy;
  let store: any;
  const dispatchStartParams = { type: types.ASYNC_START, subtype: types.LOGIN };
  let appViewCount: any;

  beforeEach(() => {
    next = jasmine.createSpy('nextSpy');
    dispatchSpy = jasmine.createSpy('dispatchSpy');
    getStateSpy = jasmine.createSpy('getStateSpy').and.callFake(args => appViewCount);
    store = {
      skipTracking: false,
      dispatch: dispatchSpy,
      getState: getStateSpy
    };
    appViewCount = {app: {viewChangeCounter: 3}};
  });

  describe('payload', () => {
    describe('is not promise', () => {
      const action = {
          payload: func,
          type: types.LOGIN
        };

      beforeEach(() => {
        promiseMiddleware(store)(next)(action);
      });

      it('should call next action', () => {
        expect(next).toHaveBeenCalledWith(action);
      });

      it('should not call any dispatch', () => {
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('is promise', () => {
      let resolveSpy: jasmine.Spy;
      const action = {
          payload: promise,
          type: types.LOGIN
        };

      beforeEach(() => {
        resolveSpy = jasmine.createSpy('resolveSpy').and.callFake(args => promise);
        action.payload.then = resolveSpy;
        promiseMiddleware(store)(next)(action);
      });

      it('should not call next action', () => {
        expect(next).not.toHaveBeenCalledWith(action);
      });

      it('should call dispatch ASYNC_START', () => {
        expect(store.dispatch).toHaveBeenCalledWith(dispatchStartParams);
      });

      it('should call getState', () => {
        expect(store.getState).toHaveBeenCalled();
      });

      it('should be resolved', () => {
        expect(resolveSpy).toHaveBeenCalled();
      });
    });
  });

  describe('resolve', () => {
    const result = {result: 'success'};
    const error = {error: {message: 'Error message'}};
    const dispatchEndParams = { type: types.ASYNC_END, promise: result };
    let resolve: Promise<PromiseConstructor>;
    let action: any;

    beforeEach(function() {
      jasmine.clock().install();
      store.dispatch = dispatchSpy;
      store.getState = getStateSpy;
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });
    describe('success', () => {
      beforeEach(() => {
        resolve = new Promise(resolve => {
          setTimeout(() => resolve(result), ASYNC_DELAY);
        });
        action = {
            payload: resolve,
            type: types.LOGIN
          };
        promiseMiddleware(store)(next)(action);
      });

      it('should call getState', () => {
        resolve.then(res => {
          expect(store.getState).toHaveBeenCalled();
        });
      });

      it('should call console.log', () => {
        spyOn(console, 'log');
        resolve.then(res => {
          expect(console.log).toHaveBeenCalledWith('RESULT', res);
        });
      });

      describe('skipTracking', () => {
        describe('not set', () => {
          it('should not dispatch ASYNC_END', () => {
            resolve.then(res => {
              expect(store.dispatch).not.toHaveBeenCalled();
            });
          });
        });

        describe('set to true', () => {
          it('should dispatch ASYNC_END', () => {
            resolve.then(res => {
              action.skipTracking = false;
              expect(store.dispatch).toHaveBeenCalledWith(dispatchEndParams);
            });
          });
        });
      });

      describe('viewChangeCounter', () => {
        describe('changed', () => {
          it('should not dispatch ASYNC_END', () => {
            resolve.then(res => {
              appViewCount.app.viewChangeCounter++;
              expect(store.dispatch).not.toHaveBeenCalled();
            });
          });
        });

        describe('not changed', () => {
          it('should dispatch ASYNC_END', () => {
            resolve.then(res => {
              expect(store.dispatch).toHaveBeenCalledWith(dispatchEndParams);
            });
          });
        });
      });

      describe('action', () => {
        it('should be dispatched', () => {
          resolve.then(res => {
            expect(store.dispatch).toHaveBeenCalledWith(result);
          });
        });
      });
    });

    describe('error', () => {
      beforeEach(() => {
        resolve = new Promise(reject => {
          setTimeout(() => reject(error), ASYNC_DELAY);
        });
        action = {
            payload: resolve,
            type: types.LOGIN
          };
        promiseMiddleware(store)(next)(action);
      });

      it('should call getState', () => {
        resolve.then(error => {
          expect(store.getState).toHaveBeenCalled();
        });
      });

      it('should call console.log', () => {
        spyOn(console, 'log');
        resolve.then(error => {
          expect(console.log).toHaveBeenCalledWith('ERROR', error);
        });
      });

      describe('skipTracking', () => {
        describe('not set', () => {
          it('should not dispatch ASYNC_END', () => {
            resolve.then(error => {
              expect(store.dispatch).not.toHaveBeenCalled();
            });
          });
        });

        describe('set to false', () => {
          it('should dispatch ASYNC_END', () => {
            resolve.then(error => {
              action.skipTracking = false;
              expect(store.dispatch).toHaveBeenCalledWith(dispatchEndParams);
            });
          });
        });

        describe('set to true', () => {
          it('should dispatch ASYNC_END', () => {
            resolve.then(error => {
              action.skipTracking = true;
              expect(store.dispatch).toHaveBeenCalledWith(dispatchEndParams);
            });
          });
        });
      });

      describe('viewChangeCounter', () => {
        describe('changed', () => {
          it('should not dispatch ASYNC_END', () => {
            resolve.then(error => {
              appViewCount.app.viewChangeCounter++;
              expect(store.dispatch).not.toHaveBeenCalled();
            });
          });
        });

        describe('not changed', () => {
          it('should dispatch ASYNC_END', () => {
            resolve.then(error => {
              expect(store.dispatch).toHaveBeenCalledWith(dispatchEndParams);
            });
          });
        });
      });

      describe('action', () => {
        it('should be dispatched', () => {
          resolve.then(error => {
            expect(store.dispatch).toHaveBeenCalledWith(error);
          });
        });
      });
    });
  });
});

describe('isPromise', () => {

  it('should return true', () => {
    expect(isPromise(promise)).toBeTruthy();
  });

  it('should return false', () => {
    expect(isPromise(func)).toBeFalsy();
  });
});
