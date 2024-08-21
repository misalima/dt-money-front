/* eslint-disable react/no-unknown-property */
import React from "react";
import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";


export interface ITableProps {
    data: ITransaction[]
    openModal: () => void
    openConfirmationModal: () => void
    setIdToDelete: (id: string) => void
    setModalTransaction: (transaction: ITransaction) => void 
    }

export function Table({data, openModal, openConfirmationModal, setIdToDelete, setModalTransaction}: ITableProps) {
  
    const handleDelete = (id: string | undefined) => {
        if (typeof id == 'string') {
            setIdToDelete(id)
            openConfirmationModal()
        } else {
            console.log("Problem finding transaction id");
        }
    }

    function handleUpdate(item: ITransaction): void {
        setModalTransaction(item);
        openModal();
    }

    return (        
        <table className="w-full mt-16 border border-separate border-spacing-y-2 ">
        <thead>
            <tr>
                <th className="px-4 text-left text-table-header text-base font-medium">Título</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
                <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                <th className="px-4 text-left text-table-header text-base font-medium"></th>                   
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index} className="bg-white h-16 rounded-lg">
                    <td className="px-4 py-4 whitespace-nowrap text-title">{item.title}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-right ${item.type === 'income'? "text-income-value" : "text-outcome"}`}>{formatCurrency(item.price)}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{item.data ? formatDate(new Date(item.data)) : ''}</td>         
                    <td className="px-4 py-4 whitespace-nowrap flex gap-4 justify-center">
                        <button onClick={()=> handleUpdate(item)}>
                            <svg className="w-6 h-6 text-title hover:text-income" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button onClick={()=> handleDelete(item.id)}>
                            <svg className="w-6 h-6 text-red-600 hover:text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </td>         
                </tr>
            ))}
        </tbody>
    </table>

    )
}