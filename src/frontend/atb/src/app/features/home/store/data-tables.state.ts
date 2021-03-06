import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DataTablesService } from '../../../core/services/data-tables/data-tables.service';
import {
    CountersInterface, CountersResponseInterface,
    GroupInterface,
    PositiveCaseInterface,
    SuspectCaseInterface
} from '../../../shared/interface';
import { ClearDataTables, GetDataSheets, GetGroupList, SetGroup, SetTab } from './data-tables.actions';
import { GroupsResponseInterface, SheetsResponseInterface } from '../../../shared/interface/response';
import { globalSorter } from '../../../shared/functions';
import { CountersService } from '../../../core/services/counters/counters.service';

export interface DataTablesStateModel {
    groupsList: GroupInterface[];
    selectedGroup: string;
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
    selectedTab: string;
    counters: CountersInterface;
}

export const DataTablesStateDefaults: DataTablesStateModel = {
    groupsList: [],
    selectedGroup: null,
    patients: null,
    suspects: null,
    selectedTab: 'positivi',
    counters: null
};

@Injectable()
@State<DataTablesStateModel>({
    name: 'dataTables',
    defaults: DataTablesStateDefaults
})
export class DataTablesState {

    constructor(private dataTablesService: DataTablesService,
                private countersService: CountersService) {
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
    static counters(state: DataTablesStateModel) {
        return state.counters;
    }

    @Selector()
    static selectedGroup(state: DataTablesStateModel) {
        return state.selectedGroup;
    }

    @Selector()
    static selectedTab(state: DataTablesStateModel) {
        return state.selectedTab;
    }

    @Action(GetGroupList)
    getGroupList({ getState, patchState, dispatch }: StateContext<DataTablesStateModel>) {
        const selectedGroup = getState().selectedGroup;
        this.dataTablesService.getGroups().subscribe((res: GroupsResponseInterface) => {
            if (res) {
                patchState({ groupsList: res.groups });
                if (res.groups && res.groups.length > 0 && !selectedGroup) {
                    dispatch(new SetGroup(res.groups[0].code));
                }
            }
        });
    }

    @Action(SetGroup)
    setGroup({ patchState, dispatch }: StateContext<DataTablesStateModel>, { selectedGroup }: SetGroup) {
        patchState({ selectedGroup });
        dispatch(new GetDataSheets());
    }

    @Action(SetTab)
    setTab({ patchState }: StateContext<DataTablesStateModel>, { selectedTab }: SetTab) {
        patchState({ selectedTab });
    }

    @Action(GetDataSheets)
    getDataSheets({ getState, patchState }: StateContext<DataTablesStateModel>) {
        const selectedGroup = getState().selectedGroup;
        if (selectedGroup) {
            this.dataTablesService.getSheets(selectedGroup).subscribe((res: SheetsResponseInterface) => {
                if (res) {
                    patchState({
                        suspects: res.suspects.sort(globalSorter),
                        patients: res.patients.sort(globalSorter)
                    });
                }
            });
            this.countersService.getCounters(selectedGroup).subscribe( (res: CountersResponseInterface) => {
                if (res) {
                    patchState({
                        counters: res.counters
                    })
                }
            })
        }
    }

    @Action(ClearDataTables)
    clearDataTables({ patchState }: StateContext<DataTablesStateModel>) {
        patchState(DataTablesStateDefaults);
    }

}
