-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BlogPosts" ("authorId", "body", "createdAt", "id", "title", "updatedAt", "url", "views") SELECT "authorId", "body", "createdAt", "id", "title", "updatedAt", "url", "views" FROM "BlogPosts";
DROP TABLE "BlogPosts";
ALTER TABLE "new_BlogPosts" RENAME TO "BlogPosts";
CREATE UNIQUE INDEX "BlogPosts_url_key" ON "BlogPosts"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
