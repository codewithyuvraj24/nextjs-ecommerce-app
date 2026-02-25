"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { useAuthStore } from "@/store/authStore"
import { useState, useEffect } from "react"

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const items = useCartStore((s) => s.items)
    const wishlistItems = useWishlistStore((s) => s.items)
    const { user, token } = useAuthStore()

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const wishlistCount = wishlistItems.length

    const navLinks = [
        { href: "/products/skin-care", label: "Skin Care" },
        { href: "/products/hair-care", label: "Hair Care" },
    ]

    return (
        <>
            <nav className="sticky top-0 left-0 right-0 z-50 navbar-luxury">
                <div className="container mx-auto px-6 lg:px-14 navbar-luxury-inner">

                    {/* Logo — left */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <Sparkles className="h-4 w-4 text-[#b8893c] group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-[#b8893c]">
                            Glow & Co.
                        </span>
                    </Link>

                    {/* Right side — links + icons */}
                    <div className="hidden md:flex items-center gap-9">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-[13px] font-medium text-[#f6efe6] hover:text-[#b8893c] transition-colors duration-300 group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b8893c] opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-4 bg-[#f6efe6]/12" />

                        {/* Icons */}
                        <div className="flex items-center gap-1">
                            <Link href={token ? "/dashboard" : "/login"}>
                                <Button variant="ghost" size="icon" className="navbar-icon-btn">
                                    <User className="h-[18px] w-[18px]" />
                                </Button>
                            </Link>
                            <Link href="/wishlist">
                                <Button variant="ghost" size="icon" className="navbar-icon-btn relative">
                                    <Heart className="h-[18px] w-[18px]" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#b8893c] text-white text-[10px] font-semibold flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                            <Link href="/cart">
                                <Button variant="ghost" size="icon" className="navbar-icon-btn relative">
                                    <ShoppingCart className="h-[18px] w-[18px]" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#b8893c] text-white text-[10px] font-semibold flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile — icons + toggle */}
                    <div className="flex md:hidden items-center gap-0.5">
                        <Link href="/wishlist">
                            <Button variant="ghost" size="icon" className="navbar-icon-btn relative">
                                <Heart className="h-[18px] w-[18px]" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#b8893c] text-white text-[10px] font-semibold flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="navbar-icon-btn relative">
                                <ShoppingCart className="h-[18px] w-[18px]" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#b8893c] text-white text-[10px] font-semibold flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="navbar-icon-btn"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                <div className={`absolute top-0 right-0 h-full w-72 bg-[#1f1a17] shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-end p-4">
                        <Button variant="ghost" size="icon" className="navbar-icon-btn" onClick={() => setMobileOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1 px-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 rounded-lg text-sm font-medium text-[#f6efe6] hover:bg-white/5 hover:text-[#b8893c] transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="my-3 border-t border-white/8" />
                        <Link
                            href={token ? "/dashboard" : "/login"}
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 rounded-lg text-sm font-medium text-[#f6efe6] hover:bg-white/5 hover:text-[#b8893c] transition-colors duration-300"
                        >
                            {token ? "My Account" : "Sign In"}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
