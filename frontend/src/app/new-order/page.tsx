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

// Menu items data
const menuItems = {
  appetizers: [
    { id: "a1", name: "Garlic Bread", price: 5.99 },
    { id: "a2", name: "Caesar Salad", price: 8.99 },
    { id: "a3", name: "Bruschetta", price: 7.99 },
    { id: "a4", name: "Mozzarella Sticks", price: 6.99 },
  ],
  mains: [
    { id: "m1", name: "Margherita Pizza", price: 14.99 },
    { id: "m2", name: "Spaghetti Carbonara", price: 16.99 },
    { id: "m3", name: "Grilled Salmon", price: 19.99 },
    { id: "m4", name: "Chicken Parmesan", price: 17.99 },
    { id: "m5", name: "Beef Burger", price: 15.99 },
    { id: "m6", name: "Vegetable Stir Fry", price: 13.99 },
  ],
  desserts: [
    { id: "d1", name: "Tiramisu", price: 7.99 },
    { id: "d2", name: "Cheesecake", price: 6.99 },
    { id: "d3", name: "Chocolate Brownie", price: 5.99 },
    { id: "d4", name: "Ice Cream Sundae", price: 4.99 },
  ],
  drinks: [
    { id: "dr1", name: "Red Wine", price: 9.99 },
    { id: "dr2", name: "White Wine", price: 8.99 },
    { id: "dr3", name: "Beer", price: 5.99 },
    { id: "dr4", name: "Soda", price: 2.99 },
    { id: "dr5", name: "Lemonade", price: 3.99 },
    { id: "dr6", name: "Coffee", price: 3.49 },
  ],
}

export default function NewOrderPage() {
  const [selectedTable, setSelectedTable] = useState("")
  const [orderItems, setOrderItems] = useState([])
  const [notes, setNotes] = useState("")

  const addItemToOrder = (item) => {
    const existingItem = orderItems.find((orderItem) => orderItem.id === item.id)

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
  }

  const removeItemFromOrder = (itemId) => {
    const existingItem = orderItems.find((item) => item.id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item)))
    } else {
      setOrderItems(orderItems.filter((item) => item.id !== itemId))
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    // In a real app, this would send the order to a backend
    alert(`Order for Table ${selectedTable} submitted successfully!`)
    // Reset form
    setSelectedTable("")
    setOrderItems([])
    setNotes("")
  }

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
                    <Label htmlFor="table">Select Table</Label>
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
                        <Card key={item.id} className="overflow-hidden">
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
                        <Card key={item.id} className="overflow-hidden">
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
                        <Card key={item.id} className="overflow-hidden">
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
                        <Card key={item.id} className="overflow-hidden">
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
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => removeItemFromOrder(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => addItemToOrder(item)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Add</span>
                            </Button>
                          </div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes</Label>
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
