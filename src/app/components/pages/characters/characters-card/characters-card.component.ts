import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Character } from '@shared/models/character.model';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCardComponent implements OnInit {
  @Input('character') character: Character = new Character();
  @Output('toggleFav') toggleFav: EventEmitter<Character> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleFavorite(): void {
    this.character.isFavorite = !this.character.isFavorite;
    this.toggleFav.emit(this.character);
  }

  getIcon(isFavorite: boolean): string {
    return isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
