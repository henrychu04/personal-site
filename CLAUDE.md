# Claude Code Configuration

## Tool Hierarchy: Prefer Enhanced Tools

**CRITICAL:** Never use base Claude Code tools when equivalent functionality exists in Serena, TLDR, or Continuous-Claude. These enhanced tools provide better token efficiency, semantic understanding, and workflow integration.

---

## Tool Replacement Matrix

| Base Claude Code Tool | NEVER Use For | USE INSTEAD |
|----------------------|---------------|-------------|
| `Grep` | Code pattern search | `tldr search`, `mcp__serena__search_for_pattern`, `mcp__serena__find_symbol` |
| `Glob` | Finding files | `tldr tree`, `mcp__serena__find_file`, `mcp__serena__list_dir` |
| `Read` | Reading code files | `mcp__serena__find_symbol` with `include_body=True`, `mcp__serena__get_symbols_overview` |
| `Edit` | Editing code | `mcp__serena__replace_symbol_body`, `mcp__serena__insert_after_symbol`, `mcp__serena__insert_before_symbol` |
| `Task` with `Explore` | Codebase exploration | `tldr structure`, `tldr arch`, `mcp__serena__get_symbols_overview` |
| `Task` for research | External research | Use `/research-external` skill or `oracle` agent |
| Manual agent spawning | Complex workflows | Use workflow skills: `/fix`, `/review`, `/refactor` |

---

## Serena: LSP-Based Semantic Tools

### Core Symbol Operations

```
# Find any symbol by name
mcp__serena__find_symbol(name_path="symbol_name", include_body=True)

# Find class method (use / for nesting)
mcp__serena__find_symbol(name_path="ClassName/method_name", include_body=True)

# Get file overview without reading entire file
mcp__serena__get_symbols_overview(relative_path="src/file.py", depth=1)

# Find all references to a symbol
mcp__serena__find_referencing_symbols(name_path="function_name", relative_path="src/file.py")

# Rename symbol across entire codebase
mcp__serena__rename_symbol(name_path="old_name", new_name="new_name", relative_path="src/file.py")
```

### Symbol Editing

```
# Replace entire function/method body
mcp__serena__replace_symbol_body(name_path="Class/method", body="new code", relative_path="src/file.py")

# Add code after a symbol
mcp__serena__insert_after_symbol(name_path="existing_func", body="new code", relative_path="src/file.py")

# Add code before a symbol (imports, etc)
mcp__serena__insert_before_symbol(name_path="first_symbol", body="import x", relative_path="src/file.py")
```

### Serena Memory System (Project-Specific Notes)

```
# List all project memories
mcp__serena__list_memories()

# Write a memory (persistent project notes)
mcp__serena__write_memory(memory_file_name="architecture-decisions.md", content="...")

# Read a memory
mcp__serena__read_memory(memory_file_name="architecture-decisions.md")

# Edit a memory
mcp__serena__edit_memory(memory_file_name="notes.md", needle="old text", repl="new text", mode="literal")

# Delete a memory
mcp__serena__delete_memory(memory_file_name="outdated.md")
```

**Use Serena memories for:** Project-specific decisions, architecture notes, conventions, gotchas.

### Serena Onboarding (First-Time Project Analysis)

```
# Check if project has been onboarded
mcp__serena__check_onboarding_performed()

# If not, run onboarding to analyze project structure
mcp__serena__onboarding()
```

**Always run onboarding when starting work on a new project.**

### Serena Thinking Tools (Reflection Points)

```
# After gathering information - reflect on what you found
mcp__serena__think_about_collected_information()

# Before making edits - ensure you're on track
mcp__serena__think_about_task_adherence()

# When you believe task is complete - verify
mcp__serena__think_about_whether_you_are_done()
```

**Use these at natural breakpoints to maintain focus and quality.**

### Pattern Search with Filters

```
# Search with glob filters
mcp__serena__search_for_pattern(
  substring_pattern="def process.*",
  relative_path="src/",
  paths_include_glob="*.py",
  paths_exclude_glob="*test*",
  context_lines_before=2,
  context_lines_after=2
)
```

---

## TLDR: 5-Layer Code Analysis

