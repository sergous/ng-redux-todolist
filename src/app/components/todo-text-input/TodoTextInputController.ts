export default class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;

  /** @ngInject */
  constructor(
    public $element: angular.IRootElementService
  ) {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus = this.focus.bind(this);
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
    const input = this.$element.find('input');
    if (!input) { return; };
    input.focus();
  }
}
