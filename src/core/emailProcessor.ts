// Processador de Email para o Repylon
// Este módulo fornece funcionalidades para envio de emails

interface EmailData {
  to: string;
  subject: string;
  body: string;
  // Campos opcionais
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
  from?: string; // Se não fornecido, usa o padrão da configuração
}

/**
 * Processa e envia um email.
 * @param data Os dados do email a serem processados.
 * @returns Promessa que resolve para verdadeiro se o email foi processado com sucesso, falso caso contrário.
 */
async function processEmail(data: EmailData): Promise<boolean> {
  // Validação básica
  if (!data.to || !data.subject || !data.body) {
    console.error("Dados do email incompletos.");
    return false;
  }

  try {
    // Aqui entraria a lógica real para interagir com um serviço de email
    // Por exemplo, usando Nodemailer, SendGrid, Amazon SES, etc.
    
    // Simulação de envio bem-sucedido para fins de demonstração
    console.log(`[EMAIL] Enviando para: ${data.to}`);
    console.log(`[EMAIL] Assunto: ${data.subject}`);
    console.log(`[EMAIL] Corpo: ${data.body.substring(0, 50)}...`);
    
    if (data.cc?.length) {
      console.log(`[EMAIL] CC: ${data.cc.join(', ')}`);
    }
    
    if (data.bcc?.length) {
      console.log(`[EMAIL] BCC: ${data.bcc.join(', ')}`);
    }
    
    if (data.attachments?.length) {
      console.log(`[EMAIL] Anexos: ${data.attachments.length} ficheiro(s)`);
    }
    
    // Simulação de atraso de rede (para demonstração)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log("[EMAIL] Enviado com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao processar email:", error);
    return false;
  }
}

/**
 * Envia um email de boas-vindas para um novo utilizador.
 * @param email Email do utilizador.
 * @param name Nome do utilizador.
 * @returns Promessa que resolve para verdadeiro se o email foi enviado com sucesso.
 */
async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const subject = "Bem-vindo ao Repylon!";
  const body = `
    Olá ${name},
    
    Bem-vindo ao Repylon! Estamos muito felizes por tê-lo connosco.
    
    Com o Repylon, você pode facilmente integrar sua loja Shopify com várias ferramentas e automatizar processos.
    
    Para começar, aceda ao seu painel em: https://app.repylon.com/dashboard
    
    Se tiver alguma dúvida, não hesite em contactar-nos respondendo a este email.
    
    Cumprimentos,
    A Equipa Repylon
  `;
  
  return processEmail({
    to: email,
    subject,
    body
  });
}

/**
 * Envia uma notificação de nova ordem na loja Shopify.
 * @param email Email do lojista.
 * @param orderNumber Número da ordem.
 * @param customerName Nome do cliente.
 * @param orderTotal Total da ordem.
 * @returns Promessa que resolve para verdadeiro se o email foi enviado com sucesso.
 */
async function sendOrderNotification(
  email: string, 
  orderNumber: string, 
  customerName: string,
  orderTotal: string
): Promise<boolean> {
  const subject = `Nova Ordem #${orderNumber} na sua loja Shopify`;
  const body = `
    Olá,
    
    Recebeu uma nova ordem na sua loja Shopify.
    
    Detalhes da Ordem:
    - Número: #${orderNumber}
    - Cliente: ${customerName}
    - Total: ${orderTotal}
    
    Aceda ao seu painel Shopify para processar esta ordem.
    
    Cumprimentos,
    A Equipa Repylon
  `;
  
  return processEmail({
    to: email,
    subject,
    body
  });
}

export { 
  processEmail, 
  sendWelcomeEmail,
  sendOrderNotification,
  type EmailData 
};
