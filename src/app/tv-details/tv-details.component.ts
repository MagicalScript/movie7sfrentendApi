import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/tmdb-api.service';
import { MoviesApiService } from 'app/movies-api.service';

@Component({
  selector: 'tv-details-cmp',
  moduleId: module.id,
  templateUrl: 'tv-details.component.html',
  styleUrls: ['tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {
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
  seasons
  episodes
  category
  id
  NoEdite = true
  constructor(private router: Router,private route: ActivatedRoute, private tmdbApiService: TmdbApiService,private moviesApiService:MoviesApiService) { }

  ngOnInit() {
    this.getParamValues()
    this.getCateList()
  }
  getParamValues() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tmdbApiService.getTV(this.id).subscribe((res) => {
        this.media = res
        this.getInfo()
        this.seasons = res['seasons']
        console.log(res)
      })
    });
  }
  editeDetails() {
    if (this.NoEdite == true) {
      this.NoEdite = false
    } else {
      this.NoEdite = true
    }
  }
  Cate = ''
  selectedCate(v) {
    console.log(v)
    this.Cate = v
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
  updateTv(){
    let tv = {
      title : this.media.name,
      tmdb : this.media.id,
      category : this.cateSelcted
      }
      console.log(tv)
      this.moviesApiService.UpdateShowTime(tv).subscribe((res) => {
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
          info.first_air_date = this.media.first_air_date
          info.origin_country = this.media.origin_country['0']
          console.log(info)
          this.moviesApiService.addInfo(info).subscribe((res) => {
            
          })
        }
      })
  }
  addTv(){
    let tv = {
    title : this.media.name,
    tmdb : this.media.id,
    category : this.cateSelcted
    }
    console.log(tv)
    this.moviesApiService.addTv(tv).subscribe((res) => {
     /*  if (!this.NoEdite) { */
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
        info.first_air_date = this.media.first_air_date
        info.origin_country = this.media.origin_country['0']
        console.log(info)
        this.moviesApiService.addInfo(info).subscribe((res) => {
          
        })
     /*  } */
    })
  }
  EpiDetails(s){
    this.addTv()
    this.addSeason(s).subscribe((res)=>{})
    this.tmdbApiService.getEpisodesBySeason(this.id,s.season_number).subscribe((res) => {
      this.episodes = res['episodes']
      console.log('EpiDetails --- '+res)
    })
  }
  goToDetails(e) {
    this.router.navigate(['/EpisodeDetails', { seasonTmdb : this.seasonTmdb, season: e.season_number,episode: e.episode_number, tv: this.media.id }])
  }
  getCateList(){
    this.moviesApiService.getCategoriesList().subscribe((res) => {
      console.log(res)
      this.category = res
    })
  }
  addSeason(s){
    console.log('-------------------------------------------------------')
    this.seasonTmdb = s.id
    let _title = this.media.name
    let _tv = this.media.id
    let _s = {
      title : _title,
      tmdb : s.id,
      num : s.season_number,
      tv : _tv,
    }
    console.log(s)
    console.log(_s)
    return this.moviesApiService.addSeason(_s)
  }
  seasonTmdb
  addAllEpis(s){
    this.EpiDetails(s)
    this.addTv()
    
    this.addSeason(s).subscribe((res)=>{
      console.log('post log '+res)
      for(let e of this.episodes){
        this.addEpis(e)
      }
    })
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
      console.log('post log '+res)
    })
  }

  cateSelcted
  getInfo(){
    this.moviesApiService.getinfo(this.media.id).subscribe((res)=>{
      console.log(res)
      this.media.overview = res[0]['overview']
      this.media.name = res[0]['name']      
      this.cateSelcted = +res[0]['cate']
      
    })
  }
}
