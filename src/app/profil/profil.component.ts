import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/Rx';

import { GlobalService } from '../global.service';

import { FriendsComponent } from './friends/friends.component';

@Component({
	selector    : 'profil',
	templateUrl : './profil.component.html',
	providers   : [GlobalService, FriendsComponent],
	styleUrls   : ['./profil.component.scss']
})

export class ProfilComponent {
	// Constructeur
	constructor(private sanitizer: DomSanitizer, private _global:GlobalService, private _friends:FriendsComponent, private _route:ActivatedRoute) {
		// Récupère l'id du profil
		this.i_id_user = this._route.snapshot.params['id'];
		// Si on récupère un id
		if(this.i_id_user){
			this.b_my_profil = false;
			// On récupère ses informations
			this._global.getUser(this.i_id_user).subscribe(res => {
				this.o_user = res[0];
				this.s_user_picture    = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_user.idUser + '.jpg)');
				this.s_user_background = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/background/' + this.o_user.idUser + '.jpg)');
			});
		}
		else {
			this.o_user = this._global.o_user;
			// Photo de profil
			this.s_user_picture = this._global.s_user_picture;
			// Image de fond du profil
			this.s_user_background = this._global.s_user_background;
		}
	}
	// Id de l'utilisateur
	i_id_user: any;
	// informations sur l'utilisateur connecté
	o_user: any;
	// Boolen si c'est mon profil
	b_my_profil = true;
	// Photo de profil
	s_user_picture: any;
	// Image de fond du profil
	s_user_background: any;
}
