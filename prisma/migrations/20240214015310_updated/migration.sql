-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ForumPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" TEXT NOT NULL DEFAULT '[]',
    "dislikes" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ForumPosts" ("authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt") SELECT "authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt" FROM "ForumPosts";
DROP TABLE "ForumPosts";
ALTER TABLE "new_ForumPosts" RENAME TO "ForumPosts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
