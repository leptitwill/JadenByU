import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService }   from './auth/auth.service';
import { GlobalService } from './global.service';

@Component({
	selector    : 'app-root',
	providers   : [AuthService, GlobalService],
	templateUrl : './app.component.html',
	styleUrls   : ['./app.component.scss']
})

export class AppComponent {
	// Affiche le header si l'utilisateur est connecté
	b_is_logged: boolean = localStorage.getItem("user") ? true : false ;
	// Constructeur
	constructor(private _router: Router, private _service:AuthService, public _global:GlobalService) {
		// A chaque changement de route
		this._router.events.subscribe((event) => {
			// On vérifie si l'utilisateur est connecté
			this.b_is_logged = localStorage.getItem("user") ? true : false;
		});
	}
	// Fonction pour se déconnecter
	logout() {
		this._service.logout();
	}
	// Photo de profil
	s_user_picture = this._global.s_user_picture;
;}
