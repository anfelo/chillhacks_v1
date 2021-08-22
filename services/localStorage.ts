export const loadEntry = (entryKey: string): any => {
  try {
    const serializedState = localStorage.getItem(entryKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveEntry = (entry: { value: any; key: string }): void => {
  try {
    const serializedState = JSON.stringify(entry.value);
    localStorage.setItem(entry.key, serializedState);
  } catch (err) {
    console.log("Unable to set localStorage item");
  }
};
