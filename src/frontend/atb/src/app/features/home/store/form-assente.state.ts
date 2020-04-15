import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
    ClearFormAssente, ConvertSuspectCase,
    SaveNewSuspectCase,
    SetPageTitleFormAssente,
    UpdateSuspectCase
} from './form-assente.actions';
import { AssentiService } from '../../../core/services/assenti/assenti.service';
import { Navigate } from '@ngxs/router-plugin';
import { formatDate } from '../../../shared/functions/functions';
import {
    DtoNewSuspectCaseInterface,
    DtoNewSuspectUpdateInterface, InputModalCaseInterface, LinkCaseInterface,
    NewSuspectResponseInterface
} from '../../../shared/interface';
import { CaseNumberModalComponent } from '../../../shared/components/case-number-modal/case-number-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ClearConvertCase, SetConvertCase, SetLink, SetSubject } from './convert-case.actions';
import { SearchPositiveCase } from './search.actions';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

export interface FormAssenteStateModel {
    pageTitle: string;
    assenteForm: {
        model?: {
            // Personal Information
            name: string;
            surname: string;
            email: string;
            phone: string;
            role: string;
            // Personal Data
            caseNumber: number;
            estremiProvvedimentiASL: string;
            quarantinePlace: string;
            intensiveTerapy: boolean;
            expectedWorkReturnDate: string;
            actualWorkReturnDate: string;
            healthMeasureCode: string;
            healthMeasureBy: string;
        };
        status?: string;
    };
    saving: boolean;
}

export const formAssenteStateDefaults: FormAssenteStateModel = {
    pageTitle: 'nuovo sorvegliato',
    assenteForm: {
        model: undefined
    },
    saving: false
};

@Injectable()
@State<FormAssenteStateModel>({
    name: 'assente',
    defaults: formAssenteStateDefaults
})
export class FormAssenteState {

    @Selector()
    static pageTitle(state: FormAssenteStateModel) {
        return state.pageTitle;
    }

    @Selector()
    static assenteFormValid(state: FormAssenteStateModel) {
        return state.assenteForm.status === 'VALID';
    }

    @Selector()
    static saving(state: FormAssenteStateModel) {
        return state.saving;
    }

    constructor(private assentiService: AssentiService, private modal: NgbModal) {
    }

    @Action(SetPageTitleFormAssente)
    setPageTitleFormAssente({ patchState }: StateContext<FormAssenteStateModel>, action: SetPageTitleFormAssente) {
        patchState({
            pageTitle: action.title
        });
    }

