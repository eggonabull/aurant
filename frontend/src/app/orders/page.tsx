import Link from "next/link"
import { ArrowLeft, Clock, Filter, Search, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
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
          <Link href="/orders" className="text-sm font-medium underline-offset-4 hover:underline">
            Orders
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
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
          <h1 className="flex-1 text-xl font-semibold md:text-2xl">Orders</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
              <Filter className="mr-2 h-3 w-3" />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search orders..." className="h-9 w-[150px] sm:w-[250px] pl-8" />
            </div>
            <Button size="sm" className="h-7 px-3 text-xs">
              New Order
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="border-none p-0">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>View and manage all restaurant orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "1042",
                      table: "5",
                      items: "3",
                      total: "$42.50",
                      status: "In Progress",
                      statusColor: "bg-amber-100 text-amber-800",
                      time: "12 min ago",
                    },
                    {
                      id: "1041",
                      table: "3",
                      items: "2",
                      total: "$28.75",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "18 min ago",
                    },
                    {
                      id: "1040",
                      table: "8",
                      items: "5",
                      total: "$76.20",
                      status: "Pending",
                      statusColor: "bg-red-100 text-red-800",
                      time: "24 min ago",
                    },
                    {
                      id: "1039",
                      table: "2",
                      items: "4",
                      total: "$54.30",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "35 min ago",
                    },
                    {
                      id: "1038",
                      table: "7",
                      items: "2",
                      total: "$32.80",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "42 min ago",
                    },
                    {
                      id: "1037",
                      table: "1",
                      items: "6",
                      total: "$87.65",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "1 hour ago",
                    },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Table {order.table} • {order.items} items • {order.total}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full px-2 py-1 text-xs ${order.statusColor}`}>{order.status}</div>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {order.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="border-none p-0">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
                <CardDescription>View and manage active restaurant orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "1042",
                      table: "5",
                      items: "3",
                      total: "$42.50",
                      status: "In Progress",
                      statusColor: "bg-amber-100 text-amber-800",
                      time: "12 min ago",
                    },
                    {
                      id: "1040",
                      table: "8",
                      items: "5",
                      total: "$76.20",
                      status: "Pending",
                      statusColor: "bg-red-100 text-red-800",
                      time: "24 min ago",
                    },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Table {order.table} • {order.items} items • {order.total}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full px-2 py-1 text-xs ${order.statusColor}`}>{order.status}</div>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {order.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="border-none p-0">
            <Card>
              <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>View and manage completed restaurant orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "1041",
                      table: "3",
                      items: "2",
                      total: "$28.75",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "18 min ago",
                    },
                    {
                      id: "1039",
                      table: "2",
                      items: "4",
                      total: "$54.30",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "35 min ago",
                    },
                    {
                      id: "1038",
                      table: "7",
                      items: "2",
                      total: "$32.80",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "42 min ago",
                    },
                    {
                      id: "1037",
                      table: "1",
                      items: "6",
                      total: "$87.65",
                      status: "Completed",
                      statusColor: "bg-green-100 text-green-800",
                      time: "1 hour ago",
                    },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Table {order.table} • {order.items} items • {order.total}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`rounded-full px-2 py-1 text-xs ${order.statusColor}`}>{order.status}</div>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {order.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
