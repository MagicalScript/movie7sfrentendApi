import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/tmdb-api.service';
import { MoviesApiService } from 'app/movies-api.service';

@Component({
  selector: 'episode-details-cmp',
  moduleId: module.id,
  templateUrl: 'episode-details.component.html',
  styleUrls: ['episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {
  type
  id = 'none'
  episode
  season
  seasonTmdb
  tv
  NoEdite = true
  disabled = true
  lang = "AF"
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
    //this.loadShowtiles()
  }

  ngOnInit() {
    this.getParamValues()
  }
  
  getParamValues() {
    this.route.params.subscribe(params => {
      this.episode = params['episode'];
      this.season = params['season'];
      this.tv = params['tv'];
      this.type = params['type']
      this.seasonTmdb = params['seasonTmdb']
      console.log(this.id + '....' + this.type)
      this.tmdbApiService.getEpisode(this.tv,this.season,this.episode).subscribe((res) => {
        this.media = res
        //this.media.original_language = this.convertToSlug(this.media.original_language)
        this.getInfo()
        console.log(res)
        this.loadServers()
        this.loadShowtiles()
      })
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

  addEpis(e){
    let _e = {
      title : e.name,
      tmdb : e.id,
      num : e.episode_number,
      season : this.seasonTmdb,
      metadata : ''
    }
    this.moviesApiService.addEpisode(_e).subscribe((res)=>{
      console.log(_e)
      if (!this.NoEdite) {
        let info: any = {
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
        info.tmdb = this.media.id
        info.overview = this.media.overview
        info.name = this.media.name
        //info.first_air_date = this.media.first_air_date
        //info.origin_country = this.media.origin_country['0']
        console.log(info)
        this.moviesApiService.addInfo(info).subscribe((res) => {
          
        })
      }
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
      type : 'episode'
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
      this.showtime.tmdb = ''
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
      this.media.name = res[0]['name']      
    })
  }

}
