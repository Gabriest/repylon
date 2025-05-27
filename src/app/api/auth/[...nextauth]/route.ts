import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getShopifyAccessToken } from "@/lib/shopify/auth";
import type { NextAuthOptions, SessionStrategy } from "next-auth";

// Tipo personalizado para a sessão estendida
declare module "next-auth" {
  interface Session {
    provider?: string;
    shopify?: {
      accessToken: string;
      shopDomain: string;
    };
  }
}

// Tipo personalizado para o token JWT estendido
declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    shopifyAccessToken?: string;
    shopDomain?: string;
  }
}

// Configuração do NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    // Provedor Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // Provedor personalizado para Shopify
    CredentialsProvider({
      id: "shopify",
      name: "Shopify Store",
      credentials: {
        shop: { label: "Shop Domain", type: "text", placeholder: "your-store.myshopify.com" },
        code: { label: "Authorization Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.shop || !credentials?.code) {
          return null;
        }
        
        try {
          // Obter token de acesso da Shopify usando o código de autorização
          const accessToken = await getShopifyAccessToken(
            credentials.shop,
            credentials.code
          );
          
          if (!accessToken) {
            return null;
          }
          
          // Retornar objeto de usuário com informações da loja Shopify
          return {
            id: credentials.shop,
            name: credentials.shop,
            email: `store@${credentials.shop}`,
            image: null,
            accessToken
          };
        } catch (error) {
          console.error("Erro na autenticação Shopify:", error);
          return null;
        }
      }
    })
  ],
  
  // Configurações de sessão
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  
  // Configurações de páginas personalizadas
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  
  // Callbacks personalizados
  callbacks: {
    async jwt({ token, user, account }) {
      // Adicionar informações do provedor ao token
      if (account && user) {
        token.provider = account.provider;
        
        // Para Shopify, adicionar o token de acesso
        if (account.provider === "shopify" && 'accessToken' in user) {
          token.shopifyAccessToken = user.accessToken as string;
          token.shopDomain = user.name || '';
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      // Adicionar informações do provedor à sessão
      if (token) {
        session.provider = token.provider;
        
        // Para Shopify, adicionar informações da loja
        if (token.provider === "shopify") {
          session.shopify = {
            accessToken: token.shopifyAccessToken || '',
            shopDomain: token.shopDomain || ''
          };
        }
      }
      return session;
    }
  },
  
  // Configurações de segurança
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Handler para as rotas de autenticação
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
