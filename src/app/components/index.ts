import * as angular from 'angular';
import globalDebug from './global-debug';
import {Footer} from './footer/Footer';
import {Header} from './header/Header';
import {MainSection} from './main-section/MainSection';
import {TodoTextInput} from './todo-text-input/TodoTextInput';
import {TodoItem} from './todo-item/TodoItem';
export default angular
  .module('app.components', [
    globalDebug,
  ])
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('todoTextInput', TodoTextInput)
  .component('todoItem', TodoItem)
  .name;

