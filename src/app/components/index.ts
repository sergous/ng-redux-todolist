import * as angular from 'angular';
import Header from './header';
import MainSection from './main-section';
import TodoListContainer from './todo-list-container';
import TodoList from './todo-list';
import TodoItem from './todo-item';
import TodoTextInput from './todo-text-input';
import TodosCount from './todos-count';
import Footer from './footer';

export default angular
  .module('app.components', [])
  .component('headerComponent', Header)
  .component('mainSection', MainSection)
  .component('todoListContainer', TodoListContainer)
  .component('todoList', TodoList)
  .component('todoItem', TodoItem)
  .component('todoTextInput', TodoTextInput)
  .component('footerComponent', Footer)
  .component('todosCount', TodosCount)
  .name;


