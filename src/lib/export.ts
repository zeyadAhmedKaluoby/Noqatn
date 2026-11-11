/** Client-side CSV download (opens in Excel). */

export function downloadCsv(filename: string, rows: string[][]) {
  const escape = (value: string) => {
    const text = value.replace(/"/g, '""');
    return /[",\n]/.test(text) ? `"${text}"` : text;
  };
  const body = rows.map((row) => row.map((cell) => escape(String(cell ?? ""))).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${body}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}
