import * as angular from 'angular';
import MainSection from './main-section';
import TodoItem from './todo-item';
import TodoTextInput from './todo-text-input';
import TodosCount from './todos-count';
import Footer from './footer';

export default angular
  .module('app.components', [])
  .component('mainSection', MainSection)
  .component('todoItem', TodoItem)
  .component('todoTextInput', TodoTextInput)
  .component('footerComponent', Footer)
  .component('todosCount', TodosCount)
  .name;


