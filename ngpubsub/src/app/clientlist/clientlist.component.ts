import { Component, OnInit, NgZone, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Client } from '../entities/Client';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements AfterViewChecked {

  //ready = false;
  clients: Client[] = [
    new Client(1, 'Select Client')
  ];
  clients$: Subject<Client[]> = new Subject<Client[]>();
  selectedClient: Client = this.clients[0];

  constructor(private cdRef: ChangeDetectorRef) {
    console.log('ClientlistComponent.constructor Enter');
    console.log('ClientlistComponent.constructor Exit');
  }

  ngOnInit() {
    console.log('ClientlistComponent.ngOnInit Enter');
    this.receiveMessageFromParent();
    console.log('ClientlistComponent.ngOnInit Exit');
  }

  ngAfterViewChecked() {
    console.log('ClientlistComponent.ngAfterViewChecked Enter');
    //this.ready = true;
    //this.cdRef.detectChanges();
    console.log('ClientlistComponent.ngAfterViewChecked Exit');
  }

  receiveMessageFromParent() {
    console.log('ClientlistComponent.receiveMessageFromParent Enter');
    var self = this;
    window.addEventListener("message", function receiveMessage(event) {
      console.log('ClientlistComponent.receiveMessage Enter');
      var clients = event.data;
      clients = clients && JSON.parse(clients);
      console.log(clients);
      clients.forEach(item => {
        if (item !== null) {
          let localEntity = new Client(item.id, item.name);
          self.clients.push(localEntity);
        }
      });
      console.log(self.clients);
      console.log('ClientlistComponent.receiveMessage Exit');
    }, false);
    console.log('ClientlistComponent.receiveMessageFromParent Exit');
  }

  sendMessageToParent() {
    console.log('ClientlistComponent.sendMessageToParent Enter');
    var random = Math.random();
    window.parent.postMessage(JSON.stringify(random), '*');
    console.log('ClientlistComponent.sendMessageToParent Exit');
  }

  receiveStorageFromParent() {
    console.log('ClientlistComponent.receiveStorageFromParent Enter');
    var self = this;
    var strClient = window.parent.localStorage.getItem('input');
    var clients = strClient && JSON.parse(strClient);
    clients.forEach(item => {
      if (item !== null) {
        let localEntity = new Client(item.id, item.name);
        self.clients.push(localEntity);
      }
    });
    console.log('ClientlistComponent.receiveStorageFromParent Exit');
  }

  sendStorageToParent() {
    console.log('ClientlistComponent.sendStorageToParent Enter');
    var random = Math.random();
    window.localStorage.setItem('input', JSON.stringify(random));
    console.log('ClientlistComponent.sendStorageToParent Exit');
  }

  onInput($event) {
    console.log('ClientlistComponent.onInput Enter');
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    console.log('ClientlistComponent.onInput Exit');
  }

  populateClients(item) {
    console.log('ClientlistComponent.populateClients Enter');
    this.clients$.next(this.clients);
    this.selectedClient = this.clients[1];
    console.log('ClientlistComponent.populateClients Exit');
  }

}
