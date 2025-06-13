/*
  Warnings:

  - The values [PDF,QUIZ,RECORDING] on the enum `resource_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "resource_type_new" AS ENUM ('DOCUMENT', 'VIDEO', 'LINK', 'FILE');
ALTER TABLE "resources" ALTER COLUMN "resource_type" TYPE "resource_type_new" USING ("resource_type"::text::"resource_type_new");
ALTER TYPE "resource_type" RENAME TO "resource_type_old";
ALTER TYPE "resource_type_new" RENAME TO "resource_type";
DROP TYPE "resource_type_old";
COMMIT;
