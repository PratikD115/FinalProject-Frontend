export const isSubscriptionValid = (inputDateString: string): boolean => {
  const inputDate = new Date(inputDateString);

  const currentDate = new Date();

  return inputDate > currentDate;
};
