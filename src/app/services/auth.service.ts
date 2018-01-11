import { Injectable } from '@angular/core';
import { User } from '../modal/user';
import { GlobalService } from './global.service';
@Injectable()
export class AuthService {

  authTokent: any;
  user: User;

  constructor(private gbs: GlobalService) { }

  registerUser(user: User) {
    return this.gbs.postRequest(this.gbs.register, user, false);
  }

  athunticateUser(user: User) {
    return this.gbs.postRequest(this.gbs.athunicate, user, false);
  }
  uploadImageProfile(image) {
    return this.gbs.postImage(this.gbs.uploadProfileImage, image);
  }


}
