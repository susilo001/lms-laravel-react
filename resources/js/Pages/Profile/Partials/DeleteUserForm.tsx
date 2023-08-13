import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <Typography variant="h2">Delete Account</Typography>
                <Typography variant="paragraph">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </Typography>
            </header>
            <Button onClick={confirmUserDeletion} color="red" size="sm">
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Typography variant="h3">
                        Are you sure you want to delete your account?
                    </Typography>
                    <Typography variant="paragraph">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </Typography>

                    <div className="mt-6">
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            error={errors.password ? true : false}
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Button onClick={closeModal} size="sm">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="red"
                            size="sm"
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
