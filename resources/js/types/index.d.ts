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

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    user_id: number;
    user: User;
    category: Category;
    category_id: number;
    created_at: string;
    updated_at: string;
    modules?: Module[];
    assignments?: Assignment[];
    quizzes?: Quiz[];
    enrollments_count?: number;
}

export interface Module {
    id: number;
    name: string;
    description: string;
    content: string;
    order_number: number;
    course_id: number;
    created_at: string;
    updated_at: string;
}

export interface Assignment {
    id: number;
    name: string;
    description: string;
    due_date: string;
    total_marks: number;
    course_id: number;
    created_at: string;
    updated_at: string;
}

export interface Quiz {
    id: number;
    name: string;
    total_marks: number;
    questions?: Question[];
    course_id: number;
    created_at: string;
    updated_at: string;
}

export interface Question {
    id: number;
    question: string;
    options: [] | Option[];
    correct_answer: string;
    quiz_id: number;
}

export interface Option {
    key: string;
    value: string;
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
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

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message: string;
        status: "Success" | "Error" | "Warning" | "Info" | null;
    };
    breadcrumbs: string;
};
