import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import FloatingButtons from '@/components/FloatingButtons';

type Locale = 'en' | 'tr' | 'de' | 'ru';

export default async function LocaleLayout({
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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScrollProvider>
        {children}
        <FloatingButtons />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
