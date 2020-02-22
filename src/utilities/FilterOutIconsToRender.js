
export const filterOutIconsToRender = (tag, name) => {
  if (tag === 'folder') {
    return 'folder';
  } else {

    let dataFormat = name.split('.')[1];
    if (dataFormat === 'jpg' || dataFormat === 'jpeg' || dataFormat === 'png' || dataFormat === 'gif' || dataFormat === 'svg') {
      return 'photo';
    }
  }

  return 'insert_drive_file'; // if nothing else matches
}