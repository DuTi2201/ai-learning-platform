-- CreateEnum
CREATE TYPE "enrollment_type" AS ENUM ('SELF_ENROLLED', 'ADMIN_ASSIGNED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "user_role" ADD VALUE 'INSTRUCTOR';
ALTER TYPE "user_role" ADD VALUE 'STUDENT';

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "assigned_by" TEXT,
ADD COLUMN     "enrollment_type" "enrollment_type" NOT NULL DEFAULT 'SELF_ENROLLED';
