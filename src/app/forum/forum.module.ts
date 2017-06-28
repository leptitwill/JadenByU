// Modules
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { PostComponent } from './post/post.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		PostComponent
	],
	exports: [
	    PostComponent
	]
})

export class ForumModule { }
