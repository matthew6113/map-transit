# Bay Area transit map. `make help` lists the targets.

PY = uv run --directory pipeline python -m

.PHONY: help tools basemap basemap-refresh future-sync present-preview app-data data dev build test e2e screenshots perf

help:
	@echo "make basemap          Copy BAM's built basemap into public/generated/ and check it against basemap.lock.json"
	@echo "make basemap-refresh  Re-read BAM's deployed basemap and rewrite the lock (review the diff)"
	@echo "make future-sync      Import BAM's future lines at the pinned commit (data/future/bam/)"
	@echo "make present-preview  Today's BART lines from BART's public GTFS (data/present/bart/); Phase 1 adds 511"
	@echo "make app-data         Build the files the app reads (data/app/) from data/<era>/"
	@echo "make data             future-sync, present-preview and app-data"
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

present-preview: tools
	$(PY) transit_pipeline.gtfs

app-data: tools
	$(PY) transit_pipeline.build

data: future-sync present-preview app-data

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
