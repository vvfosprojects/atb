import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-assente',
    templateUrl: './search-assente.component.html',
    styleUrls: ['./search-assente.component.scss']
})
export class SearchAssenteComponent implements OnInit {
    caseNumber: number;
    @Output() search: EventEmitter<number> = new EventEmitter<number>();

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
