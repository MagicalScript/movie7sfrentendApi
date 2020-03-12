import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SearchComponent } from './search/search.component'
import { MoviesDetailsComponent } from './movies-details/movies-details.component'
import { TvDetailsComponent } from './tv-details/tv-details.component'
import { EpisodeDetailsComponent } from './episode-details/episode-details.component'
import { CommentComponent } from './comment/comment.component'
import { UserControllerComponent } from './user-controller/user-controller.component'

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'EpisodeDetails',
        canActivate: [AuthGuard],
        component: EpisodeDetailsComponent
    },
    {
        path: 'Users',
        canActivate: [AuthGuard],
        component: UserControllerComponent
    },
    {
        path: 'Comments',
        canActivate: [AuthGuard],
        component: CommentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'tv',
        canActivate: [AuthGuard],
        component: TvDetailsComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent
    },
    {
        path: 'table',
        canActivate: [AuthGuard],
        component: TableComponent
    },
    {
        path: 'typography',
        canActivate: [AuthGuard],
        component: TypographyComponent
    },
    {
        path: 'icons',
        canActivate: [AuthGuard],
        component: IconsComponent
    },
    {
        path: 'maps',
        canActivate: [AuthGuard],
        component: MapsComponent
    },
    {
        path: 'search',
        canActivate: [AuthGuard],
        component: SearchComponent
    },
    {
        path: 'details',
        canActivate: [AuthGuard],
        component: MoviesDetailsComponent
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        canActivate: [AuthGuard],
        component: UpgradeComponent
    }
]
