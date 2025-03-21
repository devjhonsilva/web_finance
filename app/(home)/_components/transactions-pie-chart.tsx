"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "../../_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentageType } from "@/app/_data/get-dashboard/type";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.INVESTMENT]: {
    label: "Investimento",
    color: "#FFFFFF",
  },
  [TransactionType.EXPENSE]: {
    label: "Receita",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typePercentage: TransactionPercentageType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

export function TransactionsPierChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typePercentage,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typePercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Depesa"
            value={typePercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investimento"
            value={typePercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
