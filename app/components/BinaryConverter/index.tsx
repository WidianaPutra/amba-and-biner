"use client";

import { useState } from "react";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import Button from "@/app/components/Button";
import type { ConverterConfig } from "./config";
import {
  numberToBinary,
  binaryToNumber,
  textToBinary,
  binaryToText,
} from "@/app/utils/binary-converters";
import { SendToDiscord } from "@/app/utils/send-to-discord";

interface Props {
  config: ConverterConfig;
}

const conversionFunctions = {
  "number-to-binary": numberToBinary,
  "binary-to-number": binaryToNumber,
  "text-to-binary": textToBinary,
  "binary-to-text": binaryToText,
};

export default function ConverterCard({ config }: Props) {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleConvert() {
    setError("");
    setOutput("");
    setCopied(false);

    if (!value.trim()) {
      setError("Please enter a value first.");
      return;
    }

    try {
      const result = conversionFunctions[config.id](value);

      // Tampilkan hasil tanpa menunggu Discord.
      setOutput(result);

      // Kirim log secara asynchronous.
      void SendToDiscord(config.title, value, result).catch(
        (error: unknown) => {
          console.error("Failed to send Discord log:", error);
        },
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Conversion failed.");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setError("Unable to copy to clipboard.");
    }
  }

  function handleClear() {
    setValue("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  return (
    <section
      className="flex min-w-0 flex-col gap-5 rounded-2xl
        border border-neutral-200 bg-white p-5 sm:p-6"
    >
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{config.title}</h2>
        <p className="text-sm text-neutral-500">{config.description}</p>
      </header>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${config.id}-input`} className="text-sm font-medium">
          {config.inputLabel}
        </label>

        <Input
          id={`${config.id}-input`}
          type={config.inputType ?? "text"}
          placeholder={config.placeholder}
          value={value}
          setValue={setValue}
          width="full"
          className="h-11 max-w-none"
          autoComplete="off"
          spellCheck={false}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleConvert();
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleConvert} className="flex-1">
          Convert
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`${config.id}-output`}
            className="text-sm font-medium"
          >
            {config.outputLabel}
          </label>

          {output !== "" && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-neutral-500 hover:text-black"
            >
              {copied ? "Copied!" : "Copy output"}
            </button>
          )}
        </div>

        <TextArea
          id={`${config.id}-output`}
          value={output}
          readOnly
          width="full"
          rows={3}
          placeholder="Result will appear here..."
          className="min-h-24 max-w-none bg-neutral-50 font-mono"
          aria-live="polite"
        />

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
