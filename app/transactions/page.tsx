import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionBtn from "../_components/add-transaction-btn";
import Navbar from "../_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionBtn />
        </div>
        <DataTable columns={TransactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
