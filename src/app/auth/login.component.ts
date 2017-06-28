import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { AuthService } from './auth.service'

@Component({
	selector    : 'login',
	providers   : [AuthService],
	templateUrl : './login.component.html',
	styleUrls   : ['./login.component.scss']
})

export class LoginComponent {
	// Message d'erreur
	public error_msg = '';
	// Constructeur
	constructor(private _service:AuthService) {}
	// Fonction pour se connecter
	login(form: NgForm) {
		// Si on arrive pas à se connecter
		if(!this._service.login(form.value)){
			// On affiche un message d'erreur
			this.error_msg = 'Email ou mot de passe incorrect';
		}
	}
}
