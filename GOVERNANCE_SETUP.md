# Governance & Branch Protection Setup

## 1. Create a seed PR
- Make a trivial change (e.g., edit README)
- Push a branch and open a pull request
- Let Actions run to populate status checks

## 2. Configure branch protection
- Go to Settings → Branches → Add rule
- Pattern: `main`
- Require pull request before merging
- Require 1 approval
- Require review from Code Owners
- Require conversation resolution
- Require status checks to pass before merging
- Require branches to be up to date before merging
- (Optional) Restrict who can push
- Turn OFF force pushes and deletions

## 3. Status checks to require
- CI (from ci.yml)
- Secret Scanning (gitleaks)
- PR Title Conventional Commits
- Changelog enforcement (optional)
- (Do not require CodeQL initially)

## 4. Recommended settings
- Use PRs for all changes to main
- Use Conventional Commits for PR titles
- Keep CODEOWNERS up to date
- Use .gitattributes to enforce LF line endings
