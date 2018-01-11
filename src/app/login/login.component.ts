import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from '../modal/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  password: string;
  username: string;

  constructor(
    private valid: ValidateService,
    private flashMsg: FlashMessagesService,
    private auth: AuthService,
    private gbs: GlobalService,
    private route: Router
  ) { }
  ngOnInit() {
  }

  onLoginSubmit() {
    const user: User = {
      username: this.username,
      password: this.password
    };
    this.auth.athunticateUser(user)
      .subscribe((res: any) => {
        console.log(res)
        if (!res.sucess) {
          this.flashMsg.show(res.msg, { cssClass: 'alert-danger', timeout: 1000 });
          return;
        }
        res.user.profileImage = this.gbs.returnMainUrl() + res.user.profileImage;
        this.gbs.storeUserData(res.token, res.user);
        this.flashMsg.show('logged in successfully', { cssClass: 'alert-success', timeout: 1000 });
        this.route.navigate(['contacts']);
      });


  }

}
