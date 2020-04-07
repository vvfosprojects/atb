export interface QuarantineGroupFacetInterface {
    name: string;
    series: Series[];
    total?: number;
}

export interface Series {
    name: string;
    value: number;
}
