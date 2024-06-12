import { ZodIssue } from "zod";


//this create a ActionResult data type that will accept the output data type same as the input/
//when status is success and accepts an output type or string or ZodIssue when ataus is error
type ActionResult<T> = 
{status: "success", data:T} | {status: "error", error: string |ZodIssue[]}
