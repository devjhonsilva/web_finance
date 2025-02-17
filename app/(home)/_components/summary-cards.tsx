import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
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

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Depesas"
          amount={expensesTotal}
          size="small"
        />
      </div>
      <div className="grid grid-cols-5 gap-6">
        <SummaryCard
          icon={<WalletIcon size={16} />}
          title="Saldo Ticket"
          amount={balanceTicket}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Ticket Alimentação"
          amount={depositFoodTicket}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Depesas Ticket Alimentação"
          amount={expenseFoodTicket}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Ticket Combustível"
          amount={depositFuelTicket}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Depesas Ticket Combustível"
          amount={expenseFuelTicket}
          size="small"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
