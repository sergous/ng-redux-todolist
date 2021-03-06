import * as angular from 'angular';
import MainSection from './main-section';
import TodoItem from './todo-item';
import TextInput from './text-input';
import TodosCount from './todos-count';
import Footer from './footer';
import SidebarList from './sidebar-list';
import SidebarListItem from './sidebar-list-item';
import Register from './register';
import Login from './login';
import { ListErrors } from "./ListErrors";

import scopeElementDirective from '../directives/scopeElementDirective';
import initFocusDirective from '../directives/initFocusDirective';

export default angular
  .module('app.components', [])
  .directive('scopeElement', scopeElementDirective)
  .directive('initFocus', initFocusDirective)
  .component('mainSection', MainSection)
  .component('todoItem', TodoItem)
  .component('textInput', TextInput)
  .component('footerComponent', Footer)
  .component('todosCount', TodosCount)
  .component('sidebarList', SidebarList)
  .component('sidebarListItem', SidebarListItem)
  .component('register', Register)
  .component('login', Login)
  .component('listErrors', ListErrors)
  .name;


