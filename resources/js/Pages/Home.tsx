import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

import { Course, PageProps, Pagination } from "@/types";
import { FaUsers } from "react-icons/fa6";

export default function Home({
    latestCourses,
}: PageProps<{ latestCourses: Pagination<Course> }>) {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="mt-4 space-y-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <Card>
                        <CardHeader
                            color="red"
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
                            color="green"
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
                            color="blue"
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

                <hr />
            </div>
        </AuthenticatedLayout>
    );
}
