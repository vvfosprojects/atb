import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute } from '@angular/router';
import { FormAssenteState } from '../store/form-assente.state';
import {
    ClearFormAssente, ConvertSuspectCase,
    SaveNewSuspectCase,
    SetPageTitleFormAssente,
    UpdateSuspectCase
} from '../store/form-assente.actions';
import { SearchState } from '../store/search.state';
import {
    DtoNewCaseInterface,
    LinkCaseInterface,
    SuspectCaseInterface, SuspectHistoryInterface
} from '../../../shared/interface';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { formatDateForNgbDatePicker } from '../../../shared/functions/functions';
import { ClearSuspectCase, SearchSuspectCase } from '../store/search.actions';
import { delay } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { LSNAME } from '../../../core/settings/config';
import { ConvertCaseState } from '../store/convert-case.state';
import { Location } from '@angular/common';

@Component({
    selector: 'app-assente',
    templateUrl: './form-assente.component.html',
    styleUrls: [ './form-assente.component.scss' ]
})
export class FormAssenteComponent implements AfterContentInit, OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<string[]>;
    @Select(FormAssenteState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormAssenteState.assenteFormValid) assenteFormValid$: Observable<boolean>;
    @Select(SearchState.suspectCase) suspectCase$: Observable<SuspectCaseInterface>;
    @Select(SearchState.notFound) notFound$: Observable<boolean>;
    @Select(ConvertCaseState.subject) subject$: Observable<DtoNewCaseInterface>;
    @Select(ConvertCaseState.link) link$: Observable<LinkCaseInterface>;
    link: LinkCaseInterface;

    assenteForm: FormGroup;
    submitted = false;
    editMode: boolean;
    detailMode: boolean;

    gruppo: string;

    historyCase: SuspectHistoryInterface[] = [];

        private subscription = new Subscription();

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
        if (this.route.snapshot.params.id) {
            this.subscription.add(
                this.suspectCase$.pipe(delay(100)).subscribe((suspectCase: SuspectCaseInterface) => {
                    this.historyCase = suspectCase && suspectCase.history;
                    suspectCase ? this.updateForm(suspectCase) : this.searchCase();
                }));
            this.subscription.add(this.notFound$.subscribe(res => res && this.goBack()));
        }

        if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === 'detail' && this.route.snapshot.params.id) {
            const splittedArgs = this.route.snapshot.params.id.split(LSNAME.detailDelimiter);
            this.gruppo = splittedArgs[0];
            this.detailMode = true;
            this.store.dispatch(new SetPageTitleFormAssente('visualizza sorvegliato'));
        } else if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path !== 'detail' && this.route.snapshot.params.id) {
            this.editMode = true;
            this.store.dispatch(new SetPageTitleFormAssente('modifica sorvegliato'));
        }

        this.initForm();

    }

    ngAfterContentInit(): void {
        this.subscription.add(this.link$.subscribe( res => this.link = res));
        this.subscription.add(this.subject$.subscribe( res => {
            if (res) {
                this.store.dispatch(
                    new UpdateFormValue({
                        path: 'assente.assenteForm',
                        value: {
                            name: res.name,
                            surname: res.surname,
                            phone: res.phone,
                            email: res.email,
                            role: res.role,
                        }
                    })
                );
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch([
                new ClearFormAssente(),
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
            name: [ null ],
            surname: [ null ],
            phone: [ null ],
            email: [ null ],
            role: [ null, Validators.required ],
            // Personal Data
            caseNumber: [ null ],
            quarantinePlace: [ 'HOME' ],
            expectedWorkReturnDate: [ null, Validators.required ],
            actualWorkReturnDate: [ null ],
            healthMeasureCode: [ null, Validators.required ],
            healthMeasureBy: [ null, Validators.required ]
        });

        if (this.editMode) {
            const fieldsToDisable = [ 'caseNumber' ];
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

    onSubmit(convert?: boolean) {
        this.submitted = true;

        if (this.assenteForm.invalid) {
            return;
        }

        if (!this.editMode) {
            this.store.dispatch(new SaveNewSuspectCase(this.link));
        } else {
            convert ? this.store.dispatch(new ConvertSuspectCase()) : this.store.dispatch(new UpdateSuspectCase());
        }
    }

    goBack() {
        this.detailMode ? this.store.dispatch(new Navigate([ './home/data-tables' ])) : this.store.dispatch(new Navigate([ './home/ricerca' ]));
    }

    locationBack() {
        this.location.back();
    }

    searchCase(): void {
        console.log('searchCase: ', this.route.snapshot.params.id);
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

    onPositiveDetail(caseNumber: number): void {
        const url = `./home/form-positivo/detail/${this.gruppo}${LSNAME.detailDelimiter}${caseNumber}`;
        console.log('onPositiveDetail', url);
        this.store.dispatch(new Navigate([url]))
    }
}
