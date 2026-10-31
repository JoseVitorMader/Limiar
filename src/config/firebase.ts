import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuração fornecida pelo usuário para o projeto LIMIAR
export const firebaseConfig = {
  apiKey: "AIzaSyBBPdI8nwf5lj5RO0CJaF3sk0vlTY_sKck",
  authDomain: "limiar-b25c1.firebaseapp.com",
  projectId: "limiar-b25c1",
  storageBucket: "limiar-b25c1.firebasestorage.app",
  messagingSenderId: "186246398659",
  appId: "1:186246398659:web:c32eaaf4831c9e0f145876",
  measurementId: "G-FQF5BETY6E"
};

// Inicialização do Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Inicialização condicional do Analytics (caso suportado pelo navegador)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn('Firebase Analytics não pôde ser iniciado:', e);
      }
    }
  }).catch(() => {
    // Suporte a analytics indisponível ou bloqueado
  });
}
