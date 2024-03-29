import { MODEL_NAME } from "../config/const";

export const SAMPLE_MODEL = {
  [MODEL_NAME.blog]: {
    title: "SAMPLE MODEL",
    shortContent: "SAMPLE MODEL",
    author: "blog",
    content: "sample content",
    state: 1,
    position: 0,
  },
  [MODEL_NAME.career]: {
    title: "Sample career",
    slug: "test-career",
    shortContent: "SAMPLE MODEL",
    author: "blog",
    content: "sample content",
    state: 1,
    position: 0,
  },
  [MODEL_NAME.company]: {
    title: "Example company title",
    name: "Example company name",
    slug: "company-slug",
    shortContent: "SAMPLE MODEL",
    author: "blog",
    content: "sample content",
    state: 1,
    position: 0,
  },
  [MODEL_NAME.apply]: {
    title: "SAMPLE MODEL",
    shortContent: "SAMPLE MODEL",
    author: "blog",
    content: "sample content",
    state: 1,
    position: 0,
  },
  [MODEL_NAME.job]: {
    name: "Lập trình viên",
  },
  [MODEL_NAME.location]: {
    name: "Hà Nội",
  },
  [MODEL_NAME.apply]: {
    title: "SAMPLE MODEL",
    shortContent: "SAMPLE MODEL",
    author: "blog",
    content: "sample content",
    state: 1,
    position: 0,
  },
  [MODEL_NAME.profile]: {
    username: "SAMPLE MODEL",
    avatarUrl: "SAMPLE MODEL",
    author: "",
    content: "",
    state: 1,
  },
  [MODEL_NAME.role]: {
    name: "",
    // 1: user, 2: admin, 3: unknown user
    alias: 1,
  },
  [MODEL_NAME.permission]: {
    method: "GET",
    model: "Test permission",
    alias: 1,
  },
  [MODEL_NAME.user]: {
    avatarUrl: "",
    email: "blog",
    name: "blog",
    role: 2,
  },
  [MODEL_NAME.comment]: {
    id: "",
    content: "blog",
    author: "blog",
    upvote: 2,
    downvote: 2,
  },
  [MODEL_NAME.tag]: {
    name: "tag 1",
  },
};
