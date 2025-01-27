import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.TICKET_FOOD) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Ticket Alimentação
      </Badge>
    );
  }
  if (transaction.type === TransactionType.TICKET_FUEL) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Ticket Combustível
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesas
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE_TICKET_FOOD) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesas Ticket Alimentação
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE_TICKET_FUEL) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesas Ticket Combustível
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
