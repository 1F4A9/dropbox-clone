import { PATH_BASENAME } from "../constants/constants";

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