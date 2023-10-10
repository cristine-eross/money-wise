import Modal from "../Modal";
import { useState, useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";

function AddExpensesModal({show, onClose}) {
    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {expenses, addExpenseItem} = useContext(financeContext);

    const addExpenseItemHandler = async () => {
        const expense = expenses.find((e) => {
            return e.id === selectedCategory
        })
        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items:[
                ...expense.items,
                {
                    amount: +expenseAmount, //originally a string, but + transformes the data type into a number
                    createdAt: new Date(),
                    id: uuidv4(),
                }
            ]
        }

        try {
            await addExpenseItem(selectedCategory, newExpense)
            console.log(newExpense);
            setExpenseAmount("")
            setSelectedCategory(null)
            onClose()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <label className="text-stone-900 text-2xl" htmlFor="">Enter the amount you've spent</label>
                <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    placeholder="Enter expense amount"
                    className="input"
                    value={expenseAmount}
                    onChange={(e) => {setExpenseAmount(e.target.value)}}
                />
            </div>

            {/*Expense categories*/}
            {expenseAmount > 0 && (
                <div className="flex flex-col gap-4 mt-6">
                    <h3 className="text-2xl capitalize text-stone-900">Now select expense category</h3>
                {expenses.map((expense) => {
                    return (
                        <button 
                            key={expense.id}
                            onClick={() => {
                            setSelectedCategory(expense.id)
                            }}
                        >
                            <div style={{
                                boxShadow: expense.id === selectedCategory ? "1px 1px 4px" : "none"
                            }} className="flex items-center justify-between px-4 py-4 bg-stone-100 border-black rounded-3xl">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-[25px] h-[25px] rounded-full"
                                        style={{
                                            backgroundColor: expense.color,
                                        }}
                                    />
                                    <h4>{expense.title}</h4>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
            )}
        
            {expenseAmount > 0 && selectedCategory && (
                <div className="mt-6">
                    <button
                        className="btn btn-primary"
                        onClick={addExpenseItemHandler}
                    >
                        Add Expense
                    </button>
                </div>
            )}
        </Modal>
    )
}

export default AddExpensesModal;