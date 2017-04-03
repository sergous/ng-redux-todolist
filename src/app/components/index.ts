import * as angular from 'angular';
import MainSection from './main-section';
import TodoItem from './todo-item';
import TodoTextInput from './todo-text-input';
import TodosCount from './todos-count';
import Footer from './footer';
import SidebarList from './sidebar-list';
import SidebarListItem from './sidebar-list-item';
import scopeElementDirective from '../directives/scopeElementDirective';
import initFocusDirective from '../directives/initFocusDirective';

export default angular
  .module('app.components', [])
  .directive('scopeElement', scopeElementDirective)
  .directive('initFocus', initFocusDirective)
  .component('mainSection', MainSection)
  .component('todoItem', TodoItem)
  .component('todoTextInput', TodoTextInput)
  .component('footerComponent', Footer)
  .component('todosCount', TodosCount)
  .component('sidebarList', SidebarList)
  .component('sidebarListItem', SidebarListItem)
  .name;


