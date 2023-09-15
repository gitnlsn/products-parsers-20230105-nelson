-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('draft', 'trash', 'published');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'draft',
    "imported_t" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "created_t" INTEGER NOT NULL,
    "last_modified_t" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "labels" TEXT NOT NULL,
    "cities" TEXT NOT NULL,
    "purchase_places" TEXT NOT NULL,
    "stores" TEXT NOT NULL,
    "ingredients_text" TEXT NOT NULL,
    "traces" TEXT NOT NULL,
    "serving_size" TEXT NOT NULL,
    "serving_quantity" DECIMAL(65,30),
    "nutriscore_score" INTEGER NOT NULL,
    "nutriscore_grade" TEXT NOT NULL,
    "main_category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
