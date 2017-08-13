import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthService }   from './auth/auth.service';
import { GlobalService } from './global.service';

@Component({
	selector    : 'app-root',
	providers   : [AuthService, GlobalService],
	templateUrl : './app.component.html',
	styleUrls   : ['./app.component.scss']
})

export class AppComponent {
	// Constructeur
	constructor(private _router: Router, private _service:AuthService, public _global:GlobalService) {
		// A chaque changement de route
		this._router.events.subscribe((event) => {
			// On vérifie si l'utilisateur est connecté
			this.b_is_logged = localStorage.getItem("user") ? true : false;
		});
	}
	// Ouvre le menu
	show_nav(){
		let nav = document.getElementById('mobile_nav');
		nav.classList.add('active');
	}
	// Ferme le menu
	hide_nav(){
		let nav = document.getElementById('mobile_nav');
		nav.classList.remove('active');
	}
	// Fonction pour se déconnecter
	logout() {
		this._service.logout();
	}
	// Vérifie si l'utilisateur est connecté
	b_is_logged: boolean = localStorage.getItem("user") ? true : false ;
	// Photo de profil
	s_user_picture: string = this._global.s_user_picture;
;}
