"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewProductPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        stock: "",
        category: "",
        description: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/products", {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: [], // Placeholder
                ingredients: ""
            })
            router.push("/admin/products")
        } catch (err) {
            alert("Failed to create product")
        }
    }

    return (
        <div className="max-w-2xl bg-card p-8 rounded-lg border">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input name="slug" value={formData.slug} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <Input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Input name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        aria-label="Product Description"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" className="w-full">Create Product</Button>
            </form>
        </div>
    )
}
