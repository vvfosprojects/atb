import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataTablesService } from '../../../core/services/data-tables/data-tables.service';
import { GroupInterface } from '../../../shared/interface/group.interface';
import { PositiveCaseInterface } from '../../../shared/interface/positive-case.interface';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { ClearDataTables, GetGroupList } from './data-tables.actions';
import { GroupsResponseInterface } from '../../../shared/interface/common';

export interface DataTablesStateModel {
    groupsList: GroupInterface[];
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
}

export const DataTablesStateDefaults: DataTablesStateModel = {
    groupsList: [],
    patients: [],
    suspects: []
};

@Injectable()
@State<DataTablesStateModel>({
    name: 'dataTables',
    defaults: DataTablesStateDefaults
})
export class DataTablesState {

    constructor(private dataTablesService: DataTablesService) {
    }

    @Selector()
    static groupsList(state: DataTablesStateModel) {
        return state.groupsList;
    }

    @Selector()
    static patients(state: DataTablesStateModel) {
        return state.patients;
    }

    @Selector()
    static suspects(state: DataTablesStateModel) {
        return state.suspects;
    }

    @Action(GetGroupList)
    getGroupList({ patchState }: StateContext<DataTablesStateModel>) {
        this.dataTablesService.getGroups().subscribe((res: GroupsResponseInterface) => {
            if (res) {
                patchState({ groupsList: res.groups });
            }
        });
    }

    @Action(ClearDataTables)
    clearDataTables({ patchState }: StateContext<DataTablesStateModel>) {
        patchState(DataTablesStateDefaults);
    }

}
