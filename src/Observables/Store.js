import { BehaviorSubject } from "rxjs";

export const token$ = new BehaviorSubject(localStorage.getItem("token"));

export function updateToken(newToken) {
    if (newToken) { //Truthy === token is set. Otherwise token is null === falsy.
        localStorage.setItem("token", newToken);

    } else {
        localStorage.removeItem("token");
    }
    token$.next(newToken);
}

export let favorites$ = new BehaviorSubject(JSON.parse(localStorage.getItem("starred") || "[]"));

export function toggleFavorite(file) {
    let newFavorites = [...favorites$.value];

    if (newFavorites.find(x => x.id === file.id)) {
        newFavorites = newFavorites.filter(fav => fav.id !== file.id);
    } else {
        newFavorites = [...newFavorites, file];
    }

    localStorage.setItem("starred", JSON.stringify(newFavorites));
    favorites$.next(newFavorites);
}

export function removeStarItems() {
    localStorage.removeItem("starred");
}