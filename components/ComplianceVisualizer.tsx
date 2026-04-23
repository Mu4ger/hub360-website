"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { Feature, FeatureCollection } from "geojson";
import {
  STATE_BY_NAME,
  STATE_ROWS,
  colorForCap,
  colorForCapDark,
  type StateRow,
} from "@/data/stateCompliance";
import { US_STATES_GEO } from "@/data/usStatesGeo";

type ViewMode = "map" | "table";

function mean(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/** Albers USA — taller canvas + moderate scale so AK/HI insets stay inside the view (no ZoomableGroup: it crashes with this projection in react-simple-maps v3). */
const MAP_W = 975;
const MAP_H = 680;

export function ComplianceVisualizer() {
  const geo: FeatureCollection = US_STATES_GEO;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<StateRow | null>(null);
  const [selected, setSelected] = useState<StateRow | null>(null);
  const [view, setView] = useState<ViewMode>("map");

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

  const stroke = isDark ? "rgba(232, 238, 246, 0.16)" : "rgba(46, 74, 112, 0.2)";
  const fallbackFill = isDark ? "rgba(30, 40, 52, 0.92)" : "rgba(240, 242, 242, 0.95)";

  return (
    <section
      id="compliance-tool"
      className="scroll-mt-28 border-t border-hub-ink/[0.06] bg-hub-mist/35 px-5 py-24 dark:border-white/10 dark:bg-white/[0.03] sm:px-8"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/40 dark:text-white/40">
              Compliance map
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl">
              See posture by state—then replace every figure with yours.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-hub-ink/50 dark:text-white/50">
              Numbers below are scaffolding only. You will import CMS cuts and internal limits when
              you wire production.
            </p>
          </motion.div>
          <a
            href="#contact"
            className="shrink-0 self-start rounded-full border border-hub-ink/12 bg-white px-5 py-2.5 text-sm font-semibold text-hub-ink transition hover:-translate-y-0.5 hover:border-hub-accent/50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-hub-accent/50 lg:self-end"
          >
            Get the data model
          </a>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-hub-ink/[0.07] bg-white p-5 shadow-card dark:border-white/10 dark:bg-[#121a24] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid w-full gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-hub-ink/[0.06] bg-hub-cream/70 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Placeholder · avg cap
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">
                  ${headerStats.avgCap}
                </p>
                <p className="mt-1 text-[11px] text-hub-ink/40 dark:text-white/40">
                  Swap with your policy feed
                </p>
              </div>
              <div className="rounded-2xl border border-hub-ink/[0.06] bg-hub-cream/70 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
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
              <div className="rounded-2xl border border-hub-ink/[0.06] bg-hub-cream/70 px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  Placeholder · CMS lens
                </p>
                <p className="mt-2 text-2xl font-semibold text-hub-ink dark:text-white">—</p>
                <p className="mt-1 text-[11px] text-hub-ink/40 dark:text-white/40">
                  Paste Open Payments totals here
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-1 rounded-full border border-hub-ink/10 bg-hub-mist/70 p-1 dark:border-white/10 dark:bg-white/5">
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

          <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_300px]">
            <div className="relative min-h-[min(72vh,820px)] w-full overflow-auto rounded-2xl border border-hub-ink/[0.06] bg-gradient-to-b from-[#f3f9fc] to-[#e4f2f9] dark:border-white/10 dark:from-[#152030] dark:to-[#0f1824]">
              <AnimatePresence mode="wait">
                {view === "map" ? (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex min-h-[min(72vh,820px)] w-full items-center justify-center p-4 sm:p-8"
                  >
                    <ComposableMap
                      projection="geoAlbersUsa"
                      width={MAP_W}
                      height={MAP_H}
                      className="mx-auto w-full max-w-full [&>svg]:h-auto [&>svg]:max-h-[min(72vh,820px)] [&>svg]:w-full [&>svg]:max-w-full"
                      projectionConfig={{ scale: 920 }}
                    >
                      <Geographies geography={geo}>
                        {({ geographies }) =>
                          geographies.map((g) => {
                            const row = lookupRow(g as unknown as Feature);
                            const fill = row
                              ? isDark
                                ? colorForCapDark(row.demoPerPersonCapUsd)
                                : colorForCap(row.demoPerPersonCapUsd)
                              : fallbackFill;
                            return (
                              <Geography
                                key={g.rsmKey}
                                geography={g}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={0.55}
                                aria-label={row ? `${row.name}` : undefined}
                                onMouseEnter={() => row && setHovered(row)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() =>
                                  row && setSelected((s) => (s?.abbr === row.abbr ? null : row))
                                }
                                style={{
                                  default: { outline: "none" },
                                  hover: { outline: "none", filter: isDark ? "brightness(1.12)" : "brightness(0.96)" },
                                  pressed: { outline: "none" },
                                }}
                                className={row ? "cursor-pointer" : "cursor-default"}
                              />
                            );
                          })
                        }
                      </Geographies>
                    </ComposableMap>
                    <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-hub-ink/50 dark:text-white/45">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold uppercase tracking-wide">Demo cap spread</span>
                        <span className="rounded-full border border-hub-ink/10 bg-white/95 px-2.5 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                          ${headerStats.minCap}
                        </span>
                        <span className="opacity-40">→</span>
                        <span className="rounded-full border border-hub-ink/10 bg-white/95 px-2.5 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                          ${headerStats.maxCap}
                        </span>
                      </div>
                      <span className="rounded-full border border-hub-ink/10 bg-white/95 px-2.5 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
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
                    className="max-h-[min(72vh,820px)] overflow-auto"
                  >
                    <table className="min-w-full border-collapse text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-[#e8f3fa] text-[11px] uppercase tracking-wide text-hub-ink/50 dark:bg-[#1a2838] dark:text-white/45">
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
                        {STATE_ROWS.map((row) => (
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
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <aside className="flex flex-col justify-between rounded-2xl border border-hub-ink/[0.06] bg-hub-cream/60 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                  State focus
                </p>
                {active ? (
                  <div className="mt-4 space-y-5">
                    <div>
                      <p className="text-xl font-semibold text-hub-ink dark:text-white">{active.name}</p>
                      <p className="text-sm text-hub-ink/45 dark:text-white/45">{active.abbr}</p>
                    </div>
                    <div className="space-y-3 rounded-2xl border border-hub-ink/[0.06] bg-white p-4 dark:border-white/10 dark:bg-[#0f141c]">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                        Placeholder cap
                      </p>
                      <p className="text-2xl font-semibold text-hub-ink dark:text-white">
                        ${active.demoPerPersonCapUsd}
                      </p>
                    </div>
                    <div className="space-y-3 rounded-2xl border border-hub-ink/[0.06] bg-white p-4 dark:border-white/10 dark:bg-[#0f141c]">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-hub-ink/45 dark:text-white/45">
                        Placeholder F&B / txn
                      </p>
                      <p className="text-2xl font-semibold text-hub-ink dark:text-white">
                        ${active.modeledAvgFnbPerTxnUsd}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-hub-ink/50 dark:text-white/50">
                    Hover the map—or pin a state—to preview the panel your reps will rely on.
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
          </div>
        </div>
      </div>
    </section>
  );
}
