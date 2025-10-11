-- DropForeignKey
ALTER TABLE "fileupload"."Files" DROP CONSTRAINT "Files_folder_id_fkey";

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "folder_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
