declare const Bot: {
    listIntervalPair: any[];
    listIntervalCurrencies: any[];
    calculateDiff: (initial: number, current: number) => number;
    writeLog: (diff: number, percentDiff: number) => void;
    writeLogAll: (diff: number, percentDiff: number, actual: object) => void;
    writeLogAllAndDB: (diff: number, percentDiff: number, initial: object, actual: object) => void;
    interval: (percentDiff: number, pair: string, isFirstTime?: boolean, initialValue?: number, intervalMilSec?: number) => Promise<void>;
    intervalAllTickerByCurrency: (percentDiff: number, currency: string, isFirstTime?: boolean, initialValue?: [], intervalMilSec?: number) => Promise<void>;
    cleanIntervalPair: (intervalPair?: number) => Promise<void>;
    cleanIntervalCurrencies: (intervalCurrency?: number) => Promise<void>;
};
export default Bot;
