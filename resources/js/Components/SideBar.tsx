import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Input,
    Avatar,
} from "@material-tailwind/react";
import {
    HomeIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    PencilSquareIcon,
    PowerIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigationController } from "@/Context";
import { User } from "@/types";

import { Link } from "@inertiajs/react";

export default function SideBar({ user }: { user: User }) {
    const { controller } = useNavigationController();

    const { openSidenav } = controller;

    return (
        <aside
            className={`${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed top-20 h-[calc(100vh-6rem)] z-50 ml-4 w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
        >
            <Card className="h-full p-4">
                <div className="p-2">
                    <Input
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        label="Search"
                    />
                </div>
                <List>
                    <Link href="/">
                        <ListItem>
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
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
                                src="https://picsum.photos/200"
                                alt="avatar"
                                className="cursor-pointer hover:opacity-80 transition-opacity duration-300 w-10 h-10"
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="mr-auto font-normal"
                        >
                            {user.name}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <Cog6ToothIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </aside>
    );
}
