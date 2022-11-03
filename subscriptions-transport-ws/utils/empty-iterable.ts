import { $$asyncIterator } from "https://cdn.skypack.dev/iterall@%5E1.3.0";

export const createEmptyIterable = (): any => {
  return {
    next() {
      return Promise.resolve({ value: undefined, done: true });
    },
    return() {
      return Promise.resolve({ value: undefined, done: true });
    },
    throw(e: Error) {
      return Promise.reject(e);
    },
    [$$asyncIterator]() {
      return this;
    },
  };
};