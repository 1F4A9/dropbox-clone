import React, { useState, useEffect } from "react";
/* import { token$, updateToken } from "./Observables/Store"; */
import { fetchDataFromUser } from "../api/API";
import styled from "styled-components";

const Container = styled.div`

`
function FileList() {


    const [state, updateState] = useState({
        files: [],
    })




    useEffect(() => {
        fetchDataFromUser()

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
                return <p key={x.id}>{x.name}</p>;
            })}
        </div>
    )
}

export default FileList;