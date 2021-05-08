import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Character } from '@shared/models/character.model';
import { LocalstorageService } from '@shared/services/localstorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCardComponent implements OnInit {
  @Input('character') character: Character = new Character();
  @Output('toggleFav') toggleFav: EventEmitter<Character> = new EventEmitter();

  constructor(public localStorageService: LocalstorageService) {}

  ngOnInit(): void {}

  toggleFavorite(): void {
    this.character.isFavorite = !this.character.isFavorite;
    this.localStorageService.addOrRemove(this.character);
    // this.toggleFav.emit(this.character);
  }

  getIcon(isFavorite: boolean): string {
    return isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
