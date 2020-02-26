import moment from 'moment';
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