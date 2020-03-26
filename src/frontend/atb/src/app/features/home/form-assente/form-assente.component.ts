import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute } from '@angular/router';
import { FormAssenteState } from '../store/form-assente.state';
import { SaveNewSuspectCase, SetPageTitleFormAssente, UpdateSuspectCase } from '../store/form-assente.actions';
import { SearchState } from '../store/search.state';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { formatDateForNgbDatePicker } from '../../../shared/functions/functions';
import { ClearSuspectCase, SearchSuspectCase } from '../store/search.actions';
import { delay } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'app-assente',
    templateUrl: './form-assente.component.html',
    styleUrls: ['./form-assente.component.scss']
})
export class FormAssenteComponent implements OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<any[]>;
    @Select(FormAssenteState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormAssenteState.assenteFormValid) assenteFormValid$: Observable<boolean>;
    @Select(SearchState.suspectCase) suspectCase$: Observable<SuspectCaseInterface>;
    @Select(SearchState.notFound) notFound$: Observable<boolean>;

    assenteForm: FormGroup;
    submitted = false;
    editMode: boolean;
    detailMode: boolean;

    private subscription = new Subscription();

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {
        if (this.route.snapshot.params.id) {
            this.subscription.add(
                this.suspectCase$.pipe(delay(100)).subscribe((suspectCase: SuspectCaseInterface) => {
                    suspectCase ? this.updateForm(suspectCase) : this.searchCase();
                }));
            this.subscription.add(this.notFound$.subscribe(res => res && this.goBack()));
        }

        if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === 'detail' && this.route.snapshot.params.id) {
            this.detailMode = true;
            this.store.dispatch(new SetPageTitleFormAssente('visualizza sorvegliato'));
        } else if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path !== 'detail' && this.route.snapshot.params.id) {
            this.editMode = true;
            this.store.dispatch(new SetPageTitleFormAssente('modifica sorvegliato'));
        } else {
            this.store.dispatch(new SetPageTitleFormAssente('nuovo sorvegliato'));
        }

        this.initForm();

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch([
                new UpdateFormValue({
                    path: 'assente.assenteForm',
                    value: undefined
                }),
                new ClearSuspectCase()
            ]
        );
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
            healthMeasureCode: new FormControl(),
            healthMeasureBy: new FormControl()
        });
        this.assenteForm = this.formBuilder.group({
            // Personal Information
            name: [null],
            surname: [null],
            phone: [null],
            email: [null],
            role: [null, Validators.required],
            // Personal Data
            caseNumber: [null],
            quarantinePlace: ['HOME'],
            expectedWorkReturnDate: [null, Validators.required],
            actualWorkReturnDate: [null],
            healthMeasureCode: [null, Validators.required],
            healthMeasureBy: [null, Validators.required]
        });

        if (this.editMode) {
            const fieldsToDisable = ['caseNumber', 'name', 'surname', 'phone', 'email', 'role'];
            for (const field of fieldsToDisable) {
                this.f[field].disable();
            }
        }

        if (this.detailMode) {
            this.assenteForm.disable();
        }
    }

    get f() {
        return this.assenteForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.assenteForm.invalid) {
            return;
        }

        if (!this.editMode) {
            this.store.dispatch(new SaveNewSuspectCase());
        } else {
            this.store.dispatch(new UpdateSuspectCase());
        }
    }

    goBack() {
        this.detailMode ? this.store.dispatch(new Navigate([ './home/data-tables' ])) : this.store.dispatch(new Navigate([ './home/ricerca' ]));
    }

    searchCase(): void {
        this.store.dispatch(new SearchSuspectCase(this.route.snapshot.params.id, true));
    }

    updateForm(suspectCase: SuspectCaseInterface): void {
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
                    expectedWorkReturnDate: formatDateForNgbDatePicker(suspectCase.data.expectedWorkReturnDate),
                    actualWorkReturnDate: suspectCase.data.actualWorkReturnDate ? formatDateForNgbDatePicker(suspectCase.data.actualWorkReturnDate) : null,
                    healthMeasureCode: suspectCase.data.healthMeasure.code,
                    healthMeasureBy: suspectCase.data.healthMeasure.by
                }
            })
        );
    }
}
