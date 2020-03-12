import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class TmdbApiService {

  private apiKey = '?api_key=1bded0cf5ec81699b719a0ab217e461e';
  private apiUrl = 'https://api.themoviedb.org/';
  imageBaseurl = 'https://image.tmdb.org/t/p/';

  constructor(
    private http: Http,
  ) { }

  getList(category) {
    return this.http.get(this.apiUrl + '3/movie/' + category + this.apiKey);//+ "&language=ar"); // for arabic
  }

  getImageBaseUrl() {
    return this.imageBaseurl;
  }

  search(query) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    let options = new RequestOptions({ headers: headers });
    
    query = this.convertToSlug(query);
    let txt = this.apiUrl + '3/search/multi' + this.apiKey + '&query=' + query
    console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }

  convertToSlug(string) {
    string = string.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '+')
      .replace(/-+/g, '+');
    return string;
  }
  getMovie(query) {
    let txt = this.apiUrl + '3/movie/' + query + this.apiKey
    console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }
  getTV(query) {
    let txt = this.apiUrl + '3/tv/' + query + this.apiKey
    console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }
  getEpisodesBySeason(tv,season){
    let txt = this.apiUrl + '3/tv/' + tv + '/season/' + season +  this.apiKey
    console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }
  getEpisode(tv, season, episode) {
    let txt = this.apiUrl + '3/tv/' + tv + '/season/' + season + '/episode/' + episode + this.apiKey
    console.log(txt)
    return this.http.get(txt).map(response => response.json());
  }
}
