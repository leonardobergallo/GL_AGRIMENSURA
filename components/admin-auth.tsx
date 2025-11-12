"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Verificar si ya está autenticado en la sesión
    const auth = sessionStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Contraseña simple (en producción deberías usar una variable de entorno)
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authenticated", "true")
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Contraseña incorrecta")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    setIsAuthenticated(false)
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Panel de Administración</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Ingresa la contraseña para acceder
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="mt-2"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white border-b border-border px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">Panel de Administración</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
      {children}
    </div>
  )
}
