export default class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;

  /** @ngInject */
  constructor(
    public $window: any,
    public $timeout: any,
  ) {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus();
  }

  handleBlur() {
    if (!this.newTodo && this.text.length) {
      this.onSave({text: this.text});
    }
  }

  handleSubmit(e: any) {
    if (e.keyCode === 13 && this.text.length) {
      this.onSave({text: this.text});
      if (this.newTodo) {
        this.text = '';
      }
    }
  }

  focus() {
    this.$timeout(() => {
      const element = this.$window.document.querySelector('.editing .textInput');
      if (element && element.value.length) {
        element.focus();
      }
    }, 0);
  }
}
