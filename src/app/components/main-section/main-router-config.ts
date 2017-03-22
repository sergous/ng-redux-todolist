import MainSectionController from './MainSectionController';

export default function mainRouterConfig($urlRouterProvider: any, $stateProvider: any) {
  $urlRouterProvider.otherwise('/todos');
  $stateProvider
    .state('main.todos', {
      url: 'todos/',
      abstract: true,
      views: {
        'todos@main': {
          template: '<div ui-view="todos"></div>',
          controller: 'MainSectionController',
          controllerAs: 'main'
        }
      }
    })
    .state('main.todos.all', {
      url: 'all',
      views: {
        'todos@main.todos': {
          template: '<div ui-view="todos"></div>'
        }
      }
    })
    .state('main.todos.active', {
      url: 'active',
      views: {
        'todos@main.todos': {
          template: '<div ui-view="todos"></div>'
        }
      }
    })
    .state('main.todos.completed', {
      url: 'completed',
      views: {
        'todos@main.todos': {
          template: '<div ui-view="todos"></div>'
        }
      }
    })
  ;
}

mainRouterConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
