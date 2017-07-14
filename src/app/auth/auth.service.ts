import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class AuthService implements CanActivate {
	// Récupère tous les utilisateurs
	getAllUsers() {
		return this.http.get('/api/users/all').map(res => res.json());
	}
	a_users: any;
	// Constructeur
	constructor(private _router: Router, private http: Http) {
		// Récupère tous les utilisateurs
		this.getAllUsers().subscribe(res => {
		    this.a_users = res;
		});
	}
	// Vérifie si on peut accéder à une page demandé
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		// Si un utilisateur est connecté
		if (state.url == '/login') {
			// Si il tente d'accéder à la page login
			if(localStorage.getItem('user')) {
				// On le redirige vers la page d'acceuil
				this._router.navigate(['/']);
				return false;
			}
			return true;
		}
		else if (localStorage.getItem('user')){
			return true
		}
		// Sinon on le redirige vers la page login
		else {
			this._router.navigate(['login']);
			return false;
		}
	}
	// Connecter un utilisateur
	login(o_user){
		// Récupère les informations de l'utilisateur
		let o_connected_user = this.a_users.find(u => u.email === o_user.email);
		// Si l'utilisateur existe et si le mot de passe est correct
		if (o_connected_user && o_connected_user.password === o_user.password){
			// On stocke ses informations
			localStorage.setItem("user", JSON.stringify(o_connected_user));
			// On redirige vers la page d'accueil
			this._router.navigate(['/']);
			return true;
		}
		return false;

	}
	// Déconnecter un utilisateur
	logout() {
		// Supprime les données utilisateur
		localStorage.removeItem("user");
		// Redirige vers la page login
		this._router.navigate(['login']);
	}
}
