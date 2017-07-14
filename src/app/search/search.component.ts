import { Component }      from '@angular/core';

import { GlobalService } from '../global.service';

@Component({
	selector    : 'search',
	templateUrl : './search.component.html',
	providers   : [GlobalService],
	styleUrls   : ['./search.component.scss']
})

export class SearchComponent {
	// Constructeur
	constructor(private _global:GlobalService) {
	}
}
