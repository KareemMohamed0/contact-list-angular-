import { Injectable } from '@angular/core';
import { User } from '../modal/user';


@Injectable()
export class ValidateService {

  constructor() { }
  validateUser(user: User) {
    if (!user.name || !user.email || !user.username || !user.password)
      return false
    else return true;
  }
  validateEmail(email: string) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

}
