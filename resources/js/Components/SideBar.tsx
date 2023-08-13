import {
    AcademicCapIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    HomeIcon,
    PowerIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import {
    Avatar,
    Card,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

import { setOpenSidenav, useNavigationController } from "@/Context";
import { User } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Link } from "@inertiajs/react";

const menuItems = [
    {
        label: "Home",
        icon: HomeIcon,
        routeName: "/",
    },
    {
        label: "Courses",
        icon: BookOpenIcon,
        routeName: "/courses",
    },
];

function Menu({
    label,
    icon,
    routeName,
}: {
    label: string;
    icon: any;
    routeName: string;
}) {}

export default function SideBar({ user }: { user: User }) {
    const { controller, dispatch } = useNavigationController();

    const { openSidenav } = controller;

    return (
        <aside
            className={`${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
        >
            <Card className="h-full p-4">
                <div className="flex justify-end">
                    <IconButton
                        className="bg-blue-gray-50/50 text-gray-600 hover:text-gray-600 xl:hidden"
                        variant="text"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </div>
                <div className="flex shrink-0 items-center justify-center">
                    <Link href="/">
                        <div className="flex items-center gap-4 p-4">
                            <AcademicCapIcon className="h-8 w-8" />
                            <Typography variant="lead" color="blue-gray">
                                E-Learning
                            </Typography>
                        </div>
                    </Link>
                </div>

                <hr className="my-2 border-blue-gray-50" />

                <div className="p-2">
                    <Input
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        label="Search"
                    />
                </div>
                <List className="overflow-auto">
                    {menuItems.map((item, index) => (
                        <Link href={item.routeName} key={index}>
                            <ListItem>
                                <ListItemPrefix>
                                    <item.icon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    {item.label}
                                </Typography>
                            </ListItem>
                        </Link>
                    ))}

                    <hr className="my-2 border-blue-gray-50" />

                    {user && (
                        <>
                            <ListItem className="xl:hidden">
                                <ListItemPrefix>
                                    <Avatar
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-8 w-8 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
                                    />
                                </ListItemPrefix>
                                <div className="flex flex-col items-start">
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto font-semibold"
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto"
                                        variant="small"
                                    >
                                        {user.roles[0].name}
                                    </Typography>
                                </div>
                            </ListItem>
                            <Link href="/profile">
                                <ListItem>
                                    <ListItemPrefix>
                                        <Cog6ToothIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto"
                                    >
                                        Settings
                                    </Typography>
                                </ListItem>
                            </Link>
                            <Link href="/logout" method="post" as="button">
                                <ListItem>
                                    <ListItemPrefix>
                                        <PowerIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    <Typography
                                        color="blue-gray"
                                        className="mr-auto"
                                    >
                                        Log Out
                                    </Typography>
                                </ListItem>
                            </Link>
                        </>
                    )}
                </List>
            </Card>
        </aside>
    );
}
