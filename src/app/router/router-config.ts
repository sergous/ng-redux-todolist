import * as states from '../constants/RouterStates';

/** @ngInject */
export default function routerConfig(
  $urlRouterProvider: any,
  $stateProvider: any,
  $locationProvider: angular.ILocationProvider
) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state(states.APP, {
      component: 'app'
    })
    .state(states.APP_MAIN, {
      url: '/',
      component: 'mainSection'
    })
    .state(states.APP_REGISTER, {
      url: '/register',
      component: 'register'
    })
    .state(states.APP_LOGIN, {
      url: '/login',
      component: 'login'
    });
}
