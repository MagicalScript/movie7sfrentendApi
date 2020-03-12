import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service'

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    { path: 'search', title: 'Find Movies/TVs',  icon:'ti-video-clapper', class: '' },
    { path: 'Users', title: 'Users List',  icon:'ti-view-list-alt', class: '' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public auth : AuthenticationServiceService
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }


    logout(){
        localStorage.removeItem('api_token')
    }
}