### The 5 Layers

| Layer | Tool | What It Shows |
|-------|------|---------------|
| L1: AST | `tldr structure` | Functions, classes, signatures |
| L2: Call Graph | `tldr calls`, `tldr impact` | Cross-file dependencies |
| L3: Control Flow | `tldr cfg` | Branches, loops, complexity |
| L4: Data Flow | `tldr dfg` | How variables move through code |
| L5: Program Slicing | `tldr slice` | What affects a specific line |

### Structure & Architecture

```bash
# See project file tree
tldr tree src/ --ext .py

# Get code structure (functions, classes, methods)
tldr structure src/ --lang python

# Detect architectural layers (entry/middle/leaf)
tldr arch src/
```

### Call Graph & Impact Analysis

```bash
# Cross-file call graph
tldr calls src/

# Who calls this function? (reverse call graph)
tldr impact function_name src/ --depth 3

# Find dead/unreachable code
tldr dead src/ --entry main cli
```

### Flow Analysis (Understanding Complex Code)

```bash
# Control flow graph - see branches, loops
tldr cfg src/processor.py complex_function

# Data flow - track how variables move
tldr dfg src/processor.py complex_function

# Program slice - what affects line 42?
tldr slice src/processor.py my_func 42
```

### Context Generation (For LLM Prompts)

```bash
# Generate LLM-ready context for a function
tldr context authenticate --project src/ --depth 2
```

**Use this to get focused context instead of reading entire files.**

### Import Analysis

```bash
# What does this file import?
tldr imports src/main.py

# Who imports this module?
tldr importers my_module src/
```

### Quality & Testing

```bash
# Type check + lint (pyright/ruff)
tldr diagnostics src/

# Find tests affected by changes
tldr change-impact src/changed_file.py

# Actually run affected tests
tldr change-impact src/changed_file.py --run
```

---

## Continuous-Claude: Workflow Orchestration

### Semantic Memory System (Cross-Session Learning)

```bash
# Recall past solutions/learnings
cd $CLAUDE_PROJECT_DIR/opc && PYTHONPATH=. uv run python scripts/core/recall_learnings.py --query "topic" --k 5

# Options:
#   --text-only    Fast text search
#   --vector-only  Semantic similarity search
#   (default)      Hybrid RRF (recommended)

# Store new learning
cd $CLAUDE_PROJECT_DIR/opc && PYTHONPATH=. uv run python scripts/core/store_learning.py \
  --session-id "task-name" \
  --type WORKING_SOLUTION \
  --content "What I learned..." \
  --context "When this applies..." \
  --tags "tag1,tag2" \
  --confidence high
```

**Learning Types:** `ARCHITECTURAL_DECISION`, `WORKING_SOLUTION`, `CODEBASE_PATTERN`, `FAILED_APPROACH`, `ERROR_FIX`, `USER_PREFERENCE`, `OPEN_THREAD`

### Key Workflow Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `/fix` | Debug + implement + test | Bug investigation and resolution |
| `/commit` | Create git commit | After completing changes |
| `/review` | Code review workflow | Before merging, after implementation |
| `/refactor` | Analyze + plan + implement + validate | Code restructuring |
| `/test` | Unit + integration + E2E tests | Testing workflows |
| `/explore` | Codebase exploration | Understanding new codebases |
| `/security` | Vulnerability scan + verification | Security audits |
| `/release` | Security + E2E + changelog + docs | Release preparation |
| `/tdd` | Plan + tests first + implement | Test-driven development |
| `/premortem` | Risk analysis | Before major changes |

### 48 Specialized Agents

**Planning & Architecture:**
| Agent | Purpose |
|-------|---------|
| `architect` | Feature planning, design docs, integration planning |
| `plan-agent` | Create implementation plans |
| `plan-reviewer` | Review plans before implementation |
| `validate-agent` | Validate tech choices against best practices |

**Implementation:**
| Agent | Purpose |
|-------|---------|
| `kraken` | Implementation + refactoring with TDD |
| `spark` | Lightweight fixes and quick tweaks |
| `phoenix` | Refactoring and migration planning |

