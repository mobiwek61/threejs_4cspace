### This seems to work sort of, but causes other codespace to brick afterward

### Problem: you commit on github webpage and try to commit from codespace   
- you get incomprehensible github error.
- Fix: type into copilot "in github I edit a file then open a codespace and when I commit and push codespace a git error occurs". Then it says to:
```
git config pull.rebase false
git pull
```
Then merge errors. copilot says to:   
```Open the Conflicted File In Codespaces, open threejsB/README.md. You’ll see conflict markers like:```
Then push the merge button, then commit+push.
- To compare 2 commits in github webpage: 
```https://github.com/username/repo/compare/commit1..commit2```  
  Commit 1 and 2 are the SHA codes shown in history button on github webpage for the file.