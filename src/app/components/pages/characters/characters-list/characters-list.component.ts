import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalstorageService } from '@shared/services/localstorage.service';

@Component({
  selector: 'app-characters-list',
  template: ` <app-search (onClear)="dataService?.getDataApi()"></app-search>
    <section
      class="character__list"
      infinite-scroll
      [infiniteScrollDistance]="1"
      [infiniteScrollUpDistance]="0"
      [infiniteScrollThrottle]="5"
      (scrolled)="onScrollDown()"
    >
      <ng-container *ngIf="character$ | async as characters; else showEmpty">
        <app-characters-card
          *ngFor="let character of characters"
          [character]="character"
        ></app-characters-card>
      </ng-container>
      <ng-template #showEmpty>
        <div class="not-result">
          <h1 class="title">Not results</h1>
          <img src="assets/imgs/404.jpeg" alt="404" />
        </div>
      </ng-template>
      <button *ngIf="showButton" (click)="onScrollTop()" class="button">
        ⬆
      </button>
    </section>`,
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  public character$ = this.dataService.characters$;
  public showButton: boolean = false;
  private scrollHeight = 500;
  public pageNum: number = 1;

  constructor(
    public dataService: DataService,
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
