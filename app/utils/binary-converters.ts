export function numberToBinary(value: string): string {
  const input = value.trim();

  if (!/^-?\d+$/.test(input)) {
    throw new Error("Enter a valid integer.");
  }

  const number = Number(input);

  if (!Number.isSafeInteger(number)) {
    throw new Error("Number exceeds the safe integer range.");
  }

  return number.toString(2);
}

export function binaryToNumber(value: string): string {
  const binary = value.trim();

  if (!/^[01]+$/.test(binary)) {
    throw new Error("Only binary digits (0 and 1) are allowed.");
  }

  return BigInt(`0b${binary}`).toString(10);
}

export function textToBinary(value: string): string {
  const bytes = new TextEncoder().encode(value);

  return Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToText(value: string): string {
  const binary = value.replace(/\s/g, "");

  if (!/^[01]+$/.test(binary)) {
    throw new Error("Only binary digits (0 and 1) are allowed.");
  }

  if (binary.length % 8 !== 0) {
    throw new Error("Binary length must be a multiple of 8 bits.");
  }

  const bytes = new Uint8Array(binary.length / 8);

  for (let i = 0; i < binary.length; i += 8) {
    bytes[i / 8] = Number.parseInt(binary.slice(i, i + 8), 2);
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error("Invalid UTF-8 binary sequence.");
  }
}
