"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Star, Heart, Truck, RotateCcw, ShieldCheck, ChevronRight, Home, Minus, Plus, Droplets, Check } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string
    const addItem = useCartStore((state) => state.addItem)

    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    const product = {
        name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        price: 29.99,
        originalPrice: 39.99,
        description: "Experience the ultimate care with our premium formula designed to nourish and revitalize. This expertly-crafted formulation combines the finest natural extracts with advanced science to deliver visible results from the very first use.",
        ingredients: "Aqua, Glycerin, Aloe Barbadensis Leaf Juice, Hyaluronic Acid, Niacinamide, Vitamin E, Jojoba Oil",
        howToUse: "Apply a small amount to clean, damp skin. Gently massage in upward circular motions. Use morning and evening for best results.",
        stock: 10,
        rating: 4.8,
        reviews: 124,
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = () => {
        addItem({
            id: slug,
            name: product.name,
            price: product.price,
            quantity: quantity,
            slug: slug,
        })
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const handleBuyNow = () => {
        addItem({
            id: slug,
            name: product.name,
            price: product.price,
            quantity: quantity,
            slug: slug,
        })
        router.push("/checkout")
    }

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(q => q - 1)
    }

    const increaseQuantity = () => {
        if (quantity < product.stock) setQuantity(q => q + 1)
    }

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
                        <Link href="/products/skin-care" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gradient-to-br from-[var(--blush)] to-[var(--secondary)] rounded-2xl flex items-center justify-center overflow-hidden relative group">
                            <div className="w-40 h-40 rounded-full bg-white/40 flex items-center justify-center">
                                <Droplets className="h-20 w-20 text-[#c9a87c] opacity-40 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--destructive)] text-white text-xs font-bold">
                                    -{discount}%
                                </span>
                            )}
                            <button aria-label="Add to wishlist" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all">
                                <Heart className="h-5 w-5 text-[var(--rose-gold)]" />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={`aspect-square bg-gradient-to-br from-[var(--blush)] to-[var(--secondary)] rounded-xl flex items-center justify-center cursor-pointer border-2 transition-all ${i === 1 ? "border-[var(--rose-gold)]" : "border-transparent hover:border-[#c9a87c]/30"
                                        }`}
                                >
                                    <Droplets className="h-6 w-6 text-[#c9a87c] opacity-30" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title & Rating */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className={`h-4 w-4 ${i <= Math.round(product.rating) ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-[var(--muted-foreground)]">{product.rating} ({product.reviews} reviews)</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[var(--rose-gold)]">${product.price}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-lg text-[var(--muted-foreground)] line-through">${product.originalPrice}</span>
                            )}
                            {discount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                                    Save {discount}%
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[var(--muted-foreground)] leading-relaxed">{product.description}</p>

                        {/* Divider */}
                        <div className="border-t border-[var(--border)]" />

                        {/* Quantity & CTA */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Quantity</span>
                                <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden">
                                    <button
                                        aria-label="Decrease quantity"
                                        onClick={decreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors disabled:opacity-30"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                        aria-label="Increase quantity"
                                        onClick={increaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors disabled:opacity-30"
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-[var(--success)] font-medium">{product.stock} in stock</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    size="lg"
                                    className={`flex-1 gap-2 text-white rounded-full py-6 text-base btn-shimmer shadow-lg transition-all duration-300 ${addedToCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'gradient-primary'}`}
                                    onClick={handleAddToCart}
                                >
                                    {addedToCart ? (
                                        <><Check className="h-5 w-5" /> Added to Cart!</>
                                    ) : (
                                        <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                                    )}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full py-6 text-base border-[#c9a87c] text-[#1a1a2e] hover:bg-amber-50"
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-2">
                            {[
                                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                                { icon: ShieldCheck, label: "Secure Checkout", sub: "SSL encrypted" },
                            ].map((badge) => (
                                <div key={badge.label} className="text-center p-3 rounded-xl bg-[var(--soft-gray)] border border-[var(--border)]">
                                    <badge.icon className="h-5 w-5 text-[var(--rose-gold)] mx-auto mb-1.5" />
                                    <p className="text-xs font-semibold leading-tight">{badge.label}</p>
                                    <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{badge.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Details Tabs */}
                        <div className="space-y-4 pt-4">
                            <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                                <details className="group">
                                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-semibold text-sm hover:bg-[var(--soft-gray)] transition-colors">
                                        Key Ingredients
                                        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                                    </summary>
                                    <div className="px-4 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)] pt-3">
                                        {product.ingredients}
                                    </div>
                                </details>
                            </div>
                            <div className="border border-[var(--border)] rounded-xl overflow-hidden">
                                <details className="group">
                                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-semibold text-sm hover:bg-[var(--soft-gray)] transition-colors">
                                        How to Use
                                        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                                    </summary>
                                    <div className="px-4 pb-4 text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)] pt-3">
                                        {product.howToUse}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
