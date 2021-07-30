// CORE
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

// MODULES
import {AppRoutingModule} from './app-routing.module';

// COMPONENTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ResumesListComponent} from './resumes/resumes-list.component';
import { ResumeComponent } from './resumes/resume/resume.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ResumesListComponent,
		ResumeComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
