import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/models/character.model';
const MY_FAVORITE = 'Favorites';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private favoritesCharactersSubject = new BehaviorSubject<Character[]>(null);
  favoritesCharacters$ = this.favoritesCharactersSubject.asObservable();

  constructor() {
    this.initiateStorage();
  }

  private initiateStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITE));
    !currents && localStorage.setItem(MY_FAVORITE, JSON.stringify([]));
    this.getFavorites();
  }

  getFavorites(): any {
    try {
      let favoritesCharacters = JSON.parse(localStorage.getItem(MY_FAVORITE));
      this.favoritesCharactersSubject.next(favoritesCharacters);
      return favoritesCharacters;
    } catch (error) {
      console.error(error);
    }
  }

  addOrRemove(character: Character): void {
    const { id } = character;
    const currentFavs = this.getFavorites();
    const found = currentFavs?.find((m) => m?.id === id);

    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentFavs = this.getFavorites();
      localStorage.setItem(
        MY_FAVORITE,
        JSON.stringify([...currentFavs, character])
      );
      this.favoritesCharactersSubject.next([...currentFavs, character]);
    } catch (error) {
      console.error(error);
    }
  }

  private removeFromFavorite(id): void {
    const currentFavs = this.getFavorites();
    localStorage.setItem(
      MY_FAVORITE,
      JSON.stringify(currentFavs?.filter((m) => m?.id !== id))
    );
    this.favoritesCharactersSubject.next(
      currentFavs?.filter((m) => m?.id !== id)
    );
  }

  clearStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }
}
