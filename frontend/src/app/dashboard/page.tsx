"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Package, Calendar, ChevronRight, ShoppingBag, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Order {
    id: string
    total_amount: string
    status: string
    created_at: string
    items: any[]
}

const STATUS_STYLES: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    cancelled: "bg-red-50 text-red-600",
    delivered: "bg-blue-50 text-blue-600",
    shipped: "bg-blue-50 text-blue-600",
}

export default function DashboardPage() {
    const { token, user } = useAuthStore()
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            router.push("/login")
            return
        }

        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/myorders")
                setOrders(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [token, router])

    if (loading) return (
        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
            <div className="h-10 w-64 skeleton mb-2" />
            <div className="h-5 w-40 skeleton mb-8" />
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-[var(--border)] p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 w-40 skeleton" />
                            <div className="h-6 w-20 skeleton rounded-full" />
                        </div>
                        <div className="h-4 w-32 skeleton mb-2" />
                        <div className="h-5 w-24 skeleton" />
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                {/* Welcome Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                        <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Welcome{user?.name ? `, ${user.name}` : " back"}!
                        </h1>
                        <p className="text-[var(--muted-foreground)]">Here&apos;s an overview of your orders</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Orders", value: orders.length, icon: Package },
                        { label: "Completed", value: orders.filter(o => o.status === 'paid' || o.status === 'delivered').length, icon: ShoppingBag },
                        { label: "Pending", value: orders.filter(o => o.status === 'pending').length, icon: Calendar },
                        { label: "Total Spent", value: `$${orders.reduce((sum, o) => sum + parseFloat(o.total_amount || '0'), 0).toFixed(0)}`, icon: Sparkles },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl border border-[var(--border)] p-4 md:p-5">
                            <stat.icon className="h-5 w-5 text-[var(--rose-gold)] mb-2" />
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Orders Section */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

                    {orders.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-[var(--border)]">
                            <div className="w-20 h-20 rounded-full bg-[var(--blush)] flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-[var(--rose-gold)]" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                            <p className="text-[var(--muted-foreground)] mb-6">Start shopping to see your orders here.</p>
                            <Button className="rounded-full gradient-primary text-white btn-shimmer" asChild>
                                <Link href="/products/skin-care">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Card key={order.id} className="border border-[var(--border)] card-hover rounded-2xl bg-white overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                                    <Package className="h-4 w-4 text-[var(--rose-gold)]" />
                                                    Order #{order.id.slice(0, 8)}
                                                </CardTitle>
                                                <div className="flex items-center gap-1.5 mt-1 text-xs text-[var(--muted-foreground)]">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <span className={`capitalize px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-lg font-bold text-[var(--rose-gold)]">
                                                    ${parseFloat(order.total_amount).toFixed(2)}
                                                </span>
                                                {order.items && (
                                                    <span className="text-xs text-[var(--muted-foreground)] ml-2">
                                                        • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-[var(--muted-foreground)]" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
