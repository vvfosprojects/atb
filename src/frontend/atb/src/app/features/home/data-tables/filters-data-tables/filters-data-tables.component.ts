import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupInterface } from '../../../../shared/interface/group.interface';

@Component({
    selector: 'app-filters-data-tables',
    templateUrl: './filters-data-tables.component.html',
    styleUrls: ['./filters-data-tables.component.scss']
})
export class FiltersDataTablesComponent implements OnInit {

    @Input() groups: GroupInterface[];
    @Input() selectedGroup: string;

    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onSearch() {
        this.search.emit(this.selectedGroup);
    }
}
