// Modules
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NewComponent } from './new/new.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		NewComponent
	],
	exports: [
	    NewComponent
	]
})

export class BlogModule { }
