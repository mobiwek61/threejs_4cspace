### combined projects into this repo  
- cd to chosen project and ```npm i```, ```npm run dev``` etc to run.    

### for auto-reload of browser on edit change
- see entry in:   ```threejs_4/vite.config.ts```  
  This auto reload problem affects read.js projects in github codespace  

### overview  
- this is a github codespace project. It was made by creating a blank github repo and making a codespace from it using the code->codespace button on webpage. This results in a virtual unix box with node.js installed (so npm will work)
- For each coding project, make a folder and inside it run below commands to setup vite in codespace (very easy)  
  from (copilot recommended) run: 
```
#### npm create vite@latest three3b -- --template react-ts
npm create vite@latest threejs_5 -- --template vanilla-ts
then cd to above, npm i, 
npm i three,
npm run dev
```
- browser window pops up with app in it. To get app in ide window, "ports" (on bottom) then mouseover it and click "open in browser". It autorefreshes! 
- Then code from existing project was zip-downloaded from github and dragged into this project, from pc file manager into the browser window.  Then `npm i three` then `npm i`, to load node modules defined in package.json into node_modules folder.   

### VSCode problem:
- Every time you open an editor it **closes existing editor** window.  
  **Fix** Menu->File->Preferences->Settings; search for "preview", then **disable "Workbench> editor:enable preview" checkbox** 
- "sticky" in explorer when folder stays and files scroll below. Disable as above..
  
### Comparison codespace vs codesandbox.io:
  - codesandbox.io Better for public demos and accompanying npmjs package; does not require login or account like codespace does; easy to see public project inside your own visual studio; to modify, need to create a LOCAL branch or copy code into new project.  
  - both have visual studio and drag-drop to project
  - to backup project locally codesandbox has download button which omits (big) node_modules; in codespace download project zip from github page which excludes big stuff because of .gitignore   
  - codespace 
    - has better github stuff with graph view of changes over time. You start a codespace project FROM the github webpage, so all the annoying and confusing config is taken care of.     
    - only has vm on server; layout looks more as if you had a real local computer.  
  -  codesandbox  
      - offers "templates" for creating new projects, but you don't know whats going on. Also allows making a basic machine with node.js and using commands to make your own project ie: 
        ```
        npm create vite@latest three3b -- --template react-ts
        cd three3b
        npm i three
        npm run dev
        ```
      - confusing dashboard leads you to fork project every time even though you dont want to.  
      - has "sandbox" (on browser) and "devbox" (vm on server) all gets confusing.  
- About auto reload: Parcel(setup by codesandbox) and Vite(setup with unix commands in codespace) are both development servers which auto reload and cause browser to refresh, BUT Parcel gets tripped up in codespace because of port forwarding. Thats why vite is used here.

### Visual studio notes and problems:
- it only edits one file at a time without multiple tabs at top for each file. Opening a new file disappears the last editor window.    
  To change: file->settings->[search for "preview"]->"workbench-editor-enable_preview"->and unclick.  Now a new tab opens each time a file is edited. 
- How to show web app in a tab:  
  Start app with "npm run dev".  Then you can choose it from a popup or if you don't, later on click "ports" at bottom and click icon when you mouseover says "preview in editor". If it't taking half the screen, drag top bar to center and it becomes just another tab.   
  Browser should auto-refresh when a source file is saved; if not see other readme for setting up.    
  If you don't see "ports" do menu->view->terminal  
- Good to run fullscreen (f11) so code and browser is in same window.

