import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteTransactions } from "../_actions/delete-transactions";
import { toast } from "sonner";

interface DeleteTransctionProps {
  transactionId: string;
}

const DeleteTransaction = ({ transactionId }: DeleteTransctionProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransactions({ transactionId });
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao deletar a transação.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que quer deletar a transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Após confirmado, ação não pode ser desfeita enviando comando ao
            banco de dados, deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Confirma
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransaction;
