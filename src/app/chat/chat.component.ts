import { Component }      from '@angular/core';
import { DomSanitizer }   from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Http }           from '@angular/http';

import { GlobalService } from '../global.service';

@Component({
	selector    : 'chat',
	templateUrl : './chat.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./chat.component.scss']
})

export class ChatComponent {
	// Récupère l'id du chat'
	getIdChat() {
		return this.http.get('/api/chat/get-id/' + this.i_id_friend + '/'+ this._global.o_user.idUser).map(res => res.json());
	}
	// Récupère le contenu du chat
	getChat(){
		return this.http.get('/api/chat/get/' + this.i_id_chat).map(res => res.json());
	}
	// Envoie un message
	sendMessage(o_message){
		let s_message = o_message.value.chat__message;
		console.log(s_message);
		return this.http.post('/api/chat/send/' + s_message.value, {s_message})
		.map(res => res.json()).subscribe();
	}
	// Constructeur
	constructor(private http: Http, private _global:GlobalService, private sanitizer: DomSanitizer, private _route:ActivatedRoute) {
		// Récupère l'id du profil
		this.i_id_friend = this._route.snapshot.params['id'];
		// Récupère les informations de l'ami
		this._global.getUser(this.i_id_friend).subscribe(res => {
			this.o_friend = res[0];
			this.o_friend.profil_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_friend.idUser + '.jpg)');
		})
		// Récupère l'id du chat
		this.getIdChat().subscribe(res => {
			this.i_id_chat = res[0].idChat;
			this.getChat().subscribe(res => {
				console.log(res);
				this.a_chat = res;
			})
		})
	}
	// Ami
	o_friend: any;
	// Id de l'ami
	i_id_friend: any;
	// Id du chat
	i_id_chat: any;
	// Tableau chat
	a_chat: any;
}
