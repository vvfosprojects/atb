import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAssenteState } from './store/form-assente.state';
import { SaveNewSuspectCase, SetPageTitleFormAssente } from './store/form-assente.actions';

@Component({
    selector: 'app-assente',
    templateUrl: './form-assente.component.html',
    styleUrls: ['./form-assente.component.scss']
})
export class FormAssenteComponent implements OnInit {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<any[]>;
    @Select(FormAssenteState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormAssenteState.assenteFormValid) assenteFormValid$: Observable<boolean>;

    assenteForm: FormGroup;
    submitted = false;

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        if (this.route.snapshot.params.id) {
            this.store.dispatch(new SetPageTitleFormAssente('modifica assente'));
        }
        this.initForm();
    }

    ngOnInit(): void {
    }

    initForm() {
        this.assenteForm = new FormGroup({
            // Personal Information
            name: new FormControl(),
            surname: new FormControl(),
            phone: new FormControl(),
            email: new FormControl(),
            role: new FormControl(),
            // Personal Data
            caseNumber: new FormControl(),
            estremiProvvedimentiASL: new FormControl(),
            quarantinePlace: new FormControl(),
            intensiveTerapy: new FormControl(),
            expectedWorkReturnDate: new FormControl(),
            actualWorkReturnDate: new FormControl(),
            closedCase: new FormControl()
        });
        this.assenteForm = this.formBuilder.group({
            // Personal Information
            name: [null, Validators.required],
            surname: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, Validators.required],
            role: [null, Validators.required],
            // Personal Data
            caseNumber: [null, Validators.required],
            estremiProvvedimentiASL: [null, Validators.required],
            quarantinePlace: [null, Validators.required],
            intensiveTerapy: [null],
            expectedWorkReturnDate: [null, Validators.required],
            actualWorkReturnDate: [null],
            closedCase: [null]
        });
    }

    onPatchQuarantinePlace(event: string) {
        if (event === 'Struttura Ospedaliera') {
            this.f.intensiveTerapy.setValidators(Validators.required);
        } else {
            this.f.intensiveTerapy.clearValidators();
        }
    }

    onPatchExpectedWorkReturnDate(event: string) {
        return;
    }

    get f() {
        return this.assenteForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.assenteForm.invalid) {
            return;
        }

        this.store.dispatch(new SaveNewSuspectCase());
    }

    goBack() {
        this.router.navigate(['./home/ricerca']);
    }
}
