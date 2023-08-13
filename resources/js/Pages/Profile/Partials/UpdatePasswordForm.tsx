import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { FormEventHandler, useRef } from "react";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <Typography variant="h2">
                    Update your account's password
                </Typography>
                <Typography variant="paragraph">
                    Ensure your account is using a long, random password to stay
                    secure.
                </Typography>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <Input
                    label="Current Password"
                    id="current_password"
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                />
                <Input
                    id="password"
                    label="New Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <Input
                    id="password_confirmation"
                    label="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                />

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing} size="sm">
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
