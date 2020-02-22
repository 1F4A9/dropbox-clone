import React, { useState } from "react";
import styled from "styled-components";
import { Star, StarBorder } from '@material-ui/icons';
import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";


const Container = styled.div`
    display: flex;

    .flex-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .icon-container {
        align-items: center;
    }

    .name-cont {
        display: flex;
        align-items: center;
    }

    .file {
        margin-right: 5px;
    }
`

function FileItem({ children, path, getPath, tag, name }) {
    const [state, updateState] = useState(false)

    function toggleCheck() {
        updateState(!state)
    }

    function onClick() {
        getPath(path);
    }

    function iconsToRender(tag, name) {
        return filterOutIconsToRender(tag, name);
    }

    return (
        <Container>
            <div className="flex-container">
                <div className="icon-container">
                    <i className="material-icons">{iconsToRender(tag, name)}</i>
                </div>
                <div className="name-cont">
                    <p onClick={onClick} className="file">{children}</p>
                    {state === false ? <StarBorder onClick={toggleCheck}></StarBorder> : <Star onClick={toggleCheck}></Star>}
                </div>
            </div>
        </Container>
    )
}

export default FileItem;