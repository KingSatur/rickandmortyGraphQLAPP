import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@shared/models/character.model';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DataService } from '@shared/services/data.service';
import { LocalstorageService } from '@shared/services/localstorage.service';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.scss'],
})
export class CharactersDetailsComponent implements OnInit {
  public characterObservable: Observable<Character> = new Observable();

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    public localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        take(1),
        tap(({ id }) => {
          this.characterObservable = this.dataService.getCharacterById(id);
        })
      )
      .subscribe();
  }
}
