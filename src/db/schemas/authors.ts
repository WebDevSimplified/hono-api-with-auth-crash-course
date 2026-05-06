import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const AuthorTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  birthday: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
