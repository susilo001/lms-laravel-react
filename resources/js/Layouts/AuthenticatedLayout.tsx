import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";
import { User } from "@/types";
import SideBar from "@/Components/SideBar";
import {
    AcademicCapIcon,
    Bars3Icon,
    XMarkIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/solid";

import React from "react";

import { Alert, Typography } from "@material-tailwind/react";

import { useNavigationController, setOpenSidenav } from "@/Context";
import { Avatar, IconButton } from "@material-tailwind/react";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const { controller, dispatch } = useNavigationController();
    const [open, setOpen] = React.useState(true);

    const { openSidenav } = controller;

    const { errors } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <div className="mb-2 flex items-center gap-4 p-4">
                                        <AcademicCapIcon className="h-8 w-8" />
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                        >
                                            E-Learning
                                        </Typography>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden xl:flex xl:items-center xl:ml-6">
                            <div className="ml-3 relative">
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        src="https://picsum.photos/200"
                                        alt="avatar"
                                        className="cursor-pointer hover:opacity-80 transition-opacity duration-300 w-10 h-10"
                                    />
                                    <div>
                                        <Typography>{user.name}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center xl:hidden">
                            <IconButton
                                className="text-gray-500 hover:text-gray-600"
                                variant="text"
                                onClick={() =>
                                    setOpenSidenav(dispatch, !openSidenav)
                                }
                            >
                                {openSidenav ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </IconButton>
                        </div>
                    </div>
                </div>
            </nav>

            <SideBar user={user} />

            <div className="p-4 xl:ml-80 space-y-4">
                {errors["error"] && (
                    <Alert
                        open={open}
                        color="green"
                        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
                        onClose={() => setOpen(false)}
                    >
                        <Typography variant="h5" color="white">
                            {errors["status"]}
                        </Typography>
                        <Typography color="white" className="mt-2 font-normal">
                            {errors["message"]}
                        </Typography>
                    </Alert>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
