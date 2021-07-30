import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-resume',
	templateUrl: './resume.component.html',
	styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, CanComponentDeactivate {

	isSubmitted: boolean;
	hasChanges: boolean;
	resumeForm: FormGroup;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private appService: AppService
	) {
	}

	ngOnInit() {
		// Form build
		this.resumeForm = this.fb.group({
			generalInfo: this.fb.group({
				fullName: [null, Validators.required],
				email: [null, [Validators.required, Validators.email]],
				phone: [null, Validators.required]
			}),
			companies: this.fb.array([])
		});

		// Set prop for using in canDeactivate()
		this.resumeForm.valueChanges.subscribe(_ => {
			this.hasChanges = true;
		});

		// Patching FORM
		this.route.data
			.pipe(
				filter(data => data.resume)
			)
			.subscribe((data: Data) => {
				const resume = data.resume;
				this.resumeForm.patchValue(resume);
				for (const [key, value] of Object.entries(resume)) {
					if (Array.isArray(value)) {
						value.forEach((company, index: number) => {
							this.companies().push(this.newCompany(company));

							for (const [cKey, cValue] of Object.entries(company)) {
								if (Array.isArray(cValue)) {
									cValue.forEach(technology => {
										this.addTechnology(index, technology);
									});
								}
							}
						});
					}
				}
			});
	}

	createResume() {
		this.isSubmitted = true;
		this.appService.addResume(this.resumeForm.value);
		this.resumeForm.reset();
	}



	// C O M P A N I E S
	companies(): FormArray {
		return this.resumeForm.get('companies') as FormArray;
	}

	addCompany() {
		this.companies().push(this.newCompany());
	}

	removeCompany(index: number) {
		this.companies().removeAt(index);
	}

	private newCompany(data?): FormGroup {
		return this.fb.group({
			companyName: [(data && data.companyName) || null, Validators.required],
			position: [(data && data.position) || null, Validators.required],
			startDate: [(data && data.startDate) || null, Validators.required],
			endDate: [(data && data.endDate) || null],
			achievements: [(data && data.achievements) || null, Validators.required],
			technologies: this.fb.array([])
		});
	}



	// T E C H N O L O G I E S
	technologies(index: number): FormArray {
		return this.companies().at(index).get('technologies') as FormArray;
	}

	addTechnology(index: number, data?: any) {
		this.technologies(index).push(this.newTechnology(data));
	}

	removeTechnology(index: number) {
		this.technologies(index).removeAt(index);
	}

	private newTechnology(data?): FormGroup {
		return this.fb.group({
			name: [(data && data.name) || null, Validators.required],
			version: [(data && data.version) || null]
		});
	}



	// Alert for user about unsaved changes
	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.isSubmitted && this.hasChanges) {
			return confirm('You have not submitted a form. You may loose your changes. Are you sure ?');
		} else {
			return true;
		}
	}
}
