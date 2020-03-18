import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { FormPositivoState } from './store/form-positivo.state';
import { Observable } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';

@Component({
    selector: 'app-positivo',
    templateUrl: './form-positivo.component.html',
    styleUrls: ['./form-positivo.component.scss']
})
export class FormPositivoComponent implements OnInit {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(FormPositivoState.pageTitle) pageTitle$: Observable<string>;
    positivoForm: FormGroup;

    constructor(private store: Store) {
        this.initForm();
    }

    ngOnInit(): void {
    }

    initForm() {
        this.positivoForm = new FormGroup({
            // Personal Information
            // todo: verificare se necessario (number)
            // number: new FormControl(),
            name: new FormControl(),
            surname: new FormControl(),
            phone: new FormControl(),
            email: new FormControl(),
            role: new FormControl(),
            // Personal Data
            caseNumber: new FormControl(),
            estremiProvvedimentiASL: new FormControl(),
            quarantinePlace: new FormControl(),
            expectedWorkReturnDate: new FormControl(),
            actualWorkReturnDate: new FormControl(),
            closedCase: new FormControl()
        });

    }

    get f() {
        return this.positivoForm.controls;
    }

    onSubmit() {
        return;
    }
}
