"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Droplets, Star } from "lucide-react"
import { useWishlistStore } from "@/store/wishlistStore"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    id: string
    name: string
    price: number
    discountPrice?: number
    image: string
    slug: string
    stock?: number
    rating?: number
    reviews?: number
    tag?: string
}

export default function ProductCard({ id, name, price, discountPrice, image, slug, stock, rating, reviews, tag }: ProductCardProps) {
    const { token } = useAuthStore()
    const router = useRouter()
    const { toggleItem, isInWishlist } = useWishlistStore()

    // We pass string id to store
    const isSaved = isInWishlist(id)

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!token) {
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
            return
        }
        toggleItem(id)
    }

    return (
        <Card className="group overflow-hidden border border-[var(--border)] shadow-sm card-hover bg-white rounded-2xl flex flex-col h-full">
            <div className="relative aspect-square bg-[var(--soft-gray)] flex items-center justify-center overflow-hidden shrink-0">
                <div className="w-20 h-20 rounded-full bg-white/40 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
                    <Droplets className="h-8 w-8 text-[var(--rose-gold)] opacity-50" />
                </div>

                {stock !== undefined && stock <= 5 && stock > 0 && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold z-20 shadow-sm">
                        Only {stock} left
                    </span>
                )}
                {stock === 0 && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold z-20 shadow-sm">
                        Out of Stock
                    </span>
                )}

                {tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--rose-gold)] text-white text-xs font-semibold z-20 shadow-sm">
                        {tag}
                    </span>
                )}

                <button
                    onClick={handleWishlistClick}
                    aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 shadow-sm
                        ${isSaved
                            ? 'bg-white/90 text-red-500 opacity-100'
                            : 'bg-white/60 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 hover:text-[var(--rose-gold)] hover:bg-white'}
                    `}
                >
                    <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
                </button>
            </div>

            <CardHeader className="p-4 pb-1">
                {(rating !== undefined && reviews !== undefined) && (
                    <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`h-3 w-3 ${i <= Math.round(rating) ? 'fill-[var(--rose-gold)] text-[var(--rose-gold)]' : 'text-[var(--border)]'}`} />
                        ))}
                        <span className="text-xs text-[var(--muted-foreground)] ml-1">({reviews})</span>
                    </div>
                )}
                <CardTitle className="text-base font-semibold line-clamp-1" title={name}>{name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grow">
                <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                        ${discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
                    </p>
                    {discountPrice && (
                        <p className="text-sm text-[var(--muted-foreground)] line-through">
                            ${price.toFixed(2)}
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full rounded-full gradient-primary text-white btn-shimmer" asChild>
                    <Link href={`/product/${slug}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
