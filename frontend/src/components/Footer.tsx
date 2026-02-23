import Link from "next/link"
import { Sparkles, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-[var(--charcoal)] text-white overflow-hidden">
            {/* Decorative top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--rose-gold)] to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-[var(--rose-gold)]" />
                            <span className="text-xl font-bold tracking-tight">Glow & Co.</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                            Premium hair and skin care products crafted with nature&apos;s finest ingredients for your natural beauty.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--rose-gold)] hover:border-[var(--rose-gold)] transition-all duration-300">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--rose-gold)] hover:border-[var(--rose-gold)] transition-all duration-300">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--rose-gold)] hover:border-[var(--rose-gold)] transition-all duration-300">
                                <Facebook className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Shop</h4>
                        <ul className="space-y-3">
                            {[
                                { href: "/products/skin-care", label: "Skin Care" },
                                { href: "/products/hair-care", label: "Hair Care" },
                                { href: "/products/skin-care", label: "New Arrivals" },
                                { href: "/products/skin-care", label: "Best Sellers" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-white/50 hover:text-[var(--rose-gold)] transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Support</h4>
                        <ul className="space-y-3">
                            {["Contact Us", "FAQs", "Shipping & Returns", "Track Order"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/50 hover:text-[var(--rose-gold)] transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Stay Updated</h4>
                        <p className="text-sm text-white/50 mb-4">
                            Get beauty tips and exclusive offers delivered to your inbox.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-l-lg text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--rose-gold)] transition-colors"
                            />
                            <button aria-label="Subscribe to newsletter" className="px-4 py-2.5 gradient-primary rounded-r-lg hover:opacity-90 transition-opacity">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        &copy; {currentYear} Glow & Co. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-xs text-white/40 hover:text-white/70 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
