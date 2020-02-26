import React from "react";
import styled from "styled-components";



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

  function stringToArrBreadCrumbs(str) {
    str = "Home" + str; //Gjort en konstant som kan användas för path basename.
    let arr = str.split("/");

    return arr;
  }

  function returnRightPath(str, path) {
    let arr = stringToArrBreadCrumbs(path);

    let index = arr.indexOf(str);
    let uncutPath = arr.slice(0, index + 1).join("/");
    let regEx = /home/i;
    let returnPath = uncutPath.replace(regEx, "");
    return returnPath;
  }

  function onClick(e) {

    e.stopPropagation();
    let value = e.target.textContent;
    let breadCrumb = returnRightPath(value, path);
    getPath(breadCrumb);
  }

  return (
    <Container>
      {stringToArrBreadCrumbs(path).map((crumb, i) => {
        return <div key={i} className="cont"><p className="breadCrumb" onClick={onClick}>{crumb}</p> {i === stringToArrBreadCrumbs(path).length - 1 ? null : <p className="arrow"> > </p>} </div>
      })}
    </Container>
  )
}

export default BreadCrumbs;