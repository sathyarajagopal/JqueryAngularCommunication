import { Component, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ClientlistComponent } from './clientlist/clientlist.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  @ViewChild(ClientlistComponent)
  private clientListComp: ClientlistComponent;
  title = 'app';
  subscription: Subscription;

  constructor() {
    console.log('AppComponent.constructor Enter');
    console.log('AppComponent.constructor Exit');
  }

  ngOnInit() {
    console.log('AppComponent.ngOnInit Enter');
    this.subscription = this.clientListComp.clients$.subscribe(item => {
      console.log('AppComponent.subscribe Client[] Enter');
      this.clientListComp.populateClients(item);
      console.log('AppComponent.subscribe Client[] Exit');
    });
    console.log('AppComponent.ngOnInit Exit');
  }

  ngAfterViewInit() {
    console.log('AppComponent.ngAfterViewInit Enter');
    console.log('AppComponent.ngAfterViewInit Exit');
  }

  ngAfterViewChecked() {
    console.log('AppComponent.ngAfterViewChecked Enter');
    console.log('AppComponent.ngAfterViewChecked Exit');
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log('AppComponent.ngOnDestroy Enter');
    this.subscription.unsubscribe();
    console.log('AppComponent.ngOnDestroy Exit');
  }

  sendMessageToParent() {
    console.log('AppComponent.sendMessageToParent Enter');
    this.clientListComp.sendMessageToParent();
    console.log('AppComponent.sendMessageToParent Exit');
  }

  sendStorageToParent() {
    console.log('AppComponent.sendStorageToParent Enter');
    this.clientListComp.sendStorageToParent();
    console.log('AppComponent.sendStorageToParent Exit');
  }

}