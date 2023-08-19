import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input } from "@material-tailwind/react";
import { FormEventHandler, useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <Input
                    id="name"
                    label="Name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name ? true : false}
                    required
                />

                <Input
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    className="mt-1 block w-full"
                    autoComplete="username"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email ? true : false}
                    required
                />
                <Input
                    error={errors.password ? true : false}
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    required
                />
                <Input
                    error={errors.password_confirmation ? true : false}
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    required
                />

                <div className="mt-4 flex items-center justify-end gap-4">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>

                    <Button disabled={processing} type="submit" size="sm">
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
