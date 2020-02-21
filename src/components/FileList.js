import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropbox } from 'dropbox'
import { CLIENT_ID } from "../constants/constants"

import { fetchDataFromUser } from "../api/API";
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


    return (
        <div className="cont" >
            {state.files.map((x) => {
                return <FileItem key={x.id}>{x.name}</FileItem>;
            })}
        </div >
    )
}

<<<<<<< HEAD
export default FileList;
=======

export default FileList;
>>>>>>> 25075c08a2596e609d12fb843d2b9617f431baf0
