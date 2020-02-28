import React, { useState, useEffect } from "react";
import { Router, Link } from "react-router-dom";

import { filesListFolder } from "../api/API";
import FileItem from "./FileItem";
import BreadCrumbs from "./BreadCrumbs";

function FileList({ token, pathname }) {

    const [state, updateState] = useState({
        files: [],
    })
    const [path, updatePath] = useState("");

    console.log("FILELIST KÖRS!!")


    useEffect(() => {

        filesListFolder(token, pathname.substring(5))
            .then((response) => {
                console.log("LOCATION ÄNDRADES", pathname.substring(5));
                updateState({
                    files: response.entries
                })
                updatePath(path)

            }).catch((err) => {
                console.error(err);
            })
    }, [pathname]);

    function handlePath(path) {
        filesListFolder(token, path)
            .then((response) => {
                updateState({
                    files: response.entries
                })
                updatePath(path)


            }).catch((err) => {
                console.error(err);
            })
    }

    return (
        <section>
            <div>
                <BreadCrumbs getPath={handlePath} path={pathname}></BreadCrumbs>
            </div>

            <div className="cont" >
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
            </div >
        </section>
    )
}

export default FileList;
