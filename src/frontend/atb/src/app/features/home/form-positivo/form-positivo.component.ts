import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { FormPositivoState } from './store/form-positivo.state';
import { Observable } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute } from '@angular/router';
import { SaveNewPositivoCase, SetPageTitleFormPositivo } from './store/form-positivo.actions';

@Component({
    selector: 'app-positivo',
    templateUrl: './form-positivo.component.html',
    styleUrls: ['./form-positivo.component.scss']
})
export class FormPositivoComponent implements OnInit {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<any[]>;
    @Select(FormPositivoState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormPositivoState.positivoFormValid) positivoFormValid$: Observable<boolean>;

    positivoForm: FormGroup;
    submitted = false;

    today = new Date();

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {
        if (this.route.snapshot.params.id) {
            this.store.dispatch(new SetPageTitleFormPositivo('modifica positivo'));
        }
        this.initForm();
    }

    ngOnInit(): void {
    }

    initForm() {
        this.positivoForm = new FormGroup({
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
        this.positivoForm = this.formBuilder.group({
            // Personal Information
            name: [null, Validators.required],
            surname: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, Validators.required],
            role: [null],
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
        return this.positivoForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.positivoForm.invalid) {
            return;
        }

        this.store.dispatch(new SaveNewPositivoCase());
    }
}
