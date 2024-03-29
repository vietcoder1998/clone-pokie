export default class RichTextData {
  editorId = "editor";
  searchText = "";
  replaceText = "";
  linkText = ""

  constructor(editorId) {
    if (editorId) {
      this.editorId = editorId;
    }
  }
  getEditor() {
    return document.querySelector(`#${this.editorId}`);
  }
  applyStyle = function (component, properties) {
    const applyComponent = component ?? "h6";
    document.designMode = "on";
    document.execCommand(
      "insertHTML",
      false,
      `<${applyComponent} ${properties}>` +
        window.getSelection().toString() +
        `</${applyComponent}>`
    );
    document.designMode = "off";
  };
  applyTagP() {
    return this.applyStyle("p");
  }
  applyTagH() {
    return this.applyStyle("h");
  }
  applyTagH1() {
    return this.applyStyle("h1");
  }
  applyTagH2() {
    return this.applyStyle("h2");
  }
  applyTagH3() {
    return this.applyStyle("h3");
  }
  applyTagH4() {
    return this.applyStyle("h4");
  }
  applyTagH5() {
    return this.applyStyle("h5");
  }
  applyTagH6() {
    return this.applyStyle("h5");
  }
  replace = (search, replace) => {
    try {
      const replacement = this.getEditor();
      const innerHTML = replacement.innerHTML;
      const newInnerHTML = innerHTML.replace(search, replace);

      replacement.innerHTML = newInnerHTML;
    } catch (error) {
      return {
        code: -1,
        ...error,
      };
    }
  };
  applyTagLink = () => {
    return this.applyStyle("a", `href="${this.linkText}" target="_blank"`);
  }
  replaceAll = (search, replace) => {
    try {
      const replacement = this.getEditor();
      const innerHTML = replacement.innerHTML;
      const newInnerHTML = innerHTML.replaceAll(search, replace);

      replacement.innerHTML = newInnerHTML;
    } catch (error) {
      return {
        code: -1,
        ...error,
      };
    }
  };
  onChangeSearchText = (e) => {
    this.searchText = e?.target?.value;
  };
  onChangeReplaceText = (e) => {
    this.replaceText = e?.target?.value;
  };
  onChangeLinkText = (e) => {
    this.linkText = e?.target?.value;
  }
  onLazyReplaceText = (isAll) => {
    console.log("on replace text");
    if (isAll) {
      return this.replaceAll(this.searchText, this.replaceText);
    }

    return this.replace(this.searchText, this.replaceText);
  };
  getData = () => {
    return this.getEditor()?.innerHTML;
  };
}
