import Link from "next/link"
import { ArrowLeft, Plus, Search, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TablesPage() {
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
          <Link href="/tables" className="text-sm font-medium underline-offset-4 hover:underline">
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
          <h1 className="flex-1 text-xl font-semibold md:text-2xl">Tables</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tables..." className="h-9 w-[150px] sm:w-[250px] pl-8" />
            </div>
            <Button size="sm" className="h-7 px-3 text-xs">
              <Plus className="mr-1 h-3 w-3" />
              Add Table
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Table Management</CardTitle>
            <CardDescription>View and manage your restaurant&apos;s tables.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 15 }, (_, i) => i + 1).map((table) => {
                const isOccupied = table <= 6
                const hasOrder = table <= 4

                return (
                  <Card key={table} className={`overflow-hidden ${isOccupied ? "border-red-200" : "border-green-200"}`}>
                    <CardHeader className={`p-3 ${isOccupied ? "bg-red-50" : "bg-green-50"}`}>
                      <CardTitle>Table {table}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <span className={isOccupied ? "text-red-600" : "text-green-600"}>
                            {isOccupied ? "Occupied" : "Available"}
                          </span>
                        </div>
                        {isOccupied && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span>Guests:</span>
                              <span>{Math.floor(Math.random() * 4) + 2}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Time:</span>
                              <span>{Math.floor(Math.random() * 60) + 10} min</span>
                            </div>
                            {hasOrder && (
                              <div className="flex justify-between text-sm">
                                <span>Order:</span>
                                <span className="text-amber-600">In Progress</span>
                              </div>
                            )}
                            <Button size="sm" className="w-full mt-2 h-7 text-xs">
                              View Details
                            </Button>
                          </>
                        )}
                        {!isOccupied && (
                          <Button variant="outline" size="sm" className="w-full mt-2 h-7 text-xs">
                            Assign Guests
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
