"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { useAuthStore } from "@/store/authStore"
import { useState, useEffect } from "react"

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const items = useCartStore((s) => s.items)
    const { user, token } = useAuthStore()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const navLinks = [
        { href: "/products/skin-care", label: "Skin Care" },
        { href: "/products/hair-care", label: "Hair Care" },
    ]

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "glass shadow-lg shadow-black/5"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Sparkles className="h-5 w-5 text-[var(--rose-gold)] group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-xl md:text-2xl font-bold tracking-tight gradient-text">
                            Glow & Co.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium text-[#333340] hover:text-[#1a1a2e] transition-colors group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--rose-gold)] transition-all duration-300 group-hover:w-full rounded-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* User */}
                        <Link href={token ? "/dashboard" : "/login"}>
                            <Button variant="ghost" size="icon" className="relative rounded-full" style={{ ['--tw-bg-opacity' as any]: 1 }} >
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative rounded-full" >
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[var(--rose-gold)] text-white text-xs font-semibold flex items-center justify-center animate-scale-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Mobile Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden rounded-full"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Spacer */}
            <div className="h-16 md:h-18" />

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
                {/* Drawer */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 bg-[var(--background)] shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-end p-4">
                        <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1 px-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 rounded-lg text-base font-medium hover:bg-[var(--secondary)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="my-2 border-t" />
                        <Link
                            href={token ? "/dashboard" : "/login"}
                            onClick={() => setMobileOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium hover:bg-[var(--secondary)] transition-colors"
                        >
                            {token ? "My Account" : "Sign In"}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
