import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'app/tmdb-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-cmp',
  moduleId: module.id,
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  query
  movies
  constructor(private tmdbApiService: TmdbApiService, private router: Router) { }

  ngOnInit() {
    this.tmdbApiService.search('happy').subscribe((res) => {
      this.movies = res['results']
    })
  }
  find(query) {
    this.tmdbApiService.search(query).subscribe((res) => {
      this.movies = res['results']
    })
  }
  goToDetails(id, type) {
    if (type == 'movie') {
      this.router.navigate(['/details', { id: id, type: type }])
    }
    else {
      this.router.navigate(['/tv', { id: id }])
    }
  }

}
