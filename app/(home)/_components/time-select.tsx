"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/ui/select";
import { useEffect, useState } from "react";

const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  const currentMonth = new Date().toISOString().slice(5, 7);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const monthFromUrl = searchParams.get("month");
    if (monthFromUrl) {
      setSelectedMonth(monthFromUrl.padStart(2, "0")); // Garante que sempre terá dois dígitos
    } else {
      setSelectedMonth(currentMonth);
      push(`/?month=${currentMonth}`);
    }
  }, [searchParams, push, currentMonth]);

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };

  return (
    <Select
      onValueChange={handleMonthChange}
      value={selectedMonth}
      defaultValue={month ?? ""}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
