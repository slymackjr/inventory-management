import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Package } from "lucide-react"

const lowStockItems = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    currentStock: 5,
    minStock: 20,
    supplier: "TechCorp",
  },
  {
    id: "PRD-002",
    name: "Office Chair",
    category: "Furniture",
    currentStock: 2,
    minStock: 10,
    supplier: "FurniMax",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    category: "Accessories",
    currentStock: 8,
    minStock: 25,
    supplier: "AccessoryPlus",
  },
  {
    id: "PRD-004",
    name: "USB Cable",
    category: "Electronics",
    currentStock: 12,
    minStock: 50,
    supplier: "CableCo",
  },
]

export function LowStockAlerts() {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-destructive/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.category} • {item.supplier}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <Badge variant="destructive">
                {item.currentStock} / {item.minStock}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Stock Level</p>
            </div>
            <Button variant="outline" size="sm">
              <Package className="h-4 w-4 mr-2" />
              Reorder
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
