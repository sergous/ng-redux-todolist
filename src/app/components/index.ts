import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainRouterConfig from './main-section/main-router-config';
import Header from './header';
import MainSection from './main-section';
import TodoListContainer from './todo-list-container';
import TodoList from './todo-list';
import TodoItem from './todo-item';
import TodoTextInput from './todo-text-input';
import Footer from './footer';

export default angular
  .module('app.components', [
    uiRouter,
  ])
  .config(mainRouterConfig)
  .component('headerComponent', Header)
  .component('mainSection', MainSection)
  .component('todoListContainer', TodoListContainer)
  .component('todoList', TodoList)
  .component('todoItem', TodoItem)
  .component('todoTextInput', TodoTextInput)
  .component('footerComponent', Footer)
  .name;


