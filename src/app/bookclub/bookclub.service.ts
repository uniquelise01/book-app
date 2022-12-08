import { Injectable, EventEmitter } from '@angular/core';
import { Bookclub } from './bookclub.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class BookclubService {
    contacts: Bookclub[] = [];
    bookclubSelectedEvent = new EventEmitter<Bookclub>();
    bookclubChangedEvent = new EventEmitter<Bookclub[]>();
    bookclubListChangedEvent = new Subject<Bookclub[]>();
    maxBookclubId: number;

    constructor(private http: HttpClient){
        this.maxBookclubId = this.getMaxId();
    }

    sortAndSend() {
      this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
      this.bookclubListChangedEvent.next(this.contacts.slice());
    }

    getContacts() {
        this.http
            .get<{ message: string, contacts: Bookclub[]}>("http://localhost:3000/bookclub/")
            .subscribe(
                (responseData) => {
                   this.contacts = responseData.contacts;
                   this.sortAndSend();
                },
                (error: any) => {
                   console.log(error);
                }
            );
    }
    
    getContact(id: string) {
      return this.http.get<{ message: string, contact: Bookclub }>('http://localhost:3000/bookclub/' + id);
    }
    
    
    storeContacts() {
        let contacts = JSON.stringify(this.contacts);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http
            .put('http://localhost:3000/bookclub', contacts, {
                headers: headers,
            })
            .subscribe(() => {
                this.bookclubListChangedEvent.next(this.contacts.slice());
            }
            )
    }
    
    deleteContact(contact: Bookclub) {

        if (!contact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === contact.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/bookclub/' + contact.id)
          .subscribe(
            (response: Response) => {
              this.contacts.splice(pos, 1);
              this.sortAndSend();
            }
          );
    }

    getMaxId(): number {
        let maxId = 0;
    
        this.contacts.forEach(contact => {
            const currentId = parseInt(contact.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        })
        return maxId;
    }

    addContact(contact: Bookclub) {
        if (!contact) {
          return;
        }
    
        contact.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        this.http.post<{ message: string, contact: Bookclub }>('http://localhost:3000/bookclub',
          contact,
          { headers: headers })
          .subscribe(
            (responseData) => {
              // add new document to documents
              this.contacts.push(responseData.contact);
              this.sortAndSend();
            }
          );
    }

    updateContact(originalContact: Bookclub, newContact: Bookclub) {
        if (!originalContact || !newContact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === originalContact.id);
    
        if (pos < 0) {
          return;
        }
    
        newContact.id = originalContact.id;
        newContact._id = originalContact._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/bookclub/' + originalContact.id,
          newContact, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.contacts[pos] = newContact;
              this.sortAndSend();
            }
          );
      }
}