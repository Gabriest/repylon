"use client";

import { useState } from "react";
import Link from "next/link";
import { sendWelcomeEmail, sendOrderNotification } from "@/core/emailProcessor";

export default function EmailExample() {
  // Redirecionamento para login é feito no lado do cliente
  // Não precisamos usar session e status diretamente neste exemplo
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  
  // Formulário de email de boas-vindas
  const [welcomeEmail, setWelcomeEmail] = useState("");
  const [welcomeName, setWelcomeName] = useState("");
  
  // Formulário de notificação de ordem
  const [notificationEmail, setNotificationEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderTotal, setOrderTotal] = useState("");

  // Função para enviar email de boas-vindas
  const handleSendWelcomeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");
    
    try {
      const success = await sendWelcomeEmail(welcomeEmail, welcomeName);
      
      if (success) {
        setMessage(`Email de boas-vindas enviado com sucesso para ${welcomeEmail}`);
        setMessageType("success");
        // Limpar formulário
        setWelcomeEmail("");
        setWelcomeName("");
      } else {
        setMessage("Falha ao enviar email de boas-vindas. Verifique os dados e tente novamente.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erro ao enviar email de boas-vindas:", error);
      setMessage("Ocorreu um erro ao enviar o email de boas-vindas.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para enviar notificação de ordem
  const handleSendOrderNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");
    
    try {
      const success = await sendOrderNotification(
        notificationEmail,
        orderNumber,
        customerName,
        orderTotal
      );
      
      if (success) {
        setMessage(`Notificação de ordem enviada com sucesso para ${notificationEmail}`);
        setMessageType("success");
        // Limpar formulário
        setNotificationEmail("");
        setOrderNumber("");
        setCustomerName("");
        setOrderTotal("");
      } else {
        setMessage("Falha ao enviar notificação de ordem. Verifique os dados e tente novamente.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erro ao enviar notificação de ordem:", error);
      setMessage("Ocorreu um erro ao enviar a notificação de ordem.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Exemplo de Envio de Email</h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Voltar ao Painel
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Mensagem de feedback */}
        {message && (
          <div className={`px-4 py-3 mb-6 rounded-md ${
            messageType === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Formulário de Email de Boas-vindas */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enviar Email de Boas-vindas
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Simule o envio de um email de boas-vindas para um novo utilizador.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <form onSubmit={handleSendWelcomeEmail} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="welcome-email" className="block text-sm font-medium text-gray-700">
                      Email do Destinatário
                    </label>
                    <input
                      type="email"
                      id="welcome-email"
                      value={welcomeEmail}
                      onChange={(e) => setWelcomeEmail(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="welcome-name" className="block text-sm font-medium text-gray-700">
                      Nome do Destinatário
                    </label>
                    <input
                      type="text"
                      id="welcome-name"
                      value={welcomeName}
                      onChange={(e) => setWelcomeName(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isLoading ? "Enviando..." : "Enviar Email de Boas-vindas"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Formulário de Notificação de Ordem */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enviar Notificação de Ordem
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Simule o envio de uma notificação de nova ordem Shopify.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <form onSubmit={handleSendOrderNotification} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="notification-email" className="block text-sm font-medium text-gray-700">
                      Email do Lojista
                    </label>
                    <input
                      type="email"
                      id="notification-email"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">
                      Número da Ordem
                    </label>
                    <input
                      type="text"
                      id="order-number"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700">
                      Nome do Cliente
                    </label>
                    <input
                      type="text"
                      id="customer-name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-total" className="block text-sm font-medium text-gray-700">
                      Total da Ordem
                    </label>
                    <input
                      type="text"
                      id="order-total"
                      value={orderTotal}
                      onChange={(e) => setOrderTotal(e.target.value)}
                      required
                      placeholder="€99.99"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {isLoading ? "Enviando..." : "Enviar Notificação de Ordem"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
