import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps, Pagination } from "@/types";
import { Head } from "@inertiajs/react";

import {
    Avatar,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    IconButton,
    Input,
    Typography,
} from "@material-tailwind/react";

import { router } from "@inertiajs/react";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CoursePage({
    courses,
}: PageProps<{ courses: Pagination<Course> }>) {
    const prevPageUrl = courses.prev_page_url;
    const nextPageUrl = courses.next_page_url;

    const prev = () => {
        router.replace(prevPageUrl);
    };

    const next = () => {
        router.replace(nextPageUrl);
    };

    const handleOnShow = (slug: string) => {
        router.get(`/course/${slug}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <section className="space-y-10">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <Typography variant="h3" color="blue-gray">
                            All Courses
                        </Typography>
                        <Typography variant="h6" color="blue-gray">
                            List of all the courses
                        </Typography>
                    </div>
                    <div className="flex items-center gap-4">
                        <Typography>Filter</Typography>
                        <div className="p-2">
                            <Input label="search" className="border-t-0" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {courses.data.map((course, index) => (
                        <Card
                            key={index}
                            onClick={() => handleOnShow(course.slug)}
                        >
                            <CardHeader
                                color="blue-gray"
                                className="relative h-52"
                            >
                                <img
                                    src={course.image}
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography
                                    variant="h5"
                                    color="blue-gray"
                                    className="mb-2"
                                >
                                    {course.title}
                                </Typography>

                                <Chip
                                    icon={
                                        <Avatar
                                            size="xs"
                                            variant="circular"
                                            className="h-full -translate-x-0.5"
                                            alt={course.user.name}
                                            src={course.user.avatar}
                                        />
                                    }
                                    value={
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-medium capitalize leading-none"
                                        >
                                            {course.user.name}
                                        </Typography>
                                    }
                                    color="blue-gray"
                                    className="w-fit rounded-full py-1.5"
                                />
                            </CardBody>
                            <CardFooter className="flex items-center justify-between pb-4 pt-0">
                                <Typography variant="small">
                                    {course.category.name}
                                </Typography>
                                <Typography variant="small" color="blue-gray">
                                    {course.modules?.length} Modules
                                </Typography>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <ButtonGroup
                    variant="outlined"
                    color="blue-gray"
                    fullWidth
                    className="flex justify-center"
                >
                    <IconButton onClick={prev} disabled={prevPageUrl === null}>
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    {courses.links.map((link, index) => (
                        <IconButton
                            key={index}
                            onClick={() =>
                                router.replace(link.url ? link.url : "#")
                            }
                            className={`${
                                link.active
                                    ? "bg-blue-gray-100 text-blue-gray-900"
                                    : ""
                            } ${
                                link.label === "Next &raquo;" ||
                                link.label === "&laquo; Previous"
                                    ? "hidden"
                                    : ""
                            }`}
                        >
                            {link.label}
                        </IconButton>
                    ))}
                    <IconButton onClick={next} disabled={nextPageUrl === null}>
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </ButtonGroup>
            </section>
        </AuthenticatedLayout>
    );
}
