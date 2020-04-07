import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CounterInterface } from '../../../../shared/interface';

@Component({
    selector: 'app-search-assente',
    templateUrl: './search-assente.component.html',
    styleUrls: ['./search-assente.component.scss']
})
export class SearchAssenteComponent implements OnInit {

    @Input() loading: boolean;
    @Input() counter: CounterInterface;
    @Output() search: EventEmitter<number> = new EventEmitter<number>();

    caseNumber: number;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    addNewAssente() {
        this.router.navigate(['./home/form-assente']);
    }

    searchSuspectCase() {
        this.search.emit(this.caseNumber);
    }
}
