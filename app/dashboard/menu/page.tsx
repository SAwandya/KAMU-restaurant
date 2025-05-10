"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Edit, Plus, Search, Trash2 } from "lucide-react"
import Image from "next/image"
import { useMenuItems } from "@/hooks/use-menu"
import type { MenuItem } from "@/lib/types"

export default function MenuPage() {
  const { toast } = useToast()
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems()
  const [searchQuery, setSearchQuery] = useState("")
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: "",
    category: "main",
    image: "/placeholder.svg?height=100&width=100",
  })
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Error",
        description: "Name and price are required",
        variant: "destructive",
      })
      return
    }

    const price = Number.parseFloat(newItem.price as string)
    if (isNaN(price)) {
      toast({
        title: "Error",
        description: "Price must be a valid number",
        variant: "destructive",
      })
      return
    }

    addMenuItem({
      ...newItem,
      id: Date.now().toString(),
      price: price,
    } as MenuItem)

    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "main",
      image: "/placeholder.svg?height=100&width=100",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Success",
      description: "Menu item added successfully",
    })
  }

  const handleEditItem = () => {
    if (!editingItem) return

    updateMenuItem(editingItem)
    setIsEditDialogOpen(false)
    setEditingItem(null)

    toast({
      title: "Success",
      description: "Menu item updated successfully",
    })
  }

  const handleDeleteItem = (id: string) => {
    deleteMenuItem(id)

    toast({
      title: "Success",
      description: "Menu item deleted successfully",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
              <DialogDescription>Add a new item to your restaurant menu.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Item name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Item description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="appetizer">Appetizer</option>
                    <option value="main">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="drink">Drink</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu items..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="appetizer">Appetizers</TabsTrigger>
          <TabsTrigger value="main">Main Courses</TabsTrigger>
          <TabsTrigger value="dessert">Desserts</TabsTrigger>
          <TabsTrigger value="drink">Drinks</TabsTrigger>
        </TabsList>

        {["all", "appetizer", "main", "dessert", "drink"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems
                .filter((item) => category === "all" || item.category === category)
                .map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{item.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Dialog
                            open={isEditDialogOpen && editingItem?.id === item.id}
                            onOpenChange={(open) => {
                              setIsEditDialogOpen(open)
                              if (open) setEditingItem(item)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Menu Item</DialogTitle>
                                <DialogDescription>Make changes to your menu item.</DialogDescription>
                              </DialogHeader>
                              {editingItem && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingItem.name}
                                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={editingItem.description}
                                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-price">Price ($)</Label>
                                      <Input
                                        id="edit-price"
                                        value={editingItem.price}
                                        onChange={(e) =>
                                          setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-category">Category</Label>
                                      <select
                                        id="edit-category"
                                        value={editingItem.category}
                                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      >
                                        <option value="appetizer">Appetizer</option>
                                        <option value="main">Main Course</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="drink">Drink</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditItem}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
