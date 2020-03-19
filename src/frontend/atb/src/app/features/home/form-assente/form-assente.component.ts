import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAssenteState } from './store/form-assente.state';
import { SaveNewSuspectCase, SetPageTitleFormAssente } from './store/form-assente.actions';
import { SearchState } from '../search/store/search.state';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { UpdateFormValue } from "@ngxs/form-plugin";

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
    @Select(SearchState.suspectCase) suspectCase$: Observable<SuspectCaseInterface>;

    assenteForm: FormGroup;
    submitted = false;

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        if (this.route.snapshot.params.id) {
            this.store.dispatch(new SetPageTitleFormAssente('modifica assente'));
            this.suspectCase$.subscribe((suspectCase: SuspectCaseInterface) => {
                if (suspectCase) {
                    this.store.dispatch(
                        new UpdateFormValue({
                            path: 'assente.assenteForm',
                            value: {
                                // Personal Information
                                name: suspectCase.subject.nome,
                                surname: suspectCase.subject.cognome,
                                phone: suspectCase.subject.phone,
                                email: suspectCase.subject.email,
                                role: suspectCase.subject.role,
                                // Personal Data
                                caseNumber: suspectCase.subject.number,
                                quarantinePlace: suspectCase.data.quarantinePlace,
                                expectedWorkReturnDate: suspectCase.data.expectedWorkReturnDate,
                                actualWorkReturnDate: suspectCase.data.actualWorkReturnDate,
                                closedCase: suspectCase.data.closedCase
                            }
                        })
                    );
                } else {
                    this.goBack();
                }
            });
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
            quarantinePlace: new FormControl(),
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
            quarantinePlace: [null, Validators.required],
            expectedWorkReturnDate: [null, Validators.required],
            actualWorkReturnDate: [null],
            closedCase: [null, Validators.required]
        });
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
