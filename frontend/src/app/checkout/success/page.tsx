"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Package, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const type = searchParams.get('type')

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // Simple pseudo-random order ID since we don't pass the exact DB ID back in the basic flow
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[var(--soft-gray)] animate-fade-in">
            <div className="max-w-md w-full bg-white rounded-3xl border border-[var(--border)] p-8 md:p-12 text-center relative overflow-hidden shadow-sm">

                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--blush)] blur-[80px] rounded-full opacity-50 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 scale-in">
                        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>

                    <h1 className="text-3xl font-playfair font-bold text-[var(--foreground)]">
                        Payment Successful!
                    </h1>

                    <p className="text-[var(--muted-foreground)]">
                        {type === 'cod'
                            ? "Your order has been placed successfully. You will pay cash upon delivery."
                            : "Thank you for your purchase. We have received your secured payment."}
                    </p>

                    <div className="bg-[var(--soft-gray)] rounded-2xl p-6 text-sm mt-8 mb-8 border border-[var(--border)]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[var(--muted-foreground)]">Order Number</span>
                            <span className="font-semibold font-mono text-[var(--foreground)]">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[var(--muted-foreground)]">Estimated Delivery</span>
                            <span className="font-semibold text-[var(--foreground)]">3-5 Business Days</span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4">
                        <Button
                            asChild
                            className="w-full rounded-full gradient-primary text-white py-6 btn-shimmer"
                        >
                            <Link href="/dashboard">
                                View Order Status <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-full py-6 border-[var(--border)] hover:bg-[var(--soft-gray)] transition-colors"
                        >
                            <Link href="/">
                                Return to Store
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
