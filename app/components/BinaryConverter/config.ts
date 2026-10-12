export type ConverterType =
  | "number-to-binary"
  | "binary-to-number"
  | "text-to-binary"
  | "binary-to-text";

export interface ConverterConfig {
  id: ConverterType;
  title: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  placeholder: string;
  inputType?: "text" | "number";
}

export const converters: ConverterConfig[] = [
  {
    id: "number-to-binary",
    title: "Number to Binary",
    description: "Convert decimal numbers into binary.",
    inputLabel: "Number",
    outputLabel: "Binary Output",
    placeholder: "Enter a number...",
    inputType: "number",
  },
  {
    id: "binary-to-number",
    title: "Binary to Number",
    description: "Convert binary digits into decimal.",
    inputLabel: "Binary",
    outputLabel: "Decimal Output",
    placeholder: "Enter binary digits...",
  },
  {
    id: "text-to-binary",
    title: "Text to Binary",
    description: "Encode text into UTF-8 binary bytes.",
    inputLabel: "Text",
    outputLabel: "Binary Output",
    placeholder: "Enter your text...",
  },
  {
    id: "binary-to-text",
    title: "Binary to Text",
    description: "Decode UTF-8 binary into readable text.",
    inputLabel: "Binary",
    outputLabel: "Text Output",
    placeholder: "Enter binary bytes...",
  },
];
