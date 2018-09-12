import { Component } from '@angular/core';
import { SwapiProvider } from '../../providers/swapi/swapi';

@Component({
  selector: 'page-vehicles',
  templateUrl: 'vehicles.html'
})
export class VehiclesPage {

  public datos: any;
  constructor(public service: SwapiProvider) {
    this.service.getVehicles();
    this.service.vehicles$.subscribe((data: any) => {
      this.datos = data;
    })
  }

}
