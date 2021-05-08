import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, empty } from 'rxjs';
import {
  find,
  mergeMap,
  pluck,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Episode } from '@shared/models/episode.model';
import { Character } from '@shared/models/character.model';
import { DataResponse } from '@shared/models/api-response.interface';
import { LocalstorageService } from './localstorage.service';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      info {
        count
      }
      results {
        name
        id
        status
        species
        gender
        origin {
          dimension
        }
        location {
          name
        }
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();
  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private localStorageService: LocalstorageService
  ) {
    this.getDataApi();
  }

  private getDataApi() {
    this.apollo
      .watchQuery<DataResponse>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.episodesSubject.next(episodes?.results);

          this.parseCharacterData(characters?.results);
        })
      )
      .subscribe();
  }

  getCharactersByPage(pageNum: number): void {
    const QUERY = gql`
    {
      characters(page: ${pageNum}) {
        results {
          name
          id
          status
          species
          gender
          origin {
            dimension
          }
          location {
            name
          }
          image
        }
      }
    }
  `;

    this.apollo
      .watchQuery<any>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        withLatestFrom(this.characters$),
        tap(([apiResponse, characters]) => {
          console.log({ apiResponse, characters });
          this.parseCharacterData([...characters, ...apiResponse.results]);
        })
      )
      .subscribe();
  }

  private parseCharacterData(characters: Character[]) {
    const currentFavs = this.localStorageService.getFavorites();
    const filterCharacters = characters?.map((m) => ({
      ...m,
      isFavorite: currentFavs?.some((old) => old?.id === m?.id),
    }));
    this.charactersSubject.next(filterCharacters);
  }

  public getCharacterById(id: number) {
    return this.characters$.pipe(
      mergeMap((characters) => characters),
      find((character) => character?.id === id)
    );
  }
}
