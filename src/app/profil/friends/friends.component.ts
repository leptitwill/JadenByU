import { Component }    from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http }         from '@angular/http';
import 'rxjs/Rx';

import { GlobalService } from '../../global.service';

@Component({
	selector    : 'friends',
	templateUrl : './friends.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./friends.component.scss']
})

export class FriendsComponent {
	// Récupère tous les amis
	getAllFriends() {
		return this.http.get('/api/friends/all/' + this._global.o_user.idUser)
		.map(res => res.json())
		.subscribe(res => {
			this.a_friends = res;
			// Pour chaque utilisateurs
			for (let o_friend of this.a_friends) {
				// On sécurise l'image de profil
				o_friend.profil_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_friend.idFriend + '.jpg)');
			}
		});
	}
	// Récupère tous les personnes qui ne sont pas amis avec lui
	getNotFriends() {
		return this.http.get('/api/friends/not/' + this._global.o_user.idUser)
		.map(res => res.json())
		.subscribe(res => {
		    this.a_users = res;
			// Pour chaque utilisateurs
			for (let o_user of this.a_users) {
				// On sécurise l'image de profil
				o_user.profil_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_user.idUser + '.jpg)');
			}
		});;
	}
	// Ajoute un ami
	addFriends(i_id_friend) {
		this.http.request('/api/friends/add/' + this._global.o_user.idUser + '/' + i_id_friend).subscribe();
	}
	// Supprime un ami
	deleteFriends(i_id_friend) {
		this.http.request('/api/friends/delete/' + this._global.o_user.idUser + '/' + i_id_friend).subscribe(
			res => {
				this.getAllFriends();
				this.getNotFriends();
			}
		);
	}
	// Constructeur
	constructor(private http: Http, private _global:GlobalService, private sanitizer: DomSanitizer) {
		// Récupère tous ses amis
		this.getAllFriends();
		// Récupère tous les utilisateurs
		this.getNotFriends();
	}
	// Amis
	a_friends : any;
	// Utilisateurs
	a_users : any;
	// Texte pour ajouter un ami
	add = 'ajouter';
}
