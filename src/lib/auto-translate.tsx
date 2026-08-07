import * as React from "react";
import { useI18n } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/languages";
import { translateBatch } from "@/lib/translate.functions";

/**
 * Whole-app translation layer.
 *
 * Every rendered string (cards, carousels, long-form content, placeholders,
 * aria-labels) is translated into the selected language and cached in
 * localStorage, so the entire app  -  not just the keyed UI strings  -  follows
 * the user's language choice.
 */

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "SVG", "PATH"]);
const HAS_LETTER = /[A-Za-z]{2}/;
const MAX_BATCH = 40;

const cacheKey = (lang: string) => `maatri_tr_${lang}`;

function loadCache(lang: string): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(cacheKey(lang)) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function saveCache(lang: string, cache: Record<string, string>) {
  try {
    localStorage.setItem(cacheKey(lang), JSON.stringify(cache));
  } catch {
    /* quota  -  ignore */
  }
}

function translatable(s: string) {
  const t = s.trim();
  return t.length > 1 && t.length < 900 && HAS_LETTER.test(t);
}

export function AutoTranslate({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();
  const langRef = React.useRef(lang);
  langRef.current = lang;

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (lang === "en") {
      // restore originals rendered by React on next paint
      return;
    }

    const languageName = LANGUAGES.find((l) => l.code === lang)?.english ?? "English";
    const cache = loadCache(lang);
    const pending = new Set<string>();
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let flushTimer: ReturnType<typeof setTimeout> | null = null;

    const applyNode = (node: Text) => {
      const raw = node.nodeValue ?? "";
      if (!translatable(raw)) return;
      const key = raw.trim();
      if (key in cache) {
        const hit = cache[key];
        if (hit && hit !== key) node.nodeValue = raw.replace(key, hit);
        return;
      }
      pending.add(key);
    };

    const applyAttr = (el: Element, attr: string) => {
      const raw = el.getAttribute(attr);
      if (!raw || !translatable(raw)) return;
      const key = raw.trim();
      if (key in cache) {
        const hit = cache[key];
        if (hit && hit !== key) el.setAttribute(attr, hit);
        return;
      }
      pending.add(key);
    };

    const scan = () => {
      if (cancelled) return;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = (node as Text).parentElement;
          if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let n = walker.nextNode();
      while (n) {
        applyNode(n as Text);
        n = walker.nextNode();
      }
      document.body.querySelectorAll("[placeholder]").forEach((el) => applyAttr(el, "placeholder"));
      document.body.querySelectorAll("[aria-label]").forEach((el) => applyAttr(el, "aria-label"));

      if (pending.size && !flushTimer) flushTimer = setTimeout(flush, 120);
    };

    const flush = async () => {
      flushTimer = null;
      if (cancelled || !pending.size) return;
      const batch = Array.from(pending).slice(0, MAX_BATCH);
      batch.forEach((b) => pending.delete(b));
      // mark as in-flight so we don't re-request
      batch.forEach((b) => {
        if (!cache[b]) cache[b] = "";
      });
      try {
        const res = await translateBatch({ data: { lang, language: languageName, texts: batch } });
        if (cancelled || langRef.current !== lang) return;
        batch.forEach((src, i) => {
          cache[src] = res.translations[i] ?? src;
        });
        saveCache(lang, cache);
        scan();
      } catch {
        batch.forEach((b) => {
          if (cache[b] === "") delete cache[b];
        });
      }
      if (pending.size && !flushTimer) flushTimer = setTimeout(flush, 200);
    };

    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(scan, 200);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    schedule();

    return () => {
      cancelled = true;
      observer.disconnect();
      if (timer) clearTimeout(timer);
      if (flushTimer) clearTimeout(flushTimer);
    };
  }, [lang]);

  return <>{children}</>;
}
