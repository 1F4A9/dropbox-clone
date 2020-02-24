import { Dropbox } from 'dropbox';

export function Download(file, token){
  const dbx = new Dropbox({ clientId: token, fetch: fetch })

  console.log("download");
  console.log(file)
  if(file.is_downloadable === true){
      dbx.filesGetTemporaryLink({path : file.path_display})
      .then((response) => {
          console.log(response);
      })
      console.log("download works")
  }
}