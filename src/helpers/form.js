export default class FormHandler {
  constructor(form) {
    this.form = form;
  }

  get inputs() {
    return this.form.querySelectorAll("input");
  }

  get textareas() {
    return this.form.querySelectorAll("input");
  }

  get textFields() {
    return [...Object.values(this.inputs), ...Object.values(this.textareas)];
  }

  get values() {
    return Object.fromEntries(
      this.textFields.map((item) => [item.name, item.value])
    );
  }
}
