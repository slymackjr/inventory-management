"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Users, ShoppingCart, X } from "lucide-react"

interface SearchResult {
  id: string
  type: "product" | "customer" | "order"
  title: string
  subtitle: string
  url: string
}

// Mock search results
const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "product",
    title: "Wireless Bluetooth Headphones",
    subtitle: "Electronics • $99.99",
    url: "/admin/products",
  },
  {
    id: "2",
    type: "customer",
    title: "John Smith",
    subtitle: "john@example.com",
    url: "/admin/users",
  },
  {
    id: "3",
    type: "order",
    title: "ORD-001",
    subtitle: "Pending • $299.99",
    url: "/admin/orders",
  },
]

const typeIcons = {
  product: Package,
  customer: Users,
  order: ShoppingCart,
}

const typeColors = {
  product: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
  order: "bg-purple-100 text-purple-800",
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (query.length > 2) {
      // Mock search - in real app, this would call an API
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        className="relative w-64 justify-start text-muted-foreground bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4 mr-2" />
        Search...
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4">
        <CardContent className="p-0">
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, customers, orders..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => {
                const Icon = typeIcons[result.type]
                return (
                  <div
                    key={result.id}
                    className="flex items-center space-x-3 p-4 hover:bg-muted cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setIsOpen(false)
                      // Navigate to result URL
                      window.location.href = result.url
                    }}
                  >
                    <div className="p-2 bg-muted rounded-full">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{result.title}</p>
                      <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                    </div>
                    <Badge className={typeColors[result.type]}>{result.type}</Badge>
                  </div>
                )
              })}
            </div>
          )}

          {query.length > 2 && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}

          {query.length <= 2 && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Type at least 3 characters to search</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
