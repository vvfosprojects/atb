export interface CountersInterface {
    positives: CounterInterface;
    suspects: CounterInterface;
}

export interface CounterInterface {
    closed: number;
    open: number;
}
