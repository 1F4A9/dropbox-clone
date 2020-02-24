import { CLIENT_ID } from '../constants/constants';
import { Dropbox } from 'dropbox'

export const fetchDataFromUser = (token) => {
  let dbx = new Dropbox({ accessToken: token });

  return dbx.filesListFolder({ path: '' })
    .then(function (response) {
      return response.entries;
    });
}

export const fetchAccessesTokenFromUser = () => {
  var dbx = new Dropbox({ clientId: CLIENT_ID, fetch: fetch });
  const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

  window.location.href = url;
}

export const filesListFolder = (token, path) => {
  let dbx = new Dropbox({ accessToken: token, fetch: fetch });
  return dbx.filesListFolder({ path: path })
    .then((response) => {
      console.log(response);
      return response;
    })
}