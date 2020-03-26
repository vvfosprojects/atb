import { SuspectCaseInterface } from '../interface/suspect-case.interface';
import { PositiveCaseInterface } from '../interface/positive-case.interface';
import { QuarantinePlaceEnum } from '../enum/quarantine-place.enum';

export function sorterNumber(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    return (a.subject.number < b.subject.number) ? 1 : -1;
}

export function sorterQuarantinePlace(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    const lastPerson = a.data.quarantinePlace === QuarantinePlaceEnum.TerapiaIntensiva;
    const nextPerson = b.data.quarantinePlace === QuarantinePlaceEnum.TerapiaIntensiva;
    return lastPerson < nextPerson ? -1 : 1
}

export function sorterHospital(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    const lastPerson = a.data.quarantinePlace === QuarantinePlaceEnum.Ospedale;
    const nextPerson = b.data.quarantinePlace === QuarantinePlaceEnum.Ospedale;
    return lastPerson < nextPerson ? -1 : 1;
}

export function sorterHome(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    const lastPerson = a.data.quarantinePlace === QuarantinePlaceEnum.Domicilio;
    const nextPerson = b.data.quarantinePlace === QuarantinePlaceEnum.Domicilio;
    return lastPerson < nextPerson ? -1 : 1;
}
