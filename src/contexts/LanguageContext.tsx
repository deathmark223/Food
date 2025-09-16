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
    'features.title': 'لماذا تختار كارثاغو فود؟',
    'features.local_restaurants': 'مطاعم محلية',
    'features.local_description': 'ادعم الأعمال المحلية في مولارس واستمتع بالمأكولات التونسية الأصيلة',
    'features.fast_delivery': 'توصيل سريع',
    'features.delivery_description': 'توصيل سريع وموثوق إلى باب منزلك مع تتبع في الوقت الفعلي',
    'features.easy_ordering': 'طلب سهل',
    'features.ordering_description': 'عملية طلب بسيطة وبديهية مع خيارات دفع متعددة',
    'footer.description': 'نجلب الطعام اللذيذ إلى مولارس، قفصة، تونس',
    'footer.company': 'الشركة',
    'footer.about': 'عنا',
    'footer.contact': 'اتصل بنا',
    'footer.careers': 'الوظائف',
    'footer.legal': 'قانوني',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.location': 'الموقع',
    'footer.rights': 'جميع الحقوق محفوظة.',
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
    'features.title': 'Pourquoi Choisir Carthago Food?',
    'features.local_restaurants': 'Restaurants Locaux',
    'features.local_description': 'Soutenez les entreprises locales de Moulares et savourez la cuisine tunisienne authentique',
    'features.fast_delivery': 'Livraison Rapide',
    'features.delivery_description': 'Livraison rapide et fiable à votre porte avec suivi en temps réel',
    'features.easy_ordering': 'Commande Facile',
    'features.ordering_description': 'Processus de commande simple et intuitif avec plusieurs options de paiement',
    'footer.description': 'Apporter de la nourriture délicieuse à Moulares, Gafsa, Tunisie',
    'footer.company': 'Entreprise',
    'footer.about': 'À Propos',
    'footer.contact': 'Contact',
    'footer.careers': 'Carrières',
    'footer.legal': 'Légal',
    'footer.terms': 'Conditions de Service',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.cookies': 'Politique des Cookies',
    'footer.location': 'Emplacement',
    'footer.rights': 'Tous droits réservés.',
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
    'features.title': 'Why Choose Carthago Food?',
    'features.local_restaurants': 'Local Restaurants',
    'features.local_description': 'Support local businesses in Moulares and enjoy authentic Tunisian cuisine',
    'features.fast_delivery': 'Fast Delivery',
    'features.delivery_description': 'Quick and reliable delivery to your doorstep with real-time tracking',
    'features.easy_ordering': 'Easy Ordering',
    'features.ordering_description': 'Simple and intuitive ordering process with multiple payment options',
    'footer.description': 'Bringing delicious food to Moulares, Gafsa, Tunisia',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.location': 'Location',
    'footer.rights': 'All rights reserved.',
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