let timer;
export const debounceAsync = (value, validatorFn) => {
  return new Promise((resolve, reject) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      try {
        const available = await validatorFn(value);
        resolve(available);
      } catch (error) {
        reject(error);
      }
    }, 600);
  });
};
