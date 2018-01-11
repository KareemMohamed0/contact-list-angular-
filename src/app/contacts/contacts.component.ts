import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { Contact } from '../modal/contact';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  modal: boolean;
  contacts: any;
  errMessage: string;
  cont: any = {};

  constructor(private contactService: ContactService, private gbs: GlobalService) { }

  ngOnInit() {
    this.contactService.getAllUsers()
      .subscribe((contacts: any) => {
        console.log(contacts.status)
        // this is temp not in prod mode 
        contacts.users.map((ele) => {
          ele.profileImage = this.gbs.returnMainUrl() + ele.profileImage;
        })
        this.contacts = contacts.users;

      })
  }

  addContact(contact: Contact) {
    this.errMessage = "";
    if (!contact.first_name || !contact.last_name || !contact.phone)
      return this.errMessage = 'invalid data ';

    console.log(contact, '-----------------')
    this.contactService.addContact(contact)
      .subscribe((res: any) => {
        console.log(res.contact)
        this.contacts.push(res.contact)
        this.cont = {};
        this.modal = false;
      })
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if (data['n'] != 1)
          return;


        for (let index in this.contacts)
          if (this.contacts[index]._id == id)
            this.contacts.splice(Number(index), 1);


      })
  }


}