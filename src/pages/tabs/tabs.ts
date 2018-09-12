import { Component } from '@angular/core';

import { FilmsPage } from '../films/films';
import { VehiclesPage } from '../vehicles/vehicles';
import { StarshipsPage } from '../starships/starships';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = FilmsPage;
  tab2Root = VehiclesPage;
  tab1Root = StarshipsPage;
 
  constructor() {

  }
}
