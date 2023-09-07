import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {

    //extrae el param /:id de la ruta activa
    // switchMap hace que el subscribe reciba la respuesta del observable definido en el,
    // es decir ahora este observable esta suscrito al searchCountryByAlphaCode
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
      )
      .subscribe( (country) => {
        // si no hay pais redirecciona a '/'
        if(!country) return this.router.navigateByUrl('');

        return this.country = country;
      });
  }

  
}
