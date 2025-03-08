"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AirReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AirReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenarateReportClick = async () => {
    console.log(hasPremiumPlan);
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold">
          <BotIcon />
          Relatório IA
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório com IA</DialogTitle>
              <DialogDescription>
                Use a inteligência artifical para gerar um relatório com
                insights sobre suas finanças.
              </DialogDescription>
              <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
                <Markdown>{report}</Markdown>
              </ScrollArea>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenarateReportClick}
                //disabled={reportIsLoading}
                disabled
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório com IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar os relatórios com IA
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href={"/subscription"}>Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
