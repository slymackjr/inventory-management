"use client"

import { useState } from "react"
import { ProductTable } from "@/components/admin/product-table"
import { ProductForm } from "@/components/admin/product-form"
import { useInventory } from "@/contexts/inventory-context"
import type { Product } from "@/lib/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export default function InventoryPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoading } = useInventory()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleSave = (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData)
    } else {
      addProduct(productData)
    }
    setIsFormOpen(false)
  }

  const handleDelete = (productId: string) => {
    setProductToDelete(productId)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete)
      setProductToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Loading inventory...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
        <p className="text-muted-foreground">
          Manage your product inventory with full CRUD operations.
        </p>
      </div>

      {/* Inventory Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-muted-foreground" />
              Product Inventory
            </CardTitle>
            <CardDescription>View and manage all products in your inventory.</CardDescription>
          </div>
          <Button onClick={handleAdd} size="sm">
            Add New Product
          </Button>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </CardContent>
      </Card>

      {/* Product Form */}
      <ProductForm
        product={selectedProduct}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}