    @Action(SaveNewSuspectCase)
    saveNewSuspectCase({ getState, dispatch, patchState }: StateContext<FormAssenteStateModel>, { link }: SaveNewSuspectCase) {
        const assenteFormValue = getState().assenteForm.model;
        const objSubject: DtoNewSuspectCaseInterface = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone,
            role: assenteFormValue.role
        };
        patchState({ saving: true });
        this.assentiService.newSuspectCase(objSubject).subscribe((resNewSuspectCase: NewSuspectResponseInterface) => {
            const objData: DtoNewSuspectUpdateInterface = {
                caseNumber: resNewSuspectCase.caseNumber,
                quarantinePlace: assenteFormValue.quarantinePlace,
                expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
                actualWorkReturnDate: assenteFormValue.actualWorkReturnDate ? formatDate(assenteFormValue.actualWorkReturnDate) : null,
                healthMeasure: {
                    code: assenteFormValue.healthMeasureCode,
                    by: assenteFormValue.healthMeasureBy
                },
                link,
                convertToPositive: false
            };
            this.assentiService.newSuspectUpdate(objData).subscribe(() => {
                dispatch(new Navigate([ './home/ricerca' ]));
                const mInput: InputModalCaseInterface = {
                    title: 'Inserimento Nuovo Caso Sorvegliato',
                    caseNumber: resNewSuspectCase.caseNumber,
                    exMsg: link ? '(ex Positivo)' : ''
                };
                this.openCase(mInput).then();
                patchState({ saving: formAssenteStateDefaults.saving })
            }, () => patchState({ saving: formAssenteStateDefaults.saving }));
        }, () => patchState({ saving: formAssenteStateDefaults.saving }));
    }

    @Action(ConvertSuspectCase)
    convertSuspectCase({ dispatch }: StateContext<FormAssenteStateModel>) {
        const m = this.modal.open(ConfirmModalComponent, {
            centered: true,
            size: 'lg',
            backdropClass: 'backdrop-custom-black'
        });
        m.componentInstance.title = 'Conversione in Caso Positivo COVID';
        m.componentInstance.message = 'Sei sicuro di voler convertire il caso Sorvegliato in Positivo?';
        m.result.then((modalResult: string) => {
            if (modalResult && modalResult === 'confirm') {
                dispatch(new UpdateSuspectCase(true));
            }
        }, () => console.log('closed'));
    }

    @Action(UpdateSuspectCase)
    updateSuspectCase({ getState, dispatch, patchState }: StateContext<FormAssenteStateModel>, { convertToPositive }: UpdateSuspectCase) {
        const assenteFormValue = getState().assenteForm.model;
        const objData: DtoNewSuspectUpdateInterface = {
            caseNumber: assenteFormValue.caseNumber,
            quarantinePlace: assenteFormValue.quarantinePlace,
            expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
            actualWorkReturnDate: assenteFormValue.actualWorkReturnDate ? formatDate(assenteFormValue.actualWorkReturnDate) : null,
            healthMeasure: {
                code: assenteFormValue.healthMeasureCode,
                by: assenteFormValue.healthMeasureBy
            },
            convertToPositive
        };
        const objSubject: DtoNewSuspectCaseInterface = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone,
            role: assenteFormValue.role
        };
        console.log('UpdateSuspectCase', objSubject, objData);
        const updateSuspectCase = this.assentiService.updateSuspectCase(objSubject);
        const newSuspectUpdate = this.assentiService.newSuspectUpdate(objData);
        patchState({ saving: true });
        forkJoin([ updateSuspectCase, newSuspectUpdate ]).subscribe(result => {
            if (result) {
                if (convertToPositive && result[1].positiveSheetNum === null) {
                    console.log('Init ConvertSuspect');
                    const link: LinkCaseInterface = { caseNumber: objData.caseNumber, closed: false };
                    dispatch([
                        new SetLink(link),
                        new SetSubject(objSubject),
                        new SetConvertCase('form-positivo')
                    ]);
                } else if (convertToPositive && result[1].positiveSheetNum) {
                    dispatch(new Navigate([ './home/ricerca' ]));
                    const mInput: InputModalCaseInterface = {
                        title: 'Convertito in Caso Positivo COVID',
                        caseNumber: result[1].positiveSheetNum,
                        detail: true
                    };
                    this.openCase(mInput).then((modalResult: string) => {
                        if (modalResult && modalResult === 'onDetail') {
                            dispatch(new SearchPositiveCase('' + result[1].positiveSheetNum));
                        }
                    }, () => console.log('closed'));
                } else {
                    dispatch(new Navigate([ './home/ricerca' ]));
                    const mInput: InputModalCaseInterface = {
                        title: 'Salvataggio Caso Sorvegliato'
                    };
                    this.openCase(mInput).then();
                }
                patchState({ saving: formAssenteStateDefaults.saving })
            }
        }, () => patchState({ saving: formAssenteStateDefaults.saving }));
    }

    @Action(ClearFormAssente)
    clearFormAssente({ dispatch, patchState }: StateContext<FormAssenteStateModel>) {
        dispatch(new ClearConvertCase('form-assente'));
        patchState(formAssenteStateDefaults);
    }

    openCase(inputModal: InputModalCaseInterface): Promise<any> {
        const m = this.modal.open(CaseNumberModalComponent, {
            centered: true,
            size: 'lg',
            backdropClass: 'backdrop-custom-black'
        });
        m.componentInstance.title = inputModal.title;
        m.componentInstance.caseNumber = inputModal.caseNumber;
        m.componentInstance.detail = inputModal.detail;
        m.componentInstance.exMsg = inputModal.exMsg;
        return m.result;
    }
}
