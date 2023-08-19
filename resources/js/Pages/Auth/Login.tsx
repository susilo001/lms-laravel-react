import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { FormEventHandler, useEffect } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
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
                />
                <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password ? true : false}
                />

                <div className="mt-4 block">
                    <Checkbox
                        name="remember"
                        label="Remember me"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="space-x-4">
                        <Link
                            href={"/register"}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 "
                        >
                            Not registered?
                        </Link>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 "
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <Button type="submit" disabled={processing} size="sm">
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
