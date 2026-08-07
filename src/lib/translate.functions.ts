import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  lang: z.string().min(2).max(5),
  language: z.string().min(2).max(40),
  texts: z.array(z.string()).min(1).max(80),
});

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { translations: data.texts };

    const prompt = [
      `Translate each string of the JSON array into ${data.language}.`,
      "Context: a pregnancy and baby-care mobile app for Indian mothers.",
      "Rules: keep the same array length and order; preserve numbers, dates, units, emoji, punctuation and placeholders exactly;",
      "keep proper nouns, scheme names, medical test names and abbreviations (ANC, LMP, BP, TSH, PMMVY, EPDS) readable;",
      "translate naturally and warmly, not literally.",
      'Respond ONLY with JSON: {"translations": ["..."]}',
      JSON.stringify(data.texts),
    ].join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) return { translations: data.texts };

    try {
      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const content = json.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(content) as { translations?: unknown };
      const out = Array.isArray(parsed.translations) ? parsed.translations : [];
      if (out.length !== data.texts.length) return { translations: data.texts };
      return { translations: out.map((v, i) => (typeof v === "string" && v.trim() ? v : data.texts[i])) };
    } catch {
      return { translations: data.texts };
    }
  });
