import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user?: User;
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
    created_at: string;
    created_at_humans: string;
    updated_at: string;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    currency: string;
    rate: string;
    created_at: string;
    price: number;
    crypto: number;
    status: string;
    created_at_humans: string;
    created_at_diff: string;
    updated_at: string;
    updated_at_diff: string;
    media: Media[];
    tags: Tag[];
    location: Location;
    user: User;
}

export interface Media {
    id: string;
    url: string;
    type: string;
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
