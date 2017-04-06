export default class TodoTextInputController {
  editing: boolean;
  text: string;
  newTodo: boolean;
  onSave: Function;
  onChancel: Function;

  /** @ngInject */
  constructor() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChancel = this.handleChancel.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    if (!this.newTodo) return;
    this.text = '';
  }

  handleChancel() {
    if (this.onChancel) {
      this.onChancel();
    }
    this.handleClear();
    if (!this.editing) return;
    this.editing = false;
  }

  handleEsc(e: any) {
    if (e.keyCode !== 27) return;
    this.handleChancel();
  }

  handleSave() {
    if (!this.text) return;
    if (this.text.length === 0) return;
    this.onSave({text: this.text});
    this.handleClear();
  }

  handleSubmit(e: any) {
    if (e.keyCode !== 13) return;
    this.handleSave();
  }
}

