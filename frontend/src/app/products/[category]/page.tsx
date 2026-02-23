import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Star, Heart, SlidersHorizontal, ChevronRight, Droplets, Home } from "lucide-react"

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
    rating: number;
    reviews: number;
    tag?: string;
}

const PRODUCTS: Product[] = [
    { id: 1, name: "Radiance Serum", price: 29.99, image: "placeholder", slug: "radiance-serum", rating: 4.8, reviews: 124, tag: "Best Seller" },
    { id: 2, name: "Hydrating Cleanser", price: 19.99, image: "placeholder", slug: "hydrating-cleanser", rating: 4.6, reviews: 89 },
    { id: 3, name: "Night Cream", price: 34.99, image: "placeholder", slug: "night-cream", rating: 4.9, reviews: 203 },
    { id: 4, name: "Vitamin C Tonic", price: 24.99, image: "placeholder", slug: "vitamin-c-tonic", rating: 4.7, reviews: 156, tag: "New" },
    { id: 5, name: "Rose Face Mist", price: 15.99, image: "placeholder", slug: "rose-face-mist", rating: 4.5, reviews: 67 },
    { id: 6, name: "Deep Conditioner", price: 27.99, image: "placeholder", slug: "deep-conditioner", rating: 4.8, reviews: 98, tag: "Popular" },
];

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;
    const formattedCategory = category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Breadcrumbs */}
            <div className="bg-[var(--soft-gray)] border-b border-[var(--border)]">
                <div className="container mx-auto px-4 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1">
                            <Home className="h-3.5 w-3.5" />
                            Home
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        <span className="font-medium">{formattedCategory}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{formattedCategory}</h1>
                    <p className="text-[var(--muted-foreground)]">Discover our curated collection of premium {formattedCategory.toLowerCase()} products.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                                <SlidersHorizontal className="h-5 w-5 text-[var(--rose-gold)]" />
                                Filters
                            </div>

                            {/* Price Range */}
                            <div className="bg-white rounded-xl p-4 border border-[var(--border)] space-y-3">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--muted-foreground)]">Price Range</h3>
                                <div className="space-y-2.5">
                                    {["Under $25", "$25 - $50", "$50+"].map((range) => (
                                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-[var(--border)] text-[var(--rose-gold)] focus:ring-[var(--rose-gold)] accent-[var(--rose-gold)]"
                                            />
                                            <span className="text-sm group-hover:text-[var(--foreground)] text-[var(--muted-foreground)] transition-colors">{range}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Product Type */}
                            <div className="bg-white rounded-xl p-4 border border-[var(--border)] space-y-3">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--muted-foreground)]">Product Type</h3>
                                <div className="space-y-2.5">
                                    {["Serums", "Cleansers", "Moisturizers", "Toners", "Masks"].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-[var(--border)] text-[var(--rose-gold)] focus:ring-[var(--rose-gold)] accent-[var(--rose-gold)]"
                                            />
                                            <span className="text-sm group-hover:text-[var(--foreground)] text-[var(--muted-foreground)] transition-colors">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="bg-white rounded-xl p-4 border border-[var(--border)] space-y-3">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--muted-foreground)]">Rating</h3>
                                <div className="space-y-2.5">
                                    {[4, 3, 2].map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-[var(--border)] text-[var(--rose-gold)] focus:ring-[var(--rose-gold)] accent-[var(--rose-gold)]"
                                            />
                                            <span className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star key={i} className={`h-3.5 w-3.5 ${i <= rating ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                                                ))}
                                                <span className="text-xs text-[var(--muted-foreground)] ml-1">& up</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Sort bar */}
                        <div className="flex items-center justify-between mb-6 bg-white rounded-xl px-4 py-3 border border-[var(--border)]">
                            <span className="text-sm text-[var(--muted-foreground)]">{PRODUCTS.length} products</span>
                            <select aria-label="Sort products" className="text-sm border border-[var(--border)] rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-[var(--rose-gold)] cursor-pointer">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Highest Rated</option>
                                <option>Newest</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {PRODUCTS.map((product) => (
                                <Card key={product.id} className="group overflow-hidden border border-[var(--border)] shadow-sm card-hover rounded-2xl bg-white">
                                    <div className="relative aspect-square bg-gradient-to-br from-[var(--blush)] to-[var(--secondary)] flex items-center justify-center overflow-hidden">
                                        <div className="w-20 h-20 rounded-full bg-white/40 flex items-center justify-center">
                                            <Droplets className="h-8 w-8 text-[#c9a87c] opacity-50 group-hover:scale-110 transition-transform duration-300" />
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
                                        <Button className="w-full rounded-full gradient-primary text-white btn-shimmer" asChild>
                                            <Link href={`/product/${product.slug}`}>View Details</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
