import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ResumesListComponent} from './resumes/resumes-list.component';
import {ResumeComponent} from './resumes/resume/resume.component';
import {ResumeResolverService} from './resumes/resume/resume-resolver.service';
import {CanDeactivateGuard} from './resumes/resume/can-deactivate-guard.service';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'resumes', component: ResumesListComponent},
	{path: 'resumes/new', component: ResumeComponent, canDeactivate: [CanDeactivateGuard]},
	{
		path: 'resumes/:id',
		component: ResumeComponent,
		resolve: {resume: ResumeResolverService}
	},
	{path: '**', redirectTo: ''}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
