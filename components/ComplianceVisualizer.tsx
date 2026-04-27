"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { Feature, FeatureCollection } from "geojson";
import {
  STATE_BY_NAME,
  STATE_ROWS,
  type StateRow,
} from "@/data/stateCompliance";
import { US_STATES_GEO } from "@/data/usStatesGeo";

type ViewMode = "map" | "table";

function mean(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function hashSeed(value: string) {
  return value.split("").reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 7), 0);
}

/** Albers USA - taller canvas + moderate scale so AK/HI insets stay inside the view (no ZoomableGroup: it crashes with this projection in react-simple-maps v3). */
const MAP_W = 975;
const MAP_H = 680;

export function ComplianceVisualizer() {
  const geo: FeatureCollection = US_STATES_GEO;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<StateRow | null>(null);
  const [selected, setSelected] = useState<StateRow | null>(() => STATE_BY_NAME.get("california") ?? null);
  const [view, setView] = useState<ViewMode>("map");
  const [tableQuery, setTableQuery] = useState("");

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const active = hovered ?? selected;

  const headerStats = useMemo(() => {
    const caps = STATE_ROWS.map((s) => s.demoPerPersonCapUsd);
    const modeled = STATE_ROWS.map((s) => s.modeledAvgFnbPerTxnUsd);
    return {
      avgCap: Math.round(mean(caps)),
      avgModeledFnb: Math.round(mean(modeled)),
      minCap: Math.min(...caps),
      maxCap: Math.max(...caps),
    };
  }, []);

  const lookupRow = useCallback((geoFeat: Feature) => {
    const name = (geoFeat.properties as { name?: string } | null)?.name;
    if (!name) return undefined;
    return STATE_BY_NAME.get(name.toLowerCase());
  }, []);

  const filteredRows = useMemo(() => {
    const q = tableQuery.trim().toLowerCase();
    if (!q) return STATE_ROWS;
    return STATE_ROWS.filter((row) => row.name.toLowerCase().includes(q) || row.abbr.toLowerCase().includes(q));
  }, [tableQuery]);
  const statCardClass =
    "hub-glass hover-pop rounded-2xl px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md";
  const defaultActive = selected ?? STATE_BY_NAME.get("california") ?? null;
  const detail = active ?? defaultActive;
  const perf = useMemo(() => {
    if (!detail) return 92.4;
    const span = Math.max(1, headerStats.maxCap - headerStats.minCap);
    const normalized = (detail.demoPerPersonCapUsd - headerStats.minCap) / span;
    // Use a wider visual range so each selected state is noticeably different.
    return Math.min(99.9, Math.max(72, 72 + normalized * 27.5));
  }, [detail, headerStats.maxCap, headerStats.minCap]);
  const region =
    detail?.abbr === "CA"
      ? "West Coast"
      : detail?.abbr === "NY"
        ? "North East"
        : detail?.abbr === "TX"
          ? "South Central"
          : "National";
  const stateSeed = detail ? hashSeed(detail.abbr + detail.name) : 101;
  const stateAvgCap = detail ? detail.demoPerPersonCapUsd : headerStats.avgCap;
  const activeAudits = 8 + (stateSeed % 14);
  const criticalAudits = Math.min(4, Math.max(0, Math.floor((stateSeed % 9) / 3)));
  const firstNames = [
    "Sarah",
    "David",
    "Priya",
    "Jordan",
    "Mina",
    "Alex",
    "Ravi",
    "Olivia",
    "Noah",
    "Emma",
  ];
  const lastNames = ["Jenkins", "Chen", "Patel", "Walker", "Reed", "Brooks", "Singh", "Nguyen", "Garcia", "Lee"];
  const contributorA = `${firstNames[stateSeed % firstNames.length]} ${lastNames[(stateSeed + 2) % lastNames.length]}`;
  const contributorB = `${firstNames[(stateSeed + 4) % firstNames.length]} ${lastNames[(stateSeed + 6) % lastNames.length]}`;
  const contributorAPerf = Math.min(99.9, Math.max(90, perf + 0.9));
  const contributorBPerf = Math.min(99.9, Math.max(89, perf + 0.4));

  const toneForCap = (cap: number) => {
    const denom = Math.max(1, headerStats.maxCap - headerStats.minCap);
    const t = (cap - headerStats.minCap) / denom;
    return isDark ? 33 + t * 26 : 58 + t * 20;
  };

  return (
    <section
      id="compliance-tool"
      className="section-y hub-ambient-bg scroll-mt-28 w-full border-t border-hub-ink/[0.06] px-5 dark:border-white/10 sm:px-8 lg:px-10 xl:px-12"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/40 dark:text-white/40">
              Live monitoring
            </p>
            <h2 className="mt-3 text-[clamp(2.15rem,4vw,3.5rem)] font-semibold tracking-[-0.03em] text-hub-ink dark:text-white">
              See posture by state-then replace every figure with yours.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-hub-ink/50 dark:text-white/50">
              Numbers below are scaffolding only. You will import CMS cuts and internal limits when
              you wire production.
            </p>
          </motion.div>
        </div>

        <div className="hub-glass-strong mt-10 rounded-[2rem] p-5 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className={statCardClass}>
                <span className="inline-flex h-8 w-8 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M10 3l5.6 2.2v4.2c0 3.3-2.2 5.3-5.6 7-3.4-1.7-5.6-3.7-5.6-7V5.2L10 3z" stroke="currentColor" strokeWidth="1.7"/></svg>
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Placeholder · avg cap
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">
                  ${stateAvgCap}
                </p>
                <p className="mt-1 text-[11px] text-hub-ink/40 dark:text-white/40">
                  {detail ? `${detail.name} selected` : "Swap with your policy feed"}
                </p>
              </div>
              <div className={statCardClass}>
                <span className="inline-flex h-8 w-8 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><rect x="3.8" y="4" width="12.4" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M7 8h6M7 11h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Placeholder · avg F&B / txn
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">
                  ${headerStats.avgModeledFnb}
                </p>
                <p className="mt-1 text-[11px] text-hub-ink/40 dark:text-white/40">
                  Synthetic until your CMS join
                </p>
              </div>
              <div className={statCardClass}>
                <span className="inline-flex h-8 w-8 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M3 13.2h2.8l2.2-3.7 2.4 4.3 2.2-3h4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Active audits
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">{activeAudits}</p>
                <p className="mt-1 text-[11px] text-rose-500">{criticalAudits} Critical</p>
              </div>
              <div className={statCardClass}>
                <span className="inline-flex h-8 w-8 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M4 10.4l3.3 3.3L16 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Certifications
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">152</p>
                <p className="mt-1 text-[11px] text-hub-ink/40 dark:text-white/40">Valid</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-1 rounded-full border border-hub-ink/10 bg-white p-1 dark:border-white/10 dark:bg-[var(--hub-dark-1)]">
              <button
                type="button"
                onClick={() => setView("map")}
                className={
                  view === "map"
                    ? "rounded-full bg-hub-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white dark:bg-hub-accent dark:text-hub-ink"
                    : "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-hub-ink/50 hover:text-hub-ink dark:text-white/45 dark:hover:text-white"
                }
              >
                Map
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                className={
                  view === "table"
                    ? "rounded-full bg-hub-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white dark:bg-hub-accent dark:text-hub-ink"
                    : "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide text-hub-ink/50 hover:text-hub-ink dark:text-white/45 dark:hover:text-white"
                }
              >
                Table
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px] 2xl:grid-cols-[1fr_360px]">
            <div className="hub-glass hover-pop relative min-h-[min(72vh,900px)] w-full overflow-auto rounded-3xl p-3 dark:bg-black/20">
              <AnimatePresence mode="wait">
                {view === "map" ? (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative flex min-h-[min(72vh,900px)] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#2d3133] p-4 sm:p-8"
                  >
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                      Geographical risk assessment
                    </div>
                    <ComposableMap
                      projection="geoAlbersUsa"
                      width={MAP_W}
                      height={MAP_H}
                      className="mx-auto w-full max-w-full [&>svg]:h-auto [&>svg]:max-h-[min(72vh,900px)] [&>svg]:w-full [&>svg]:max-w-full"
                      projectionConfig={{ scale: 920 }}
                    >
                      <Geographies geography={geo}>
                        {({ geographies }) =>
                          geographies.map((g) => {
                            const row = lookupRow(g as unknown as Feature);
                            const fill = row
                              ? `hsl(0 0% ${toneForCap(row.demoPerPersonCapUsd)}%)`
                              : isDark
                                ? "hsl(0 0% 30%)"
                                : "hsl(0 0% 70%)";
                            return (
                              <Geography
                                key={g.rsmKey}
                                geography={g}
                                fill={fill}
                                stroke="rgba(255,255,255,0.52)"
                                strokeWidth={0.75}
                                aria-label={row ? `${row.name}` : undefined}
                                onMouseEnter={() => row && setHovered(row)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() =>
                                  row && setSelected((s) => (s?.abbr === row.abbr ? null : row))
                                }
                                style={{ default: { outline: "none" }, hover: { outline: "none", filter: "brightness(1.06)" }, pressed: { outline: "none" } }}
                                className={row ? "cursor-pointer" : "cursor-default"}
                              />
                            );
                          })
                        }
                      </Geographies>
                    </ComposableMap>
                    <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/70">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold uppercase tracking-wide">Demo cap spread</span>
                        <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 shadow-sm">
                          ${headerStats.minCap}
                        </span>
                        <span className="opacity-40">→</span>
                        <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 shadow-sm">
                          ${headerStats.maxCap}
                        </span>
                      </div>
                      <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 shadow-sm">
                        Hover · click to pin
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-[min(72vh,900px)] overflow-auto"
                  >
                    <div className="sticky top-0 z-20 border-b border-hub-ink/10 bg-[var(--hub-blue-1)] px-4 py-3 dark:border-white/10 dark:bg-[var(--hub-dark-1)]">
                      <label htmlFor="state-search" className="sr-only">
                        Search states
                      </label>
                      <input
                        id="state-search"
                        type="search"
                        value={tableQuery}
                        onChange={(e) => setTableQuery(e.target.value)}
                        placeholder="Search state or abbreviation (e.g. Texas, TX)"
                        className="w-full rounded-xl border border-hub-ink/12 bg-white px-3 py-2 text-sm text-hub-ink placeholder:text-hub-ink/40 focus:border-hub-accent/50 focus:outline-none focus:ring-2 focus:ring-hub-accent/30 dark:border-white/12 dark:bg-[var(--hub-dark-2)] dark:text-white dark:placeholder:text-white/35"
                      />
                    </div>
                    <table className="min-w-full border-collapse text-left text-sm">
                      <thead className="sticky top-[61px] z-10 bg-[var(--hub-blue-1)] text-[11px] uppercase tracking-wide text-hub-ink/50 dark:bg-[var(--hub-dark-1)] dark:text-white/45">
                        <tr>
                          <th className="border-b border-hub-ink/10 px-4 py-3 font-semibold dark:border-white/10">
                            State
                          </th>
                          <th className="border-b border-hub-ink/10 px-4 py-3 font-semibold dark:border-white/10">
                            Placeholder cap
                          </th>
                          <th className="border-b border-hub-ink/10 px-4 py-3 font-semibold dark:border-white/10">
                            Placeholder F&B
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRows.map((row) => (
                          <tr
                            key={row.abbr}
                            className="border-b border-hub-ink/[0.04] hover:bg-white/80 dark:border-white/[0.06] dark:hover:bg-white/[0.04]"
                          >
                            <td className="px-4 py-3 font-medium text-hub-ink dark:text-white">
                              {row.name}{" "}
                              <span className="text-hub-ink/35 dark:text-white/35">({row.abbr})</span>
                            </td>
                            <td className="px-4 py-3 text-hub-ink/65 dark:text-white/60">
                              ${row.demoPerPersonCapUsd}
                            </td>
                            <td className="px-4 py-3 text-hub-ink/65 dark:text-white/60">
                              ${row.modeledAvgFnbPerTxnUsd}
                            </td>
                          </tr>
                        ))}
                        {filteredRows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="px-4 py-8 text-center text-sm text-hub-ink/55 dark:text-white/55"
                            >
                              No states found for &quot;{tableQuery}&quot;.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
            <aside className="hub-glass hover-pop flex flex-col justify-between rounded-3xl p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/[0.04]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  State focus
                </p>
                {detail ? (
                  <div className="mt-4 space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-3xl font-semibold tracking-tight text-hub-ink dark:text-white">{detail.name}</p>
                        <p className="text-sm text-hub-ink/45 dark:text-white/45">Region: {region}</p>
                      </div>
                      <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white dark:bg-white dark:text-black">
                        Focus
                      </span>
                    </div>
                    <div className="hub-glass rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                          CAP Performance
                        </p>
                        <p className="text-sm font-semibold text-hub-ink dark:text-white">{perf.toFixed(1)}%</p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-hub-ink/10 dark:bg-white/10">
                        <div className="h-full rounded-full bg-black dark:bg-white" style={{ width: `${perf}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="hub-glass rounded-2xl p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-hub-ink/40 dark:text-white/40">
                          F&B Total
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-hub-ink dark:text-white">
                          ${detail.modeledAvgFnbPerTxnUsd.toFixed(1)}k
                        </p>
                      </div>
                      <div className="hub-glass rounded-2xl p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-hub-ink/40 dark:text-white/40">
                          REP Count
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-hub-ink dark:text-white">
                          {300 + detail.demoPerPersonCapUsd}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                        Top contributors
                      </p>
                      <div className="flex items-center justify-between rounded-xl px-1 py-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-hub-blue-1 text-xs font-semibold text-hub-ink">
                            {contributorA
                              .split(" ")
                              .map((x) => x[0])
                              .join("")}
                          </span>
                          <span className="text-sm text-hub-ink/80 dark:text-white/80">{contributorA}</span>
                        </div>
                        <span className="text-sm font-semibold text-hub-ink dark:text-white">
                          {contributorAPerf.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl px-1 py-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-hub-blue-1 text-xs font-semibold text-hub-ink">
                            {contributorB
                              .split(" ")
                              .map((x) => x[0])
                              .join("")}
                          </span>
                          <span className="text-sm text-hub-ink/80 dark:text-white/80">{contributorB}</span>
                        </div>
                        <span className="text-sm font-semibold text-hub-ink dark:text-white">
                          {contributorBPerf.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 dark:bg-white dark:text-black"
                    >
                      Download Regional Report
                    </a>
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-hub-ink/50 dark:text-white/50">
                    Hover the map-or pin a state-to preview the panel your reps will rely on.
                  </p>
                )}
              </div>
              <p className="mt-8 text-[11px] leading-relaxed text-hub-ink/40 dark:text-white/40">
                Official aggregates:{" "}
                <a
                  className="font-medium text-hub-ink underline decoration-hub-accent/50 underline-offset-2 dark:text-hub-accent"
                  href="https://openpaymentsdata.cms.gov/"
                  target="_blank"
                  rel="noreferrer"
                >
                  openpaymentsdata.cms.gov
                </a>
                .
              </p>
            </aside>
            <div className="hub-dark-panel hover-pop rounded-3xl p-5 text-white">
              <p className="text-sm font-semibold text-white">Change log</p>
              <p className="mt-1 text-xs text-white/70">Last update 14m ago</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
