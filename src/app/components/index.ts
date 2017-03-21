import * as angular from 'angular';
import globalDebug from './global-debug';
import Footer from './footer';
import Header from './header';
import MainSection from './main-section';
import {TodoTextInput} from './todo-text-input/TodoTextInput';
import TodoItem from './todo-item';
export default angular
  .module('app.components', [
    globalDebug,
    Header,
    Footer,
    MainSection,
    TodoItem
  ])
  .component('todoTextInput', TodoTextInput)
  .name;

