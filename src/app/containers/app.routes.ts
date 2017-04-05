export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/register');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('register', {
      url: '/register',
      component: 'register'
    });
}
