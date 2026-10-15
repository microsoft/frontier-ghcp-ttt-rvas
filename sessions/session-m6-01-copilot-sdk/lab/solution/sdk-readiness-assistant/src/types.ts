export type ChangeRisk = "low" | "medium" | "high";

export interface ChangeRequest {
  id: string;
  service: string;
  owner: string;
  plannedWindow: string;
  risk: ChangeRisk;
  rollbackPlan: string;
  approvals: string[];
  checks: {
    testsPassing: boolean;
    monitoringReady: boolean;
    rollbackRehearsed: boolean;
  };
}

export type LookupResult =
  | {
      ok: true;
      change: ChangeRequest;
      readiness: "ready" | "needs-review";
      gaps: string[];
    }
  | {
      ok: false;
      code: "invalid-input" | "not-found";
      message: string;
    };
