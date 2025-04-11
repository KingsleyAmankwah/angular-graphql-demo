import { Component } from '@angular/core';
import { Countries, CountriesResponse } from '../interfaces';
import { Apollo } from 'apollo-angular';
import { FETCH_COUNTRIES } from '../graphql/queries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries',
  imports: [CommonModule],
  templateUrl: './countries.component.html',
})
export class CountriesComponent {
  protected data: Countries[] = [];

  constructor(private readonly apollo: Apollo) {
    this.apollo
      .query<CountriesResponse>({ query: FETCH_COUNTRIES })
      .subscribe((result) => (this.data = result.data.countries));
  }
}
