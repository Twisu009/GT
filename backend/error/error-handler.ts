import { NextApiResponse } from "next";
import { CustomError } from "./error";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export function handleError(error: any) {
  if (error instanceof CustomError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    );
  } else if (error instanceof ZodError) {
    const validationErrors = error.errors.map((err) => err.message);
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        validationErrors,
      },
      { status: 400 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
