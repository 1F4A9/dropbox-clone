export const filterOutIconsToRender = (tag) => {
  if (tag === 'folder') {
    return 'folder';
  } else {
    return 'insert_drive_file'; // if nothing else matches
  }
}