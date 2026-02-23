"use client"

import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { Mail, Lock, Eye, EyeOff, User, Sparkles } from "lucide-react"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const setAuth = useAuthStore((state) => state.setAuth)
    const router = useRouter()

    const getPasswordStrength = () => {
        if (password.length === 0) return { level: 0, label: "", color: "" }
        if (password.length < 6) return { level: 1, label: "Weak", color: "bg-[var(--destructive)]" }
        if (password.length < 8) return { level: 2, label: "Fair", color: "bg-[var(--warning)]" }
        const hasUpper = /[A-Z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const hasSpecial = /[^A-Za-z0-9]/.test(password)
        const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length
        if (score >= 2 && password.length >= 8) return { level: 4, label: "Strong", color: "bg-[var(--success)]" }
        return { level: 3, label: "Good", color: "bg-[var(--info)]" }
    }

    const strength = getPasswordStrength()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await api.post("/auth/register", { name, email, password })
            setAuth(res.data.user, res.data.token)
            localStorage.setItem("token", res.data.token)
            router.push("/")
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[85vh] flex">
            {/* Left - Decorative Panel */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero animate-gradient" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center text-white space-y-6 max-w-sm animate-fade-in">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                            <Sparkles className="h-10 w-10" />
                        </div>
                        <h2 className="text-3xl font-bold">Join the Glow Family</h2>
                        <p className="text-white/70 leading-relaxed">
                            Create your account to unlock personalized skincare recommendations, exclusive discounts, and early access to new products.
                        </p>
                        <div className="space-y-3 pt-4">
                            {["Personalized Recommendations", "Exclusive Member Discounts", "Early Access to Launches"].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                        <p className="text-sm text-[var(--muted-foreground)] mt-2">Join us for a personalized beauty experience</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm text-center px-4 py-3 rounded-xl animate-scale-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 rounded-xl h-11 border-[var(--border)] focus:border-[var(--rose-gold)] focus:ring-[var(--rose-gold)]"
                                    required
                                />
                            </div>
                        </div>

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
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
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
                            {/* Password Strength Indicator */}
                            {password.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.level ? strength.color : "bg-[var(--border)]"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-[var(--muted-foreground)]">
                                        Password strength: <span className="font-medium">{strength.label}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full rounded-full gradient-primary text-white py-5 text-base btn-shimmer"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-[var(--muted-foreground)]">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[var(--rose-gold)] font-medium hover:text-[var(--rose-gold-dark)] transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
