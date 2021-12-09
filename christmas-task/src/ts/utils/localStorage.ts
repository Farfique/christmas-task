
let isLocalStorage = true;

export function saveToLocalStorage(key, str){
  if (isLocalStorage){
    localStorage.setItem(key, str);
  }

}

export function retrieveFromLocalStorage(key){
  if (isLocalStorage){
    return localStorage.getItem(key);
  }
  else {
    return undefined;
  }
}