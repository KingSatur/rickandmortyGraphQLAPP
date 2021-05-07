import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalstorageService } from '../../../../shared/services/localstorage.service';

@Component({
  selector: 'app-characters-list',
  template: ` <section class="character__list">
    <app-characters-card
      *ngFor="let character of character$ | async"
      (toggleFav)="localStorageService.addOrRemove(character)"
      [character]="character"
    ></app-characters-card>
  </section>`,
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  character$ = this.dataService.characters$;

  constructor(
    private dataService: DataService,
    public localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {}
}
