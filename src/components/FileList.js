import React, { useState, useEffect } from "react";
import { Router, Link } from "react-router-dom";

import { filesListFolder } from "../api/API";
import FileItem from "./FileItem";
import BreadCrumbs from "./BreadCrumbs";
import LoadingCircle from "./LoadingCircle";
import styled from "styled-components";

const Container = styled.aside`
    .center{
        margin-top: 200px;
    }
`

function FileList({ token, pathname, list }) {
  console.log(list);
    const [state, updateState] = useState({
        files: [],
    })
    const [path, updatePath] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        filesListFolder(token, pathname.substring(5))
            .then((response) => {
              //  console.log("LOCATION ÄNDRADES", pathname.substring(5));
              if(list.length > 0){
                updateState({
                  files: list
                })
              } else {
                updateState({
                    files: response.entries
                })
              }

                updatePath(path)

            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pathname, list]);

    function handlePath(path) {
        setLoading(true);
        filesListFolder(token, path)
            .then((response) => {
                updateState({
                    files: response.entries
                })
                updatePath(path)


            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    let loadingReturn;
    if(loading){
        loadingReturn = (<Container><div className="center"><LoadingCircle scale={2} /></div></Container>)
      }else{
        loadingReturn = (<div className="cont" >
        {state.files.map((x) => {
            return <FileItem
                files={state.files}
                tag={x['.tag']}
                getPath={handlePath}
                path={x.path_lower}
                file={x}
                id={x.id}
                key={x.id}
                name={x.name}
                token={token}
                changeURL={true}
            >{x.name}

            </FileItem>;
        })}
    </div >)
    }

    return (
        <section>
            <div>
                <BreadCrumbs getPath={handlePath} path={pathname}></BreadCrumbs>
            </div>

            {loadingReturn}
        </section>
    )
}

export default FileList;
