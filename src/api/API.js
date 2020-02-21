import { CLIENT_ID } from '../constants/constants';
import { Dropbox } from 'dropbox'

export const fetchDataFromUser = () => {
  let dbx = new Dropbox({ accessToken: '' });

  dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  });
  
  dbx.filesListFolder({path: ''})
    .then(function(response) {
      console.log(response.entries);
    })
    .catch(function(error) {
      console.error(error);
  });
}

export const fetchAccessesTokenFromUser = () => {
  var dbx = new Dropbox({ clientId: 'kkq9me3flt129yd', fetch: fetch });
  const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

  
  window.location.href = url;
  console.log(url)
}