**Research & Exploration:**
| Agent | Purpose |
|-------|---------|
| `scout` | Codebase exploration and pattern finding |
| `oracle` | External research (web, docs, APIs) |
| `pathfinder` | External repository analysis |
| `research-codebase` | Document codebase comprehensively |

**Testing & Validation:**
| Agent | Purpose |
|-------|---------|
| `arbiter` | Unit and integration test execution |
| `atlas` | End-to-end and acceptance tests |
| `profiler` | Performance, race conditions, memory |

**Debugging:**
| Agent | Purpose |
|-------|---------|
| `debug-agent` | Issue investigation |
| `sleuth` | General bug investigation |

**Review:**
| Agent | Purpose |
|-------|---------|
| `critic` | Feature and implementation review |
| `judge` | Refactoring and transformation review |
| `review-agent` | Compare plan vs reality vs diff |

**Documentation:**
| Agent | Purpose |
|-------|---------|
| `scribe` | Documentation, handoffs, ledgers |
| `chronicler` | Session analysis, precedent lookup |

**Coordination:**
| Agent | Purpose |
|-------|---------|
| `maestro` | Multi-agent coordination |

### Hook System (Automatic Behaviors)

Hooks run at specific lifecycle points:

| Hook Point | What Happens |
|------------|--------------|
| `UserPromptSubmit` | Skill suggestions injected based on prompt |
| `PreToolUse` | Can redirect tools (e.g., Grep → AST-grep) |
| `PostToolUse` | Tracks file changes, build results |
| `SessionStart` | Loads continuity ledger, memory awareness |
| `PreCompact` | Auto-creates handoff before context compaction |
| `SessionEnd` | Updates ledger, cleans cache |
| `SubagentStop` | Logs agent output for resumability |

**Key hooks:**
- `skill-activation-prompt` - Auto-suggests relevant skills
- `post-tool-use-tracker` - Tracks modified files
- `session-start-continuity` - Loads project state
- `memory-awareness` - Shows relevant past learnings

### Cross-Terminal Coordination (PostgreSQL)

Multiple Claude sessions can coordinate:

```bash
# Check active sessions
docker exec continuous-claude-postgres psql -U claude -d continuous_claude -c \
  "SELECT id, project, working_on FROM sessions WHERE last_heartbeat > NOW() - INTERVAL '5 minutes';"

# Check file claims (who's editing what)
docker exec continuous-claude-postgres psql -U claude -d continuous_claude -c \
  "SELECT file_path, session_id FROM file_claims ORDER BY claimed_at DESC LIMIT 10;"
```

**Prevents:** Two sessions editing the same file simultaneously.

### Continuity System (State Preservation)

**Continuity Ledger:** Located at `.claude/continuity-ledger.md`
- Tracks current project state
- Updated automatically by hooks
- Loaded on session start/resume

**Handoffs:** For transferring context between sessions
```
/create_handoff  - Create handoff document
/resume_handoff  - Resume from handoff
```

### Proactive Delegation Patterns

**Main context = coordination only.** Delegate actual work:

| Task | Delegate To |
|------|-------------|
| Reading 3+ files | `scout` agent |
| External research | `oracle` agent |
| Implementation | `kraken` or `spark` |
| Running tests | `arbiter` or `atlas` |
| Debugging | `debug-agent` or `sleuth` |

**Parallel spawning for independent tasks:**
```
User: "Research auth patterns and check performance"

→ Spawn oracle + profiler in parallel
→ Synthesize results
```

---

## Decision Trees

### Finding Code

```
Need to find a symbol (function, class, method)?
  → mcp__serena__find_symbol(name_path="symbol_name", include_body=True)

Need to find files by pattern?
  → mcp__serena__find_file(file_mask="*.py", relative_path="src/")
  → tldr tree src/ --ext .py

Need to search for text patterns?
  → mcp__serena__search_for_pattern(substring_pattern="pattern", relative_path="src/")
  → tldr search "pattern" src/

Need structural/semantic search?
  → tldr search "error handling" src/
```

### Reading Code

