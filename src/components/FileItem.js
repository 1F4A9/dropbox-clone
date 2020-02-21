import React, { useState } from "react";
import styled from "styled-components";
import { Star, StarBorder } from '@material-ui/icons';

const Container = styled.div`
    display: flex;

    .name-cont {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .file {
        margin-right: 5px;
    }
`

function FileItem({ children }) {
    const [state, updateState] = useState(false)

    function toggleCheck() {
        updateState(!state)
    }

    return (
        <Container>
            <div className="name-cont">
                <p className="file">{children}</p>
                {state === false ? <StarBorder onClick={toggleCheck}></StarBorder> : <Star onClick={toggleCheck}></Star>}
            </div>

        </Container>
    )
}

export default FileItem;