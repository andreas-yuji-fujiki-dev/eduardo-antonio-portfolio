# More in-depth backend documentation

- ⬅️ [Return to documentation home](../README.md)

### Where the code is located
- Backend: `/api`
- Frontend:

- Administrative panel: `/frontend/panel`

- Public portfolio website: `/frontend/portfolio`

## Database & Prisma

- The `schema.prisma` file is located in:

```
/api/prisma/schema.prisma

```
- Database used: **SQLite**

- Migrations are located in:

```
/api/prisma/migrations

```

---

## app.ts

The `app.ts` file is responsible for:

- Router registration

- Security header configuration

- Swagger configuration (/docs)

- Server initialization

---

## Routes

All routes start in:

```
/api/src/routers
```

### Route Types
- **Public:** authentication
- **Private:** all other application functions

### Router Structure
1. Middleware Imports
2. Controller Imports
3. Route Definition
4. Route Creation (`get`, `post`, `put`, `delete`, etc.)
5. Export

---

## Middlewares & Controllers

### Middlewares
Responsible for:

- Field validation (body, params, query)
- Database existence verification
- Conflict prevention

### Controllers
Responsible for:

- Database changes
- Returning success messages
- Handling unexpected errors

---

## Utils

Location:
```
/api/src/utils
```

Available functions:

- Validate ID
- Validate String
- Validate Array of Numbers

### Usage
```ts
import { validateId } from "@/utils/validateId";

validateId(id);

```

The example above applies to all utility functions.

---

## Config

There is only one configuration file:

```
/api/src/config/prismaClient.ts
```

⚠️ **Whenever you need to use Prisma**, import exclusively from:
```ts
import { prisma } from "@/config/prismaClient";

```

---

## Types

- All types must be created in:

``
/api/src/types

``
- It is recommended to follow good practices of the TypeScript community

---

## Docs (Swagger)

Location:

```
/api/src/docs
```

Content:

- `/components`
- `/routes`
- `swaggerConfig.ts`

### swaggerConfig.ts
Responsible for:

- Importing components and routes
- Configuring Swagger
- Exporting the configuration (used in `app.ts` to `/docs`)

### components & routes
- Defining required fields
- Possible errors
- Possible solutions

- ⬅️ [Return to documentation home](../README.md)