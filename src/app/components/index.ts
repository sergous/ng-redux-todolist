import * as angular from 'angular';
import globalDebug from './global-debug';
import Footer from './footer';
import Header from './header';
import MainSection from './main-section';
import TodoTextInput from './todo-text-input';
import TodoItem from './todo-item';
import TodoList from './todo-list';

export default angular
  .module('app.components', [
    globalDebug,
    Header,
    Footer,
    MainSection,
    TodoItem,
    TodoTextInput,
    TodoList
  ])
  .name;

