import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Star, Shield, Leaf, Droplets, ArrowRight, Sparkles, Heart } from "lucide-react"

const FEATURED_PRODUCTS = [
  { id: 1, name: "Radiance Serum", price: 29.99, tag: "Best Seller", rating: 4.8, reviews: 124 },
  { id: 2, name: "Hydrating Cleanser", price: 19.99, tag: "New", rating: 4.6, reviews: 89 },
  { id: 3, name: "Night Cream", price: 34.99, tag: null, rating: 4.9, reviews: 203 },
  { id: 4, name: "Vitamin C Tonic", price: 24.99, tag: "Popular", rating: 4.7, reviews: 156 },
]

const TRUST_POINTS = [
  { icon: Leaf, title: "100% Natural", desc: "Formulated with pure, natural ingredients sourced responsibly." },
  { icon: Shield, title: "Dermatologist Tested", desc: "Every product is clinically tested and approved by experts." },
  { icon: Droplets, title: "Cruelty Free", desc: "We never test on animals. Beauty with a clear conscience." },
  { icon: Heart, title: "Made with Love", desc: "Small-batch production ensures the highest quality in every bottle." },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ========= HERO SECTION ========= */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d8] via-[#fdf2e9] to-[#e8d5c4] animate-gradient" />
          {/* Decorative circles */}
          <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full blur-3xl animate-float hero-circle-gold" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full blur-3xl animate-float delay-300 hero-circle-light" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-3xl px-4 py-20">
          {/* Badge */}
          <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-sm font-medium text-[#7a6530] hero-badge-border">
            <Sparkles className="h-4 w-4" />
            Premium Skincare Collection
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-[var(--charcoal)]">
            Reveal Your{" "}
            <span className="font-display italic gradient-text">Natural Glow</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-[#5a5a6e] max-w-xl mx-auto leading-relaxed">
            Premium skincare and haircare formulated with nature&apos;s best ingredients for radiant, healthy beauty.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gradient-primary text-white px-8 py-6 text-base rounded-full btn-shimmer hover:shadow-xl transition-all duration-300 hero-shadow" asChild>
              <Link href="/products/skin-care" className="flex items-center gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base rounded-full text-[#1a1a2e] hover:bg-gray-100 hero-outline-border" asChild>
              <Link href="/products/hair-care">Explore Collection</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="animate-fade-in-up delay-500 flex items-center justify-center gap-6 pt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--rose-gold-light)] to-[var(--rose-gold)] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[var(--rose-gold)] text-[var(--rose-gold)]" />
                ))}
              </div>
              <p className="text-xs text-[#5a5a6e]">Loved by 10,000+ customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========= CATEGORIES ========= */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--rose-gold)] mb-2">Collections</p>
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Skin Care */}
          <Link href="/products/skin-care" className="group relative h-80 md:h-96 rounded-2xl overflow-hidden block">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-rose-50 to-amber-50 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="text-center">
                <Droplets className="h-10 w-10 text-white/80 mx-auto mb-3" />
                <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Collection</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Skin Care</h3>
              <span className="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                Explore products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Hair Care */}
          <Link href="/products/hair-care" className="group relative h-80 md:h-96 rounded-2xl overflow-hidden block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-white/80 mx-auto mb-3" />
                <p className="text-sm text-white/60 uppercase tracking-wider mb-1">Collection</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Hair Care</h3>
              <span className="inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                Explore products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ========= FEATURED PRODUCTS ========= */}
      <section className="bg-[var(--soft-gray)] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[var(--rose-gold)] mb-2">Curated for You</p>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            </div>
            <Link href="/products/skin-care" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[var(--rose-gold)] hover:text-[var(--rose-gold-dark)] transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-sm card-hover bg-white rounded-2xl">
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-[var(--blush)] to-[var(--secondary)] flex items-center justify-center overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-white/40 flex items-center justify-center">
                    <Droplets className="h-10 w-10 text-[#c9a87c] opacity-50 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {product.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--rose-gold)] text-white text-xs font-semibold">
                      {product.tag}
                    </span>
                  )}
                  <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                    <Heart className="h-4 w-4 text-[var(--rose-gold)]" />
                  </button>
                </div>

                <CardHeader className="p-4 pb-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`h-3 w-3 ${i <= Math.round(product.rating) ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                    ))}
                    <span className="text-xs text-[var(--muted-foreground)] ml-1">({product.reviews})</span>
                  </div>
                  <CardTitle className="text-base font-semibold">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-lg font-bold text-[var(--rose-gold)]">${product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full rounded-full gradient-primary text-white btn-shimmer hover:shadow-md transition-all" asChild>
                    <Link href={`/product/product-${product.id}`}>Add to Cart</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/products/skin-care" className="flex items-center gap-2">
                View All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========= WHY CHOOSE US ========= */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--rose-gold)] mb-2">Why Glow & Co.</p>
          <h2 className="text-3xl md:text-4xl font-bold">The Glow Difference</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_POINTS.map((point, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-[var(--blush)] flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--rose-gold)] transition-colors duration-300">
                <point.icon className="h-7 w-7 text-[var(--rose-gold)] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========= CTA BANNER ========= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero animate-gradient" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Start Your Glow Journey
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
            Join thousands who&apos;ve transformed their skincare routine with our premium products.
          </p>
          <Button size="lg" className="bg-white text-[var(--charcoal)] px-8 py-6 text-base rounded-full hover:bg-white/90 shadow-lg transition-all duration-300" asChild>
            <Link href="/register" className="flex items-center gap-2">
              Create Account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
