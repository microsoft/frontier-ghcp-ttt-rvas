<!-- markdownlint-disable-file -->

# HVE spec-driven challenge planning log

## Selected path

Use a full optional session plus a dedicated track. Build an original Engineering
Decision API challenge from the source workflow facts. Do not copy source demo
text or templates.

## Alternatives

* Session 18 extension: rejected because the lab already fills 120 minutes.
* Track-only artifact: rejected because tracks assemble sessions and do not own
  standard challenge assets.
* Session 19 Bookmark API reuse: rejected because it would repeat the capstone.

## Discrepancies

* The source README describes the showcase as MIT, but the checkout has no
  repository-level license. The implementation uses original wording and code.
* The integration research initially proposed reusing Session 19 assets. The
  final design uses a new API to keep Session 20 distinct.
* Local JavaScript, Python, and .NET package downloads are prohibited. Validation
  used existing dependencies and ACR run `dth` with `--no-push`.
* The Docker Hub Node images reported high or critical vulnerabilities in the
  local scanner. The final image uses Microsoft Azure Linux Node 24.21, which
  cleared those findings and built successfully in ACR.
* Full Python tests, Markdown lint, and strict MkDocs remain blocked because no
  installed environment contains their complete dependency sets.

## Follow-up candidates

* Confirm the HVE showcase content license with its owner.
* Verify named HVE commands against the extension version used during delivery.
* Decide whether the optional HVE specialization is required for trainer
  certification.
* Run the blocked documentation and site checks in the normal CI environment.