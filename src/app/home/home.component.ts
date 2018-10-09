import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';
//import { Observer } from 'rxjs/Observer';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	numbersObsSubscription: Subscription;
	customObsSubscription: Subscription;

	constructor() { }

	ngOnInit() {
  	//observable to emit numbers
  	//interval emits data automatically in milliseconds
  	const myNumbers = Observable.interval(1000);
  	//subscribing to observable (can create three callbacks: normal, error, completion )
  	this.numbersObsSubscription = myNumbers.subscribe(
  		(number: number) => {
  			console.log(number);
  		}
  		);

	//creation of observable
	const myObservable = Observable.create((observer: Observer<string>) => {
		setTimeout(() => {
  			observer.next('first package'); //next pushes next data package
  		}, 2000); //will be executed after 2 seconds

		setTimeout(() => {
  			observer.next('second package'); //next pushes next data package
  		}, 4000); //will be executed after 4 seconds

		setTimeout(() => {
  			observer.error('this does not work'); //pushes error
  		}, 5000); //will be executed after 5 seconds

  		//WILL NOT RUN BECAUSE OF ERROR CATCHING
  		setTimeout(() => {
  			observer.complete();
  		}, 7000)
  	});

	this.customObsSubscription = myObservable.subscribe(
		(data: string) => {
			console.log(data);
		},
		(error: string) => {
			console.log(error);
		},
		() => {
			console.log('Completed');
		}
		);
	}

	ngOnDestroy() {
		this.numbersObsSubscription.unsubscribe();
		this.customObsSubscription.unsubscribe();
	}
}
