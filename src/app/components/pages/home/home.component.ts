import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '@shared/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  charactersFav$ = this.localStorageService.favoritesCharacters$;

  constructor(public localStorageService: LocalstorageService) {}

  ngOnInit(): void {}
}
