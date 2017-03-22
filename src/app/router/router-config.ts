export default function routerConfig($urlRouterProvider: any, $stateProvider: any) {

  $stateProvider
    .state('main', {
      url: '/?debug_session',
      views: {
        '': {
          template: require('../containers/App.html'),
        }
      }
    });
}

routerConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
