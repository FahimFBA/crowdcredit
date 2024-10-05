export const textLimiter = (text: string, limit: number = 60) => {
  return text?.length > limit ? `${text.slice(0, limit)}...` : text;
};
