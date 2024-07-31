import { TransactionButton } from "../TransactionButton";

export interface TransactionSwitcherProps {
}

export function TransactionSwitcher(props: TransactionSwitcherProps) {
    return (
        <div className="flex flex-row justify-between w-full gap-4 ">
            <TransactionButton type="income" isSelected={false} />
            <TransactionButton type="outcome" isSelected={true} />
        </div>
    )
}