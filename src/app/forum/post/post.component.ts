import { Component }    from '@angular/core';
import { Http }         from '@angular/http';
import { Router }       from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/Rx';

import { GlobalService } from '../../global.service';

@Component({
	selector    : 'post',
	templateUrl : './post.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./post.component.scss']
})

export class PostComponent {
	// Récupère tous les posts
	getAllPosts() {
		let s_url = '/api/posts/all/';
		let i_id_user = this._global.o_user.idUser;
		// Si l'utilisateur est sur la page profil
		if(this.router.url.includes('/profil')){
			// On appel une autre requête
			s_url = '/api/posts/user/';
			let s_id_user = this.router.url.split("/").pop();
			if(this.router.url.includes('/profil/') && s_id_user){
				i_id_user         = s_id_user;
				this.s_error      = "Cette personne n'a pas encore créé de posts ...";
				this.b_my_profil  = false;
			}
		}
		return this.http.get(s_url + i_id_user).map(res => res.json());
	}
	// Constructeur
	constructor(private router: Router, private http: Http, private sanitizer: DomSanitizer, private _global:GlobalService) {
		// Récupère tous les utilisateurs
		this.getAllPosts().subscribe(res => {
		    this.a_posts = res;
			// Pour chaque post
			for (let o_post of this.a_posts) {
				// On sécurise l'image de profil
				o_post.profil_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_post.idUser + '.jpg)');
				// Si il ya une image de couverture
				if(o_post.picture) {
					// On la sécurise
					o_post.picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/forum/' + o_post.picture + '.jpg)');
				}
				// Si il ya des tags
				if(o_post.tags){
					// On les stocks dans un tableau
					o_post.tags = o_post.tags.split(',');
				}
				else {
					o_post.tags = [];
				}
			}
		});
	}
	// Posts
	a_posts : any;
	s_error      = "Vous n'avez pas encore créé de posts ..."
	b_my_profil  = true;
}
