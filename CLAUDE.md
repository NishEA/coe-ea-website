@AGENTS.md

## Skill routing

- Accessibility work (WCAG, aria, keyboard, focus, touch targets) → use `ecc:a11y-architect` subagent
- Verify prod deployment after push → invoke `/deploy-check`
- Accessibility regression scan → invoke `/a11y-sweep`

## GBrain Configuration (configured by /setup-gbrain)
- Mode: local-stdio
- Engine: pglite at C:\Users\Nishant\.gbrain\brain.pglite
- Config file: ~/.gbrain/config.json
- Setup date: 2026-05-31
- MCP registered: yes (user scope) — restart Claude Code to activate mcp__gbrain__* tools
- Artifacts sync: off
- Current repo policy: read-write (https://github.com/NishEA/coe-ea-website.git)
- Embedding: deferred — run: gbrain config set openai_api_key sk-...
- gbrain CLI: ~/bin/gbrain
