// Configuração de autenticação do Google para o Repylon
// Este ficheiro contém a lógica para interagir com a API do Google

import { google } from 'googleapis';

// Configurações do OAuth do Google
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXTAUTH_URL 
  ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google` 
  : 'http://localhost:3000/api/auth/callback/google';

/**
 * Cria e retorna um cliente OAuth2 configurado com as credenciais do Google
 */
export function getGoogleOAuthClient() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error(
      'Credenciais do Google não configuradas. Verifique as variáveis de ambiente GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET.'
    );
  }

  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );
}

/**
 * Gera o URL de autorização para o fluxo OAuth do Google
 */
export function getGoogleAuthUrl(scopes: string[] = ['profile', 'email']) {
  const oauth2Client = getGoogleOAuthClient();
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}

/**
 * Troca o código de autorização por tokens de acesso e atualização
 */
export async function getGoogleTokens(code: string) {
  const oauth2Client = getGoogleOAuthClient();
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error('Erro ao obter tokens do Google:', error);
    throw error;
  }
}

/**
 * Obtém informações do perfil do usuário do Google
 */
export async function getGoogleUserInfo(accessToken: string) {
  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({ access_token: accessToken });
  
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });
  
  try {
    const { data } = await oauth2.userinfo.get();
    return data;
  } catch (error) {
    console.error('Erro ao obter informações do usuário do Google:', error);
    throw error;
  }
}
