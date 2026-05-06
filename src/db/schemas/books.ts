import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { AuthorTable } from "./authors.ts"
import { UserTable } from "./users.ts"

export const BookTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  publishDate: timestamp({ withTimezone: true }),
  pageCount: integer(),
  authorId: uuid()
    .notNull()
    .references(() => AuthorTable.id, { onDelete: "restrict" }),
  addedBy: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "restrict" }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
