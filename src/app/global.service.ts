import { Injectable }   from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http }         from '@angular/http';
import 'rxjs/Rx';

@Injectable()

export class GlobalService {
	// Récupère les infos de tous les utilisateurs
	getAllUsers() {
		return this.http.get('/api/users/all').map(res => res.json());
	}
	// Récupère les infos d'un utilisateurs
	getUser(i_id_user) {
		return this.http.get('/api/users/get/' + i_id_user).map(res => res.json());
	}
	// Informations sur l'utilisateur connecté
	o_user = JSON.parse(localStorage.getItem('user'));
	// Image de profil
	s_user_picture: any;
	// Image de fond du profil
	s_user_background: any;
	// Constructeur
	constructor(private sanitizer: DomSanitizer, private http: Http){
		if(this.o_user){
			this.s_user_picture    = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_user.idUser + '.jpg)');
			this.s_user_background = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/background/' + this.o_user.idUser + '.jpg)');
		}
	}
}
