"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItem, OrderItem, Prisma } from "@prisma/client"
import crypto from "crypto"

// Menu items data
type Menu = Record<string, MenuItem[]>

const menuItems: Menu = {
  appetizers: [
    { menu_item_id: "a1", name: "Garlic Bread", price: new Prisma.Decimal(5.99), menu_id: "m1", description: "Garlic bread with melted butter", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "a2", name: "Caesar Salad", price: new Prisma.Decimal(8.99), menu_id: "m1", description: "Caesar salad with croutons and parmesan", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "a3", name: "Bruschetta", price: new Prisma.Decimal(7.99), menu_id: "m1", description: "Grilled bread with tomatoes and basil", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "a4", name: "Mozzarella Sticks", price: new Prisma.Decimal(6.99), menu_id: "m1", description: "Mozzarella sticks with marinara sauce", created_at: new Date(), updated_at: new Date() },
  ],
  mains: [
    { menu_item_id: "m1", name: "Margherita Pizza", price: new Prisma.Decimal(14.99), menu_id: "m1", description: "Classic Margherita with fresh mozzarella, tomatoes, and basil", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "m2", name: "Spaghetti Carbonara", price: new Prisma.Decimal(16.99), menu_id: "m1", description: "Spaghetti with creamy sauce, pancetta, eggs, and Parmesan", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "m3", name: "Grilled Salmon", price: new Prisma.Decimal(19.99), menu_id: "m1", description: "Grilled salmon with herbs and lemon", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "m4", name: "Chicken Parmesan", price: new Prisma.Decimal(17.99), menu_id: "m1", description: "Chicken breasts with marinara sauce and melted mozzarella", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "m5", name: "Beef Burger", price: new Prisma.Decimal(15.99), menu_id: "m1", description: "Classic beef burger with lettuce, tomato, and cheese", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "m6", name: "Vegetable Stir Fry", price: new Prisma.Decimal(13.99), menu_id: "m1", description: "Stir-fried vegetables with soy sauce and sesame oil", created_at: new Date(), updated_at: new Date() },
  ],
  desserts: [
    { menu_item_id: "d1", name: "Tiramisu", price: new Prisma.Decimal(7.99), menu_id: "m1", description: "Classic tiramisu with coffee-soaked ladyfingers and mascarpone cheese", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "d2", name: "Cheesecake", price: new Prisma.Decimal(6.99), menu_id: "m1", description: "Classic cheesecake with vanilla bean frosting", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "d3", name: "Chocolate Brownie", price: new Prisma.Decimal(5.99), menu_id: "m1", description: "Rich chocolate brownie with vanilla frosting", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "d4", name: "Ice Cream Sundae", price: new Prisma.Decimal(4.99), menu_id: "m1", description: "Classic ice cream sundae with whipped cream and chocolate sauce", created_at: new Date(), updated_at: new Date() },
  ],
  drinks: [
    { menu_item_id: "dr1", name: "Red Wine", price: new Prisma.Decimal(9.99), menu_id: "m1", description: "Full-bodied red wine with dark fruit flavors", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "dr2", name: "White Wine", price: new Prisma.Decimal(8.99), menu_id: "m1", description: "Light and refreshing white wine with citrus flavors", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "dr3", name: "Beer", price: new Prisma.Decimal(5.99), menu_id: "m1", description: "Classic beer with a malty flavor", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "dr4", name: "Soda", price: new Prisma.Decimal(2.99), menu_id: "m1", description: "Refreshing soda with a sweet and fizzy taste", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "dr5", name: "Lemonade", price: new Prisma.Decimal(3.99), menu_id: "m1", description: "Citrusy lemonade with a refreshing twist", created_at: new Date(), updated_at: new Date() },
    { menu_item_id: "dr6", name: "Coffee", price: new Prisma.Decimal(3.49), menu_id: "m1", description: "Rich and bold coffee with a bold flavor", created_at: new Date(), updated_at: new Date() },
  ],
}

const flatMenu = Object.values(menuItems).flat();

