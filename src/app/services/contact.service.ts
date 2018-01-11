import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Contact } from '../modal/contact'



@Injectable()
export class ContactService {

  constructor(private gbs: GlobalService) { }
  /**
   * params#1 url
   * params#n object or id 
   * params#last atuhntiacte api 
   */
  getContacts() {
    return this.gbs.getRequest(this.gbs.gerContacts, true);
  }

  getAllUsers() {
    return this.gbs.getRequest(this.gbs.getAllUsers, true);
  }

  addContact(newContact) {
    return this.gbs.postRequest(this.gbs.addContact, newContact, true);
  }

  deleteContact(id: string) {
    return this.gbs.deleteRequest(this.gbs.deleteContact, id, true);
  }

}
