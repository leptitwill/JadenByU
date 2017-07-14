import { Component }    from '@angular/core';
import { Http }         from '@angular/http';
import { Router }       from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/Rx';

import { GlobalService } from '../global.service';

@Component({
	selector    : 'forum',
	templateUrl : './forum.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./forum.component.scss']
})

export class ForumComponent {
	// Constructeur
	constructor(private router: Router, private http: Http, private sanitizer: DomSanitizer, private _global:GlobalService) {

	}
}
