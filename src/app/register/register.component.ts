import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';

import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from '../modal/user';

import { HttpClient } from "@angular/common/http";

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  imageSrc: any;
  profileImage: any;
  name: string;
  email: string;
  password: string;
  username: string;


  constructor(
    private valid: ValidateService,
    private flashMsg: FlashMessagesService,
    private auth: AuthService,
    private route: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {

  }


  onRegisterSubmit() {
    const user: User = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if (!this.valid.validateUser(user)) {
      this.flashMsg.show('please fill all fields  ', { cssClass: 'alert-danger', timeout: 1000 });
      return;
    }
    if (!this.valid.validateEmail(user.email)) {
      this.flashMsg.show('please enter valid email ', { cssClass: 'alert-danger', timeout: 1000 });
      return;
    }
    this.auth.uploadImageProfile(this.profileImage).subscribe((res: any) => {
      this.imageSrc = res.filePath;
      user.profileImage = this.imageSrc;

      this.auth.registerUser(user).subscribe((res: any) => {
        console.log(res)
        if (!res.sucess) {
          this.flashMsg.show(res.msg, { cssClass: 'alert-danger', timeout: 1000 });
          return;
        }
        this.flashMsg.show('Registered suessfully ', { cssClass: 'alert-success', timeout: 1000 });
        this.route.navigate(['/login']);

      }, err => {
        this.flashMsg.show('Faild to Register ', { cssClass: 'alert-danger', timeout: 1000 });
      })
    }, err => {
      this.flashMsg.show('Faild to Register ', { cssClass: 'alert-danger', timeout: 1000 });
    })


  }

  onPhotoSelected(event) {
    let elem = event.target;

    if (elem.files.length > 0) {
      //set selected image to image src
      const reader = new FileReader();

      reader.onload = ((e) => {
        this.imageSrc = e.target['result'];
      });
      reader.readAsDataURL(event.target.files[0]);

      //image : elem.files[0]
      this.profileImage = elem.files[0];
    }



  }



}


