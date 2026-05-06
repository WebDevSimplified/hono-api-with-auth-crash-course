import { defineRelations } from "drizzle-orm"
import * as schema from "./schema.ts"

export const relations = defineRelations(schema, r => ({
  ApiKeyTable: {
    user: r.one.UserTable({
      from: r.ApiKeyTable.userId,
      to: r.UserTable.id,
    }),
  },
  AuthorTable: {
    books: r.many.BookTable(),
  },
  BookTable: {
    author: r.one.AuthorTable({
      from: r.BookTable.authorId,
      to: r.AuthorTable.id,
    }),
    addedByUser: r.one.UserTable({
      from: r.BookTable.addedBy,
      to: r.UserTable.id,
    }),
  },
  UserTable: {
    apiKeys: r.many.ApiKeyTable(),
    booksAdded: r.many.BookTable(),
  },
}))
