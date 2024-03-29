export class CommentHelper {
  id = new Date().getTime();
  content = "";
  up=2
  down=2
  createdDate = new Date().getTime();
  updatedDate = new Date().getTime();
  children = []
  avatarUrl = ''
  author = ""

  constructor(id, content,children, avatarUrl,  createdDate, updatedDate) {
    if (id) {
      this.id = id;
    }
    if (content) {
      this.content = content;
    }
    if (createdDate) {
      this.createdDate = createdDate;
    }
    if (avatarUrl) {
      this.avatarUrl = avatarUrl
    }
    if (updatedDate) {
      this.updatedDate = updatedDate;
    }
    if (children) {
      this.children = children;
    } 
  }
}
