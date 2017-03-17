import {TodoService} from '../todos/todos';
import {IScope} from 'angular';

class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;

  static onUpdate(state: any) {
    return {
      text: state.text
    };
  }

  /** @ngInject */
  constructor(
    public todoService: TodoService,
    public $window: any,
    public $timeout: any,
    $ngRedux: any,
    $scope: IScope
  ) {
    this.editing = this.editing || false;
    this.text = this.text || '';
    if (this.text.length) {
      this.focus();
    }

    let disconnect = $ngRedux.connect(
      state => TodoTextInputController.onUpdate(state)
    )(this);

    $scope.$on('$destroy', disconnect);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur() {
    if (!this.newTodo) {
      this.onSave({text: this.text});
    }
  }

  handleSubmit(e: any) {
    if (e.keyCode === 13) {
      this.onSave({text: this.text});
      if (this.newTodo) {
        this.text = '';
      }
    }
  }

  focus() {
    this.$timeout(() => {
      const element = this.$window.document.querySelector('.editing .textInput');
      if (element) {
        element.focus();
      }
    }, 0);
  }
}

export const TodoTextInput: angular.IComponentOptions = {
  template: require('./TodoTextInput.html'),
  controller: TodoTextInputController,
  bindings: {
    onSave: '&',
    placeholder: '@',
    newTodo: '@',
    editing: '@',
    text: '<'
  }
};
