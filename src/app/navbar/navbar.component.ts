import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';
import { GlobalService } from '../services/global.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from "../modal/user"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    private valid: ValidateService,
    private flashMsg: FlashMessagesService,
    public gbs: GlobalService,
    private route: Router
  ) { }

  ngOnInit() {
    console.log(this.gbs.loggedIn())
  }

  onLogOutClick(): void {
    this.gbs.logOut();
    this.flashMsg.show('Logged out suessfully ', { cssClass: 'alert-success', timeout: 1000 });
    this.route.navigate(['login']);
  }

  profile(): any {
    let user: User = this.gbs.getUserDate();
    return { email: user.email, profileImage: user.profileImage };
  }

}
