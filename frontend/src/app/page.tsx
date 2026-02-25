import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/ProductCard"

const FEATURED_PRODUCTS = [
  { id: 1, name: "Radiance Serum", price: 29.99, tag: "Best Seller", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=750&fit=crop" },
  { id: 2, name: "Hydrating Cleanser", price: 19.99, tag: "New", rating: 4.6, reviews: 89, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=750&fit=crop" },
  { id: 3, name: "Night Cream", price: 34.99, tag: null, rating: 4.9, reviews: 203, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=750&fit=crop" },
  { id: 4, name: "Vitamin C Tonic", price: 24.99, tag: "Popular", rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=750&fit=crop" },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ========= HERO SECTION ========= */}
      <section className="relative w-full">
        {/* Full-bleed hero image */}
        <div className="relative h-[calc(100vh-72px)] min-h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&h=900&fit=crop&crop=center"
            alt="Skincare products on marble surface"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Hero copy — left aligned, over image */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 lg:px-14">
              <div className="max-w-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4">New Collection</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
                  Skincare that<br />actually works.
                </h1>
                <p className="text-base text-white/70 leading-relaxed mb-8 max-w-sm">
                  Clean formulas, real ingredients, visible results. No gimmicks.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-white text-[#1f1a17] px-8 py-6 text-sm font-medium rounded-lg hover:bg-white/90 transition-colors" asChild>
                    <Link href="/products/skin-care" className="flex items-center gap-2">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white px-8 py-6 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors" asChild>
                    <Link href="/products/hair-care">Hair Care</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= CATEGORIES ========= */}
      <section className="container mx-auto px-6 lg:px-14 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-2">Collections</p>
            <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link href="/products/skin-care" className="group relative h-80 md:h-[420px] rounded-xl overflow-hidden block">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop"
              alt="Skin Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="text-2xl font-bold text-white mb-1">Skin Care</h3>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors flex items-center gap-1.5">
                Shop collection <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <Link href="/products/hair-care" className="group relative h-80 md:h-[420px] rounded-xl overflow-hidden block">
            <img
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&h=600&fit=crop"
              alt="Hair Care"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="text-2xl font-bold text-white mb-1">Hair Care</h3>
              <span className="text-sm text-white/70 group-hover:text-white transition-colors flex items-center gap-1.5">
                Shop collection <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========= FEATURED PRODUCTS ========= */}
      <section className="bg-[#f7f5f2] py-20">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--muted-foreground)] mb-2">Our picks</p>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            </div>
            <Link href="/products/skin-care" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#1f1a17] hover:text-[#b8893c] transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id.toString()}
                name={product.name}
                price={product.price}
                image={product.image}
                slug={`product-${product.id}`}
                rating={product.rating}
                reviews={product.reviews}
                tag={product.tag || undefined}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="rounded-lg text-sm" asChild>
              <Link href="/products/skin-care" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========= VALUES — simple horizontal strip ========= */}
      <section className="border-y border-[var(--border)]">
        <div className="container mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--border)]">
            {[
              { label: "Natural", desc: "Clean ingredients" },
              { label: "Tested", desc: "Dermatologist approved" },
              { label: "Cruelty-free", desc: "Never tested on animals" },
              { label: "Small batch", desc: "Handcrafted quality" },
            ].map((item) => (
              <div key={item.label} className="py-8 px-6 text-center">
                <p className="text-sm font-semibold text-[#1f1a17]">{item.label}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= CTA — editorial image with overlay ========= */}
      <section className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&h=600&fit=crop&crop=center"
          alt="Woman applying skincare"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to switch?
            </h2>
            <p className="text-sm text-white/65 mb-7">
              Join 10,000+ people who simplified their routine.
            </p>
            <Button size="lg" className="bg-white text-[#1f1a17] px-8 py-5 text-sm font-medium rounded-lg hover:bg-white/90 transition-colors" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
