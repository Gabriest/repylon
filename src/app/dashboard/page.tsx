"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirecionar para login se não estiver autenticado
      window.location.href = "/auth/signin";
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Verificar se o usuário está autenticado
  const isAuthenticated = status === "authenticated";
  const isGoogle = isAuthenticated && session?.provider === "google";
  const isShopify = isAuthenticated && session?.provider === "shopify";

  // Função para lidar com logout
  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel Repylon</h1>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Saindo..." : "Sair"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Informações do usuário */}
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-medium text-gray-900">Informações da Conta</h2>
            
            {isAuthenticated ? (
              <div className="mt-4">
                <p><strong>Nome:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Provedor:</strong> {session.provider}</p>
                
                {isShopify && session.shopify && (
                  <div className="mt-2">
                    <p><strong>Loja Shopify:</strong> {session.shopify.shopDomain}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-4">Carregando informações...</p>
            )}
          </div>
        </div>

        {/* Navegação para exemplos */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Exemplos de Funcionalidades</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Exemplo de Email */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Envio de Email</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Teste o envio de emails de boas-vindas e notificações.
                </p>
                <div className="mt-4">
                  <Link
                    href="/examples/email"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Ver Exemplo
                  </Link>
                </div>
              </div>
            </div>

            {/* Exemplo de Integração Shopify (apenas se estiver conectado com Shopify) */}
            {isShopify && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Integração Shopify</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore a integração com sua loja Shopify.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/examples/shopify"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Ver Exemplo
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Exemplo de Integração Google (apenas se estiver conectado com Google) */}
            {isGoogle && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Integração Google</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore a integração com sua conta Google.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/examples/google"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      Ver Exemplo
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
