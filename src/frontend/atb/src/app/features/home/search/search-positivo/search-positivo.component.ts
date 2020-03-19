import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-positivo',
    templateUrl: './search-positivo.component.html',
    styleUrls: ['./search-positivo.component.scss']
})
export class SearchPositivoComponent implements OnInit {

    @Input() loading: boolean;
    @Output() search: EventEmitter<number> = new EventEmitter<number>();

    caseNumber: number;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    addNewPositivo() {
        this.router.navigate(['./home/form-positivo']);
    }

    searchPositiveCase() {
        this.search.emit(this.caseNumber);
    }
}
