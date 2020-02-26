import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Star, StarBorder } from '@material-ui/icons';
import { BrowserRouter, Router, Link } from "react-router-dom";


import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";
import FileItemMeny from './FileItemDropdown';
import { getFilesMetadata } from "../api/API";
import { convertToHumanReadableSize, convertToHumanReadableTime } from '../utilities';

const Container = styled.div`
    display: flex;

    :first-child > div {
        border-top: 1px solid #e6e8eb;
    }

    .flex-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 0px 50px;
        border-bottom: 1px solid #e6e8eb;
        color: #202020;
        box-sizing: border-box;

        :hover {
            cursor: pointer;
            color: #92ceff;
        }

        :hover > div:last-child .meny {
            border: 2px solid #637282;

            :hover {
                border: 2px solid #92ceff;
            }
        }
    }

    .left-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .right-content {
        position: relative;
        display: flex;
        align-items: center;
    }

    .icon-container {
        display: flex;
        align-items: center;
    }

    .data-format {
        font-size: 35px;
        padding-left: 12px;
        color: ${props => props.isFolderIcon === 'folder' ? '#92ceff' : '#ACC2CC'};
    }

    .name-cont {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0px 15px;
    }

    .file-star-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-top: 10px;
    }

    .metadata {
        color: #637282;
        font-size: 12px;
    }

    .date {
        padding-right: 15px;
    }

    .file {
        margin-right: 5px;
    }

    .meny-container {
        justify-content: flex-end;
    }

    p {
        margin-block-start: 0em;
        margin-block-end: 0em;
    }

    a {
        text-decoration: none;

        :link,
        :visited {
            color: black;
        }

        :hover {
            color: #92ceff;
        }
    }
`

function FileItem({ children, path, getPath, tag, name, file, token, changeURL }) {
    const [state, updateState] = useState(false);
    const [modified, setModified] = useState(0);
    const [size, setSize] = useState('');
    const [mediaInfo, setMediaInfo] = useState([]);

    function toggleCheck() {
        updateState(!state)
    }

    function onClick(e) {

        console.log("HEJ!", path);
        if (tag === "folder") {
            getPath(path);
        }
    }

    function iconsToRender(tag, name) {
        return filterOutIconsToRender(tag, name);
    }

    useEffect(() => {
        getFilesMetadata(path, token)
            .then(metadata => {
                setModified(metadata.server_modified);
                setSize(metadata.size);
            })
    }, [])

    let link = ""
    if (changeURL) {
        link = <Link to={"/home" + path}><p onClick={onClick} className="file">{children}</p></Link>
    } else {
        link = <div><p onClick={onClick} className="file">{children}</p></div>
    }

    return (
        <Container isFolderIcon={tag}>
            <div className="flex-container">
                <div className="left-content">
                    <div className="icon-container">
                        <i className="material-icons data-format">{iconsToRender(tag, name)}</i>
                    </div>
                    <div className="name-cont">
                        <div className="file-star-container">
                            {link}
                            {state === false ? <StarBorder onClick={toggleCheck}></StarBorder> : <Star onClick={toggleCheck}></Star>}
                        </div>
                        <div className="metadata-container">
                            <span className="metadata date">{`Modified: ${convertToHumanReadableTime(modified)}`}</span>
                            <span className="metadata kilobyte">{convertToHumanReadableSize(size)}</span>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <FileItemMeny file={file} />
                </div>
            </div>
        </Container >
    )
}

export default FileItem;
