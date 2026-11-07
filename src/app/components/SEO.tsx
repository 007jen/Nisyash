import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    image?: string;
    canonicalPath?: string;
    noIndex?: boolean;
}

const SITE_URL = 'https://www.nishyash.com';

const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

export function Seo({ title, description, keywords, image, canonicalPath, noIndex = false }: SEOProps) {
    useEffect(() => {
        const baseTitle = 'Nishyash - Premium Corporate & Personalised Gifting';
        document.title = `${title} | ${baseTitle}`;

        if (description) {
            setMetaTag('name', 'description', description);
        }

        if (keywords && keywords.length > 0) {
            setMetaTag('name', 'keywords', keywords.join(', '));
        }

        setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
        setMetaTag('property', 'og:site_name', 'Nishyash Gift Studio');
        setMetaTag('property', 'og:type', 'website');
        setMetaTag('property', 'og:title', `${title} | ${baseTitle}`);
        setMetaTag('property', 'og:description', description || 'Premium corporate and personalised gifting solutions.');
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', `${title} | ${baseTitle}`);
        setMetaTag('name', 'twitter:description', description || 'Premium corporate and personalised gifting solutions.');

        const path = canonicalPath || globalThis.location.pathname;
        const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
        let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);
        setMetaTag('property', 'og:url', canonicalUrl);

        const socialImage = image
            ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
            : `${SITE_URL}/og-image.jpg`;
        setMetaTag('property', 'og:image', socialImage);
        setMetaTag('name', 'twitter:image', socialImage);
    }, [title, description, keywords, image, canonicalPath, noIndex]);

    return null;
}
