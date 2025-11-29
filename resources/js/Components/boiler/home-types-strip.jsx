"use client"

import { Home, Building2, Castle, Building } from "lucide-react"

const homeTypes = [
  {
    name: "Terrace",
    icon: Home,
    description: "Compact heating solutions",
  },
  {
    name: "Semi-detached",
    icon: Building2,
    description: "Mid-size home systems",
  },
  {
    name: "Detached",
    icon: Castle,
    description: "Larger capacity boilers",
  },
  {
    name: "Flat",
    icon: Building,
    description: "Space-efficient options",
  },
]

export function HomeTypesStrip() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          We service all home types
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
          {homeTypes.map((type) => (
            <div
              key={type.name}
              className="group flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <type.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{type.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
