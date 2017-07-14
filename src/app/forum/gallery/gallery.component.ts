import { Component }    from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http }         from '@angular/http';

import { GlobalService } from '../../global.service';

@Component({
	selector    : 'gallery',
	templateUrl : './gallery.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./gallery.component.scss']
})

export class GalleryComponent {
	// Récupère la galerie
	getGallery() {
		return this.http.get('/api/album/all').map(res => res.json());
	}
	// Constructeur
	constructor(private http: Http, private _global:GlobalService, private sanitizer: DomSanitizer) {
		this.getGallery().subscribe(res => {
			this.a_pictures = res;
			for(let o_picture of this.a_pictures){
				o_picture.s_picture      = sanitizer.bypassSecurityTrustUrl('./../assets/img/album/' + o_picture.idPicture + '.jpg');
				o_picture.s_user_picture = sanitizer.bypassSecurityTrustStyle('url(./../assets/img/profil/' + o_picture.idUser + '.jpg)');
			}
		});
	}

	// liste des images
	a_pictures : any;
}
