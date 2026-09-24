import argparse
from pathlib import Path

from .service import reconcile
# IMP-01: the package contains reporting.py, not report.py.
from .report import write_outputs


# SYN-01: this function definition is missing its colon.
def build_parser() -> argparse.ArgumentParser
    parser = argparse.ArgumentParser(
        description="Reconcile physical warehouse counts with ledger quantities."
    )
    parser.add_argument("--warehouse", type=Path, required=True)
    parser.add_argument("--ledger", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    items = reconcile(args.warehouse, args.ledger)
    write_outputs(items, args.output_dir)
    print(f"Wrote {len(items)} reconciled SKU records to {args.output_dir}")
    return 0
