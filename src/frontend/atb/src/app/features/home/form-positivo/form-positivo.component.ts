import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { FormPositivoState } from './store/form-positivo.state';
import { Observable } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveNewPositivoCase, SetPageTitleFormPositivo, UpdatePositivoCase } from './store/form-positivo.actions';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { SearchState } from '../search/store/search.state';
import { PositiveCaseInterface } from '../../../shared/interface/positive-case.interface';
import { formatDateForNgbDatePicker } from '../../../shared/functions/functions';

@Component({
    selector: 'app-positivo',
    templateUrl: './form-positivo.component.html',
    styleUrls: ['./form-positivo.component.scss']
})
export class FormPositivoComponent implements OnInit, OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<any[]>;
    @Select(FormPositivoState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormPositivoState.positivoFormValid) positivoFormValid$: Observable<boolean>;
    @Select(SearchState.positiveCase) positiveCase$: Observable<PositiveCaseInterface>;

    positivoForm: FormGroup;
    submitted = false;
    editMode: boolean;

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        if (this.route.snapshot.params.id) {
            this.editMode = true;
            this.store.dispatch(new SetPageTitleFormPositivo('modifica positivo'));
            this.positiveCase$.subscribe((positiveCase: PositiveCaseInterface) => {
                if (positiveCase) {
                    this.store.dispatch(
                        new UpdateFormValue({
                            path: 'positivo.positivoForm',
                            value: {
                                // Personal Information
                                name: positiveCase.subject.nome,
                                surname: positiveCase.subject.cognome,
                                phone: positiveCase.subject.phone,
                                email: positiveCase.subject.email,
                                role: positiveCase.subject.role,
                                // Personal Data
                                caseNumber: positiveCase.subject.number,
                                estremiProvvedimentiASL: positiveCase.data.estremiProvvedimentiASL,
                                quarantinePlace: positiveCase.data.quarantinePlace !== 'INTCARE' ? positiveCase.data.quarantinePlace : 'HOSP',
                                intensiveTerapy: positiveCase.data.quarantinePlace === 'INTCARE',
                                expectedWorkReturnDate: positiveCase.data.expectedWorkReturnDate ? formatDateForNgbDatePicker(positiveCase.data.expectedWorkReturnDate) : null,
                                actualWorkReturnDate: positiveCase.data.actualWorkReturnDate ? formatDateForNgbDatePicker(positiveCase.data.actualWorkReturnDate) : null
                            }
                        })
                    );
                } else {
                    this.goBack();
                }
            });
        } else {
            this.store.dispatch(new SetPageTitleFormPositivo('nuovo positivo'));
        }
        this.initForm();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.store.dispatch(
            new UpdateFormValue({
                    path: 'positivo.positivoForm',
                    value: undefined
                }
            )
        );
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
            actualWorkReturnDate: new FormControl()
        });
        this.positivoForm = this.formBuilder.group({
            // Personal Information
            name: [null, Validators.required],
            surname: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, Validators.required],
            role: [null, Validators.required],
            // Personal Data
            caseNumber: [null, Validators.required],
            estremiProvvedimentiASL: [''],
            quarantinePlace: [null, Validators.required],
            intensiveTerapy: [null],
            expectedWorkReturnDate: [null],
            actualWorkReturnDate: [null]
        });

        if (this.editMode) {
            const fieldsToDisable = ['caseNumber', 'name', 'surname', 'phone', 'email', 'role'];
            for (const field of fieldsToDisable) {
                this.f[field].disable();
            }
        }
    }

    onPatchQuarantinePlace(event: string) {
        if (event === 'HOSP') {
            this.f.intensiveTerapy.setValidators(Validators.required);
        } else {
            this.f.intensiveTerapy.clearValidators();
        }
    }

    get f() {
        return this.positivoForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.positivoForm.invalid) {
            return;
        }

        if (!this.editMode) {
            this.store.dispatch(new SaveNewPositivoCase());
        } else {
            this.store.dispatch(new UpdatePositivoCase());
        }
    }

    goBack() {
        this.router.navigate(['./home/ricerca']);
    }
}
