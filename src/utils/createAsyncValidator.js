import * as yup from "yup";
import { debounceAsync } from "./debounceAsync";

export const createAsyncValidator = (cache, checkFn) => {
  return async (value, context) => {
    if (!value) return true;

    if (cache.value === value) {
      return cache.available;
    }

    try {
      await yup.string().email().validate(context.parent.email);
      const available = await debounceAsync(value, checkFn);
      cache.value = value;
      cache.available = available;
      return available;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return false;
    }
  };
};
