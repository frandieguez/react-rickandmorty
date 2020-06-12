// Auxiliar functions
export const saveStorage = (key: string, storage: Object) => {
  localStorage.storage = JSON.stringify(storage);
};

export const getStorage = (key: string) => {
  let storage = localStorage.getItem("storage") || "{}";

  let storageContent = JSON.parse(storage);
  return storageContent[key] || undefined;
};

export const removeFromStorage = () => {
  localStorage.removeItem("storage");
};
