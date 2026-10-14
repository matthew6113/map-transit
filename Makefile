# Bay Area transit map. `make help` lists the targets.

PY = uv run --directory pipeline python -m

.PHONY: help tools basemap basemap-refresh future-sync present present-refresh past past-review checklists app-data data dev build test e2e screenshots perf

help:
	@echo "make basemap          Copy BAM's built basemap into public/generated/ and check it against basemap.lock.json"
	@echo "make basemap-refresh  Re-read BAM's deployed basemap and rewrite the lock (review the diff)"
	@echo "make future-sync      Import BAM's future lines at the pinned commit (data/future/bam/)"
	@echo "make present          Today's network from GTFS (511 needs TRANSIT_511_API_KEY in .env or the environment), BRT lanes from OpenStreetMap"
	@echo "make present-refresh  The same, downloading every feed again"
	@echo "make past             Past-era geometry from its recipes (data/past/*/trace.json): USGS sheets, today's streets"
	@echo "make past-review      The same, drawing each traced feature over its map into docs/screenshots/p2a/traces/"
	@echo "make checklists       Matthew's review lists for the past era (book pages, traced geometry, conflicts): docs/checks/past.md"
	@echo "make app-data         Build the files the app reads (data/app/) from data/<era>/"
	@echo "make data             future-sync, present, past and app-data"
	@echo "make dev              Dev server on http://127.0.0.1:5173 (proxies BAM's basemap without make basemap)"
	@echo "make test             Data rules, schemas and theme contrast (Vitest)"
	@echo "make e2e              Playwright interaction tests"
	@echo "make screenshots      Playwright screenshots of key views into docs/screenshots/p0/"
	@echo "make perf             Year-slider rendering spike (synthetic features, 4x CPU slowdown)"

tools:
	@command -v uv >/dev/null || (echo "Missing uv: https://docs.astral.sh/uv/" && exit 1)
	@command -v node >/dev/null || (echo "Missing Node 22+" && exit 1)
	@uv sync --directory pipeline --quiet
	@test -d node_modules || npm install

basemap: tools
	$(PY) transit_pipeline.basemap fetch

basemap-refresh: tools
	$(PY) transit_pipeline.basemap refresh

future-sync: tools
	$(PY) transit_pipeline.bam_sync

present: tools
	$(PY) transit_pipeline.gtfs

present-refresh: tools
	$(PY) transit_pipeline.gtfs --refresh

past: tools
	$(PY) transit_pipeline.usgs_topo fetch
	$(PY) transit_pipeline.streets register
	$(PY) transit_pipeline.past

past-review: past
	$(PY) transit_pipeline.past --review ../docs/screenshots/p2a/traces
	$(PY) transit_pipeline.checklists

checklists: tools
	$(PY) transit_pipeline.checklists

app-data: tools
	$(PY) transit_pipeline.build

data: future-sync present past app-data

dev:
	npx vite --host 127.0.0.1

build:
	npm run build

test:
	npm test

e2e:
	npm run e2e

screenshots:
	npm run screenshots

perf:
	npm run perf
