# Publish to GitHub

This folder is its own Git repository (independent of any Git repo in parent directories).

## Fast path (GitHub CLI)

1. Install the CLI if needed: `brew install gh`
2. Log in once (browser or token): `gh auth login`
3. From the project root:

```bash
npm run publish:github
```

The script creates **`hub360-website`** under your logged-in account if it does not exist, points **`origin`** at that repo, and runs **`git push -u origin main`**.

---

## Manual: create the repository on GitHub

1. Sign in at [github.com/new](https://github.com/new).
2. Repository name: **`hub360-website`** (or your choice).
3. Leave **Add a README** unchecked (this project already has one).
4. Create the repository.

## Push this code

Replace `YOUR_USER` with your GitHub username (or use an organization path).

```bash
cd "/Users/delger/HUB360 Website"
git remote add origin https://github.com/YOUR_USER/hub360-website.git
git branch -M main
git push -u origin main
```

SSH remote:

```bash
git remote add origin git@github.com:YOUR_USER/hub360-website.git
git push -u origin main
```

## Optional: GitHub CLI

If you install the [GitHub CLI](https://cli.github.com/) (`brew install gh`) and run `gh auth login`, you can create and push in one step from the project root:

```bash
gh repo create hub360-website --public --source=. --remote=origin --push
```

Use `--private` instead of `--public` if you prefer a private repository.
