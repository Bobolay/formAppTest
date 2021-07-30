import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
	selector: 'app-resumes-list',
	templateUrl: './resumes-list.component.html',
	styleUrls: ['./resumes-list.component.scss']
})
export class ResumesListComponent implements OnInit {

	constructor(
		private appService: AppService
	) {
	}

	ngOnInit() {
	}

	deleteResume(data) {
		this.appService.removeResume(data);
	}

}
