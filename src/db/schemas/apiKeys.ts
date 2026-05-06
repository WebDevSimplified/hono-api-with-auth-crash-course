import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { UserTable } from "./users.ts"

export const ApiKeyTable = pgTable("api_keys", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  name: text().notNull(),
  keyHash: text().notNull(),
  keyPrefix: varchar({ length: 8 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
