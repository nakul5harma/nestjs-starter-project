export const getDateInYYYYMMDDFormat = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
