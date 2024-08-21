"use client"
import React from "react";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { BodyContainer } from "@/components/BodyContainer";
import { ITransaction } from "@/types/transaction";
import { Table } from "@/components/Table";
import { useEffect, useState } from "react";
import { FormModal } from "@/components/FormModal";
import { useTransaction } from "@/hooks/useTransaction";
import ConfirmationModal from "@/components/ConfirmationModal";
import { UpdateModal } from "@/components/UpdateModal";



export interface ITotal {
  totalIncome: number 
  totalOutcome: number
  total: number
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [totalTransactions, setTotalTransactions] = useState<ITotal>({totalIncome: 0, totalOutcome: 0, total: 0})
  const [idToDelete, setIdToDelete] = useState("");
  const [modalTransaction, setModalTransaction] = useState<ITransaction>({
    title: "",
    category: "",
    price: 0,
    data: new Date,
    type: "income",
  })
  const { data: transactions, isLoading } = useTransaction.ListAll()
  const { mutateAsync: createTransaction } = useTransaction.Create()
  const { mutateAsync: deleteTransaction } = useTransaction.DeleteOne()
  const { mutateAsync: updateTransaction } = useTransaction.UpdateOne()

  const handleUpdateInit = (transaction: ITransaction) => {
    setModalTransaction(transaction);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false)
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);
  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const handleAddTransaction = async (transaction: ITransaction) => {
    await createTransaction(transaction)    
  }

  const handleUpdateTransaction = async (transaction: ITransaction) => {
      await updateTransaction(transaction);
  }

  const getIdToDelete = (id: string) => {
    setIdToDelete(id)
  }

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction(id)
  }
 

  useEffect(() => {
    const totals = transactions?.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.price;
        acc.total += transaction.price;
      } else if (transaction.type === 'outcome') {
        acc.totalOutcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { totalIncome: 0, totalOutcome: 0, total: 0 });
    setTotalTransactions(totals || { totalIncome: 0, totalOutcome: 0, total: 0 });
   
  },[transactions] )
  

  if (isLoading) return <h1>Carregando...</h1>

  return (    
   <div className="bg-background h-full min-h-screen">
    <Header openModal={openModal} />    
    <BodyContainer>
        <CardContainer totals={totalTransactions} />    
        <Table data={transactions ?? []} openModal={openUpdateModal} setModalTransaction={handleUpdateInit} openConfirmationModal={openConfirmationModal} setIdToDelete={getIdToDelete}/>
    </BodyContainer> 
           
    {isModalOpen && (<FormModal formTitle="Cadastro de Transação" closeModal={closeModal} AddTransaction={handleAddTransaction} />)}
    {isConfirmationModalOpen && (<ConfirmationModal transactionId={idToDelete} closeConfirmationModal={closeConfirmationModal} DeleteTransaction={handleDeleteTransaction} />)}
    {isUpdateModalOpen && (<UpdateModal formTitle="Alterar Transação" closeModal={closeUpdateModal} UpdateTransaction={handleUpdateTransaction} transaction={modalTransaction}  />)}
   </div>
  );
}
