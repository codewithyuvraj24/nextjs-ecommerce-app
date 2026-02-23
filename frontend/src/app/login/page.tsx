"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const setAuth = useAuthStore((state) => state.setAuth)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await api.post("/auth/login", { email, password })
            setAuth(res.data.user, res.data.token)
            localStorage.setItem("token", res.data.token)
            router.push("/")
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[85vh] flex">
            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                        <p className="text-sm text-[var(--muted-foreground)] mt-2">Sign in to access your account and orders</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm text-center px-4 py-3 rounded-xl animate-scale-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 rounded-xl h-11 border-[var(--border)] focus:border-[var(--rose-gold)] focus:ring-[var(--rose-gold)]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                                <a href="#" className="text-xs text-[var(--rose-gold)] hover:text-[var(--rose-gold-dark)] transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 rounded-xl h-11 border-[var(--border)] focus:border-[var(--rose-gold)] focus:ring-[var(--rose-gold)]"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-full gradient-primary text-white py-5 text-base btn-shimmer"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-[var(--muted-foreground)]">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-[var(--rose-gold)] font-medium hover:text-[var(--rose-gold-dark)] transition-colors">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right - Decorative Panel */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero animate-gradient" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center text-white space-y-6 max-w-sm animate-fade-in">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                            <Sparkles className="h-10 w-10" />
                        </div>
                        <h2 className="text-3xl font-bold">Your Beauty Journey Awaits</h2>
                        <p className="text-white/70 leading-relaxed">
                            Access your personalized recommendations, track orders, and unlock exclusive member benefits.
                        </p>
                        <div className="flex items-center justify-center gap-4 pt-4">
                            {["10K+ Customers", "Premium Quality", "Free Returns"].map((item) => (
                                <span key={item} className="text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
