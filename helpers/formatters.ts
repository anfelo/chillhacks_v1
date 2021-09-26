const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false
};

export const getDateStringFromSeconds = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return new Intl.DateTimeFormat("en-GB", dateOptions).format(date);
};

export const getDateStringFromISOString = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", dateOptions).format(date);
};
