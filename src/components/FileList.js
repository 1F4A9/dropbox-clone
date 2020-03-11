import React, { useState, useEffect } from "react";
import { Router, Link } from "react-router-dom";

import { filesListFolder, checkChanges, getCursor, } from "../api/API";
import { lookForDiff, toggleManyFavorites } from "../utilities";
import FileItem from "./FileItem";
import BreadCrumbs from "./BreadCrumbs";
import LoadingCircle from "./LoadingCircle";
import styled from "styled-components";
import { favorites$ } from "../Observables/Store";

const Container = styled.aside`
    .center{
        margin-top: 200px;
    }
    .empty {
        margin: 0px 62px 0px 62px;
        color: #637282;
        font-size: 14px;
        font-style: italic;
    }
`
function FileList({ token, pathname, list }) {
    const [state, updateState] = useState({
        files: [],
    })
    const [path, updatePath] = useState("");
    const [loading, setLoading] = useState(true);
    const [cursor, updateCursor] = useState("");

    const [favorites, updateFavorites] = useState(favorites$.value);

    useEffect(() => {
        setLoading(true);

        filesListFolder(token, pathname.substring(5))
            .then((response) => {
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
                console.log(state.files);
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
            let currentFiles = [];
            filesListFolder(token, pathname.substring(5)).then(response => currentFiles = response.entries)
            getCursor(token, path)
                .then((response) => {
                    updateCursor(response.cursor);
                    return response.cursor;
                })
                .then(cursor => {
                    checkChanges(cursor, 30, token)
                        .then((response) => {
                            if (response.changes) {
                                return filesListFolder(token, window.location.pathname.substring(5));
                            } else {
                                getCursor(token, path);
                            }
                        })
                        .then(response => {
                            if (response) {
                                console.log(lookForDiff(currentFiles, response.entries));
                                toggleManyFavorites(lookForDiff(currentFiles, response.entries));
                                updateCursor(response.cursor);
                                updateState({ files: response.entries })
                                longpoll()
                            } else {
                                longpoll()
                            }
                        })
                        .catch(err => console.error(err))
                })
        }
        longpoll();
    }, [])

    useEffect(() => {
        const subscription = favorites$.subscribe(updateFavorites);
        return () => subscription.unsubscribe();
    }, []);

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
        loadingReturn = (<Container><div className="cont" >
            {state.files.length > 0 ?
                state.files.map((x) => {
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
                        starState={!!favorites.find(f => f.id === x.id)}
                    >{x.name}

                    </FileItem>;
                }) :
                <p className="empty">This folder is empty.</p>
            }
        </div ></Container>)
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
