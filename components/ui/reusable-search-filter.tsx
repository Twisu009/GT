"use client";

import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FaSearch } from "react-icons/fa";

interface ReusableFilterProps<T extends FieldValues> {
  onCustomSubmit: SubmitHandler<T>;
  form: UseFormReturn<T>;
  children?: React.ReactNode;
}
export function ReusableSearchFilter<T extends FieldValues>({
  onCustomSubmit,
  form,
  children,
}: ReusableFilterProps<T>) {
  const onSubmit: SubmitHandler<T> = (data) => {
    onCustomSubmit(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            {children}
            <button className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent flex items-center">
              <FaSearch style={{ color: "#6bd3b6", fontSize: "1.5rem" }} />
              <span style={{ color: "#10242C" }}></span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
