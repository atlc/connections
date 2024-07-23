import { Query } from "../connection";

export interface Metric extends BaseMetric {
    id: number;
}

export interface BaseMetric {
    name: string;
    number: string;
    ip: string;
}

const add = (newMetric: BaseMetric) => Query("INSERT INTO Metrics SET ?", [newMetric]);
const getAll = () => Query<Metric[]>("SELECT * FROM Metrics");

export default {
    add,
    getAll,
};
