// Auxiliar functions
export const saveStorage = (key: string, storage: Object) => {
  if (key) {
    let newContents = JSON.stringify({
      ...localStorage.storage,
      [key]: storage,
    });
    localStorage.setItem("storage", newContents);
  } else {
    localStorage.storage = JSON.stringify(storage);
  }
};

export const getStorage = (key: string) => {
  let storage = localStorage.getItem("storage") || "{}";

  let storageContent = JSON.parse(storage);
  return storageContent[key] || undefined;
};

export const removeFromStorage = () => {
  localStorage.removeItem("storage");
};
