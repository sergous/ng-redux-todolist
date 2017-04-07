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
      component: 'app'
    })
    .state('app.main', {
      url: '/',
      component: 'mainSection'
    })
    .state('app.register', {
      url: '/register',
      component: 'register'
    })
    .state('app.login', {
      url: '/login',
      component: 'login'
    });
}