```
Need to understand a file's structure?
  → mcp__serena__get_symbols_overview(relative_path="src/file.py", depth=1)

Need to read a specific function/class?
  → mcp__serena__find_symbol(name_path="ClassName/method_name", include_body=True)

Need to see who references a symbol?
  → mcp__serena__find_referencing_symbols(name_path="function_name", relative_path="src/file.py")

Need to understand call relationships?
  → tldr calls src/
  → tldr impact function_name src/

Need LLM-ready context for a function?
  → tldr context function_name --project src/ --depth 2
```

### Editing Code

```
Need to replace a function/method body?
  → mcp__serena__replace_symbol_body(name_path="Class/method", body="new code", relative_path="src/file.py")

Need to add code after a symbol?
  → mcp__serena__insert_after_symbol(name_path="existing_func", body="new code", relative_path="src/file.py")

Need to add code before a symbol (imports, etc)?
  → mcp__serena__insert_before_symbol(name_path="first_symbol", body="import x", relative_path="src/file.py")

Need to rename across codebase?
  → mcp__serena__rename_symbol(name_path="old_name", new_name="new_name", relative_path="src/file.py")
```

### Debugging

```
Need to understand complex function logic?
  → tldr cfg src/file.py function_name (control flow)
  → tldr dfg src/file.py function_name (data flow)

Need to know what affects a specific line?
  → tldr slice src/file.py function_name 42

Need to investigate a bug?
  → Use /fix skill (routes to debug-agent → spark → arbiter)
```

### Workflow Selection

```
Bug to fix?
  → /fix

Need code review?
  → /review

Making a commit?
  → /commit

Refactoring code?
  → /refactor

Writing tests?
  → /tdd or /test

Exploring new codebase?
  → /explore

External research needed?
  → /research-external or oracle agent
```

---

## Workflow: Before ANY Code Task

1. **Check Serena onboarding:**
   ```
   mcp__serena__check_onboarding_performed()
   # If not done: mcp__serena__onboarding()
   ```

2. **Check memory for prior work:**
   ```bash
   cd $CLAUDE_PROJECT_DIR/opc && PYTHONPATH=. uv run python scripts/core/recall_learnings.py --query "<task keywords>" --k 3 --text-only
   ```

3. **Understand structure:**
   ```bash
   tldr structure <path> --lang <language>
   tldr arch <path>
   ```

4. **Find relevant symbols:**
   ```
   mcp__serena__find_symbol(name_path="relevant_symbol", include_body=False, depth=1)
   ```

5. **Check impact before changes:**
   ```bash
   tldr impact <function_to_change> <path> --depth 3
   ```

6. **Reflect on gathered information:**
   ```
   mcp__serena__think_about_collected_information()
   ```

---

## Workflow: Making Code Changes

1. **Verify task adherence:**
   ```
   mcp__serena__think_about_task_adherence()
   ```

2. **Get symbol with body:**
   ```
   mcp__serena__find_symbol(name_path="ClassName/method", include_body=True, relative_path="src/file.py")
   ```

3. **Find all references:**
   ```
   mcp__serena__find_referencing_symbols(name_path="method", relative_path="src/file.py")
   ```

4. **Make the edit:**
   ```
   mcp__serena__replace_symbol_body(name_path="ClassName/method", body="...", relative_path="src/file.py")
   ```

5. **Validate:**
   ```bash
   tldr diagnostics src/file.py
   tldr change-impact src/file.py --run
   ```

6. **Store learning if significant:**
   ```bash
   cd $CLAUDE_PROJECT_DIR/opc && PYTHONPATH=. uv run python scripts/core/store_learning.py ...
   ```

7. **Check if done:**
   ```
   mcp__serena__think_about_whether_you_are_done()
   ```

---

## NEVER Do This

```
# WRONG: Using base Grep for code search
Grep(pattern="def process_data", path="src/")

# RIGHT: Use Serena or TLDR
mcp__serena__find_symbol(name_path="process_data", include_body=True)
tldr search "process_data" src/
```

```
# WRONG: Using Read to understand a file
Read(file_path="/src/processor.py")

# RIGHT: Use Serena for structured understanding
mcp__serena__get_symbols_overview(relative_path="src/processor.py", depth=1)
mcp__serena__find_symbol(name_path="ClassName", depth=1, include_body=False)
```

