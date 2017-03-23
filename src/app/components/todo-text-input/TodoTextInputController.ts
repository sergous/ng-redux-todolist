import {IScope} from 'angular';
import {INgRedux} from 'ng-redux';

export default class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;

  /** @ngInject */
  constructor(
    public $window: any,
    public $timeout: any,
    $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.editing = this.editing || false;
    this.text = this.text || '';
    if (this.text.length) {
      this.focus();
    }

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state)
    )(this);

    $scope.$on('$destroy', disconnect);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUpdate(state: any) {
    return {
      text: state.text
    };
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
