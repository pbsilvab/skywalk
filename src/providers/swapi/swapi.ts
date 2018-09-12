import { Injectable, isDevMode } from '@angular/core';
import { Subject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Starship } from '../../structures/starships.structure'
import { Films } from '../../structures/films.structure'
import { Vehicles } from '../../structures/vehicles.structure';

@Injectable()
export class SwapiProvider {
  public starshipsServices: Subject<any> = new Subject<any>();
  public starships$: Observable<any>; 
  
  public filmsServices: Subject<any> = new Subject<any>();
  public films$: Observable<any>;

  public vehiclesServices: Subject<any> = new Subject<any>();
  public vehicles$: Observable<any>;

  endpoint: string = "https://cors-anywhere.herokuapp.com/https://swapi.co/api/";

  constructor(private http: HttpClient) {}

  get(argType){
    let arg: string = argType; 
    let url = this.endpoint + arg;
    this.subs(argType, url);

  }
  subs(arg, url){
    switch (arg) {
      case "starships":
        if (isDevMode()) {
          url = '../../assets/assets/starships.json';         
        }
        this.http.get(url).subscribe(this.starshipsServices)
        break;
      case "films":
        if (isDevMode()) {
          url = '../../assets/assets/films.json';
        }
        this.http.get(url).subscribe(this.filmsServices)
        break;
      case "vehicles":
        if (isDevMode()){
          url = '../../assets/assets/vehicles.json';
        }
        this.http.get(url).subscribe(this.vehiclesServices)
        break;
    }
  }

  getPagination(url){ 
    this.http.get(url).subscribe(this.starshipsServices);
  }

  getFilms(){
    this.get('films');
    console.log('films');
    this.films$ = this.filmsServices.asObservable().pipe(
      map((data: any) => {
        let starship: Films = {
          cantidad: data.count,
          next: data.next,
          previous: data.previous,
          result: data.results
        }
        return starship
      })
    );
  }
  getStarships() {
    this.get('starships');
    console.log('starship');

    this.starships$ = this.starshipsServices.asObservable().pipe(
      map((data: any) => {
        let starship: Starship = {
          cantidad: data.count,
          next: data.next,
          previous: data.previous,
          result: data.results
        }
        return starship
      })
    );
  }

  getVehicles(){
    this.get('vehicles');
    console.log('vehicles');

    this.vehicles$ = this.vehiclesServices.asObservable().pipe(
      map((data: any) => {
        let starship: Vehicles = {
          cantidad: data.count,
          next: data.next,
          previous: data.previous,
          result: data.results
        }
        return starship
      })
    );
  }

}

