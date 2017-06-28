import { Component } from '@angular/core';

import { GlobalService } from '../global.service';

import { PostComponent } from '../forum/post/post.component';

@Component({
	selector    : 'home',
	templateUrl : './home.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./home.component.scss']
})

export class HomeComponent {
	// Constructeur
	constructor(private _global:GlobalService) {}
	// informations sur l'utilisateur connecté
	o_user = this._global.o_user;
}
