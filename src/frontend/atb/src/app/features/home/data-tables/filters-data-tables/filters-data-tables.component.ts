import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupInterface } from '../../../../shared/interface/group.interface';

@Component({
    selector: 'app-filters-data-tables',
    templateUrl: './filters-data-tables.component.html',
    styleUrls: ['./filters-data-tables.component.scss']
})
export class FiltersDataTablesComponent {

    @Input() groups: GroupInterface[];
    @Input() selectedGroup: string;

    @Output() search = new EventEmitter<string>();

    onSearch() {
        this.search.emit(this.selectedGroup);
    }

}
