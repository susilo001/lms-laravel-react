import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link } from "@inertiajs/react";

import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Input,
    Tooltip,
    Typography,
} from "@material-tailwind/react";

import { PageProps, latestCourses } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaUsers } from "react-icons/fa6";

const TABLE_HEAD = ["Teacher", "Course", "Date", "Status"];

export default function Dashboard({
    auth,
    latestCourses,
}: PageProps<{ latestCourses: latestCourses }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <Card>
                        <CardHeader
                            variant="gradient"
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <FaUsers className="h-10 w-10" />
                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" color="blue-gray">
                                Total Students Enrolled
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                200 Students
                            </Typography>
                        </CardBody>
                        <CardFooter className="border-t">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center gap-2"
                            >
                                21
                            </Typography>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader
                            variant="gradient"
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <FaUsers className="h-10 w-10" />
                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" color="blue-gray">
                                Total Teachers Enrolled
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                200 Teachers
                            </Typography>
                        </CardBody>
                        <CardFooter className="border-t">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center gap-2"
                            >
                                21
                            </Typography>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader
                            variant="gradient"
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <FaUsers className="h-10 w-10" />
                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" color="blue-gray">
                                Total Lessons Enrolled
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                200 Lessons
                            </Typography>
                        </CardBody>
                        <CardFooter className="border-t">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center gap-2"
                            >
                                23
                            </Typography>
                        </CardFooter>
                    </Card>
                </div>

                <Card className="h-full w-full">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        className="rounded-none"
                    >
                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    New Courses
                                </Typography>
                                <Typography
                                    color="gray"
                                    className="mt-1 font-normal"
                                >
                                    List of all new the courses
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={
                                            <MagnifyingGlassIcon className="h-5 w-5" />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-auto px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {latestCourses.data.map((course, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-blue-gray-50 p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={course.user.avatar}
                                                    alt={course.user.name}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {course.user.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className="border-b border-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {course.title}
                                            </Typography>
                                        </td>
                                        <td className="border-b border-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {course.created_at}
                                            </Typography>
                                        </td>
                                        <td className="border-b border-blue-gray-50 p-4">
                                            <Tooltip content="Edit User">
                                                <IconButton
                                                    variant="text"
                                                    color="blue-gray"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Link href={latestCourses.prev_page_url}>
                            <Button
                                variant={
                                    latestCourses.prev_page_url === null
                                        ? "text"
                                        : "outlined"
                                }
                                color="blue-gray"
                                size="sm"
                            >
                                Previous
                            </Button>
                        </Link>
                        {latestCourses.links.map((link, index) => (
                            <Link
                                href={link.url === null ? "#" : link.url}
                                preserveScroll
                                key={index}
                            >
                                <Button
                                    variant={link.active ? "outlined" : "text"}
                                    color="blue-gray"
                                    size="sm"
                                    className={
                                        link.label === "Next &raquo;" ||
                                        link.label === "&laquo; Previous"
                                            ? "hidden"
                                            : ""
                                    }
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                        <Link href={latestCourses.next_page_url}>
                            <Button
                                variant={
                                    latestCourses.next_page_url === null
                                        ? "text"
                                        : "outlined"
                                }
                                color="blue-gray"
                                size="sm"
                            >
                                Next
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
