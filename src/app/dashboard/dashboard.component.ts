import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MoviesApiService } from 'app/movies-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'app/tmdb-api.service';

declare var $: any;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  movipage = 0
  tvpage = 0
  seasonpage = 0
  epipage = 0
  linkpage = 0
  animpage = 0

  type = 'Movie'
  _data
  movies
  Tvs
  Seasons
  Episodes
  links
  anime
  times
  _page
  ep
  notVisible = true
  nextpageEpi() {
    console.log(this.ep)
    this.epipage++
    this.storageServiceService.getEpiBySeaPage(this.ep, this.epipage).subscribe((res) => {
      if (!this.isEmptyObject(res)) {
        this.Episodes = res
      } else {
        this.epipage--
      }
      //console.log(id,this.linkpage,res)
    })
  }
  prevpageEpi() {
    if (this.epipage >= 1) {
      this.epipage--
      this.storageServiceService.getEpiBySeaPage(this.ep, this.epipage).subscribe((res) => {
        this.Episodes = res        
      })
    }
  }
  constructor(public tmdbapi : TmdbApiService,public storageServiceService: MoviesApiService, private router: Router) {
    this.getCateList()
  }

  ngOnInit() {
    this.load()
  }


  emptytables() {
    let empty
    this.notVisible = true
    this._data = empty
    this.Tvs = empty
    this.movies = empty
    this.anime = empty
    this.Seasons = empty
    this.Episodes = empty
    this.links = empty
  }
  toggletype(v) {
    this.emptytables()
    console.log('_______________________________')
    console.log(v)
    console.log(this.type)
    if (v == 'Movie') {
      this.type = 'Movie'
      this.loadMovie()
      this._page = this.movipage
    } else if (v == 'TV') {
      this.type = 'TV shows'
      this.loadTv()
      this._page = this.tvpage
    }
    //this.load()
  }
  load() {
    console.log(this.links)
    if (this.type == 'Movie') {
      /* this.storageServiceService.getMoviesPage(this.movipage).subscribe((res) => {
        this.movies = res
        this._data = this.movies
        this._page = this.movipage
      }) */
      this.loadMovie()
    } else if (this.type == 'TV shows') {
      /* this.storageServiceService.getTvPage(this.tvpage).subscribe((res) => {
        this.Tvs = res
        this._data = this.Tvs
        this._page = this.tvpage
      }) */
      this.loadTv()
    }
  }
  loadTv() {
    if (this.__cate != 'none') {
      this.storageServiceService.getTvPageCategory(this.tvpage, this.cate).subscribe((res) => {
        if (!this.isEmptyObject(res)) {
          this.Tvs = res
          //console.log('____________________________________________')
          //console.log(res)
          this._data = this.Tvs
          this._page = this.tvpage
        } else {
          this.tvpage = this._page
        }
      })
    } else {
      this.storageServiceService.getTvPage(this.tvpage).subscribe((res) => {
        if (!this.isEmptyObject(res)) {
          this.Tvs = res
          //console.log('____________________________________________')
          //console.log(res)
          this._data = this.Tvs
          this._page = this.tvpage
        } else {
          this.tvpage = this._page
        }
      })
    }
  }
  gethello(){
    this.storageServiceService.gethello().subscribe((res) => {
      console.log(res)
    })
  }
  loadMovie() {
    if (this.__cate != 'none') {
      this.storageServiceService.getMoviesPageCategory(this.movipage,this.cate).subscribe((res) => {
        if (!this.isEmptyObject(res)) {
          this.movies = res
          this._data = this.movies
          this._page = this.movipage
        } else {
          this.movipage = this._page
        }
      })
    } else {
      this.storageServiceService.getMoviesPage(this.movipage).subscribe((res) => {
        if (!this.isEmptyObject(res)) {
          this.movies = res
          this._data = this.movies
          this._page = this.movipage
        } else {
          this.movipage = this._page
        }
      })
    }
  }

  loadSeason(id) {

    let empty
    this.Seasons = empty
    this.Episodes = empty
    this.notVisible = false
    this.storageServiceService.getSeasonByTvPage(id, this.seasonpage).subscribe((res) => {
      this.Seasons = res
      //console.log(res)
    })
  }
  __season
  seasonObject
  seasonTmdb
  loadEpi(id) {
    this.seasonObject = id
    this.ep = id.tmdb
    if (this.type == 'TV shows') {
      this.storageServiceService.getEpiBySeaPage(id.tmdb, this.epipage).subscribe((res) => {
        this.Episodes = res
        console.log(id)
        this.seasonTmdb = id.tmdb
        this.__season = id.num
      })
    }


  }

  nextPage() {
    if (this.type == 'Movie') {
      this.movipage++
      /* this.storageServiceService.getMoviesPage(this.movipage).subscribe((res) => {
        if (!this.isEmptyObject(res)) {
          this.movies = res
          this._data = this.movies
          this._page = this.movipage
        } else {
          this.movipage = this._page
        }
      }) */
      this.loadMovie()
    } else if (this.type == 'TV shows') {
      this.tvpage++
     /*  this.storageServiceService.getTvPage(this.tvpage).subscribe((res) => {

        if (!this.isEmptyObject(res)) {
          this.Tvs = res
          //console.log('____________________________________________')
          //console.log(res)
          this._data = this.Tvs
          this._page = this.tvpage
        } else {
          this.tvpage = this._page
        }
      }) */
      this.loadTv()
    }
  }
  prevPage() {
    if (this._page >= 1) {
      if (this.type == 'Movie') {
        this.movipage--
        /* this.storageServiceService.getMoviesPage(this.movipage).subscribe((res) => {
          if (!this.isEmptyObject(res)) {
            this.movies = res
            this._data = this.movies
            this._page = this.movipage
          } else {
            this.movipage = this._page
          }
        }) */
        this.loadMovie()
      } else if (this.type == 'TV shows') {
        this.tvpage--
        /* this.storageServiceService.getTvPage(this.tvpage).subscribe((res) => {

          if (!this.isEmptyObject(res)) {
            this.Tvs = res
            this._data = this.Tvs
            this._page = this.tvpage
          } else {
            this.tvpage = this._page
          }
        }) */
        this.loadTv()
      }
    }
  }
  loadLink(e) {
    console.log(e)
    this.router.navigate(['EpisodeDetails', { season: this.__season, episode: e.num, tv: this.__tv, seasonTmdb: this.seasonTmdb }])
  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  __tv
  actionClick(id) {
    let empty
    this.Seasons = empty
    this.Episodes = empty
    if (this.type == 'Movie') {
      //console.log("loadLinks")
      this.router.navigate(['/details', { id: id, type: 'movie' }])
    } else {
      //console.log("loadSeason")
      this.__tv = id
      this.loadSeason(id)
    }
  }

  linkDelete(id) {
    this.storageServiceService.deleteLinkById(id.id).subscribe((res) => {
      //console.log(id.id,id.tmdb)
      this.loadLink(id.tmdb)
    })
  }
  nextpageLinks(id) {
    this.linkpage++
    this.storageServiceService.getLinksbyTmdbPage(id, this.linkpage).subscribe((res) => {
      if (!this.isEmptyObject(res)) {
        this.links = res
      } else {
        this.linkpage--
      }
      //console.log(id,this.linkpage,res)
    })
  }
  prevpageLinks(id) {
    if (this.linkpage >= 1) {
      this.linkpage--
      this.storageServiceService.getLinksbyTmdbPage(id, this.linkpage).subscribe((res) => {
        this.links = res
      })
    }
  }

  loadTimes(id) {
    //let id
    /* let id
    if (this.videoUrl.movie_id != '') {
      id = this.videoUrl.movie_id
    } else {
      id = this.videoUrl.episode_id_imdb
    } */
    this.storageServiceService.getShowTimeByTmdb(id, this.linkpage).subscribe((res) => {
      this.times = res
      console.log(id, res)
    })
  }

  removeTime(id) {
    this.storageServiceService.deleteShowTimeById(id.id).subscribe((res) => {
      console.log(id)
      this.loadTimes(id.tmdb)
    })
  }
  cate = 'none'
  __cate =  'none'
  category
  getCateList() {
    this.storageServiceService.getCategoriesList().subscribe((res) => {
      console.log(res)
      this.category = res
    })
  }
  /* getCateList() {
    this.tmdbapi.getCategoriesList().subscribe((res) => {
      console.log(res)
      this.category = res
    })
  } */
  selectCate(c) {
    this.cate = c
    //this.movipage = 0
    console.log(this.cate)
    if (this.type == 'Movie') {
      this.loadMovie()
    } else {
      this.loadTv()
    }
  }


  deleteTmdb(tmdb){
    if(this.type == 'Movie'){
      this.storageServiceService.deleteMovieTmdb(tmdb).subscribe((res) => {
        this.loadMovie()
      })
      
    }
    else{
      this.storageServiceService.deleteTvTmdb(tmdb).subscribe((res) => {
        this.loadTv()      
      })
    }
  }
  deleteSeasonTmdb(tmdb){
    this.storageServiceService.deleteSeasonTmdb(tmdb).subscribe((res) => {
      this.loadSeason(this.__tv)
    })
  }
  deleteEpisodeTmdb(tmdb){
    this.storageServiceService.deleteEpisodeTmdb(tmdb).subscribe((res) => {
      this.loadEpi(this.seasonObject)
    })
  }


}