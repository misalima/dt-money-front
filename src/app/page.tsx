"use client"
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { BodyContainer } from "@/components/BodyContainer";
import { ITransaction } from "@/types/transaction";
import { Table } from "@/components/Table";
import { useState } from "react";
import { FormModal } from "@/components/FormModal";

const transactions: ITransaction[] = [
  {
    title: "Desenvolvimento de site",
    price: 1200,
    category: "Desenvolvimento",
    data: new Date(),
    type: "income"
  },
  {
    title: "Hamburguer",
    price: 50,
    category: "Alimentação",
    data: new Date(),
    type: "outcome"
  }
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false)

  return (    
   <div className="bg-background h-full min-h-screen">
    <Header openModal={openModal} />    
    <BodyContainer>
        <CardContainer />    
        <Table data={transactions} />
    </BodyContainer>          
    {isModalOpen && (<FormModal title="Cadastro de Transação" closeModal={closeModal} />)}
   </div>
  );
}
