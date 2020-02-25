import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Star, StarBorder } from '@material-ui/icons';
import { BrowserRouter, Router, Link } from "react-router-dom";


import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";
import { Download } from "../api/API";
import FileItemMeny from './FileItemDropdown';

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
        align-items: center;
        padding: 0px 15px;
    }

    .file {
        margin-right: 5px;
    }

    .meny-container {
        justify-content: flex-end;
    }
`



function FileItem({ children, path, getPath, tag, name, file }) {
    const token = localStorage.getItem("token");

    const [state, updateState] = useState(false)

    function toggleCheck() {
        updateState(!state)
    }

    function onClick(e) {
        if (tag === "folder") {
            getPath(path);
        }
    }

    function iconsToRender(tag, name) {
        return filterOutIconsToRender(tag, name);
    }

    return (
        <Container isFolderIcon={tag}>
            <div className="flex-container" onClick={() => Download(file, token)}>
                <div className="left-content">
                    <div className="icon-container">
                        <i className="material-icons data-format">{iconsToRender(tag, name)}</i>
                    </div>
                    <div className="name-cont">
                        <BrowserRouter basename="/home" >
                            <Link to={path}><p onClick={onClick} className="file">{children}</p></Link>
                        </BrowserRouter>
                        {state === false ? <StarBorder onClick={toggleCheck}></StarBorder> : <Star onClick={toggleCheck}></Star>}
                    </div>
                </div>
                <div className="right-content">
                    <FileItemMeny />
                </div>
            </div>
        </Container >
    )
}

export default FileItem;