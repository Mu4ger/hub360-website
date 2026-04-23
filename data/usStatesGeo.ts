import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import usStates from "us-atlas/states-10m.json";

const topology = usStates as { objects: { states: unknown } };

/** US states + DC as GeoJSON features (WGS84), bundled-no CDN fetch required. */
export const US_STATES_GEO: FeatureCollection = feature(
  usStates as never,
  topology.objects.states as never,
) as FeatureCollection;
