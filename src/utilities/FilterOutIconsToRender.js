
export const filterOutIconsToRender = (tag, name) => {



  if (tag === 'folder') {
    return 'folder';
  } else {
    return 'insert_drive_file'; // if nothing else matches
  }
}
