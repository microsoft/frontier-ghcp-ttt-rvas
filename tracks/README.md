# Learning Tracks

Pre-defined learning paths that assemble sessions from the GitHub Copilot & Agentic Workflows curriculum into curated tracks based on audience maturity, role, and goals.

## Track Comparison

| Track | Target Audience | Modules | Sessions | Duration | Difficulty |
| ----- | --------------- | ------- | -------- | -------- | ---------- |
| [Copilot Essentials](beginner-essentials.md) | Teams just starting with Copilot | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span></div> | 5 | 15 hrs | Beginner |
| [Developer Productivity](developer-productivity.md) | Individual developers maximizing daily output | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span><span class="ghcp-badge ghcp-badge--module" data-module="7" title="Product and Delivery Teams">m7</span></div> | 9 | 27 hrs | Beginner to Intermediate |
| [Agentic Development](agentic-development.md) | Teams adopting agentic workflows | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span><span class="ghcp-badge ghcp-badge--module" data-module="3" title="Agentic Workflows">m3</span><span class="ghcp-badge ghcp-badge--module" data-module="7" title="Product and Delivery Teams">m7</span></div> | 14 | 42 hrs | Beginner to Advanced |
| [DevOps & Automation](devops-automation.md) | DevOps / Platform engineers | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span><span class="ghcp-badge ghcp-badge--module" data-module="4" title="DevOps &amp; Infrastructure">m4</span></div> | 7 | 21 hrs | Beginner to Advanced |
| [Product and Delivery Teams](product-and-delivery-teams.md) | PMs, POs, BAs, project managers, delivery leads | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="7" title="Product and Delivery Teams">m7</span></div> | 6 | 18 hrs | Beginner to Intermediate |
| [HVE Engineering](hve-engineering.md) | Developers, engineering leads, and HVE trainers | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span><span class="ghcp-badge ghcp-badge--module" data-module="3" title="Agentic Workflows">m3</span><span class="ghcp-badge ghcp-badge--module" data-module="5" title="Specification-Driven Frameworks">m5</span></div> | 10 | 31 hrs | Beginner to Advanced |
| [Full Mastery](full-mastery.md) | Trainers delivering the complete curriculum | <div class="ghcp-track-modules"><span class="ghcp-badge ghcp-badge--module" data-module="1" title="Copilot Fundamentals">m1</span><span class="ghcp-badge ghcp-badge--module" data-module="2" title="Copilot in Practice">m2</span><span class="ghcp-badge ghcp-badge--module" data-module="3" title="Agentic Workflows">m3</span><span class="ghcp-badge ghcp-badge--module" data-module="4" title="DevOps &amp; Infrastructure">m4</span><span class="ghcp-badge ghcp-badge--module" data-module="5" title="Specification-Driven Frameworks">m5</span><span class="ghcp-badge ghcp-badge--module" data-module="6" title="Advanced Topics &amp; Capstone">m6</span><span class="ghcp-badge ghcp-badge--module" data-module="7" title="Product and Delivery Teams">m7</span></div> | 29 | 88 hrs | Beginner to Advanced |

Module colors match the [curriculum map](../README.md). **m2**, for example,
contains sessions whose IDs start with `m2-`.

## How to Choose

```
                                    ┌─ Just starting?
                                    │   → Copilot Essentials (15 hrs)
                                    │
"How experienced is your team?" ────┼─ Using Copilot daily?
                                    │   → Developer Productivity (27 hrs)
                                    │
                                    ├─ Ready for agents?
                                    │   → Agentic Development (42 hrs)
                                    │
                                    ├─ DevOps / Platform focus?
                                    │   → DevOps & Automation (21 hrs)
                                    │
                                    ├─ Product or delivery role?
                                    │   → Product and Delivery Teams (18 hrs)
                                    │
                                    ├─ Adopting HVE Core?
                                    │   → HVE Engineering (31 hrs)
                                    │
                                    └─ Want everything?
                                        → Full Mastery (88 hrs)
```

## Progression Path

Tracks are designed to stack. After completing one track, the natural next step is indicated in each track's "Next Steps" section:

```
Copilot Essentials → Developer Productivity → Agentic Development → Full Mastery
                                                    ↑
                          DevOps & Automation ──────┘
                 Product and Delivery Teams ─────────┘
                            HVE Engineering ──────────┘
```

## Notes for Trainers

- Each track lists exact session numbers and titles: cross-reference with [`curriculum-plan.md`](../curriculum-plan.md) for full session details
- All tracks assume trainees meet the stated prerequisites
- Tracks can be customized by adding or removing sessions based on specific customer needs
- Most sessions use the standard 3-hour format. Session m5-03 uses a 1-hour trainer
  segment and a 3-hour lab.
- Developer Productivity and Agentic Development include Sessions m2-05 and m7-05's
  developer route. Both require live app access; prepared outputs do not complete
  the labs. Session m3-05's interview comparison requires live CLI skill loading.
- Prepare CLI `/refine` before Session m1-03, not after it. Session m2-01 needs local
  sandbox support and checked limit behavior. Session m3-04 needs JavaScript LSP;
  Session m2-06 needs Python LSP. Check the session preflights before scheduling.
- Session m2-05 also requires `/fork`, `/merge-to-parent`, and `/spar`. These app
  commands do not replace the CLI's worktree and recovery exercise.
- Open a session from the [module list](../README.md) for its materials.
