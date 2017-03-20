import * as angular from 'angular';
import globalDebug from './global-debug';
import {Header} from './Header';
import {MainSection} from './MainSection';
import {TodoTextInput} from './TodoTextInput';
import {TodoItem} from './TodoItem';
import {Footer} from './Footer';
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
