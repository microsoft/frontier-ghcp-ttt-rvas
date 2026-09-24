import argparse
from pathlib import Path

from .reporting import write_outputs
from .service import reconcile


def build_parser() -> argparse.ArgumentParser:
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
