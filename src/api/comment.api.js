import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDCommentApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }

  }
  async getRandom() {
    return await this.baseApi.get(`/${this.name}/random`);
  }

  async getBlogComment(blogId) {
    return await this.baseApi.get(`/${this.name}/${blogId}`);
  }

  async postReplyComment(commentId, content, authorId) {
    return await this.baseApi.post(`/${this.name}/${commentId}`, {
      content,
      authorId,
    });
  }

  async patchUpvoteComment(commentId, authorId) {
    return await this.baseApi.patch(`/${this.name}/${commentId}/upvote`, {
      commentId,
      authorId,
    });
  }

  async patchDownvoteComment(commentId, authorId) {
    return await this.baseApi.patch(`/${this.name}/${commentId}/downvote`, {
      commentId,
      authorId,
    });

  }
}

export default class CommentAPI extends BaseCRUDApi {
  static instance = new CRUDCommentApi("comment");
}
