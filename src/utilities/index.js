import moment from 'moment';
import { PATH_BASENAME } from "../constants/constants";
import { filesListFolder } from "../api/API";
import { toggleFavorite, favorite$ } from "../Observables/Store";

export function stringToArrBreadCrumbs(str) {
  str = PATH_BASENAME + str; //Gjort en konstant som kan användas för path basename.
  let arr = str.split("/");

  return arr;
}

export function returnRightPath(str, path) {
  let arr = stringToArrBreadCrumbs(path);

  let index = arr.indexOf(str);
  let uncutPath = arr.slice(0, index + 1).join("/");
  let regEx = /home/i;
  let returnPath = uncutPath.replace(regEx, "");
  return returnPath;
}

export const convertToHumanReadableSize = (bytes, decimals = 2) => {

  if (!bytes) return '';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const convertToHumanReadableTime = (iso) => {
  return moment(iso).format('YYYY-MM-DD HH:mm:ss');
}

export function addPathForEach(path) {
  let parts = path.split("/");
  let newPath = parts.map((part, i) => ({ part, path: parts.slice(0, i + 1).join("/") }));
  newPath = newPath.slice(1);
  return newPath
}

export function addStarredItems(path, name, token) {
  let starred = localStorage.getItem("starred");
  starred = JSON.parse(starred);
  filesListFolder(token, path === "/home" ? "" : path.slice(5))
    .then((response) => {

      let newStar = response.entries.filter(file => file.name === name)
      console.log(newStar)
      if (starred.find(x => x.name === newStar[0].name)) {
        starred = starred.filter(x => x.name !== name);
        toggleFavorite(newStar[0]);

      } else {
        starred.push(newStar[0])
        toggleFavorite(newStar[0]);
      }
      console.log(starred);
    })
}







// Ta bort?!
export function removeStarredItem(name) {
  let starItems = JSON.parse(localStorage.getItem("starred"));

  starItems = starItems.filter(x => x.name !== name);

  localStorage.setItem("starred", JSON.stringify(starItems));
  // Detta ok? gör samma som RxJs nu, tror jag.
  // Bättre att säga att starItems === favorites$?
}

export function removeEndOfPathname(path) {
  let splittedPath = path.split("/");
  let newPath = "";
  for (let i = 1; i < splittedPath.length - 1; i++) {
    if (i !== splittedPath.length || splittedPath !== "") {
      newPath += "/" + splittedPath[i];
    }
  }
  return newPath
}