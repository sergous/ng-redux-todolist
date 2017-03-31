export default class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;

  /** @ngInject */
  constructor() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
}
