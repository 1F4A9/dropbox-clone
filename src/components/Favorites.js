import React, { useState, useEffect } from "react";
import { favorites$ } from '../Observables/Store';
import styled from "styled-components";

import FileItem from "../components/FileItem";
import { filesListFolder } from "../api/API";


const Container = styled.section`

/* margin: 0px 50px 0px 50px; */

.title-cont {
  display: flex;
  justify-content: space-between;
  margin: 15px 25px 0px 25px;

}

h3 {
  color: #0070e0;

}
.fav-toggle:hover {
  cursor: pointer;
  text-decoration: underline;
}

`


// Utan de ska kolla av från favorites$.value och se om den är med eller inte.
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

          {starItems.map((x) => {
            return <FileItem
              /* files={state.files} */
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

        </div> :
        null
      }

    </Container>
  );
}