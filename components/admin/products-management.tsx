"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ProductEditDialog } from "@/components/admin/product-edit-dialog"

// Mock product data
const mockProducts = [
  {
    id: "PRD-001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 45,
    minStock: 20,
    supplier: "TechCorp",
    status: "active",
    image: "/wireless-headphones.png",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "PRD-002",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 299.99,
    stock: 12,
    minStock: 10,
    supplier: "FurniMax",
    status: "active",
    image: "/ergonomic-office-chair.png",
    description: "Comfortable ergonomic chair for office use",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand Adjustable",
    category: "Accessories",
    price: 49.99,
    stock: 8,
    minStock: 25,
    supplier: "AccessoryPlus",
    status: "low_stock",
    image: "/laptop-stand.png",
    description: "Adjustable aluminum laptop stand",
  },
  {
    id: "PRD-004",
    name: "USB-C Cable 6ft",
    category: "Electronics",
    price: 19.99,
    stock: 150,
    minStock: 50,
    supplier: "CableCo",
    status: "active",
    image: "/usb-cable.png",
    description: "High-speed USB-C charging cable",
  },
  {
    id: "PRD-005",
    name: "Desk Organizer Set",
    category: "Office Supplies",
    price: 34.99,
    stock: 0,
    minStock: 15,
    supplier: "OrganizePro",
    status: "out_of_stock",
    image: "/desk-organizer.png",
    description: "Complete desk organization solution",
  },
]

const categories = ["All", "Electronics", "Furniture", "Accessories", "Office Supplies"]
const statusOptions = ["All", "active", "low_stock", "out_of_stock"]

export function ProductsManagement() {
  const [products] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [editingProduct, setEditingProduct] = useState<(typeof mockProducts)[0] | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (stock <= minStock) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Low Stock
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        In Stock
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your inventory products and stock levels</p>
        </div>
        <Link href="/admin/products/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Low Stock</p>
                <p className="text-2xl font-bold">
                  {products.filter((p) => p.stock <= p.minStock && p.stock > 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium">Out of Stock</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock === 0).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active Products</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "All"
                      ? "All Status"
                      : status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{product.stock}</span>
                      {product.stock <= product.minStock && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock, product.minStock)}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <ProductEditDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
        />
      )}
    </div>
  )
}
