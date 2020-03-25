import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataTablesService } from '../../../core/services/data-tables/data-tables.service';
import { GroupInterface } from '../../../shared/interface/group.interface';
import { PositiveCaseInterface } from '../../../shared/interface/positive-case.interface';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { ClearDataTables, GetDataSheets, GetGroupList, SetGroup } from './data-tables.actions';
import { GroupsResponseInterface, SheetsResponseInterface } from '../../../shared/interface/common';

export interface DataTablesStateModel {
    groupsList: GroupInterface[];
    selectedGroup: string;
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
}

export const DataTablesStateDefaults: DataTablesStateModel = {
    groupsList: [],
    selectedGroup: null,
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

    @Selector()
    static selectedGroup(state: DataTablesStateModel) {
        return state.selectedGroup;
    }

    @Action(GetGroupList)
    getGroupList({ patchState }: StateContext<DataTablesStateModel>) {
        this.dataTablesService.getGroups().subscribe((res: GroupsResponseInterface) => {
            if (res) {
                patchState({ groupsList: res.groups });
            }
        });
    }

    @Action(SetGroup)
    setGroup({ patchState, dispatch }: StateContext<DataTablesStateModel>, { selectedGroup }: SetGroup) {
        patchState({ selectedGroup });
        dispatch(new GetDataSheets());
    }

    @Action(GetDataSheets)
    getDataSheets({ getState, patchState }: StateContext<DataTablesStateModel>) {
        const selectedGroup = getState().selectedGroup;
        if (selectedGroup) {
            this.dataTablesService.getSheets(selectedGroup).subscribe((res: SheetsResponseInterface) => {
                if (res) {
                    patchState({
                        suspects: res.suspects,
                        patients: res.patients
                    });
                }
            });
        }
    }

    @Action(ClearDataTables)
    clearDataTables({ patchState }: StateContext<DataTablesStateModel>) {
        patchState(DataTablesStateDefaults);
    }

}
