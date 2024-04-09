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
          <div className="flex justify-center mt-20">
            {children}
            <button className="bg-transparent text-teal-950 font-semibold py-2 px-4 transition-colors duration-300 hover:text-teal-400">
              <FaSearch style={{ fontSize: "1.5rem" }} />
              <span style={{ color: "#10242C" }}></span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
