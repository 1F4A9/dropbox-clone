
export const filterOutIconsToRender = (tag, name) => {



  if (tag === 'folder') {
    return 'folder';
  } else {

    let dataFormat = name.substring(name.lastIndexOf('.') + 1, name.length);
             

    if (dataFormat === 'jpg' || dataFormat === 'jpeg' || dataFormat === 'png' || dataFormat === 'gif' || dataFormat === 'svg' || dataFormat === 'bmp' || dataFormat === 'webp') {
      return 'photo';
    }
  }

  return 'insert_drive_file'; // if nothing else matches
}
