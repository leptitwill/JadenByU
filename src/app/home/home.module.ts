// Modules
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { PostComponent }    from '../forum/post/post.component';
import { FriendsComponent } from '../profil/friends/friends.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		PostComponent,
		FriendsComponent,
	],
	exports: [
	    PostComponent,
		FriendsComponent,
	]
})

export class HomeModule { }
