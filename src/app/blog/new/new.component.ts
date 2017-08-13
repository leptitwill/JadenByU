import { Component }    from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/Rx';

import { GlobalService } from '../../global.service';

@Component({
	selector    : 'new',
	templateUrl : './new.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./new.component.scss']
})

export class NewComponent {
	// Récupère toutes les actualités
	getAllNews() {
		return this.http.get('/api/news/get/' + this._global.o_user.idUser).map(res => res.json());
	}

	// Récupère une actualité
	getNew(i_id_new) {
		return this.http.get('/api/news/get/' + i_id_new + '/' + this._global.o_user.idUser).map(res => res.json());
	}
	// Récupère les vues d'une actualité
	getNbViews(i_id_new) {
		return this.http.get('/api/news/views/' + i_id_new).map(res => res.json());
	}
	// Récupère les likes d'une actualité
	getNbLikes(i_id_new) {
		return this.http.get('/api/news/likes/' + i_id_new).map(res => res.json());
	}
	// Récupère les commentaires d'une actualité
	getComments(i_id_new) {
		return this.http.get('/api/news/comments/' + i_id_new).map(res => res.json())
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
	// Ajoute un like
	addLike(i_id_new) {
		if(!this.o_new.like){
			this.http.request('/api/news/add-like/' + i_id_new + '/' + this._global.o_user.idUser).subscribe(
				res => {
					this.o_new.like = 1;
				}
			);
		}
	}
	// Ajoute une vue
	addView(i_id_new) {
		if(!this.o_new.view){
			this.http.request('/api/news/add-view/' + i_id_new + '/' + this._global.o_user.idUser).subscribe();
		}
	}
	// Envoie un commentaire
	addComment(o_comment, i_id_new) {
		let data = new URLSearchParams();
			data.append('i_id_new', i_id_new);
			data.append('i_id_user', this._global.o_user.idUser);
			data.append('s_comment', o_comment.value.new__comment);

		this.http.post('/api/news/add-comment', data)
		.subscribe(res => {
			// Vide le textarea
			this.s_textarea = '';
			this.getComments(i_id_new);
		});
	}
	// Constructeur
	constructor(private http: Http, private sanitizer: DomSanitizer, private _global:GlobalService, private _route:ActivatedRoute) {
		// Récupère l'id de l'actulaité
		this.i_id_new = this._route.snapshot.params['id'];
		// Si on récupère un id
		if(this.i_id_new) {
			// Récupère le contenu de l'actualité
			this.getNew(this.i_id_new).subscribe(res => {
				this.o_new = res[0];
				this.o_new.s_user_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + this.o_new.idUser + '.jpg)');
				this.o_new.s_new_cover    = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/blog/news/' + this.o_new.idNew + '/cover.jpg)');
				this.o_new.s_content      = sanitizer.bypassSecurityTrustHtml(this.o_new.content);
				// Si il ya des tags
				if(this.o_new.tags){
					// On les stocks dans un tableau
					this.o_new.tags = this.o_new.tags.split(',');
				}
				// Ajoute une vue
				this.addView(this.i_id_new);
			});
			// Récupère le nb de vues
			this.getNbViews(this.i_id_new)
			.subscribe(res => {
				this.o_new.nbViews = res[0].nbViews;
			});
			// Récupère le nb de likes
			this.getNbLikes(this.i_id_new).subscribe(res => {
				this.o_new.nbLikes = res[0].nbLikes;
			});
			// Récupère les commentaires
			this.getComments(this.i_id_new)
		}
		else {
			// Récupère toutes les actualités
			this.getAllNews().subscribe(res => {
				this.a_news = res;
				for(let o_new of this.a_news){
					o_new.s_user_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_new.idUser + '.jpg)');
					o_new.s_new_cover    = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/blog/news/' + o_new.idNew + '/cover.jpg)');
					// Si il ya des tags
					if(o_new.tags){
						// On les stocks dans un tableau
						o_new.tags = o_new.tags.split(',');
					}
					if(o_new.idNew){
						// Récupère le nb de vues
						this.getNbViews(o_new.idNew)
						.subscribe(res => {
							o_new.nbViews = res[0].nbViews;
						});
						// Récupère le nb de likes
						this.getNbLikes(o_new.idNew)
						.subscribe(res => {
							o_new.nbLikes = res[0].nbLikes;
						});
					}
				}
			});
		}
	}
	// new
	o_new : any;
	// news
	a_news : any;
	// id le la new
	i_id_new : number;
	// Commentaires
	a_comments : any;
	// Contenu du textarea
	s_textarea :string;
}
