import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import FloatingButtons from '@/components/FloatingButtons';
import enMessages from '@/messages/en.json';
import trMessages from '@/messages/tr.json';
import deMessages from '@/messages/de.json';
import ruMessages from '@/messages/ru.json';

type Locale = 'en' | 'tr' | 'de' | 'ru';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allMessages: Record<Locale, any> = {
  en: enMessages,
  tr: trMessages,
  de: deMessages,
  ru: ruMessages,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Required for static rendering with next-intl
  setRequestLocale(locale);

  const messages = (allMessages[locale as Locale] ?? enMessages) as AbstractIntlMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScrollProvider>
        {children}
        <FloatingButtons />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
