import { Injectable, isDevMode } from '@angular/core';
import { Subject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Starship } from '../../structures/starships.structure'
import { Films } from '../../structures/films.structure'
import { Vehicles } from '../../structures/vehicles.structure';
import { People } from '../../structures/people.struture';

@Injectable()
export class SwapiProvider {
  public starshipsServices: Subject<any> = new Subject<any>();
  public starships$: Observable<any>; 
  
  public filmsServices: Subject<any> = new Subject<any>();
  public films$: Observable<any>;

  public vehiclesServices: Subject<any> = new Subject<any>();
  public vehicles$: Observable<any>;
  
  public peopleServices: Subject<any> = new Subject<any>();
  public peopleArr=[];

  public finalizarConsultaPersonajes: boolean = false;
  
  public alert: any;

  endpoint: string = "https://cors-anywhere.herokuapp.com/https://swapi.co/api/";

  constructor(private http: HttpClient) {     
    this.get('people');
  }

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
      case "people":
        if (isDevMode()) {
          //url = '../../assets/assets/people.json';
        }
        this.http.get(url).subscribe((datos:any)=>{
          this.structureData(datos);
        });
        break;
    }

  }


  getFilms(){ 
    this.get('films');
      
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
  
  structureData(data:any){
    
    var Personajes = this.peopleArr || Personajes.push(this.peopleArr);
    
    data.results.forEach((element, index) => {
      
      let key = element.url;  
      var person: People = Personajes[key] || {};
      
      person = {
        name:       element.name,
        height:     element.height,
        mass:       element.mass,
        hair_color: element.hair_color,
        skin_color: element.skin_color,
        eye_color:  element.eye_color,
        birth_year: element.birth_year,
        gender:     element.gender
      };
      
      Personajes[key] = person 
      
    }); 
    this.peopleArr =  Personajes;
    
    if(data.next){
      this.subs('people',data.next);
    }else{
      this.finalizarConsultaPersonajes = true;   
    }
  }
}

