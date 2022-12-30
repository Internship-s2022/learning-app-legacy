export const containsSpecialChars = (str) => {
  //eslint-disable-next-line
  const specialChars = /[ `!@#$%^&*()_+\=\[\]{};':"\\|,<>\/?~]/;
  return specialChars.test(str);
};
