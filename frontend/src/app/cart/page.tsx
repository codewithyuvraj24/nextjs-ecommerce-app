"use client"

import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore()

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-md animate-fade-in-up">
                    <div className="w-24 h-24 rounded-full bg-[var(--blush)] flex items-center justify-center mx-auto">
                        <ShoppingBag className="h-10 w-10 text-[var(--rose-gold)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Cart is Empty</h1>
                        <p className="text-[var(--muted-foreground)]">Looks like you haven&apos;t added anything yet. Start browsing our curated collection.</p>
                    </div>
                    <Button className="rounded-full gradient-primary text-white px-8 py-5 btn-shimmer" asChild>
                        <Link href="/products/skin-care" className="flex items-center gap-2">
                            Start Shopping <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
                <p className="text-[var(--muted-foreground)] mb-8">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-[var(--border)] p-4 md:p-5 flex gap-4 card-hover">
                                {/* Image */}
                                <div className="h-24 w-24 md:h-28 md:w-28 bg-gradient-to-br from-[var(--blush)] to-[var(--secondary)] rounded-xl flex items-center justify-center shrink-0">
                                    <Sparkles className="h-8 w-8 text-[#c9a87c] opacity-40" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className="font-semibold text-base md:text-lg truncate">
                                            <Link href={`/product/${item.slug}`} className="hover:text-[var(--rose-gold)] transition-colors">
                                                {item.name}
                                            </Link>
                                        </h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            aria-label="Remove item"
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-red-50 transition-all shrink-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <p className="text-[var(--rose-gold)] font-semibold mb-3">${item.price.toFixed(2)}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors mt-2"
                        >
                            Clear entire cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96">
                        <div className="lg:sticky lg:top-24 space-y-4">
                            <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-4">
                                <h2 className="font-bold text-lg">Order Summary</h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--muted-foreground)]">Subtotal ({items.length} items)</span>
                                        <span className="font-medium">${totalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--muted-foreground)]">Shipping</span>
                                        <span className="text-[var(--success)] font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--muted-foreground)]">Tax</span>
                                        <span className="font-medium">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-[var(--border)] pt-4 flex justify-between items-baseline">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-2xl text-[var(--rose-gold)]">${totalPrice().toFixed(2)}</span>
                                </div>

                                <Button className="w-full rounded-full gradient-primary text-white py-5 text-base btn-shimmer shadow-lg" size="lg" asChild>
                                    <Link href="/checkout" className="flex items-center justify-center gap-2">
                                        Proceed to Checkout <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Trust Strip */}
                            <div className="flex items-center justify-center gap-6 py-3">
                                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                                    <ShieldCheck className="h-4 w-4 text-[var(--rose-gold)]" />
                                    Secure Checkout
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                                    <Truck className="h-4 w-4 text-[var(--rose-gold)]" />
                                    Free Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
