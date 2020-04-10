import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { FormPositivoState } from '../store/form-positivo.state';
import { Observable, Subscription } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { QualificheState } from '../../../shared/store/qualifiche/qualifiche.state';
import { ActivatedRoute } from '@angular/router';
import {
    ClearFormPositivo, ConvertPositiveCase,
    SaveNewPositivoCase,
    SetPageTitleFormPositivo,
    SetPositivoDeceased,
    UpdatePositivoCase
} from '../store/form-positivo.actions';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { SearchState } from '../store/search.state';
import {
    DtoNewCaseInterface,
    LinkCaseInterface,
    PositiveCaseInterface, PositiveHistoryInterface
} from '../../../shared/interface';
import { formatDateForNgbDatePicker } from '../../../shared/functions/functions';
import { ClearPositiveCase, SearchPositiveCase } from '../store/search.actions';
import { delay } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { LSNAME } from '../../../core/settings/config';
import { ConvertCaseState } from '../store/convert-case.state';
import { Location } from '@angular/common';

@Component({
    selector: 'app-positivo',
    templateUrl: './form-positivo.component.html',
    styleUrls: [ './form-positivo.component.scss' ]
})
export class FormPositivoComponent implements AfterContentInit, OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(QualificheState.qualifiche) qualifiche$: Observable<string[]>;
    @Select(FormPositivoState.pageTitle) pageTitle$: Observable<string>;
    @Select(FormPositivoState.positivoFormValid) positivoFormValid$: Observable<boolean>;
    @Select(SearchState.positiveCase) positiveCase$: Observable<PositiveCaseInterface>;
    @Select(SearchState.notFound) notFound$: Observable<boolean>;
    @Select(ConvertCaseState.subject) subject$: Observable<DtoNewCaseInterface>;
    @Select(ConvertCaseState.link) link$: Observable<LinkCaseInterface>;
    link: LinkCaseInterface;

    positivoForm: FormGroup;
    submitted = false;
    editMode: boolean;
    detailMode: boolean;
    deceased: boolean;

    gruppo: string;

    historyCase: PositiveHistoryInterface[] = [];

    private subscription = new Subscription();

    constructor(private store: Store,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private location: Location) {
        if (this.route.snapshot.params.id) {
            const splittedArgs = this.route.snapshot.params.id.split(LSNAME.detailDelimiter);
            this.gruppo = splittedArgs[0];
            this.subscription.add(
                this.positiveCase$.pipe(delay(100)).subscribe((positiveCase: PositiveCaseInterface) => {
                    this.historyCase = positiveCase && positiveCase.history;
                    positiveCase ? this.updateForm(positiveCase) : this.searchCase();
                }));
            this.subscription.add(this.notFound$.subscribe(res => res && this.goBack()));
        }

        if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === 'detail' && this.route.snapshot.params.id) {

            this.detailMode = true;
            this.store.dispatch(new SetPageTitleFormPositivo('visualizza positivo'));
        } else if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path !== 'detail' && this.route.snapshot.params.id) {
            this.editMode = true;
            this.store.dispatch(new SetPageTitleFormPositivo('modifica positivo'));
        }

        this.initForm();
    }

    ngAfterContentInit(): void {
        this.subscription.add(this.link$.subscribe(res => this.link = res));
        this.subscription.add(this.subject$.subscribe(res => {
            if (res) {
                this.store.dispatch(
                    new UpdateFormValue({
                        path: 'positivo.positivoForm',
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
                new ClearFormPositivo(),
                new ClearPositiveCase()
            ]
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
            diseaseConfirmDate: new FormControl(),
            quarantinePlace: new FormControl(),
            intensiveTerapy: new FormControl(),
            expectedWorkReturnDate: new FormControl(),
            actualWorkReturnDate: new FormControl()
        });
        this.positivoForm = this.formBuilder.group({
            // Personal Information
            name: [ null, Validators.required ],
            surname: [ null, Validators.required ],
            phone: [ null, Validators.required ],
            email: [ null, Validators.required ],
            role: [ null, Validators.required ],
            // Personal Data
            caseNumber: [ null ],
            estremiProvvedimentiASL: [ null ],
            diseaseConfirmDate: [ null, Validators.required ],
            quarantinePlace: [ null, Validators.required ],
            intensiveTerapy: [ null ],
            expectedWorkReturnDate: [ null ],
            actualWorkReturnDate: [ null ]
        });

        if (this.editMode) {
            const fieldsToDisable = [ 'caseNumber' ];
            for (const field of fieldsToDisable) {
                this.f[field].disable();
            }
        }

        if (this.detailMode) {
            this.positivoForm.disable();
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

    onSubmit(convert?: boolean) {
        this.submitted = true;

        if (this.positivoForm.invalid) {
            return;
        }

        if (!this.editMode) {
            this.store.dispatch(new SaveNewPositivoCase(this.link));
        } else {
            convert ? this.store.dispatch(new ConvertPositiveCase()) : this.store.dispatch(new UpdatePositivoCase());
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
        this.store.dispatch(new SearchPositiveCase(this.route.snapshot.params.id, true));
    }

    updateForm(positiveCase: PositiveCaseInterface): void {
        if (positiveCase.data.dateOfDeath) {
            this.deceased = true;
            this.store.dispatch(new SetPositivoDeceased(positiveCase.data.dateOfDeath));
        }
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
                    diseaseConfirmDate: positiveCase.data.diseaseConfirmDate ? formatDateForNgbDatePicker(positiveCase.data.diseaseConfirmDate) : null,
                    quarantinePlace: positiveCase.data.quarantinePlace !== 'INTCARE' ? positiveCase.data.quarantinePlace : 'HOSP',
                    intensiveTerapy: positiveCase.data.quarantinePlace === 'INTCARE',
                    expectedWorkReturnDate: positiveCase.data.expectedWorkReturnDate ? formatDateForNgbDatePicker(positiveCase.data.expectedWorkReturnDate) : null,
                    actualWorkReturnDate: positiveCase.data.actualWorkReturnDate ? formatDateForNgbDatePicker(positiveCase.data.actualWorkReturnDate) : null
                }
            })
        );
        this.deceseadForm();
    }

    deceseadForm(): void {
        if (this.deceased) {
            const fieldsToDisable = [ 'estremiProvvedimentiASL', 'diseaseConfirmDate', 'quarantinePlace', 'intensiveTerapy', 'expectedWorkReturnDate', 'actualWorkReturnDate' ];
            for (const field of fieldsToDisable) {
                this.f[field].disable();
            }
        }
    }

    onSuspectDetail(caseNumber: number): void {
        const url = `./home/form-assente/detail/${this.gruppo}${LSNAME.detailDelimiter}${caseNumber}`;
        console.log('onSuspectDetail', url);
        this.store.dispatch(new Navigate([url]))
    }
}
