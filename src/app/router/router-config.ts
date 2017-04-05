/** @ngInject */
export default function routerConfig(
  $urlRouterProvider: any,
  $stateProvider: any,
  $locationProvider: angular.ILocationProvider
) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('register', {
      url: '/register',
      component: 'register'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    });
}
