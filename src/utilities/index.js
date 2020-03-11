import moment from 'moment';
import { PATH_BASENAME } from "../constants/constants";
import { filesListFolder } from "../api/API";
import { toggleFavorite, favorites$ } from "../Observables/Store";

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
      if (starred.find(x => x.name === newStar[0].name)) {
        starred = starred.filter(x => x.name !== name);
        toggleFavorite(newStar[0]);

      } else {
        starred.push(newStar[0])
        toggleFavorite(newStar[0]);
      }
    })
}

export function firstLetterCapital(word) {

  let newWord = word.toUpperCase().slice(0, 1) + word.slice(1);
  return newWord;
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


export function lookForDiff(oldArr, newArr) {
  let difference = [...oldArr];
  first: for (let i = 0; i < difference.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
      if (difference[i].id === newArr[j].id &&
        difference[i].name === newArr[j].name &&
        difference[i].path_lower === newArr[j].path_lower) {

        difference.splice(i, 1);
        i--;
        continue first;
      }
    }
  }
  return difference;
}

export function toggleManyFavorites(arr) {
  for (let file of arr) {
    if (favorites$.value.find(x => x.id === file.id)) {
      console.log(file);
      toggleFavorite(file);
    }
  }
}