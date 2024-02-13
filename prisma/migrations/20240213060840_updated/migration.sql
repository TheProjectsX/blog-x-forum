/*
  Warnings:

  - You are about to drop the column `body` on the `BlogComments` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BlogComments` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `ForumComments` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ForumComments` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `BlogComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `BlogComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `ForumComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `ForumComments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BlogComments" ("createdAt", "id", "postId", "updatedAt") SELECT "createdAt", "id", "postId", "updatedAt" FROM "BlogComments";
DROP TABLE "BlogComments";
ALTER TABLE "new_BlogComments" RENAME TO "BlogComments";
CREATE TABLE "new_ForumComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ForumComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPosts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ForumComments" ("createdAt", "id", "postId", "updatedAt") SELECT "createdAt", "id", "postId", "updatedAt" FROM "ForumComments";
DROP TABLE "ForumComments";
ALTER TABLE "new_ForumComments" RENAME TO "ForumComments";
CREATE TABLE "new_ForumPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" TEXT NOT NULL DEFAULT '',
    "dislikes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ForumPosts" ("authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt") SELECT "authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt" FROM "ForumPosts";
DROP TABLE "ForumPosts";
ALTER TABLE "new_ForumPosts" RENAME TO "ForumPosts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
