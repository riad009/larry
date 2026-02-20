# Run this script from the project root to commit and push to GitHub
# Usage: .\git-push.ps1

Set-Location $PSScriptRoot

git add -A
git status

$msg = "SmartRoute: footer, profile, plan expiry, signup/region-highlights UI, build fixes"
git commit -m $msg

git push -u origin main
# If your branch is 'master' instead of 'main', run: git push -u origin master
