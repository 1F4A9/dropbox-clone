import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { addPathForEach, firstLetterCapital } from "../utilities"

const Container = styled.div`
  display: flex;
  .cont {
    display: flex;
    
    :first-child {
      margin-left: 62px;
    }
  }

  .breadCrumb {
    font-size: 18px;
    color: #637282;
    text-decoration: none;
    margin: 16px 0px 16px 0px;
    display: flex;
    align-self: center;
    

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

function BreadCrumbs({ path }) {
  return (
    <Container>
      {addPathForEach(path).map((crumb, i) => {
        return <div key={i} className="cont">
          <Link className="breadCrumb" to={crumb.path}>{firstLetterCapital(crumb.part)}</Link>
          {i === addPathForEach(path).length - 1 ? null : <p className="arrow"> > </p>}
        </div>
      })}
    </Container >
  )
}

export default BreadCrumbs;