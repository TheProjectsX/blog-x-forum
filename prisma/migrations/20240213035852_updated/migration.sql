/*
  Warnings:

  - Added the required column `dislikes` to the `ForumPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `ForumPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitors` to the `BlogPosts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ForumPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" TEXT NOT NULL,
    "dislikes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ForumPosts" ("authorId", "body", "createdAt", "id", "title", "updatedAt") SELECT "authorId", "body", "createdAt", "id", "title", "updatedAt" FROM "ForumPosts";
DROP TABLE "ForumPosts";
ALTER TABLE "new_ForumPosts" RENAME TO "ForumPosts";
CREATE TABLE "new_BlogPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "visitors" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BlogPosts" ("authorId", "body", "createdAt", "id", "title", "updatedAt", "url") SELECT "authorId", "body", "createdAt", "id", "title", "updatedAt", "url" FROM "BlogPosts";
DROP TABLE "BlogPosts";
ALTER TABLE "new_BlogPosts" RENAME TO "BlogPosts";
CREATE UNIQUE INDEX "BlogPosts_url_key" ON "BlogPosts"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
