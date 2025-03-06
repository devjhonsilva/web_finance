import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpenseperCategory, TransactionPercentageType } from "./type";
<<<<<<< HEAD
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const where = {
    userId,
=======

export const getDashboard = async (month: string) => {
  const where = {
>>>>>>> 3b6a0d44cefec156ff4ede66cb7af5e1f4cef479
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const depositFoodTicket = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "TICKET_FOOD" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const depositFuelTicket = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "TICKET_FUEL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expenseFoodTicket = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE_TICKET_FOOD" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expenseFuelTicket = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE_TICKET_FUEL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balanceTicket =
    depositFoodTicket +
    depositFuelTicket -
    (expenseFoodTicket + expenseFuelTicket);

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typePercentage: TransactionPercentageType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.TICKET_FOOD]: Math.round(
      (Number(depositFoodTicket || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE_TICKET_FOOD]: Math.round(
      (Number(expenseFoodTicket || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.TICKET_FUEL]: Math.round(
      (Number(depositFuelTicket || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE_TICKET_FUEL]: Math.round(
      (Number(expenseFuelTicket || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpenseperCategory: TotalExpenseperCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    balance,
    balanceTicket,
    depositsTotal,
    depositFoodTicket,
    depositFuelTicket,
    expensesTotal,
    expenseFoodTicket,
    expenseFuelTicket,
    investmentsTotal,
    typePercentage,
    totalExpenseperCategory,
    lastTransactions,
  };
};
