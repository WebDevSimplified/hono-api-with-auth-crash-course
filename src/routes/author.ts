import { sValidator } from "@hono/standard-validator"
import { Hono } from "hono"
import z from "zod"
import { db } from "../db/db.ts"
import { AuthorTable } from "../db/schema.ts"
import { eq } from "drizzle-orm"
import { apiKeyAuth, type ApiKeyEnv } from "../middleware/auth.ts"

const app = new Hono()

const createAuthorSchema = z.object({
  name: z.string().min(1),
  birthday: z.coerce.date().optional(),
})

const updateAuthorSchema = z.object({
  name: z.string().min(1).optional(),
  birthday: z.coerce.date().nullable().optional(),
})

app.get("/", async c => {
  const authors = await db.query.AuthorTable.findMany()
  return c.json(authors)
})

app.get("/:id", async c => {
  const id = c.req.param("id")
  const author = await db.query.AuthorTable.findFirst({ where: { id } })

  if (author == null) {
    return c.json({ error: "Author not found" }, 404)
  }

  return c.json(author)
})

const protectedApp = new Hono<ApiKeyEnv>()
protectedApp.use(apiKeyAuth)

protectedApp.post("/", sValidator("json", createAuthorSchema), async c => {
  const data = c.req.valid("json")
  const [author] = await db.insert(AuthorTable).values(data).returning()

  return c.json(author, 201)
})

protectedApp.put("/:id", sValidator("json", updateAuthorSchema), async c => {
  const id = c.req.param("id")
  const data = c.req.valid("json")

  const [author] = await db
    .update(AuthorTable)
    .set(data)
    .where(eq(AuthorTable.id, id))
    .returning()

  if (author == null) {
    return c.json({ error: "Author not found" }, 404)
  }

  return c.json(author)
})

protectedApp.delete("/:id", async c => {
  const id = c.req.param("id")
  await db.delete(AuthorTable).where(eq(AuthorTable.id, id))

  return c.body(null, 204)
})

app.route("/", protectedApp)

export default app
