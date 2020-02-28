import React, { useState, useEffect } from "react";
import { favorites$ } from '../Observables/Store';

// Nästa steg är att fixa så att stjärnorna inte beror på state som är true/false.
// Utan de ska kolla av från favorites$.value och se om den är med eller inte.
export default function Favorites() {

  const [starItems, updateStarItems] = useState(favorites$.value);

  useEffect(() => {
    const subscription = favorites$.subscribe(updateStarItems);

    return () => subscription.unsubscribe();
  }, [])

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        {starItems.map((x) => {
          return <p>{x.name}</p>
        })}

      </div>
    </div>
  );
}