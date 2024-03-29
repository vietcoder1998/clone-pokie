import BlogAPI from "../../api/blog.api";
import { LocalStorageHandler } from "../local-storage";
export const BlogKey = "blogs";

export class BlogContext {
  createdAt = new Date();
  updatedAt = "";
  content = "";
  title = "";
  author = "";
  folder = "";
  /*
    1: show
    -1: hidden
    */
  status = 1;
  position = 0;
  key = "";
  visible = 0;
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

  get shortContent() {
    return (this.content ?? "").slice(0, 40);
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
      shortContent: this.shortContent,
    };
  }

  set _content(value) {
    this.content = value;
    this.updatedAt = new Date().getTime();
  }
}

export class BlogHandler {
  localStorageHandler = new LocalStorageHandler();
  pureData = [];
  key = BlogKey;
  productData = [];

  constructor() {
    if (!this.data) {
      this.data = {};
    }
    this.pureData = this.objectList;
    this.onGetData();
  }

  async onGetData(next) {
    return BlogAPI.instance.getList(next);
  }

  get data() {
    return this.productData;
  }

  get objectList() {
    const result = this.productData.map(
      (item) =>
        new BlogContext(
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

  save() {
    return this.onGetData();
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
      BlogAPI.instance.update(id, item, () => this.onGetData());
    }
  }

  updateItem(id, key, value) {
    const item = this.itemByDataKey(id);

    if (item) {
      item[key] = value;

      this.saveItem(id, item);
    }
  }

  updateTitleVisible(id, value) {
    return this.updateItem(id, "visible", value);
  }

  updateTitle(id, value) {
    return this.updateItem(id, "title", value);
  }

  get dataArray() {
    return this.objectList
      ?.filter((item) => String(item.status) !== "-1")
      ?.reverse();
  }

  get garbageArray() {
    return this.objectList
      ?.filter((item) => String(item.status) === "-1")
      ?.reverse();
  }

  get length() {
    return Object.keys(this.data).length;
  }


  search(keyword) {
    if (!keyword?.length) {
      return this;
    }
  }

  get(key) {
    return this.data.find(item => item.id === key);
  }

  push(key, value) {
    return BlogAPI.instance.create(value)
  }

  find(key) {
    if (!key) {
      return this.dataArray;
    }

    return this.dataArray.find((data) => String(data.key) === String(key));
  }

  add(key, content, folder) {
    const copyContext = new BlogContext(
      content,
      new Date(),
      new Date().getTime()
    );
    copyContext.folder = folder;
    copyContext.status = 1;

    return this.push(key, copyContext.value, folder);
  }

  update(key, content) {
    const lastItem = this.itemByKey(key);

    if (lastItem && key) {
      lastItem._content = content;

      return this.saveItem(key, lastItem.content);
    }
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
