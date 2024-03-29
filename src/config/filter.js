import { MODEL_NAME } from "./const";

export const filterModelObject = {
  [MODEL_NAME.user]: {
    items: [
      {
        field: "rating",
        operator: ">",
        value: "2.5",
      },
    ],
  },
  [MODEL_NAME.blog]: {
    items: [
      {
        field: "rating",
        operator: ">",
        value: "2.5",
      },
    ],
  },
  [MODEL_NAME.permission]: {
    name: [
      {
        field: "rating",
        operator: ">",
        value: "2.5",
      },
    ],
  },
  [MODEL_NAME.comment]: {
    name: [
      {
        field: "rating",
        operator: ">",
        value: "2.5",
      },
    ],
  },
  [MODEL_NAME.role]: {
    name: [
      {
        field: "rating",
        operator: ">",
        value: "2.5",
      },
    ],
  },
};
