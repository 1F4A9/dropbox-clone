import React, { useState, useEffect } from "react";
import { favorites$ } from '../Observables/Store';
import styled from "styled-components";

import FileItem from "../components/FileItem";
import { filesListFolder } from "../api/API";


const Container = styled.section`

margin-bottom: 36px;

.title-cont {
  display: flex;
  justify-content: space-between;
  margin: 0px 62px 0px 62px;

}

h3 {
  color: #0070e0;

}
.fav-toggle {
  display: flex;
  align-self: center;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.no-fav {
  margin: 0px 62px 0px 62px;
  color: #637282;
  font-size: 14px;
  font-style: italic;
}
`
export default function Favorites({ token, pathname }) {

  const [starItems, updateStarItems] = useState(favorites$.value);
  const [toggleStar, updateToggle] = useState(false);
  const [path, updatePath] = useState("");

  useEffect(() => {
    const subscription = favorites$.subscribe(updateStarItems);

    return () => subscription.unsubscribe();
  }, [])

  function handlePath(path) {
    filesListFolder(token, path)
      .then((response) => {
        updatePath(path)
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <Container>
      <div className="title-cont">
        <h3 className="fav-title">Favorites<i className="fas fa-star"></i></h3>
        {toggleStar ?
          <p onClick={() => updateToggle(!toggleStar)} className="fav-toggle">Hide favorites</p> :
          <p onClick={() => updateToggle(!toggleStar)} className="fav-toggle">Show favorites</p>}
      </div>

      {toggleStar ?
        <div className="fav-items">

          {favorites$.value.length > 0 ?
            starItems.map((x) => {

              return <FileItem
                tag={x['.tag']}
                getPath={handlePath}
                path={x.path_lower}
                file={x}
                id={x.id}
                key={x.id}
                name={x.name}
                token={token}
                changeURL={true}
                starState={!!starItems.find(f => f.id === x.id)}
              >{x.name}

              </FileItem>;
            }) :
            <p className="no-fav">You have no favorites. Add a favorite using the star next to your file.</p>
          }

        </div> :
        null
      }

    </Container>
  );
}
