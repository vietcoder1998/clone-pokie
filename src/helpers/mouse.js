export class MouseHandler {
  blurValue = "";

  static onBlur(e) {
    this.blurValue = e.target.value;
  }

  static get checkListValue() {
    const newContent = this.blurValue
      ?.split(/\n/)
      .map((item, index) => ['-', '[', ']', ''].join(" "))
      .join("\n")

    return newContent
  }

  convertToListValue(value) {
    const newContent = value
      ?.split(/\n/)
      .map((item, index) => [index + 1, item].join("."))
      .join("\n")

    return newContent
  }
}
