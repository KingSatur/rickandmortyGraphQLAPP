import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalstorageService } from '@shared/services/localstorage.service';

@Component({
  selector: 'app-characters-list',
  template: ` <section
    class="character__list"
    infinite-scroll
    [infiniteScrollDistance]="1"
    [infiniteScrollUpDistance]="0"
    [infiniteScrollThrottle]="5"
    (scrolled)="onScrollDown()"
  >
    <app-characters-card
      *ngFor="let character of character$ | async"
      [character]="character"
    ></app-characters-card>
    <button *ngIf="showButton" (click)="onScrollTop()" class="button">⬆</button>
  </section>`,
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  public character$ = this.dataService.characters$;
  public showButton: boolean = false;
  private scrollHeight = 500;
  public pageNum: number = 1;

  constructor(
    private dataService: DataService,
    public localStorageService: LocalstorageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getCharactersByPage(pageNum: number): any {}

  ngOnInit(): void {}

  onScrollDown(): void {
    this.pageNum++;
    this.dataService.getCharactersByPage(this.pageNum);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
    this.pageNum = 0;
    this.dataService.getCharactersByPage(this.pageNum);
  }
}
