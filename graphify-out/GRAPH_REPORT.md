# Graph Report - sg_server  (2026-09-18)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 298 nodes · 545 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.85)
- Token cost: 1,692 input · 2,512 output

## Graph Freshness
- Built from commit: `1028eb7b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- product.controller.ts
- mongoose
- express
- dependencies
- session.controller.ts
- updates.schema.ts
- devDependencies
- category.service.ts
- festival.service.ts
- app.ts
- compilerOptions
- Deploy to EC2 step
- env.ts
- Instruction Set for Graphify Usage
- GitHub Workflow Definition

## God Nodes (most connected - your core abstractions)
1. `mongoose` - 20 edges
2. `express` - 18 edges
3. `productRoutes()` - 12 edges
4. `UserDocument` - 9 edges
5. `userRoutes()` - 9 edges
6. `compilerOptions` - 9 edges
7. `routes()` - 8 edges
8. `sessionRoutes()` - 8 edges
9. `log` - 8 edges
10. `requireUser()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `productRoutes()` --indirect_call--> `createProductHandler()`  [INFERRED]
  src/routes/product.route.ts → src/controller/product.controller.ts
- `productRoutes()` --indirect_call--> `deleteProductHandler()`  [INFERRED]
  src/routes/product.route.ts → src/controller/product.controller.ts
- `productRoutes()` --indirect_call--> `getActiveProductHandler()`  [INFERRED]
  src/routes/product.route.ts → src/controller/product.controller.ts
- `productRoutes()` --indirect_call--> `getAllProductHandler()`  [INFERRED]
  src/routes/product.route.ts → src/controller/product.controller.ts
- `productRoutes()` --indirect_call--> `getProductDetailsHandler()`  [INFERRED]
  src/routes/product.route.ts → src/controller/product.controller.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Workflow Execution Flow** — checkout, setup_node, install_dependencies, build_application, github_workflows_deploy_to_ec2 [INFERRED 0.80]

## Communities (17 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (41): author, description, keywords, license, main, name, scripts, build (+33 more)

### Community 1 - "product.controller.ts"
Cohesion: 0.09
Nodes (34): @aws-sdk/client-s3, mongodb, multer, createProductHandler(), deleteProductHandler(), getActiveProductHandler(), getAllProductHandler(), getProductDetailsHandler() (+26 more)

### Community 2 - "mongoose"
Cohesion: 0.08
Nodes (27): bcrypt, mongoose, FestivalModel, festivalSchema, ProductDocument, ProductInput, ProductModel, productSchema (+19 more)

### Community 3 - "express"
Cohesion: 0.17
Nodes (22): ref_crypto, express, zod, createUserHandler(), getCurrentUserHandler(), requestPasswordResetHandler(), resetPasswordHandler(), requireUser() (+14 more)

### Community 4 - "dependencies"
Cohesion: 0.09
Nodes (23): dependencies, aws-sdk, @aws-sdk/client-s3, bcrypt, body-parser, config, cookie-parser, cors (+15 more)

### Community 5 - "session.controller.ts"
Cohesion: 0.26
Nodes (15): jsonwebtoken, lodash, createUserSessionHandler(), deleteUserSessionHandler(), getUserSessionHandler(), deserializeUser(), createSession(), findSessions() (+7 more)

### Community 6 - "updates.schema.ts"
Cohesion: 0.14
Nodes (15): findUpdatesHandler(), getAllUpdatesHandler(), updatesRoutes(), CreateUpdatesInput, createUpdatesSchema, DeleteUpdatesInput, deleteUpdatesSchema, GetUpdatesInput (+7 more)

### Community 7 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, cross-env, nodemon, ts-node, ts-node-dev, @types/bcrypt, @types/body-parser, @types/config (+9 more)

### Community 8 - "category.service.ts"
Cohesion: 0.21
Nodes (7): getAllCategoryHandler(), CategoryDocument, CategoryInput, CategoryModel, categorySchema, categoryRoutes(), getAllCategory()

### Community 9 - "festival.service.ts"
Cohesion: 0.21
Nodes (7): getAllFestivalHandler(), FestivalDocument, FestivalInput, FestivalModel, festivalSchema, festivalRoutes(), getAllFestival()

### Community 10 - "app.ts"
Cohesion: 0.23
Nodes (9): cookie-parser, cors, dayjs, pino, app, cors, connect(), log (+1 more)

### Community 11 - "compilerOptions"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, outDir, rootDir, skipLibCheck, strict (+3 more)

### Community 12 - "Deploy to EC2 step"
Cohesion: 0.33
Nodes (6): Build the application step, Checkout code action, Deploy to EC2 step, Install dependencies step, Set up Node action, SSH execution block

### Community 13 - "env.ts"
Cohesion: 0.50
Nodes (3): envVariables, NodeJS, ProcessEnv

## Knowledge Gaps
- **128 isolated node(s):** `CreateProductInput`, `UpdateProductInput`, `ProcessEnv`, `UserModel`, `CreateUpdatesInput` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 138 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `mongoose` connect `mongoose` to `package.json`, `product.controller.ts`, `session.controller.ts`, `category.service.ts`, `festival.service.ts`, `app.ts`?**
  _High betweenness centrality (0.289) - this node is a cross-community bridge._
- **Why does `express` connect `express` to `package.json`, `product.controller.ts`, `session.controller.ts`, `updates.schema.ts`, `category.service.ts`, `festival.service.ts`, `app.ts`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `productRoutes()` (e.g. with `createProductHandler()` and `deleteProductHandler()`) actually correct?**
  _`productRoutes()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CreateProductInput`, `UpdateProductInput`, `ProcessEnv` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04756871035940803 - nodes in this community are weakly interconnected._
- **Should `product.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09175377468060394 - nodes in this community are weakly interconnected._