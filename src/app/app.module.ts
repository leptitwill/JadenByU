// Modules
import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';

// My Modules
import { HomeModule }  from './home/home.module';

// Services
import { GlobalService } from './global.service';
import { AuthService }   from './auth/auth.service';

// Components
import { LoginComponent }  from './auth/login.component';
import { AppComponent }    from './app.component';
import { HomeComponent }   from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { ChatComponent }   from './chat/chat.component';

// Vars
const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [AuthService] },
	{ path: '', component: HomeComponent, canActivate: [AuthService] },
	{ path: 'profil', component: ProfilComponent, canActivate: [AuthService] },
	{ path: 'profil/:id', component: ProfilComponent, canActivate: [AuthService] },
	{ path: 'chat/:id', component: ChatComponent, canActivate: [AuthService] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [
		// Modules
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(appRoutes),
		// My Modules
		HomeModule
	],
	declarations: [
		LoginComponent,
		AppComponent,
		HomeComponent,
		ProfilComponent,
		ChatComponent
	],
	providers: [
		AuthService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
