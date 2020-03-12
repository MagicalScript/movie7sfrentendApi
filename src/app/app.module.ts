import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule } from '@ngui/map';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { HttpModule } from '@angular/http'

import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';
import { AuthGuard } from './auth.guard';
import { SearchComponent } from './search/search.component';
import { TmdbApiService } from './tmdb-api.service';
import { MoviesDetailsComponent } from './movies-details/movies-details.component'
import { MoviesApiService } from './movies-api.service';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { CommentComponent } from './comment/comment.component';
import { IntercopService } from './intercop.service';
import { UserControllerComponent } from './user-controller/user-controller.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    SearchComponent,
    MoviesDetailsComponent,
    TvDetailsComponent,
    EpisodeDetailsComponent,
    CommentComponent,
    UserControllerComponent,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    FormsModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' })

  ],
  providers: [AuthenticationServiceService, AuthGuard, TmdbApiService, MoviesApiService,{
    provide: HTTP_INTERCEPTORS,
    useClass: IntercopService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
