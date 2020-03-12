import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MoviesApiService {
  private apiRoot = "http://api.movie7s.com"
  //private apiRoot = "http://localhost:8000"

  constructor(
    private http: HttpClient,
  ) { }

  gethello() {
    let txt = this.apiRoot + '/';
    //console.log(txt)
    return this.http.get(txt);
  }

  addServer(_data) {
    console.log("POST");
    let url = this.apiRoot + '/addServer';
    return this.http.post(url, _data);
  }
  getinfo(tmdb) {
    let txt = this.apiRoot + '/info/' + tmdb;
    console.log(txt)
    return this.http.get(txt);
  }
  getTvPage(page) {
    let txt = this.apiRoot + '/tv/' + page;
    //console.log(txt)
    return this.http.get(txt);
  }
  getTvPageCategory(page, Cate) {
    let txt = this.apiRoot + '/tv/' + page + '&' + Cate;
    //console.log(txt)
    return this.http.get(txt);
  }

  getCategoriesList() {
    let txt = this.apiRoot + '/getCategory';
    console.log(txt)
    return this.http.get(txt);
  }
  getMoviesPage(page) {
    let txt = this.apiRoot + '/mov/' + page;
    console.log(txt)
    return this.http.get(txt);
  }
  getMoviesPageCategory(page, Cate) {
    let txt = this.apiRoot + '/movByCate/' + page + '&' + Cate;
    console.log(txt)
    return this.http.get(txt);
  }
  getSeasonByTvPage(id, page) {
    let txt = this.apiRoot + '/sea/' + id + '&' + page;
    //console.log(txt)
    return this.http.get(txt);
  }
  getEpiBySeaPage(id, page) {
    let txt = this.apiRoot + '/epi/' + id + '&' + page;
    //console.log(txt)
    return this.http.get(txt);
  }
  getLinksbyTmdbPage(id, page) {
    let txt = this.apiRoot + '/link/' + id + '&' + page;
    return this.http.get(txt);
  }
  deleteLinkById(id) {
    let txt = this.apiRoot + '/deleteserver/' + id;
    return this.http.delete(txt);
  }
  getShowTime(page) {
    let txt = this.apiRoot + '/showtimes/' + page;
    return this.http.get(txt)
  }
  getShowTimeByTmdb(id, page) {
    let txt = this.apiRoot + '/showtimesTmdb/' + id + '&' + page;
    console.log(txt)
    return this.http.get(txt);
  }
  deleteShowTimeById(id) {
    let txt = this.apiRoot + '/deletetime/' + id;
    return this.http.delete(txt);
  }
  doPOSTShowTime(_data) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addShowTime';
    return this.http.post(url, _data);
  }

  UpdateShowTime(_data) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/updateTvShow';
    return this.http.post(url, _data);
  }

  addMovie(movi) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addMovies';
    return this.http.post(url, movi);
  }
  UpdateMovie(movi) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/updateMovies';
    return this.http.post(url, movi);
  }

  addInfo(info) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addInfo';
     console.log(url);
     console.log(info)
    return this.http.post(url, info);
  }
  addCategory(cate) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addCategory';
    return this.http.post(url, cate);
  }
  addTv(tv) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addTvShow';
    return this.http.post(url, tv);
  }
  addSeason(season) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addSeason';
    return this.http.post(url, season);
  }
  addEpisode(episode) {
    console.log("_____________________POST_______________________________________________");
    let url = this.apiRoot + '/addEpisode';
    return this.http.post(url, episode);
  }

  deleteMovieTmdb(Tmdb) {
    let txt = this.apiRoot + '/deleteMovies/' + Tmdb;
    return this.http.delete(txt);
  }
  deleteTvTmdb(Tmdb) {
    let txt = this.apiRoot + '/deleteTv/' + Tmdb;
    return this.http.delete(txt);
  }
  deleteSeasonTmdb(Tmdb) {
    let txt = this.apiRoot + '/deleteSeason/' + Tmdb;
    return this.http.delete(txt);
  }
  deleteEpisodeTmdb(Tmdb) {
    let txt = this.apiRoot + '/deleteEpisode/' + Tmdb;
    return this.http.delete(txt);
  }
}
