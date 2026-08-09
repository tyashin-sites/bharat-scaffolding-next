'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export function Header({ hasBlog = false }: { hasBlog?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = hasBlog
    ? [...siteConfig.nav, { href: '/blog', label: 'Blog' }]
    : siteConfig.nav;

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header className="bg-background/90 border-border fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-lg">
      {/* Top strip — cities + phone */}
      <div className="bg-charcoal hidden text-xs text-white/80 md:block">
        <div className="container flex h-8 items-center justify-between">
          <span className="tracking-wide">{siteConfig.cities.join(' · ')}</span>
          <a href={siteConfig.contact.phoneHref} className="hover:text-white">
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>

      <div className="container">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              width={44}
              height={37}
              priority
            />
            <span className="font-display text-lg font-bold uppercase leading-none tracking-tight md:text-xl">
              Bharat
              <span className="text-primary block text-[0.7em] tracking-[0.18em]">
                Scaffolding
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.href === '/blog' ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild>
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="hover:bg-muted rounded-md p-2 transition-colors lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="border-border animate-fade-in border-t py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'rounded-md px-4 py-3 text-base font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-primary bg-brick-tint'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.contact.phoneHref}
                className="text-muted-foreground flex items-center gap-2 px-4 py-3 text-base font-medium"
              >
                <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
              </a>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="px-4 pt-2">
                <Button className="w-full">Get a Quote</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
