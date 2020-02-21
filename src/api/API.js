import { CLIENT_ID } from '../constants/constants';
import { Dropbox } from 'dropbox'

export const fetchDataFromUser = (token) => {
  let dbx = new Dropbox({ accessToken: token });
  let list = [];


  /*dbx.usersGetCurrentAccount()
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.error(error);
    });*/

  return dbx.filesListFolder({ path: '' })
    .then(function (response) {
      /* console.log(response.entries); */
      return response.entries;

    });

}

export const fetchAccessesTokenFromUser = () => {
  var dbx = new Dropbox({ clientId: CLIENT_ID, fetch: fetch });
  const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

  window.location.href = url;
}