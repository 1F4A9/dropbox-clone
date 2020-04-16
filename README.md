This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running
Clone repository.
Run npm install.
Run npm start.
Go to http://localhost:3000.

## Assignment instructions
In this project the class will be divided into groups of 3 or 4 members. The aim of this project is to create a web application that uses the Dropbox API. Dropbox is a very popular cloud-based file storage service.<br/>

You will create a program that allows users to sign in and view/manage their files, similar to the functionality in the actual Dropbox web service.

## Requirements
<b>For the grade G the specification is as follows:</b>
<ul>
  <li>In order for your web application to access the contents of a user’s account, the user must log in, i.e. authenticate against Dropbox and authorize your application to perform actions on his or her behalf.</li>
  <li>The result of the Oauth flow is an access token which is used in executing calls to the Dropbox API. This access token should be stored (in the client) and reused until the user logs out.</li>
  <li>The application UI must contain</li>
  <ul>
    <li>A "main" area showing the files and folders in the current folder</li>
    <li>The complete path of the current folder displayed on the top. If the user is currently viewing a sub-folder, each part in the path should be made clickable to enable navigation to all folders higher in the hierarchy.</li>
    <li>If a file is an image, a thumbnail of the image should be displayed instead of the regular file icon</li>
    <li>Metadata for a file should be displayed and must include: filename, size (in a human-readable format), last modified timestamp</li>
  </ul>
  <li>When a user clicks on a file, a download is started. No preview functionality is required.</li>
  <li>A user must be able to upload a file to the current folder</li>
  <li>A user must be able to create a new folder in the current folder</li>
  <li>A user must be able to remove files and folders. Before an item is removed the user should be asked if he/she really wants to remove the item.</li>
  <li>A user must be able to “star” files and folders. The UI must allow the user to view all the items that have been starred.</li>
  <li>Finally, a “go to parent folder” button must be provided so the user can easily navigate to the parent folder.</li>
</ul>

<b>For the grade VG there are some additional requirements:</b>

<ul>
  <li>A user must be able to search for files and folders by name. Search results should be displayed in the "main" area.<br/><br/>
Clicking on a folder in the search results navigates to that folder. Clicking on a file in the search results starts a download.</li>
  <li>A user must be able to copy files and folders. You can either choose to create the copy in the same folder with a new name, or show a dialog where the user can select a target folder.</li>
  <li>A user must be able to rename files and folders.</li>
  <li>A user must be able to move files and folders. The application should show a dialog where the user selects a target folder.</li>
  <li>When a change happens outside the application the content should automatically be updated.</li>
  <li>You must write tests for at least one React component.</li>
</ul>
