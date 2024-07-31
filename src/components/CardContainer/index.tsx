import { Card } from "../Card";

export function CardContainer(){
    return (
        <div className="flex flex-row justify-between">
            <Card title="Entradas" value={1000} type="income" />
            <Card title="Saídas" value={500} type="outcome" />
            <Card title="Total" value={500} type="total" />
        </div>
    )
}