
let isLocalStorage = true;

export function saveToLocalStorage(key: string, str: string){
  if (isLocalStorage){
    localStorage.setItem(key, str);
  }

}

export function retrieveFromLocalStorage(key: string){
  if (isLocalStorage){
    return localStorage.getItem(key);
  }
  else {
    return undefined;
  }
}