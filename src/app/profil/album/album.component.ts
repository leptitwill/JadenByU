import { Component }    from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http }         from '@angular/http';

import { GlobalService } from '../../global.service';

@Component({
	selector    : 'album',
	templateUrl : './album.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./album.component.scss']
})

export class AlbumComponent {
	// Récupère l'album d'un utilisateur
	getAlbumByUser(i_id_user) {
		return this.http.get('/api/album/all/' + i_id_user).map(res => res.json());
	}
	// Constructeur
	constructor(private http: Http, private _global:GlobalService, private sanitizer: DomSanitizer) {
		this.getAlbumByUser(_global.o_user.idUser).subscribe(res => {
			this.a_pictures = res;
			for(let o_picture of this.a_pictures){
				o_picture.s_picture = sanitizer.bypassSecurityTrustUrl('./../assets/img/album/' + o_picture.idPicture + '.jpg');
			}
		});
	}

	// album de l'utilisateurs
	a_pictures : any;
}
