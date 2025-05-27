"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { getShopifyAuthUrls } from "@/lib/shopify/auth";
import Link from "next/link";

export default function SignIn() {
  const [shopDomain, setShopDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para lidar com login do Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Erro ao fazer login com Google:", err);
      setError("Ocorreu um erro ao tentar fazer login com Google. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com login da Shopify
  const handleShopifySignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (!shopDomain || !shopDomain.includes("myshopify.com")) {
      setError("Por favor, insira um domínio Shopify válido (exemplo: sua-loja.myshopify.com)");
      setIsLoading(false);
      return;
    }
    
    try {
      // Obter URL de autorização da Shopify
      const { authUrl } = getShopifyAuthUrls(shopDomain);
      
      // Redirecionar para a página de autorização da Shopify
      window.location.href = authUrl;
    } catch (err) {
      console.error("Erro ao iniciar login com Shopify:", err);
      setError("Ocorreu um erro ao tentar conectar com a Shopify. Verifique o domínio e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entrar no Repylon
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Escolha um método de login abaixo
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          {/* Botão de login do Google */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Carregando..." : "Entrar com Google"}
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Ou</span>
            </div>
          </div>
          
          {/* Formulário de login da Shopify */}
          <form onSubmit={handleShopifySignIn} className="mt-8 space-y-6">
            <div>
              <label htmlFor="shop-domain" className="block text-sm font-medium text-gray-700">
                Domínio da Loja Shopify
              </label>
              <div className="mt-1">
                <input
                  id="shop-domain"
                  name="shop"
                  type="text"
                  required
                  value={shopDomain}
                  onChange={(e) => setShopDomain(e.target.value)}
                  placeholder="sua-loja.myshopify.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? "Carregando..." : "Conectar Loja Shopify"}
              </button>
            </div>
          </form>
          
          <div className="text-sm text-center">
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
