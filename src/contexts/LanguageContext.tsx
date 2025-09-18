'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string, fallback?: string) => string
  isRTL: boolean
}

const translations = {
  ar: {
    'hero.title': 'طعام لذيذ',
    'hero.subtitle': 'توصيل سريع',
    'hero.description': 'اطلب من أفضل المطاعم في مولارس، قفصة. مكونات طازجة، توصيل سريع، وطعم رائع.',
    'payment.cash_only': 'الدفع نقداً عند الاستلام فقط',
    'payment.cards_coming': 'دفع البطاقات قريباً',
    'roles.select_title': 'اختر دورك',
    'roles.select_description': 'كيف تريد استخدام كارثاغو فود؟',
    'roles.customer.title': 'زبون',
    'roles.customer.description': 'اطلب طعاماً لذيذاً من المطاعم المحلية',
    'roles.restaurant.title': 'مطعم',
    'roles.restaurant.description': 'إدارة مطعمك واستقبال الطلبات',
    'roles.rider.title': 'موصل',
    'roles.rider.description': 'توصيل الطلبات وكسب المال',
    'roles.admin.title': 'مدير',
    'roles.admin.description': 'إدارة المنصة والمستخدمين',
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'common.back': 'رجوع',
    'common.back_home': 'العودة للرئيسية'
  },
  fr: {
    'hero.title': 'Nourriture Délicieuse',
    'hero.subtitle': 'Livraison Rapide',
    'hero.description': 'Commandez dans les meilleurs restaurants de Moulares, Gafsa. Ingrédients frais, livraison rapide et goût incroyable.',
    'payment.cash_only': 'Paiement en espèces à la livraison uniquement',
    'payment.cards_coming': 'Paiements par carte bientôt disponibles',
    'roles.select_title': 'Choisissez Votre Rôle',
    'roles.select_description': 'Comment souhaitez-vous utiliser Carthago Food?',
    'roles.customer.title': 'Client',
    'roles.customer.description': 'Commandez de la nourriture délicieuse dans les restaurants locaux',
    'roles.restaurant.title': 'Restaurant',
    'roles.restaurant.description': 'Gérez votre restaurant et recevez des commandes',
    'roles.rider.title': 'Livreur',
    'roles.rider.description': 'Livrez des commandes et gagnez de l\'argent',
    'roles.admin.title': 'Administrateur',
    'roles.admin.description': 'Gérez la plateforme et les utilisateurs',
    'auth.login': 'Connexion',
    'auth.logout': 'Déconnexion',
    'common.back': 'Retour',
    'common.back_home': 'Retour à l\'accueil'
  },
  en: {
    'hero.title': 'Delicious Food',
    'hero.subtitle': 'Delivered Fast',
    'hero.description': 'Order from the best restaurants in Moulares, Gafsa. Fresh ingredients, fast delivery, and amazing taste.',
    'payment.cash_only': 'Cash on Delivery Only',
    'payment.cards_coming': 'Card payments coming soon',
    'roles.select_title': 'Choose Your Role',
    'roles.select_description': 'How would you like to use Carthago Food?',
    'roles.customer.title': 'Customer',
    'roles.customer.description': 'Order delicious food from local restaurants',
    'roles.restaurant.title': 'Restaurant',
    'roles.restaurant.description': 'Manage your restaurant and receive orders',
    'roles.rider.title': 'Rider',
    'roles.rider.description': 'Deliver orders and earn money',
    'roles.admin.title': 'Admin',
    'roles.admin.description': 'Manage the platform and users',
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'common.back': 'Back',
    'common.back_home': 'Back to Home'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    // Check for saved language preference or use browser language
    const savedLang = localStorage.getItem('preferred_language')
    const browserLang = navigator.language.split('-')[0]
    
    if (savedLang && ['ar', 'fr', 'en'].includes(savedLang)) {
      setCurrentLanguage(savedLang)
    } else if (['ar', 'fr'].includes(browserLang)) {
      setCurrentLanguage(browserLang)
    } else {
      setCurrentLanguage('en')
    }
  }, [])

  useEffect(() => {
    // Update document direction and lang attributes
    document.documentElement.setAttribute('lang', currentLanguage)
    document.documentElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr')
    document.body.className = currentLanguage === 'ar' ? 'rtl font-arabic' : 'ltr'
  }, [currentLanguage])

  const setLanguage = (lang: string) => {
    if (['ar', 'fr', 'en'].includes(lang)) {
      setCurrentLanguage(lang)
      localStorage.setItem('preferred_language', lang)
    }
  }

  const t = (key: string, fallback?: string): string => {
    const translation = (translations as any)[currentLanguage]?.[key]
    return translation || fallback || key
  }

  const isRTL = currentLanguage === 'ar'

  const value = {
    currentLanguage,
    setLanguage,
    t,
    isRTL
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}