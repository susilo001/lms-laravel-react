import {
    AcademicCapIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    HomeIcon,
    PencilSquareIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    Avatar,
    Card,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

import { useNavigationController } from "@/Context";
import { User } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Link } from "@inertiajs/react";

export default function SideBar({ user }: { user: User }) {
    const { controller } = useNavigationController();

    const { openSidenav } = controller;

    return (
        <aside
            className={`${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300  xl:translate-x-0`}
        >
            <Card className="h-full p-4">
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
                    <Link href="/">
                        <ListItem>
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto">
                                Dashboard
                            </Typography>
                        </ListItem>
                    </Link>
                    <ListItem>
                        <ListItemPrefix>
                            <BookOpenIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="mr-auto font-normal"
                        >
                            Lesson
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PencilSquareIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="mr-auto font-normal"
                        >
                            Assignment
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <ClipboardDocumentCheckIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="mr-auto font-normal"
                        >
                            Grade
                        </Typography>
                    </ListItem>

                    <hr className="my-2 border-blue-gray-50" />

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
                    <ListItem>
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <Link href="/logout" method="post" as="button">
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto">
                                Log Out
                            </Typography>
                        </ListItem>
                    </Link>
                </List>
            </Card>
        </aside>
    );
}

// const menuItems = [
//     {
//         label: "Dashboard",
//         icon: HomeIcon,
//         routeName: "dashboard",
//     },
//     {
//         label: "Lesson",
//         icon: BookOpenIcon,
//         routeName: "lesson",
//     },
//     {
//         label: "Assignment",
//         icon: PencilSquareIcon,
//         routeName: "assigment",
//     },
//     {
//         label: "Grade",
//         icon: ClipboardDocumentCheckIcon,
//         routeName: "grade",
//     },
// ];
