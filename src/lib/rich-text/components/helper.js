export class RickTextHelper {
  ref = "";
  children = [];

  constructor(ref, id) {
    if (ref) {
      this.ref = ref;
    }

    if (id) {
      this.id = id;
    }

    this.breakRefToChildren();
  }
  breakRefToChildren() {
    if (this.ref) {
      const element = document.createElement("div");
      element.innerHTML = `${this.ref}`;

      this.children = Object.values(element?.childNodes)?.map((child) => {
        const item = child.parentElement.firstElementChild;

        return new RickTextElement(item?.tagName, item?.innerHTML, item?.style);
      });
    }
  }
}

export class RickTextElement {
  content = "";
  tag = "p";
  style = {};
  textTag = ["b", "i", "quotes", "p", "h1"];
  children = [];
  element = {};

  constructor(tag, content, style) {
    this.tag = tag;
    this.content = content;
    this.style = style;
    this.element = this.generateDocument(content);
  }
  generateDocument(innerHTML) {
    const contentElement = document.createElement(this.tag);
    contentElement.innerText = innerHTML

    contentElement.setAttribute("contentedEditable", true);
    contentElement.addEventListener("keydown", (e) => {
      const content = e?.target.value;

      this.content = content;
    });

    return contentElement;
  }
  startTag(tag) {
    return `<${tag}>`;
  }
  endTag(tag) {
    return `</${tag}>`;
  }
  getTagList() {
    const startTagList = this.textTag.map((item) => this.startTag(item));
    const endTagList = this.textTag.map((item) => this.endTag(item));

    return [...startTagList, ...endTagList];
  }
  clearTag(content) {
    this.getTagList().forEach((t) => {
      if (content) {
        content.replace(t, "");
      }
    });

    return content;
  }
  addTag(content, tag) {
    return `${this.startTag(tag)}${content}${this.endTag(tag)}`;
  }
  convertToTag(startPoint, endPoint, tag) {
    if (
      startPoint < endPoint ||
      startPoint > this.content.length ||
      endPoint > this.content.length
    ) {
      return -1;
    }

    const textContent = this.content.substring(startPoint, endPoint);
    const newContent = this.addTag(textContent, tag);

    this.content = [
      this.content.substring(0, startPoint),
      newContent,
      this.content.substring(endPoint, startPoint),
    ].join("");
  }
  toItalic(startPoint, endPoint) {
    return this.convertToTag(startPoint, endPoint, "i");
  }
  toBold(startPoint, endPoint) {
    return this.convertToTag(startPoint, endPoint, "b");
  }
  getFullRef() {
    return `<${this.tag}>${this.content}</$${this.tag}>`;
  }
}
