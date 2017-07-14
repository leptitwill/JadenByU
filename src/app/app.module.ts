// Modules
import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

// Services
import { GlobalService } from './global.service';
import { AuthService }   from './auth/auth.service';

// Components
import { LoginComponent }   from './auth/login.component';
import { AppComponent }     from './app.component';
import { HomeComponent }    from './home/home.component';
import { ForumComponent }   from './forum/forum.component';
import { PostComponent }    from './forum/post/post.component';
import { GalleryComponent } from './forum/gallery/gallery.component';
import { ProfilComponent }  from './profil/profil.component';
import { ChatComponent }    from './chat/chat.component';
import { NewComponent }     from './blog/new/new.component';
import { AlbumComponent }   from './profil/album/album.component';
import { SearchComponent }  from './search/search.component';
import { FriendsComponent } from './profil/friends/friends.component';

// Vars
const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [AuthService] },
	{ path: '', component: HomeComponent, canActivate: [AuthService] },
	{ path: 'forum', component: ForumComponent, canActivate: [AuthService] },
	{ path: 'profil', component: ProfilComponent, canActivate: [AuthService] },
	{ path: 'profil/:id', component: ProfilComponent, canActivate: [AuthService] },
	{ path: 'chat', component: ChatComponent, canActivate: [AuthService] },
	{ path: 'chat/:id', component: ChatComponent, canActivate: [AuthService] },
	{ path: 'news', component: NewComponent, canActivate: [AuthService] },
	{ path: 'news/:id', component: NewComponent, canActivate: [AuthService] },
	{ path: 'search', component: SearchComponent, canActivate: [AuthService] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		// Modules
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
	],
	declarations: [
		LoginComponent,
		AppComponent,
		HomeComponent,
		ForumComponent,
		ProfilComponent,
		ChatComponent,
		NewComponent,
		AlbumComponent,
		GalleryComponent,
		SearchComponent,
		PostComponent,
		FriendsComponent
	],
	providers: [
		AuthService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
