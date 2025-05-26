export const removeUndefinedEntries = (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
