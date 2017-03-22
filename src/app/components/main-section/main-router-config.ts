import MainSectionController from './MainSectionController';

export default function mainRouterConfig($urlRouterProvider: any, $stateProvider: any) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
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
    })
  ;
}

mainRouterConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
