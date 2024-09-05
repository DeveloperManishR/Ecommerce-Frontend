import React from 'react'

const Home = () => {
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Welcome back, John!
            </h3>
            <p className="text-sm text-muted-foreground">Here's a quick overview of your business.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">120</div>
                <div className="text-muted-foreground">Total Orders</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">$12,345</div>
                <div className="text-muted-foreground">Total Revenue</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">32</div>
                <div className="text-muted-foreground">New Customers</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Top Selling Products
              </h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width="48"
                      height="48"
                      alt="Product"
                      className="rounded-md"
                      // style="aspect-ratio:48/48;object-fit:cover"
                    />
                    <div>
                      <div className="font-medium">Acme Lamp</div>
                      <div className="text-muted-foreground text-sm">Lighting</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$49.99</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width="48"
                      height="48"
                      alt="Product"
                      className="rounded-md"
                      // style="aspect-ratio:48/48;object-fit:cover"
                    />
                    <div>
                      <div className="font-medium">Acme Chair</div>
                      <div className="text-muted-foreground text-sm">Furniture</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$99.99</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width="48"
                      height="48"
                      alt="Product"
                      className="rounded-md"
                      // style="aspect-ratio:48/48;object-fit:cover"
                    />
                    <div>
                      <div className="font-medium">Acme Desk</div>
                      <div className="text-muted-foreground text-sm">Furniture</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$199.99</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Recent Orders</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
                    </span>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-muted-foreground text-sm">Order #123</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$99.99</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">JA</span>
                    </span>
                    <div>
                      <div className="font-medium">Jane Appleseed</div>
                      <div className="text-muted-foreground text-sm">Order #124</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$149.99</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">SM</span>
                    </span>
                    <div>
                      <div className="font-medium">Sarah Miller</div>
                      <div className="text-muted-foreground text-sm">Order #125</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">$79.99</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Events</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-2 text-primary-foreground">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs">May</div>
                    </div>
                    <div>
                      <div className="font-medium">Product Launch</div>
                      <div className="text-muted-foreground text-sm">Acme Inc HQ</div>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    RSVP
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-2 text-primary-foreground">
                      <div className="text-2xl font-bold">20</div>
                      <div className="text-xs">Jun</div>
                    </div>
                    <div>
                      <div className="font-medium">Company Picnic</div>
                      <div className="text-muted-foreground text-sm">Acme Park</div>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home