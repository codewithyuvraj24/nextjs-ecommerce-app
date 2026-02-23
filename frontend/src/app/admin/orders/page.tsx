"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])

    useEffect(() => {
        api.get("/orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await api.put(`/orders/${id}/status`, { status })
            setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
        } catch (err) {
            alert("Failed to update status")
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Orders</h1>
            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium border-b">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                                <td className="p-4 font-mono">{order.id.slice(0, 8)}</td>
                                <td className="p-4">{order.user_name || "Unknown"}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">${parseFloat(order.total_amount).toFixed(2)}</td>
                                <td className="p-4 text-right">
                                    {order.status === 'pending' && (
                                        <Button size="sm" onClick={() => handleStatusUpdate(order.id, 'paid')}>
                                            Mark Paid
                                        </Button>
                                    )}
                                    {order.status === 'paid' && (
                                        <Button size="sm" onClick={() => handleStatusUpdate(order.id, 'shipped')}>
                                            Ship
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div className="p-8 text-center text-muted-foreground">No orders found</div>}
            </div>
        </div>
    )
}
