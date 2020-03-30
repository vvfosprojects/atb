export interface QuarantineGroupFacetInterface {
    name: string;
    series: Series[];
}

export interface Series {
    name: string;
    value: number;
}
