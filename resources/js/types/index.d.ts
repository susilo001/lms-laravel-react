export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    roles: Array<Role>;
}

export interface Role {
    name: string;
}

export interface Pagination<T> {
    current_page: number;
    data: Data<T>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<Link>;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user: User;
}

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export type Data<T> = T[];

export interface latestCourses extends Pagination<Course> {}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
