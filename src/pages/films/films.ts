import { Component } from '@angular/core';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { LoadingController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-films',
  templateUrl: 'films.html'
})
export class FilmsPage {

  public datos: any;
  public display = false;
  public loading:any;

  constructor(public service: SwapiProvider, public load: LoadingController, public nav: NavController){
 
    this.service.getFilms();
    this.displayItems();
  }
  
  displayItems(){
    this.service.films$.subscribe((data: any) => {
      this.datos = data;
    })
  }
  displayInfo(personaje){
    this.nav.push('InfoPage', {datos: personaje});
  }
}
