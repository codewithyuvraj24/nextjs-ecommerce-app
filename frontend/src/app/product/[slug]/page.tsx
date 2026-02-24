"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Star, Heart, Truck, RotateCcw, ShieldCheck, ChevronRight, Home, Minus, Plus, Droplets, Check, Loader2 } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string
    const addItem = useCartStore((state) => state.addItem)

    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${slug}`)
                setProduct(res.data)
            } catch (err) {
                console.error("Failed to load product", err)
            } finally {
                setLoading(false)
            }
        }
        if (slug) fetchProduct()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <Loader2 className="h-10 w-10 animate-spin text-[var(--rose-gold)]" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Button asChild><Link href="/">Return Home</Link></Button>
            </div>
        )
    }

    // Temporarily mocking rating data until we hook up the reviews table
    const rating = 4.8;
    const reviewsCount = 124;
    const discountPrice = parseFloat(product.discount_price);
    const regularPrice = parseFloat(product.price);
    const activePrice = discountPrice && discountPrice < regularPrice ? discountPrice : regularPrice;
    const discountPercent = discountPrice && discountPrice < regularPrice ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) : 0;
    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addItem({
            id: product.id,
            name: product.name,
            price: activePrice,
            quantity: quantity,
            slug: slug,
        })
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const handleBuyNow = () => {
        if (isOutOfStock) return;
        handleAddToCart()
        router.push("/checkout")
    }

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(q => q - 1)
    }

    const increaseQuantity = () => {
        if (quantity < product.stock) setQuantity(q => q + 1)
    }

    return (
        <div className="min-h-screen bg-[var(--background)] pb-24">
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
                        <div className="aspect-square bg-[var(--soft-gray)] rounded-2xl flex items-center justify-center overflow-hidden relative group">
                            <div className="w-40 h-40 rounded-full bg-white/40 flex items-center justify-center">
                                <Droplets className="h-20 w-20 text-[var(--rose-gold)] opacity-40 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            {discountPercent > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[var(--destructive)] text-white text-xs font-bold">
                                    -{discountPercent}%
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
                                    className={`aspect-square bg-[var(--soft-gray)] rounded-xl flex items-center justify-center cursor-pointer border-2 transition-all ${i === 1 ? "border-[var(--rose-gold)]" : "border-transparent hover:border-[#c9a87c]/30"
                                        }`}
                                >
                                    <Droplets className="h-6 w-6 text-[var(--rose-gold)] opacity-30" />
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
                                        <Star key={i} className={`h-4 w-4 ${i <= Math.round(rating) ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-[var(--muted-foreground)]">{rating} ({reviewsCount} reviews)</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-[var(--rose-gold)]">${activePrice.toFixed(2)}</span>
                            {discountPercent > 0 && (
                                <span className="text-lg text-[var(--muted-foreground)] line-through">${regularPrice.toFixed(2)}</span>
                            )}
                            {discountPercent > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                                    Save {discountPercent}%
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[var(--muted-foreground)] leading-relaxed">{product.description || "Premium formula designed to nourish and revitalize."}</p>

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
                                        disabled={quantity <= 1 || isOutOfStock}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <button
                                        aria-label="Increase quantity"
                                        onClick={increaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors disabled:opacity-30"
                                        disabled={quantity >= product.stock || isOutOfStock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                {isOutOfStock ? (
                                    <span className="text-sm text-[var(--destructive)] font-bold">Out of Stock</span>
                                ) : product.stock <= 5 ? (
                                    <span className="text-sm text-amber-600 font-bold">Only {product.stock} left in stock - order soon.</span>
                                ) : (
                                    <span className="text-sm text-[var(--success)] font-medium">In stock</span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    size="lg"
                                    disabled={isOutOfStock}
                                    className={`flex-1 gap-2 text-white rounded-full py-6 text-base btn-shimmer shadow-lg transition-all duration-300 ${addedToCart ? 'bg-emerald-600 hover:bg-emerald-700' : 'gradient-primary'}`}
                                    onClick={handleAddToCart}
                                >
                                    {addedToCart ? (
                                        <><Check className="h-5 w-5" /> Added to Cart!</>
                                    ) : isOutOfStock ? (
                                        "Out of Stock"
                                    ) : (
                                        <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
                                    )}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    disabled={isOutOfStock}
                                    className="rounded-full py-6 text-base border-black text-black hover:bg-black/5"
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
                    </div>
                </div>

                {/* Customer Reviews UI Skeleton */}
                <div className="mt-20 pt-10 border-t border-[var(--border)]">
                    <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Summary Col */}
                        <div className="bg-[var(--soft-gray)] p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                            <span className="text-5xl font-bold">{rating}</span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className={`h-5 w-5 ${i <= Math.round(rating) ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                                ))}
                            </div>
                            <span className="text-sm text-[var(--muted-foreground)] mt-2">Based on {reviewsCount} reviews</span>
                            <Button variant="outline" className="mt-4 rounded-full w-full border-[var(--rose-gold)] text-[var(--rose-gold)] hover:bg-[var(--rose-gold)]/5">Write a Review</Button>
                        </div>

                        {/* Sample Reviews */}
                        <div className="md:col-span-2 space-y-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[var(--rose-gold)]/20 flex items-center justify-center font-bold text-[var(--rose-gold)] text-xs">AM</div>
                                            <span className="font-semibold text-sm">Alex M.</span>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1"><Check className="h-3 w-3" /> Verified</span>
                                        </div>
                                        <span className="text-xs text-[var(--muted-foreground)]">2 weeks ago</span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-3.5 w-3.5 fill-[var(--rose-gold)] text-[var(--rose-gold)]" />
                                        ))}
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1">Absolutely love it!</h4>
                                    <p className="text-sm text-[var(--muted-foreground)]">I've been using this for a month now and the difference is incredible. It absorbs quickly and doesn't leave any greasy residue. Definitely adding this to my daily routine permanently.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
