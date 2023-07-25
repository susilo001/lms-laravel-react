import SideBar from "@/Components/SideBar";
import { User } from "@/types";
import {
    Bars3Icon,
    CheckCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import React, { PropsWithChildren } from "react";

import {
    Alert,
    Avatar,
    Breadcrumbs,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Navbar,
    Typography,
} from "@material-tailwind/react";

import { setOpenSidenav, useNavigationController } from "@/Context";
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const { controller, dispatch } = useNavigationController();
    const [open, setOpen] = React.useState(true);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    const { openSidenav } = controller;

    const { errors } = usePage().props;

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <SideBar user={user} />

            <div className="space-y-4 p-4 xl:ml-80">
                <Navbar
                    className="transition-all duration-300"
                    fullWidth
                    color="transparent"
                    shadow={false}
                    blurred={false}
                >
                    <div className="flex items-center justify-between">
                        <Breadcrumbs>
                            <Link href="/">Home</Link>
                            <Link href="/dashboard">Dashboard</Link>
                        </Breadcrumbs>

                        <div className="hidden xl:ml-6 xl:flex xl:items-center">
                            <Menu
                                open={isMenuOpen}
                                handler={setIsMenuOpen}
                                placement="bottom-end"
                            >
                                <MenuHandler>
                                    <Button
                                        variant="text"
                                        color="blue-gray"
                                        className="flex items-center gap-2 rounded-full py-0.5 pl-0.5 pr-2 lg:ml-auto"
                                    >
                                        <Avatar
                                            variant="circular"
                                            size="sm"
                                            alt={user.name}
                                            className="border border-blue-500 p-0.5"
                                            src={user.avatar}
                                        />
                                        <div className="flex flex-col items-start justify-start">
                                            <Typography
                                                variant="lead"
                                                className="text-[10px] font-bold"
                                            >
                                                {user.name}
                                            </Typography>
                                            <Typography
                                                variant="lead"
                                                className="text-[10px]"
                                            >
                                                {user.roles[0].name}
                                            </Typography>
                                        </div>
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`h-3 w-3 transition-transform ${
                                                isMenuOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </Button>
                                </MenuHandler>
                                <MenuList className="p-1">
                                    {profileMenuItems.map(
                                        ({ label, icon }, key) => {
                                            const isLastItem =
                                                key ===
                                                profileMenuItems.length - 1;
                                            return (
                                                <MenuItem
                                                    key={label}
                                                    onClick={closeMenu}
                                                    className={`flex items-center gap-2 rounded ${
                                                        isLastItem
                                                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                                            : ""
                                                    }`}
                                                >
                                                    {React.createElement(icon, {
                                                        className: `h-4 w-4 ${
                                                            isLastItem
                                                                ? "text-red-500"
                                                                : ""
                                                        }`,
                                                        strokeWidth: 2,
                                                    })}
                                                    <Typography
                                                        as="span"
                                                        variant="small"
                                                        className="font-normal"
                                                        color={
                                                            isLastItem
                                                                ? "red"
                                                                : "inherit"
                                                        }
                                                    >
                                                        {label}
                                                    </Typography>
                                                </MenuItem>
                                            );
                                        },
                                    )}
                                </MenuList>
                            </Menu>
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
                </Navbar>

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
