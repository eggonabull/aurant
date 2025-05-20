import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, Search, Trash2, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MenuPage() {
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
          <Link href="/menu" className="text-sm font-medium underline-offset-4 hover:underline">
            Menu
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Tables
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 text-xl font-semibold md:text-2xl">Menu</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search menu..." className="h-9 w-[150px] sm:w-[250px] pl-8" />
            </div>
            <Button size="sm" className="h-7 px-3 text-xs">
              <Plus className="mr-1 h-3 w-3" />
              Add Item
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
              <TabsTrigger value="mains">Main Courses</TabsTrigger>
              <TabsTrigger value="desserts">Desserts</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="border-none p-0">
            <Card>
              <CardHeader>
                <CardTitle>All Menu Items</CardTitle>
                <CardDescription>View and manage your restaurant&apos;s menu items.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: "1",
                      name: "Garlic Bread",
                      category: "Appetizers",
                      price: "$5.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "2",
                      name: "Caesar Salad",
                      category: "Appetizers",
                      price: "$8.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "3",
                      name: "Margherita Pizza",
                      category: "Main Courses",
                      price: "$14.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "4",
                      name: "Spaghetti Carbonara",
                      category: "Main Courses",
                      price: "$16.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "5",
                      name: "Tiramisu",
                      category: "Desserts",
                      price: "$7.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "6",
                      name: "Cheesecake",
                      category: "Desserts",
                      price: "$6.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "7",
                      name: "Red Wine",
                      category: "Drinks",
                      price: "$9.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "8",
                      name: "Lemonade",
                      category: "Drinks",
                      price: "$3.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "9",
                      name: "Grilled Salmon",
                      category: "Main Courses",
                      price: "$19.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="mt-1 font-medium">{item.price}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appetizers" className="border-none p-0">
            <Card>
              <CardHeader>
                <CardTitle>Appetizers</CardTitle>
                <CardDescription>View and manage your appetizer menu items.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: "1",
                      name: "Garlic Bread",
                      category: "Appetizers",
                      price: "$5.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "2",
                      name: "Caesar Salad",
                      category: "Appetizers",
                      price: "$8.99",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="mt-1 font-medium">{item.price}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Other tab contents would follow the same pattern */}
        </Tabs>
      </main>
    </div>
  )
}
