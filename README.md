# create-bto-ui

With NPM: 
```bash
npm init bto-ui <target-folder> --template <vue | react>
```

With Yarn:
```bash
yarn create bto-ui <target-folder> --template <vue | react>
```

## Getting Started
* To Run this Scaffolding you need 3 Repository as dependency. It should be in the same root directory
  * `bto-ui-shell` - parent container that bootstrap user configuration, controls the view and routes
  
    ```bash
    git clone https://github.com/bettertradeoff/bto-ui-shell.git
    ```
  * `bto-ui-shared` - shared utility 
   
    ```bash
    git clone https://github.com/bettertradeoff/bto-ui-shared.git
    ```
  * `bto-ui-store` - data layer repository

    ```bash
    git clone https://github.com/bettertradeoff/bto-ui-store.git
    ```

## Folders structure
```
.<root-folder>
  ├── bto-ui-shell
  ├── bto-ui-shared  
  ├── bto-ui-store
  ├── bto-ui-<my-new-feature>
  |    ├─ src                                
  |    |  ├─ main.tsx
  |    |  ├─ App.tsx
  |    |  ├─ shims-vue.tsx
  |    |
  |    ├─ README.md 
  |    ├─ vite.config.ts 
  |    └─ package.json 
```

## Run and Build
```bash
yarn serve
```
