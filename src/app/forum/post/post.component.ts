import { Component }    from '@angular/core';
import { Http, URLSearchParams }         from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
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
	// Récupère les infos d'un post
	getPost(i_id_post) {
		let s_url = '/api/posts/get/' + i_id_post;
		return this.http.get(s_url).map(res => res.json());
	}
	countComment(i_id_post) {
		return this.http.get('/api/posts/count-comment/' + i_id_post).map(res => res.json());
	}
	// Récupère les commentaires d'un post
	getComments(i_id_post) {
		return this.http.get('/api/posts/comments/' + i_id_post).map(res => res.json())
		.subscribe(res => {
			this.a_comments = res;
			for(let o_comment of this.a_comments){
				o_comment.s_user_picture = this.sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_comment.idUser + '.jpg)');
				this._global.getUser(o_comment.idUser)
				.subscribe(res => {
					o_comment.user = res[0];
				});
			}
		});
	}
	// Envoie un commentaire
	addComment(o_comment, i_id_post) {
		let data = new URLSearchParams();
			data.append('i_id_post', i_id_post);
			data.append('i_id_user', this._global.o_user.idUser);
			data.append('s_comment', o_comment.value.post__comment);

		this.http.post('/api/posts/add-comment', data)
		.subscribe(res => {
			// Vide le textarea
			this.s_textarea = '';
			this.getComments(i_id_post);
		});
	}
	// Constructeur
	constructor(private router: Router, private http: Http, private sanitizer: DomSanitizer, private _global:GlobalService, private _route:ActivatedRoute) {
		// Récupère l'id de l'actulaité
		this.i_id_post = this._route.snapshot.params['id'];
		// Si on récupère un id
		if(this.i_id_post) {
			this.getPost(this.i_id_post).subscribe(res => {
				this.o_post = res[0];
				this.o_post.profil_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_post.idUser + '.jpg)');
			});
			// Récupère les commentaires
			this.getComments(this.i_id_post)
		}
		else {
			// Récupère tous les utilisateurs
			this.getAllPosts().subscribe(res => {
			    this.a_posts = res;
				// Pour chaque post
				for (let o_post of this.a_posts) {
					// On sécurise l'image de profil
					o_post.profil_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_post.idUser + '.jpg)');
					// Si il ya des tags
					if(o_post.tags){
						// On les stocks dans un tableau
						o_post.tags = o_post.tags.split(',');
					}
					else {
						o_post.tags = [];
					}
					this.countComment(o_post.idPost).subscribe(res => {
						o_post.nbComments = res[0].nbComments;
					})
				}
			});
		}
	}
	// Posts
	a_posts : any;
	o_post : any;
	s_error      = "Vous n'avez pas encore créé de posts ..."
	b_my_profil  = true;
	// id du post
	i_id_post : number;
	a_comments : any;
	s_textarea:string;
}
