import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'app/authentication-service.service';

@Component({
  selector: 'user-controller-cmp',
  moduleId: module.id,
  templateUrl: 'user-controller.component.html',
  styleUrls: ['user-controller.component.css']
})
export class UserControllerComponent implements OnInit {

  users : any[] = []
  constructor(private AuthApi: AuthenticationServiceService) {
    this.loadList()
  }
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  loadList(){
    this.AuthApi.getUser(this.testpage).subscribe((res) => {
      if(!this.isEmptyObject(res)){
        this.converter(res)
        console.log(res)
        this.__page = this.testpage
      }
      else{
        this.testpage = this.__page
      }
    })
  }
  converter(res){
    /* for(let r of res){
      this.users.push(r)
    } */
    this.users = (res)
  }

  ngOnInit() {
  }

  switch(r) {
    console.log(r)
    switch (r) {
     case '1': return 'Subscriber';
     case '2': return 'Member';
     case '9': return 'Admin' }
  }

  deleteUser(id){
    this.AuthApi.deleteUser(id).subscribe((res) => {
      console.log(res)
    })
  }
  updateUser(u){
    this.AuthApi.UpdateUser(u).subscribe((res) => {
      console.log(res)
    })
  }
__page = 0
testpage = 0
  next(){
    this.testpage ++
    this.loadList()
  }
  previous(){
    if(this.__page>0){
      this.testpage --
      this.loadList()
    }
  }
}
