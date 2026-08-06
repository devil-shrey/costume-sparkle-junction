# Pull latest changes from GitHub

## Goal
Update the Lovable project with the latest commits from the connected GitHub repository (`origin`).

## Current state
- The project is already linked to a git remote (`origin` points to Lovable's GitHub storage proxy).
- Working tree is clean (`git status --short` returned no output).
- Latest local commit is `c24455a Work in progress`.

## Steps
1. Run `git fetch origin` to retrieve the latest remote refs without modifying local files.
2. Compare local `main` with `origin/main` using `git log HEAD..origin/main --oneline` to identify incoming commits.
3. If remote is ahead, run `git pull origin main` to merge changes into the local branch.
4. If a merge conflict occurs, stop and report the conflicting files so the user can decide how to resolve them.
5. After a successful pull, verify the project still builds by running the build command.
6. Report the final state: number of commits pulled, any conflicts, and build status.

## Out of scope
- Pushing changes to GitHub.
- Reconnecting or configuring the GitHub integration (already active).
- Handling uncommitted local changes (none currently exist).
