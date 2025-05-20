import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse bg-muted" />
            <div className="h-4 w-48 animate-pulse bg-muted" />
            <div className="h-4 w-64 animate-pulse bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}