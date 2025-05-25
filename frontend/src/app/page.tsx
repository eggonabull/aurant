import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  ChefHat,
  Clock,
  CreditCard,
  DollarSign,
  LineChart,
  Menu,
  ShieldCheck,
  Star,
  Utensils,
} from "lucide-react"

function Header() {
  return (<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2 pl-1">
        <Utensils className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Aurant</span>
      </div>
      <nav className="hidden md:flex gap-6">
        <Link href="#features" className="text-sm font-medium hover:text-primary">
          Features
        </Link>
        <Link href="#pricing" className="text-sm font-medium hover:text-primary">
          Pricing
        </Link>
        <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
          Testimonials
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:text-primary">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4 pr-2">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
          Log in
        </Link>
        <Button asChild>
          <Link href="#contact">Get Started</Link>
        </Button>
      </div>
    </div>
  </header>)
}

function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Product</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#features" className="text-sm hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="#pricing" className="text-sm hover:underline underline-offset-4">
                Pricing
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Integrations
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Updates
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Blog
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Documentation
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Guides
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Support Center
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                About
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Careers
              </Link>
              <Link href="#contact" className="text-sm hover:underline underline-offset-4">
                Contact
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Partners
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                Cookie Policy
              </Link>
              <Link href="#" className="text-sm hover:underline underline-offset-4">
                GDPR
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Aurant</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Aurant, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Restaurant Operations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The all-in-one POS solution designed specifically for restaurants. Increase efficiency, reduce
                    errors, and boost your bottom line.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#contact">Start Free Trial</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-primary" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-background shadow-xl">
                  <Image
                    src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width={800}
                    height={600}
                    alt="Restaurant POS System Dashboard"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Trusted by 1000+ Restaurants
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Restaurant Owners Choose Aurant
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our POS system is built specifically for the unique challenges of the restaurant industry.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://images.pexels.com/photos/12935075/pexels-photo-12935075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                width={500}
                height={500}
                alt="Restaurant staff using Aurant POS"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">Faster Service</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Reduce order times by up to 30% with our intuitive interface and streamlined workflows.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">Seamless Payments</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Accept all payment types with integrated processing and split-bill functionality.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">Real-time Analytics</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Make data-driven decisions with comprehensive sales, inventory, and staff performance reports.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to run your restaurant efficiently in one platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Menu className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>
                    Easily manage orders from multiple sources - in-person, online, and delivery services.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Table management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Split bills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Customizable modifiers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ChefHat className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Kitchen Display System</CardTitle>
                  <CardDescription>
                    Streamline kitchen operations with digital ticket management and real-time updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Order timing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Recipe viewing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Prep station routing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>
                    Track inventory levels in real-time and automate purchasing workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Automatic depletion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Vendor management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Low stock alerts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <LineChart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Advanced Reporting</CardTitle>
                  <CardDescription>
                    Gain insights into your business with comprehensive analytics and reporting.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Sales analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Labor cost tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Custom report builder</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure Payments</CardTitle>
                  <CardDescription>
                    Process payments securely with integrated payment processing and fraud protection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>EMV compliance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Contactless payments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Gift card integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>
                    Manage employee schedules, track time, and monitor performance all in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Shift scheduling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Time tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Performance metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your restaurant. All plans include 24/7 support.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="text-4xl font-bold">
                    $99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for small cafes and food trucks.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>1 POS terminal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Basic reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Order management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center justify-center rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground w-fit mx-auto mb-2">
                    Most Popular
                  </div>
                  <CardTitle>Professional</CardTitle>
                  <div className="text-4xl font-bold">
                    $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Ideal for full-service restaurants.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>3 POS terminals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Advanced reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Inventory management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Kitchen display system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>24/7 phone & email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-4xl font-bold">
                    $399<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For multi-location restaurants and chains.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Unlimited POS terminals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Custom reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Multi-location management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what restaurant owners have to say about Aurant.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="https://images.pexels.com/photos/4349812/pexels-photo-4349812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      width={50}
                      height={50}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Sarah Johnson</CardTitle>
                      <CardDescription>Bistro Owner</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Aurant has completely transformed how we run our bistro. Order times are down, staff is happier,
                    and our profits are up 20% since implementing the system."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="https://images.pexels.com/photos/5920775/pexels-photo-5920775.jpeg?auto=compress&cs=tinysrgb&w=600"
                      width={50}
                      height={50}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Michael Rodriguez</CardTitle>
                      <CardDescription>Restaurant Chain Owner</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Managing multiple locations used to be a nightmare. With Aurant's enterprise solution, I can now
                    see real-time data across all my restaurants from a single dashboard."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="https://images.pexels.com/photos/6223007/pexels-photo-6223007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      width={50}
                      height={50}
                      alt="Customer"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">Emily Chen</CardTitle>
                      <CardDescription>Café Owner</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The customer support team at Aurant is incredible. Whenever we have a question or issue, they're
                    there to help 24/7. Best decision we ever made for our café."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">See Aurant in Action</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Watch our demo to see how Aurant can transform your restaurant operations. From order taking to
                    inventory management, our system handles it all.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#contact">Request Live Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg border bg-background shadow-xl aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-16 w-16 rounded-full bg-background/80 backdrop-blur"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="sr-only">Play Demo</span>
                    </Button>
                  </div>
                  <Image
                    src="https://images.pexels.com/photos/5711932/pexels-photo-5711932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width={600}
                    height={400}
                    alt="Product Demo Thumbnail"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Restaurant?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with our team to schedule a demo or start your free trial today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Contact Information</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>sales@aurant.dev</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>123 Restaurant Row, Foodie City, FC 12345</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Get Started Today</h3>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="restaurant-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Restaurant Name
                    </label>
                    <input
                      id="restaurant-name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your Restaurant"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your restaurant and needs..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
