import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';

import {AppService} from '../../app.service';

@Injectable({
	providedIn: 'root'
})
export class ResumeResolverService implements Resolve<any> {

	constructor(
		private appService: AppService
	) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		return this.appService.resumes$
			.pipe(
				filter(data => data.length > 0),
				map(data => data[+route.params.id]),
				take(1),
				catchError(_ => EMPTY)
			);
	}
}
