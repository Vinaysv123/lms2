Clean project: removed Builder.io artifacts, fixed structure, added working run scripts

- Removed all Builder.io generated files and configs:
  - components.json
  - .builder directory
  - client/, server/, shared/, netlify/ directories
  - AGENTS.md, .dockerignore, index.html
  - TypeScript configs (tsconfig.json, vite configs, tailwind configs)
  
- Cleaned up folder structure:
  - Kept only essential backend/ and frontend/ directories
  - Removed unused directories and files
  
- Updated package.json:
  - Added nodemon as dev dependency
  - Defined proper scripts (start, dev, build)
  
- Environment handling:
  - Ensured .env is in .gitignore
  - Kept .env.example for documentation
  
- Verified application runs correctly:
  - npm install works
  - npm run dev starts server properly
  - Database initializes correctly