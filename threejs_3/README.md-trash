
## cd to folder threejsB to begin!!!
## my notes 
- this is a github codespace project. It was made by creating a blank github repo and making a codespace from it using the code->codespace button on webpage. This results in a virtual unix box with node.js installed (so npm will work)
- Then run below commands to setup vite in codespace (very easy)  
  from (copilot recommended) run: 
```
npm create vite@latest three3b -- --template react-ts
cd three3b
npm i three
npm run dev
```
- browser window pops up with app in it. To get app in ide window, "ports" (on bottom) then mouseover it and click "open in browser". It autorefreshes! 
- Then code from existing project was zip-downloaded from github and dragged into this project, from pc file manager into the browser window.  Then `npm i three` then `npm i`, to load node modules defined in package.json into node_modules folder.   
### VSCode problem:
- Every time you open an editor it **closes existing editor** window.  
  **Fix** Menu->File->Preferences->Settings; search for "preview", then **disable "Workbench> editor:enable preview" checkbox** 
### github warning:  
- if you do edit a file in github browser or do merge from another branch, it bricks your codespace so it can never do a commit.
  Tried using copilot for instructions but still bricked.  
  Only fix is create a new codespace and rename old one.

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
**=========================================================
=========================================================**
### The following README created right on this codespace box by:  
`npm create vite@latest three3b -- --template react-ts`  
---------- begin readme segment --------------
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
----------- end readme segment --------------