```
# WRONG: Using Edit for code changes
Edit(file_path="/src/processor.py", old_string="...", new_string="...")

# RIGHT: Use Serena for semantic edits
mcp__serena__replace_symbol_body(name_path="function_name", body="...", relative_path="src/processor.py")
```

```
# WRONG: Using Task with Explore agent
Task(subagent_type="Explore", prompt="understand codebase")

# RIGHT: Use TLDR + Serena
tldr structure src/ --lang python
tldr arch src/
mcp__serena__get_symbols_overview(relative_path="src/main.py", depth=1)
```

```
# WRONG: Reading entire file to understand one function
Read(file_path="/src/big_module.py")

# RIGHT: Get just what you need
tldr context function_name --project src/ --depth 2
mcp__serena__find_symbol(name_path="function_name", include_body=True)
```

```
# WRONG: Manual multi-step debugging
Read(...), Grep(...), Read(...), ...

# RIGHT: Use workflow skill
/fix
```

---

## When Base Tools Are Acceptable

Use base Claude Code tools ONLY when:

1. **Non-code files:** README, configs, YAML, JSON, markdown
   - `Read` for reading non-code files
   - `Edit` for editing non-code files
   - `Write` for creating non-code files

2. **Serena not available:** LSP not running or unsupported language
   - Fall back to `Read`, `Edit`, `Grep`

3. **Simple one-off reads:** Quick check of a small config file
   - `Read` is acceptable for small non-code files

4. **Git operations:** Commits, branches, status
   - `Bash` with git commands (or use `/commit` skill)

5. **Shell commands:** Running builds, tests, scripts
   - `Bash` for actual shell execution

---

## Quick Reference

### Serena (Semantic Code)
| Task | Command |
|------|---------|
| Find function | `mcp__serena__find_symbol(name_path="func")` |
| Find class method | `mcp__serena__find_symbol(name_path="Class/method")` |
| Get file overview | `mcp__serena__get_symbols_overview(relative_path="file.py")` |
| Find references | `mcp__serena__find_referencing_symbols(...)` |
| Replace function | `mcp__serena__replace_symbol_body(...)` |
| Add after symbol | `mcp__serena__insert_after_symbol(...)` |
| Rename symbol | `mcp__serena__rename_symbol(...)` |
| Write memory | `mcp__serena__write_memory(...)` |
| Reflect | `mcp__serena__think_about_collected_information()` |

### TLDR (Structural Analysis)
| Task | Command |
|------|---------|
| Project structure | `tldr tree src/` |
| Code structure | `tldr structure src/ --lang python` |
| Architecture | `tldr arch src/` |
| Impact analysis | `tldr impact func src/` |
| Call graph | `tldr calls src/` |
| Control flow | `tldr cfg file.py func` |
| Data flow | `tldr dfg file.py func` |
| Program slice | `tldr slice file.py func 42` |
| Dead code | `tldr dead src/` |
| Type check | `tldr diagnostics src/` |
| Affected tests | `tldr change-impact file.py` |
| LLM context | `tldr context func --project src/` |

### Continuous-Claude (Workflow)
| Task | Command |
|------|---------|
| Recall memory | `recall_learnings.py --query "..."` |
| Store learning | `store_learning.py --session-id ... --type ... --content ...` |
| Fix bug | `/fix` |
| Code review | `/review` |
| Commit | `/commit` |
| Refactor | `/refactor` |
| Test | `/test` or `/tdd` |
| Explore | `/explore` |
| Security | `/security` |
| Create handoff | `/create_handoff` |

---

## Summary

**Priority order for all code operations:**

1. **Serena** - Semantic, LSP-based, precise symbol operations
2. **TLDR** - Structural analysis, graphs, impact, flow analysis
3. **Continuous-Claude** - Memory, skills, workflows, agent orchestration
4. **Base Claude Code** - ONLY for non-code files or when above unavailable

**Token savings:** Using this hierarchy provides ~95% token reduction compared to reading raw files.

**Key principles:**
- Always check memory before starting work
- Use Serena thinking tools at natural breakpoints
- Delegate to agents for complex multi-step tasks
- Store significant learnings for future sessions
- Use workflow skills instead of manual multi-step processes
