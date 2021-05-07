import { Character } from './character.model';
import { Episode } from './episode.model';
export interface DataResponse {
  characters: APIResponse<Character[]>;
  episodes: APIResponse<Episode[]>;
}

export interface APIResponse<T> {
  results: T;
}
