import { Component, AfterViewChecked }      from '@angular/core';
import { DomSanitizer }   from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalService } from '../global.service';

@Component({
	selector    : 'chat',
	templateUrl : './chat.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./chat.component.scss']
})

export class ChatComponent implements AfterViewChecked {
	createChat() {
		this.http.request('/api/chat/create/' + this._global.o_user.idUser + '/' + this.i_id_friend).subscribe(res => {
			// Récupère le contenu du chat
			this.getIdChat()
		});
	}
	// Récupère l'id du chat'
	getIdChat() {
		return this.http.get('/api/chat/get-id/' + this.i_id_friend + '/'+ this._global.o_user.idUser)
		.map(res => res.json())
		.subscribe(res => {
			// Si l'id chat n'existe pas
			if(res.length == 0){
				// On créer un chat
				this.createChat();
			}
			else {
				this.i_id_chat = res[0].idChat;
				// Récupère le contenu du chat
				this.getChat(this.i_id_chat).subscribe(res => {
					this.a_chat = res;
				})
			}
		});
	}
	// Récupère les chat par utilisateurs
	getChatByUser() {
		return this.http.get('/api/chat/get-id-by-user/' + this._global.o_user.idUser)
		.map(res => res.json())
		.subscribe(res => {
			this.a_chat = res;
			for(let o_chat of this.a_chat){
				let i_id_user = o_chat.idFriend
				if(i_id_user == this._global.o_user.idUser){
					i_id_user = o_chat.idUser;
				}
				// Récupère les informations de l'ami
				this._global.getUser(i_id_user).subscribe(res => {
					o_chat.friend = res[0];
					o_chat.friend.profil_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_chat.friend.idUser + '.jpg)');
				})
				// Récupère le contenu du chat
				this.getChat(o_chat.idChat).subscribe(res => {
					o_chat.a_chat = res[res.length-1];
				})
			}
		});
	}
	// Récupère le contenu du chat
	getChat(i_id_chat) {
		return this.http.get('/api/chat/get/' + i_id_chat).map(res => res.json());
	}
	// Envoie un message
	sendMessage(o_message) {
		let data = new URLSearchParams();
			data.append('i_id_chat', this.i_id_chat);
			data.append('i_id_user', this._global.o_user.idUser);
			data.append('s_message', o_message.value.chat__message);
			console.log(data);

		this.http.post('/api/chat/send', data)
		.subscribe(res => {
			// Vide le textarea
			this.s_textarea = '';
			this.getChat(this.i_id_chat).subscribe(res => {
				this.a_chat = res;
				this.scrollToBottomChat();
			})
		});
	}
	scrollToBottomChat(){
		let o_list_messages = document.getElementById("chat__messages");
		if(o_list_messages){
			let elt = o_list_messages.lastElementChild;
			elt.scrollIntoView(true);
		}
	}
	// Constructeur
	constructor(private http: Http, private _global:GlobalService, private sanitizer: DomSanitizer, private _route:ActivatedRoute) {
		// Récupère l'id du profil
		this.i_id_friend = this._route.snapshot.params['id'];
		// Si on récupère un id
		if(this.i_id_friend){
			this.b_chat_list = false;
			// Récupère les informations de l'ami
			this._global.getUser(this.i_id_friend).subscribe(res => {
				this.o_friend = res[0];
				this.o_friend.profil_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_friend.idUser + '.jpg)');
			})
			// Récupère l'id du chat
			this.getIdChat();
			// Recharge le chat toutes les 5s
			Observable.interval(5000).subscribe(x => {
				this.getChat(this.i_id_chat).subscribe(res => {
					this.a_chat = res;
				})
			});
		}
		else {
			// Récupère l'id du chat
			this.getChatByUser();
		}
	}
	// Scroll vers le bas une fois que la vue est chargé
	public ngAfterViewChecked() {
		this.scrollToBottomChat();
    }
	// Ami
	o_friend: any;
	// Id de l'ami
	i_id_friend: any;
	// Id du chat
	i_id_chat: any;
	// Tableau chat
	a_chat: any;
	// Liste des chat
	b_chat_list = true;
	// Contenu du textarea
	s_textarea :string;
}
