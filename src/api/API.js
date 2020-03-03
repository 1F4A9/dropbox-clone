import { CLIENT_ID } from '../constants/constants';
import { Dropbox } from 'dropbox'
import { removeEndOfPathname } from '../utilities/index';

export const fetchDataFromUser = (token) => {
  let dbx = new Dropbox({ accessToken: token, fetch });

  return dbx.filesListFolder({ path: '' })
    .then(function (response) {
      console.log(response);
      return response.entries;
    });
}

export const fetchAccessesTokenFromUser = () => {
  var dbx = new Dropbox({ clientId: CLIENT_ID, fetch: fetch });
  const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

  window.location.href = url;
}

export const filesListFolder = (token, path) => {
  let newPath = path.replace(/%20/g, " ");

  let dbx = new Dropbox({ accessToken: token, fetch: fetch });
  return dbx.filesListFolder({ path: newPath === "/" ? "" : newPath })
    .then((response) => {
      console.log("TEST");
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(err);
    })
}

export function Download(file, token) {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })
  if (file.is_downloadable === true) {
    dbx.filesGetTemporaryLink({ path: file.path_lower })
      .then((response) => {
        window.location.href = response.link;
      })
  }
}

export function createFolder(path, token) {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })
  console.log(path);
  dbx.filesCreateFolder({ path: path })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
}

export function deleteFilesAndFolders(path, token) {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })

  return dbx.filesDelete({ path })
}

export function getFilesMetadata(path, token) {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })

  return dbx.filesGetMetadata({ path })
}

export function getFilesThumbnail(path, token) {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })

  return dbx.filesGetThumbnail({ path })
}

export const renameFiles = (path, newName, token) => {
  const dbx = new Dropbox({ accessToken: token, fetch: fetch })

  return dbx.filesMoveV2({ 
    from_path: path,
    to_path: `${removeEndOfPathname(path)}/${newName}`,
  })
}