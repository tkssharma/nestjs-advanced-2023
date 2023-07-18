/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Post` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
