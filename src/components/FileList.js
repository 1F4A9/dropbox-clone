import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropbox } from 'dropbox'
import { CLIENT_ID } from "../constants/constants"

import { fetchDataFromUser, filesListFolder } from "../api/API";
import FileItem from "./FileItem";

function FileList({ token }) {

    const [state, updateState] = useState({
        files: [],
    })

    useEffect(() => {
        fetchDataFromUser(token)
            .then((response) => {
                console.log(response)
                updateState({
                    files: response,
                })
            }).catch((err) => {
                console.error(err);
            })


    }, [])

    function handlePath(path) {
        console.log(path)
        filesListFolder(token, path)
            .then((response) => {
                console.log(response);
            }).catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="cont" >
            {state.files.map((x) => {
                return <FileItem getPath={handlePath} path={x.path_lower} id={x.id} key={x.id}>{x.name}</FileItem>;
            })}
        </div >
    )
}

export default FileList;