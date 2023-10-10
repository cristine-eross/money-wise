"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { currencyFormatter } from "@/lib/Utils"; 
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const {expenses, income} = useContext(financeContext)
  const [balance, setBalance] = useState(0)

useEffect(() => {
  const newBalance = income.reduce((total, i) => {
    return total + i.amount;
  }, 0) -
  expenses.reduce((total, e) => {
    return total + e.total;
  }, 0)

  setBalance(newBalance);
}, [expenses, income])

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />
        
          <main className="container max-w-2xl px-6 mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <section className="py-3">
                  <small className="text-stone-200 text-5xl text-emerald-600">My Balance</small>
                  <h2 className="text-4xl text-stone-200 font-bold">{currencyFormatter(balance)}</h2>
                </section>

                <section className="flex items-center gap-2 pt-3 pb-8">
                  <button onClick={() => {
                    setShowAddExpenseModal(true)
                    }} className="btn btn-primary">
                    + Expenses
                  </button>
                  <button
                    onClick={() => {
                      setShowAddIncomeModal(true);
                    }}
                    className="btn btn-primary-outline"
                  >
                    + Income
                  </button>
                </section>
              </div>
              <div>
              <Image className="pt-6" src="/hero.svg" alt="moneybag" width={400} height={300}></Image>
              </div>
            </div>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (
                <ExpenseCategoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}