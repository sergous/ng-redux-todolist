/** @ngInject */
export default function routerConfig($urlRouterProvider: any, $stateProvider: any) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
    .state('main', {
      url: '/?debug_session',
      views: {
        '': {
          template: require('../containers/App.html'),
        }
      }
    })
    .state('main.todos', {
      url: 'todos/',
      abstract: true
    })
    .state('main.todos.all', {
      url: 'all'
    })
    .state('main.todos.active', {
      url: 'active'
    })
    .state('main.todos.completed', {
      url: 'completed'
    });
}
