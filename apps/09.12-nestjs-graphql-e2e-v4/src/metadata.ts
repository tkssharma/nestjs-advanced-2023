/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger/plugin": {
      models: [
        [
          import("./cat/models/cat-input.dto"),
          { CatInput: { id: { required: true, type: () => String } } },
        ],
        [
          import("./cat/models/cat-mutation.dto"),
          {
            CatInsert: {
              age: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              breed: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./cat/models/cat-query.dto"),
          {
            Cat: {
              name: { required: true, type: () => String },
              age: { required: true, type: () => Number },
              breed: { required: true, type: () => String },
              id: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./cat/models/cat-update.dto"),
          {
            CatUpdateDTO: {
              id: { required: true, type: () => String },
              age: { required: false, type: () => Number },
              name: { required: false, type: () => String },
              breed: { required: false, type: () => String },
            },
          },
        ],
      ],
      controllers: [],
    },
    "@nestjs/graphql/plugin": { models: [] },
  };
};
