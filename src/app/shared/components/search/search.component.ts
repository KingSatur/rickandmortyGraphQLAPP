import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@shared/services/data.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: ` <section class="search__container">
    <div class="search__name">
      <label for="searchName"> Search by name ...</label>
      <input
        type="text"
        placeholder="search by name ..."
        class="search__input"
        [formControl]="searchControl"
      />
      <button (click)="onClear.emit(); searchControl.reset()">Clear</button>
    </div>
  </section>`,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output('onClear') onClear: EventEmitter<any> = new EventEmitter();
  public searchControl: FormControl = new FormControl();
  private destroy$ = new Subject<unknown>();

  constructor(private dataService: DataService) {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        map((resp: string) => resp?.toLowerCase()?.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search && search?.length > 2),
        tap((search) => this.dataService.filterData(search)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
