import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/tmdb-api.service';
import { MoviesApiService } from 'app/movies-api.service';

@Component({
  selector: 'movies-details-cmp',
  moduleId: module.id,
  templateUrl: 'movies-details.component.html',
  styleUrls: ['movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {
  type
  id = 'none'
  NoEdite = true
  disabled = true
  lang = "AF"
  category
  cateSelcted
  links
  media: any = {
    adult: '',
    backdrop_path: '',
    belongs_to_collection: '',
    budget: '',
    genres: [
    ],
    homepage: '',
    id: '',
    imdb_id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: '',
    poster_path: '',
    production_companies: [],
    production_countries: [
    ],
    release_date: '',
    revenue: '',
    runtime: '',
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: '',
    vote_average: '',
    vote_count: ''
  }

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService, private moviesApiService: MoviesApiService) {

    this.getCateList()
  }

  getCateList(){
    this.moviesApiService.getCategoriesList().subscribe((res) => {
      console.log(res)
      this.category = res
    })
  }
  ngOnInit() {
    this.getParamValues()
  }
  Cate = ''
  selectedCate(v) {
    console.log(v)
    this.Cate = v
  } 
  getParamValues() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type']
      console.log(this.id + '....' + this.type)
      if (this.type == 'movie') {
        this.tmdbApiService.getMovie(this.id).subscribe((res) => {
          this.media = res
          this.media.original_language = this.convertToSlug(this.media.original_language)
          this.getInfo()          
          this.loadServers()
          this.loadShowtiles()          
          console.log(res)
        })
      }
    });
  }
  toStr(t) {
    return JSON.stringify(t);
  }
  log(t) {
    console.log(t)
  }
  convertToSlug(string) {
    string = string.toUpperCase()
    return string;
  }
  movie: any = {
    title: '',
    tmdb: '',
    metadata: '',
    category: '',
  }
  info: any = {
    tmdb: '',
    overview: '',
    name: '',
    first_air_date: '',
    genre_ids: '',
    original_language: '',
    backdrop_path: '',
    origin_country: '',
    poster_path: '',
  } 

  addMovie() {
    this.movie.title = this.media.title
    this.movie.tmdb = this.media.id
    this.movie.metadata = JSON.stringify(this.media)
    this.movie.category = this.cateSelcted
    console.log(this.movie)
    this.moviesApiService.addMovie(this.movie).subscribe((res) => {
     /*  if (!this.NoEdite) { */
        this.info.tmdb = this.media.id
        this.info.overview = this.media.overview
        this.info.name = (this.type == 'movie') ? this.media.title : this.media.name
        this.info.release_date = (this.type == 'movie') ? this.media.release_date : this.media.first_air_date
        this.info.original_language = (this.type == 'movie') ? this.media.original_language : this.media.origin_country
        console.log(this.info)
        this.moviesApiService.addInfo(this.info).subscribe((res) => {
          
        })
     /*  } */
      this.disabled = false
    })
  }
  UpdateMovie() {
    this.movie.title = this.media.title
    this.movie.tmdb = this.media.id
    this.movie.metadata = JSON.stringify(this.media)
    this.movie.category = this.cateSelcted
    console.log(this.movie)
    this.moviesApiService.UpdateMovie(this.movie).subscribe((res) => {
      /* if (!this.NoEdite) { */
        this.info.tmdb = this.media.id
        this.info.overview = this.media.overview
        this.info.name = (this.type == 'movie') ? this.media.title : this.media.name
        this.info.release_date = (this.type == 'movie') ? this.media.release_date : this.media.first_air_date
        this.info.original_language = (this.type == 'movie') ? this.media.original_language : this.media.origin_country
        console.log(this.info)
        this.moviesApiService.addInfo(this.info).subscribe((res) => {
          
        })
  /*     } */
      this.disabled = false
    })
  }

  editeDetails() {
    if (this.NoEdite == true) {
      this.NoEdite = false
    } else {
      this.NoEdite = true
    }
  }
  loadServers(){
    this.moviesApiService.getLinksbyTmdbPage(this.media.id,0).subscribe((res) => {
      this.links = res
      if(!this.isEmptyObject(res)){
        this.disabled = false
      }
    })
  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  url = ''
  name = ''
  addServer(url,name){
    let m = {
      name : name,
      url : url,
      tmdb : this.media.id,
      type : this.type
    }
    this.url = ''
    this.name = ''

    console.log(m)
    this.moviesApiService.addServer(m).subscribe((res)=>{
      this.loadServers()
    })
  }
  deleteServer(id){
    this.moviesApiService.deleteLinkById(id).subscribe((res) => {
      this.loadServers()
    })
  }
  cate
  addCategory(name){
    let cate = {
      name : name
    }
    this.cate = ''
    this.moviesApiService.addCategory(cate).subscribe((res)=>{
      this.getCateList()
    })
  }
  showTimeList
  loadShowtiles(){
    this.moviesApiService.getShowTimeByTmdb(this.media.id,'0').subscribe((res) => {
      this.showTimeList = res
    })
  }
  showtime = {
    time : '24:00:00',
    day : 'Sunday',
    channel : 'CBS',
    tmdb : ''
  }
  addShowtime(){
    this.showtime.tmdb = this.media.id
    console.log(this.showtime)
    this.moviesApiService.doPOSTShowTime(this.showtime).subscribe((res) => {
      this.loadShowtiles()
      this.showtime .channel = "CBS"
      this.showtime .day = "Sunday"
      this.showtime .time = "24:00:00"
      this.showtime .tmdb = ''
    })
  }
  deleteTime(id){
    this.moviesApiService.deleteShowTimeById(id).subscribe((res)=>{
      this.loadShowtiles()
    })
  }

  getInfo(){
    this.moviesApiService.getinfo(this.media.id).subscribe((res)=>{
      console.log(res)
      this.media.overview = res[0]['overview']
      this.media.title = res[0]['name']      
      this.cateSelcted = +res[0]['cate']
      
    })
  }


}
