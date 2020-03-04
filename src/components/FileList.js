import React, { useState, useEffect } from "react";
import { Router, Link } from "react-router-dom";

import { filesListFolder, checkChanges, getCursor, filesListFolderContinue } from "../api/API";
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
    const [state, updateState] = useState({
        files: [],
    })
    const [path, updatePath] = useState("");
    const [loading, setLoading] = useState(true);
    const [cursor, updateCursor] = useState("");
    const [changes, updateChanges] = useState(false);

    console.log('hela komponenten updateras!!!!!')

    useEffect(() => {
        setLoading(true);

        filesListFolder(token, pathname.substring(5))
            .then((response) => {
                //  console.log("LOCATION ÄNDRADES", pathname.substring(5));
                if (list.length > 0) {
                    updateState({
                        files: list
                    })
                } else {
                    updateState({
                        files: response.entries
                    })
                }
                updateCursor(response.cursor);

                updatePath(path)


            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });



    }, [pathname, list]);

    useEffect(() => {
        const longpoll = () => {
            getCursor(token, path)
            .then((response) => {
                updateCursor(response.cursor);
                return response.cursor;
            })
            .then(cursor => {
                checkChanges(cursor, 30, token)
            .then((response) => {
                if (response.changes) {
                    return filesListFolder(token, path)

                } else {
                    getCursor(token, path);
                }
            })
            .then(response => {
                if (response) {
                    updateCursor(response.cursor);
                    updateState({ files: response.entries})
                    longpoll()
                } else {
                    longpoll()
                }
            })
            .catch(err => console.log(err))
        })
        }
        longpoll();
    }, [])

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
    if (loading) {
        loadingReturn = (<Container><div className="center"><LoadingCircle scale={2} /></div></Container>)
    } else {
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
