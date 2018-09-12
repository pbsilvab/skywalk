import { Component } from '@angular/core';
import { SwapiProvider } from '../../providers/swapi/swapi';

@Component({
  selector: 'page-films',
  templateUrl: 'films.html'
})
export class FilmsPage {

  public datos: any;
  constructor(public service: SwapiProvider) {
    this.service.getFilms();
    this.service.films$.subscribe((data: any) => {
      this.datos = data; 
    })
  }

}
