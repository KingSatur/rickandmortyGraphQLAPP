import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  character$ = this.dataService.characters$;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataService.getDataApi();
  }
}
