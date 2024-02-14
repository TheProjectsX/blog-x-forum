-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ForumPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "likes" TEXT NOT NULL DEFAULT '',
    "dislikes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ForumPosts" ("authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt") SELECT "authorId", "body", "createdAt", "dislikes", "id", "likes", "title", "updatedAt" FROM "ForumPosts";
DROP TABLE "ForumPosts";
ALTER TABLE "new_ForumPosts" RENAME TO "ForumPosts";
CREATE TABLE "new_BlogComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BlogComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BlogComments" ("authorId", "comment", "createdAt", "id", "postId", "updatedAt") SELECT "authorId", "comment", "createdAt", "id", "postId", "updatedAt" FROM "BlogComments";
DROP TABLE "BlogComments";
ALTER TABLE "new_BlogComments" RENAME TO "BlogComments";
CREATE TABLE "new_BlogPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "visitors" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPosts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BlogPosts" ("authorId", "body", "createdAt", "id", "title", "updatedAt", "url", "visitors") SELECT "authorId", "body", "createdAt", "id", "title", "updatedAt", "url", "visitors" FROM "BlogPosts";
DROP TABLE "BlogPosts";
ALTER TABLE "new_BlogPosts" RENAME TO "BlogPosts";
CREATE UNIQUE INDEX "BlogPosts_url_key" ON "BlogPosts"("url");
CREATE TABLE "new_ForumComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ForumComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ForumComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPosts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ForumComments" ("authorId", "comment", "createdAt", "id", "postId", "updatedAt") SELECT "authorId", "comment", "createdAt", "id", "postId", "updatedAt" FROM "ForumComments";
DROP TABLE "ForumComments";
ALTER TABLE "new_ForumComments" RENAME TO "ForumComments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
