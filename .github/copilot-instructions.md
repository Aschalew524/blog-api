# Copilot / AI Agent instructions for `blog-api`

This file contains focused, actionable guidance for AI coding agents working on this repository. Keep instructions concise and reference the specific files below.

1. Project purpose
- Small Express + MongoDB backend for a blog (users, posts, likes, comments). Entry point: `server.js`.

2. Important files & structure
- `server.js`: app setup, middleware, route mounts (`/api/users`, `/api/posts`).
- `config/db.js`: mongoose connection; uses `process.env.MONGO_URI` with fallback `mongodb://127.0.0.1:27017/blog-api`.
- `models/User.js`: user model with password hashing and `matchPassword` helper.
- `models/Post.js`: post model with embedded `comments` subdocuments and `likes` array of `User` refs.
- `controllers/userController.js`: `registerUser`, `authUser` — JWT generation via `process.env.JWT_SECRET`.
- `controllers/postController.js`: CRUD for posts, `toggleLike`, `addComment`, `deleteComment`.
- `routes/userRoutes.js`, `routes/postRoutes.js`: route definitions. Protected routes use `middleware/authMiddleware.js`.
- `middleware/authMiddleware.js`: extracts Bearer JWT and attaches `req.user`.
- `utils/errorHandler.js`: Express error handler used app-wide.

3. Runtime & dev commands
- Start in dev with: `npm run dev` (uses `nodemon`).
- Production run: `npm start`.
- Environment: provide `MONGO_URI`, `JWT_SECRET`, and optionally `PORT` in `.env`.

4. Authentication pattern
- JWT tokens returned on register/login (`controllers/userController.js`).
- Protected routes expect `Authorization: Bearer <token>` header.
- `authMiddleware` sets `req.user` to a user document (without password).

5. Data patterns & examples
- Post creation example payload: `POST /api/posts` (protected)
  - body: `{ "title": "My post", "body": "Content" }`
- Like toggle: `POST /api/posts/:id/like` (protected) — toggles current user's presence in `post.likes`.
- Add comment: `POST /api/posts/:id/comments` (protected)
  - body: `{ "text": "Nice post" }`
- Comment deletion: `DELETE /api/posts/:id/comments/:commentId` (protected) — allowed for comment author or post author.

6. Conventions & expectations
- Controllers return JSON and use simple status codes (200/201/401/403/404/500).
- Controllers perform permission checks in code (author-only updates/deletes).
- Models use Mongoose features (subdocuments for comments, `pre('save')` password hashing).
- Keep route handlers thin — logic belongs in controllers.

7. When modifying files
- Preserve existing route paths and JWT usage.
- Add tests only if you can run them locally; otherwise, keep changes small and runnable.
- If adding new env vars, add a note to `.env.example` (not present) and to this file.

8. Integration & external deps
- Uses: `express`, `mongoose`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `cors`.
- DB: MongoDB via Mongoose; local dev fallback is `mongodb://127.0.0.1:27017/blog-api`.

9. Quick debugging steps
- If DB connection fails, check `MONGO_URI` and firewall/port.
- If auth fails, ensure `JWT_SECRET` consistency between token creation and verification.
- To inspect requests, use `curl` or Postman against `http://localhost:<PORT>/api/...`.

10. Questions for maintainers (ask before major changes)
- Do you want comments as subdocuments (current) or a separate `Comment` collection?
- Preferred pagination strategy for posts? (current implementation returns all posts)
- Any additional user fields or roles required?

---
If anything in these instructions is unclear or you want additional examples (unit tests, Postman collection, or `.env.example`), tell me which part to expand.