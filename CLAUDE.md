# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS TypeScript API project with a single feature module for animation data. The project uses pnpm as the package manager and follows standard NestJS architecture patterns.

## Development Commands

### Package Management
- Install dependencies: `pnpm install`
- Add a dependency: `pnpm add <package>`
- Add a dev dependency: `pnpm add -D <package>`

### Code Generation
- Generate a new module: `pnpm nest generate module <name>`
- Generate a new controller: `pnpm nest generate controller <name>`
- Generate a new service: `pnpm nest generate service <name>`
- Generate a new resource (CRUD): `pnpm nest generate resource <name>`

### Development Server
- Start in development mode (watch): `pnpm start:dev`
- Start in production mode: `pnpm start:prod`
- Start with debug: `pnpm start:debug`

### Building
- Build the project: `pnpm build`

### Testing
- Run unit tests: `pnpm test`
- Run unit tests in watch mode: `pnpm test:watch`
- Run e2e tests: `pnpm test:e2e`
- Generate test coverage: `pnpm test:cov`
- Debug tests: `pnpm test:debug`
- Run a specific test file: `pnpm test -- <path/to/file.spec.ts>`
- Run tests matching a pattern: `pnpm test -- --testNamePattern="pattern"`

### Code Quality
- Lint code: `pnpm lint` (auto-fixes where possible)
- Format code: `pnpm format` (uses Prettier)

## Architecture

### Module Structure
- `src/app.module.ts` - Root module that imports `AnimationModule` and `BlogModule`
- `src/animation/` - Feature module containing animation-related functionality
  - `animation.module.ts` - Animation feature module
  - `animation.controller.ts` - REST controller with endpoints:
    - `GET /animation` - Returns general animation data
    - `GET /animation/kid` - Returns kid-friendly animations with optional query parameters (`ageGroup`, `genre`, `limit`, `page`)
    - `GET /animation/async` - Returns a delayed response (3 seconds) for async testing
  - `animation.service.ts` - Service providing hardcoded animation data
  - `dto/get-kid-animations.dto.ts` - DTO for query parameters
  - `animation.controller.spec.ts` - Unit tests for the controller
- `src/blog/` - Feature module for blog management with full CRUD operations and parameter validation
  - `blog.module.ts` - Blog feature module
  - `blog.controller.ts` - REST controller with endpoints:
    - `GET /blog` - Get all blog posts with filtering (`published`, `author`, `tag`)
    - `GET /blog/:id` - Get single blog post by ID
    - `POST /blog` - Create new blog post (with validation)
    - `PUT /blog/:id` - Update blog post (with validation)
    - `DELETE /blog/:id` - Delete blog post
    - `GET /blog/search` - Search blog posts by keyword
    - `GET /blog/tags/all` - Get all unique tags
    - `PUT /blog/:id/publish` - Toggle publish status
  - `blog.service.ts` - Service with in-memory blog post storage and business logic
  - `dto/` - Data Transfer Objects for parameter validation:
    - `create-blog-post.dto.ts` - Validation for creating posts
    - `update-blog-post.dto.ts` - Validation for updating posts
    - `get-blog-posts.dto.ts` - Validation for query parameters
    - `search-blog-posts.dto.ts` - Validation for search queries
  - `blog.controller.spec.ts` - Unit tests for the controller

### Key Design Patterns
- **Controllers**: Handle HTTP requests and delegate to services
- **Services**: Contain business logic and data access
- **DTOs**: Validate and type incoming query parameters
- **Modules**: Organize related functionality

### Testing Configuration
- Unit tests use Jest with `ts-jest` transformer
- Test files follow `*.spec.ts` naming convention in the same directory as source files
- E2E tests are in the `test/` directory using `jest-e2e.json` configuration
- Jest is configured to collect coverage from all TypeScript files in `src/`

## Configuration Files

### TypeScript
- `tsconfig.json` - Strict TypeScript configuration with ES2023 target, nodenext module resolution, and strict null checks enabled.

### Nest CLI
- `nest-cli.json` - Nest CLI configuration with `deleteOutDir: true` (clears `dist/` on each build).

### Linting & Formatting
- `eslint.config.mjs` - ESLint configuration using TypeScript ESLint with Prettier integration. Key rules:
  - `@typescript-eslint/no-explicit-any` is disabled
  - `@typescript-eslint/no-floating-promises` and `@typescript-eslint/no-unsafe-argument` are warnings
  - Prettier violations are errors
- `.prettierrc` - Prettier configuration: single quotes, trailing commas, 2-space tabs, LF line endings.

### Validation & Error Handling
- `src/main.ts` - Configures global validation pipe and exception filter:
  - `ValidationPipe` with whitelist, forbidNonWhitelisted, and transform options
  - `HttpExceptionFilter` for consistent error response formatting
- Dependencies: `class-validator` and `class-transformer` for parameter validation
- DTO files in each module's `dto/` directory define validation rules using decorators

### Package Management
- `package.json` - Includes all scripts and dependencies. Uses pnpm workspaces (none defined).

## Important Notes
- The application runs on port 3000 by default, configurable via `PORT` environment variable.
- The root endpoint (`/`) returns a 404 as no controller is defined there; all routes are under `/animation` or `/blog`.
- The project uses ESLint with Prettier for code formatting; run `pnpm format` before committing.
- Git hooks may be configured; ensure tests pass before pushing.
- The source root is `src/` and the build output goes to `dist/`.
- The project uses the NestJS factory pattern with async/await bootstrap error handling.
- **Parameter validation is enabled globally** using `class-validator` decorators in DTOs.
- **Validation behavior**:
  - Whitelist: Automatically strips properties not defined in DTOs
  - Forbid non-whitelisted: Rejects requests with unexpected properties
  - Transform: Automatically converts types (string to number/boolean)
- **Error responses** are formatted consistently via `HttpExceptionFilter`.