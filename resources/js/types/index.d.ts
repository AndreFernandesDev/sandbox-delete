import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user?: User;
    session?: Session;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    banner?: Banner;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    nickname: string;
    description: string;
    profile_image_url?: string;
    provider: string;
    provider_id: string;
    role: string;

    created_at: string;
    updated_at: string;

    created_at_humans: string;
}

export interface Session {
    location?: Location;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    currency: string;
    rate: string;
    price: number;
    crypto: number;
    status: string;

    media: Media[];
    thumbnail: Media;
    tags: Tag[];
    location: Location;
    user: User;

    created_at: string;
    updated_at: string;
    expires_at: string;

    created_at_humans: string;
    created_at_diff: string;
    updated_at_diff: string;
}

export interface Media {
    id: string;
    url: string;
    type: string;
    code: string;
    order: number;
}

export type Currency = {
    code: string;
    rate: string;
};

export type Location = {
    latitude: number;
    longitude: number;
    label: string;
};

export type Tag = {
    id: string;
    name: string;
};

export type Banner = {
    id: string;
    title: string;
    label: string;
    cta: string;
    url: string;
    background: string;
    foreground: string;
    is_active: boolean;

    logo: Media;
};
