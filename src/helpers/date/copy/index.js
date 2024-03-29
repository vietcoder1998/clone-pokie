import { LocalStorageHandler } from "./../local-storage";
export const CopyKey = "copy-handler";

export class CopyContext {
  createdAt = new Date();
  updatedAt = "";
  content = "";
  title = "";
  folder = "";
  /*
    1: show
    -1: hidden
    */
  status = 1;
  position = 0;
  key = "";
  visibleNote = 0
  constructor(content, createdAt, key, updatedAt, status, folder, title) {
    this.content = content;
    this.createdAt = createdAt ?? new Date();
    this.key = key;

    if (status !== undefined) {
      this.status = status;
    } else {
      this.status = 1;
    }

    if (updatedAt !== undefined) {
      this.updatedAt = updatedAt;
    }

    if (folder !== undefined) {
      this.folder = folder;
    }

    if (title !== undefined) {
      this.title = title;
    }
  }

  get id() {
    return this.key;
  }

  get value() {
    return {
      content: this.content,
      key: this.key,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      folder: this.folder,
      status: this.status,
      id: this.key,
      position: this.position,
      title: this.title,
      visibleNote: this.visibleNote,
    };
  }

  set _content(value) {
    this.content = value;
    this.updatedAt = new Date().getTime();
  }
}

export class CopyHandler {
  localStorageHandler = new LocalStorageHandler();
  pureData = [];
  key = CopyKey;

  constructor() {
    if (!this.data) {
      this.data = {};
    }
    this.pureData = this.objectList;
  }

  get data() {
    return this.localStorageHandler.getAsJSON(this.key);
  }

  set data(value) {
    this.localStorageHandler.setAsJSON(this.key, value);
  }

  get objectList() {
    const result = Object.values(this.data).map(
      (item) =>
        new CopyContext(
          item?.content,
          item?.createdAt,
          item?.key,
          item?.updatedAt,
          item?.status,
          item?.folder,
          item?.title
        )
    );

    return result;
  }

  get updateData() {
    return Object.fromEntries(
      Object.values(this.objectList ?? []).map((item) => [item.key, item.value])
    );
  }

  save(data) {
    this.data = data;
  }

  itemByKey(id) {
    return this.objectList.find((item) => String(item.id) === String(id));
  }

  itemByDataKey(id) {
    return Object.values(this.data).find(
      (item) => String(item.id) === String(id)
    );
  }

  saveItem(id, item) {
    const strId = String(id);

    if (strId) {
      const newData = this.data;
      newData[strId] = item;

      this.save(newData);
    }

    return this.dataArray;
  }

  updateItem(id, key, value) {
    const item = this.itemByDataKey(id);

    if (item) {
      item[key] = value;

      this.saveItem(id, item);
    }
  }

  updateTitleVisible(id, value) {
    return this.updateItem(id, 'visibleNote', value)
  }

  updateTitle(id, value) {
    return this.updateItem(id, 'title', value)
  }

  get jsonList() {
    return this.objectList.map((item) => item.value);
  }

  get dataArray() {
    return this.jsonList
      ?.filter((item) => String(item.status) !== "-1")
      ?.reverse();
  }

  get garbageArray() {
    return this.jsonList
      ?.filter((item) => String(item.status) === "-1")
      ?.reverse();
  }

  get length() {
    return Object.keys(this.data).length;
  }

  /**
   * Search item with given keyword
   *
   * @param   {string}  keyword
   *
   * @return  {Object[]}           return view data
   */

  search(keyword) {
    if (!keyword?.length) {
      return this.dataArray;
    }

    return this.dataArray?.filter((item) =>
      item?.content?.toLowerCase()?.includes(keyword?.toLowerCase())
    );
  }


  get(key) {
    return this.data[key];
  }

  push(key, value, folder) {
    const newData = { ...this.data, [key]: value };

    this.data = newData;

    return this.find(folder);
  }

  find(folder) {
    if (!folder) {
      return this.dataArray;
    }

    return this.dataArray.filter((data) => data.folder === String(folder));
  }

  add(key, content, folder) {
    const copyContext = new CopyContext(
      content,
      new Date(),
      new Date().getTime()
    );
    copyContext.folder = folder;
    copyContext.status = 1;

    return this.push(key, copyContext.value, folder);
  }


  update(key, value) {
    const lastItem = this.itemByKey(key);

    lastItem._content = value;

    return this.saveItem(key, lastItem.value);
  }

  destroy(key) {
    const newData = this.data;

    if (newData[key]) {
      delete newData[key];
      this.data = newData;
    }

    return this.dataArray;
  }

  remove(key) {
    this.updateItem(key, "status", -1);

    return this.dataArray;
  }

  revert(key) {
    const newData = this.data;

    if (newData[key]) {
      newData[key].status = 1;
    }
    this.data = newData;

    return this.dataArray;
  }
}
