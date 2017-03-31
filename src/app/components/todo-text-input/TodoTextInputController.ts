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
    if (!this.text) return;
    if (this.text.length === 0) return;
    if (this.newTodo) return;
    this.onSave({text: this.text});
  }

  handleSubmit(e: any) {
    if (!this.text) return;
    if (this.text.length === 0) return;
    if (e.keyCode !== 13) return;
    this.onSave({text: this.text});
    if (!this.newTodo) return;
    this.text = '';
  }
}

