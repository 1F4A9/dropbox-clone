import React from "react";
import styled from "styled-components";
import { Link, BrowserRouter } from "react-router-dom";

import { PATH_BASENAME } from "../constants/constants"
import { stringToArrBreadCrumbs, returnRightPath } from "../utilities"

const Container = styled.div`
  display: flex;
  .cont {
    display: flex;
  }

  .breadCrumb {
    font-size: 18px;
    color: #637282;

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }

    :last-child {
      color: black;
    }
  }

  .arrow {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 16px;
    display: flex;
    align-self: center;
    color: #637282;
    font-weight: bold;

  }


`

function BreadCrumbs({ getPath, path }) {

  function onClick(e) {
    e.stopPropagation();
    let value = e.target.textContent;
    let breadCrumb = returnRightPath(value, path);
    getPath(breadCrumb);
  }

  function addPathForEach(path) {
    let parts = path.split("/");

    console.log(parts);
    let newPath = parts.map((part, i) => ({ part, path: parts.slice(0, i + 1).join("/") }));
    newPath = newPath.slice(1);
    console.log(newPath);
    return newPath
  }

  console.log(path);
  addPathForEach(path);
  return (
    <Container>
      {addPathForEach(path).map((crumb, i) => {

        return <div key={i} className="cont"><p className="breadCrumb"><Link to={crumb.path}>{crumb.part}</Link></p> {i === addPathForEach(path).length - 1 ? null : <p className="arrow"> > </p>}</div>
      })}
    </Container >
  )
}

export default BreadCrumbs;