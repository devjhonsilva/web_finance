import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  balanceTicket: number;
  depositsTotal: number;
  depositFoodTicket: number;
  depositFuelTicket: number;
  expensesTotal: number;
  expenseFoodTicket: number;
  expenseFuelTicket: number;
  investmentsTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  balanceTicket,
  investmentsTotal,
  expenseFoodTicket,
  expenseFuelTicket,
  expensesTotal,
  depositFoodTicket,
  depositFuelTicket,
  depositsTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="max-h-[450px] space-y-6">
      <SummaryCard
        icon={<WalletIcon size={18} />}
        title="Saldo"
        amount={balance}
        size="large"
        usercanAddTransaction={userCanAddTransaction}
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
