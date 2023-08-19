import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { FormEventHandler, useEffect } from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Typography variant="paragraph">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </Typography>

            <form onSubmit={submit}>
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                    error={errors.password ? true : false}
                />

                <div className="mt-4 flex items-center justify-end">
                    <Button type="submit" size="sm" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
