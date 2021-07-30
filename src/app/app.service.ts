import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	// tslint:disable-next-line:variable-name
	private readonly _resumes = new BehaviorSubject<any>([]);

	readonly resumes$ = this._resumes.asObservable();

	getResumes() {
		return this._resumes.getValue();
	}

	private setResumes(data) {
		this._resumes.next(data);
	}

	addResume(data) {
		const resumes = [...this.getResumes(), {id: this.getResumes().length, ...data}];
		this.setResumes(resumes);
	}

	removeResume(data) {
		const resumes = this.getResumes().filter(r => r.id !== data.id);
		this.setResumes(resumes);
	}
}