export default function NewOrderPage() {
  const [selectedTable, setSelectedTable] = useState("")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [notes, setNotes] = useState("")

  const addItemToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find((orderItem: OrderItem) => orderItem.menu_item_id === item.menu_item_id)

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem: OrderItem) =>
          orderItem.menu_item_id === item.menu_item_id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      // Create a new OrderItem with required fields
      setOrderItems([
        ...orderItems,
        {
          order_item_id: crypto.randomUUID(),
          order_id: crypto.randomUUID(), // This would normally come from the actual order
          menu_item_id: item.menu_item_id,
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    }
  };

  const removeItemFromOrder = (itemId: string) => {
    const existingItem = orderItems.find((item) => item.order_item_id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      setOrderItems(orderItems.map((item) => (item.order_item_id === itemId ? { ...item, quantity: item.quantity - 1 } : item)))
    } else {
      setOrderItems(orderItems.filter((item) => item.order_item_id !== itemId))
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, orderItem) => {
      const menuItem = flatMenu.find(m => m.menu_item_id === orderItem.menu_item_id);
      return menuItem ? total + menuItem.price.toNumber() * orderItem.quantity : total;
    }, 0)
  };

  const handleSubmitOrder = () => {
    // In a real app, this would send the order to a backend
    alert(`Order for Table ${selectedTable} submitted successfully!`)
    // Reset form
    setSelectedTable("")
    setOrderItems([])
    setNotes("")
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Utensils className="h-6 w-6" />
          <span className="text-xl">aurant.dev</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/orders"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Orders
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Menu
          </Link>
          <Link
            href="/tables"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Tables
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 text-xl font-semibold md:text-2xl">New Order</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Select Table</Label>
                    <Select value={selectedTable} onValueChange={setSelectedTable}>
                      <SelectTrigger id="table">
                        <SelectValue placeholder="Select a table" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => i + 1).map((table) => (
                          <SelectItem key={table} value={table.toString()}>
                            Table {table}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="appetizers">
                  <TabsList className="mb-4">
                    <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                    <TabsTrigger value="mains">Main Courses</TabsTrigger>
                    <TabsTrigger value="desserts">Desserts</TabsTrigger>
                    <TabsTrigger value="drinks">Drinks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="appetizers" className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {menuItems.appetizers.map((item) => (
                        <Card key={item.menu_item_id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="mt-1 font-medium">${item.price.toFixed(2)}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addItemToOrder(item)}
                                className="h-8 w-8 rounded-full p-0"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mains" className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {menuItems.mains.map((item) => (
                        <Card key={item.menu_item_id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="mt-1 font-medium">${item.price.toFixed(2)}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addItemToOrder(item)}
                                className="h-8 w-8 rounded-full p-0"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="desserts" className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {menuItems.desserts.map((item) => (
                        <Card key={item.menu_item_id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="mt-1 font-medium">${item.price.toFixed(2)}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addItemToOrder(item)}
                                className="h-8 w-8 rounded-full p-0"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="drinks" className="mt-0">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {menuItems.drinks.map((item) => (
                        <Card key={item.menu_item_id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="mt-1 font-medium">${item.price.toFixed(2)}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addItemToOrder(item)}
                                className="h-8 w-8 rounded-full p-0"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTable ? (
                  <p className="text-sm font-medium mb-4">Table: {selectedTable}</p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">No table selected</p>
                )}

                {orderItems.length > 0 ? (
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.menu_item_id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => removeItemFromOrder(item.menu_item_id)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => {
                                const orderItem = item;
                                const menuItem = flatMenu.find(m => m.menu_item_id === orderItem.menu_item_id);
                                if (menuItem) {
                                  addItemToOrder(menuItem)
                                }
                              }}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Add</span>
                            </Button>
                          </div>
                          <span className="text-sm font-medium">{menuItems.mains.find(m => m.menu_item_id === item.menu_item_id)?.name ||
                            menuItems.appetizers.find(a => a.menu_item_id === item.menu_item_id)?.name ||
                            menuItems.desserts.find(d => d.menu_item_id === item.menu_item_id)?.name ||
                            menuItems.drinks.find(dr => dr.menu_item_id === item.menu_item_id)?.name ||
                            'Unknown Item'}</span>
                        </div>
                        ${((menuItem) => {
                          if (menuItem) {
                            return <span className="text-sm font-medium">${menuItem.price.toNumber() * item.quantity}</span>;
                          }

                        })
                          (flatMenu.find(m => m.menu_item_id === item.menu_item_id))
                        }
                      </div>
                    ))}

                    <Separator />

                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <Label>Order Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Special instructions..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No items in order</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={!selectedTable || orderItems.length === 0}
                  onClick={handleSubmitOrder}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Submit Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
