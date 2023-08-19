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
    Tooltip,
    Typography,
} from "@material-tailwind/react";

import { router } from "@inertiajs/react";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    FunnelIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function CoursePage({
    auth,
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
        router.get(route("course.show", slug));
    };

    const handleCreate = () => {
        router.get(route("course.create"));
    };

    const handleEdit = (slug: string) => {
        router.get(route("course.edit", slug));
    };

    const handleDelete = (slug: string) => {
        router.delete(route("course.destroy", slug));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <section className="space-y-10">
                <div className="flex items-center justify-between px-2">
                    <div className="flex flex-col">
                        <Typography variant="h2">Courses</Typography>
                        <Typography variant="paragraph">
                            List of all the courses
                        </Typography>
                    </div>
                    <div className="flex items-center gap-4">
                        <Tooltip content="Filter" placement="top">
                            <IconButton variant="text">
                                <FunnelIcon className="h-6 w-6" />
                            </IconButton>
                        </Tooltip>
                        {auth.user?.roles[0].name === "teacher" && (
                            <Tooltip content="Add New Course" placement="top">
                                <IconButton
                                    color="green"
                                    variant="text"
                                    onClick={handleCreate}
                                >
                                    <PlusIcon className="h-6 w-6" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {courses.data.map((course, index) => (
                        <Card key={index}>
                            <CardHeader
                                color="blue-gray"
                                className="relative h-52"
                            >
                                <img
                                    src={course.image}
                                    className="h-full w-full object-cover"
                                />
                                {auth.user?.roles[0].name === "teacher" && (
                                    <div className="absolute right-0 top-0 z-50">
                                        <div className="flex gap-2">
                                            <IconButton
                                                color="red"
                                                onClick={() =>
                                                    handleDelete(course.slug)
                                                }
                                            >
                                                <TrashIcon className="h-6 w-6" />
                                            </IconButton>
                                            <IconButton
                                                color="yellow"
                                                onClick={() =>
                                                    handleEdit(course.slug)
                                                }
                                            >
                                                <PencilIcon className="h-6 w-6" />
                                            </IconButton>
                                        </div>
                                    </div>
                                )}
                            </CardHeader>
                            <CardBody onClick={() => handleOnShow(course.slug)}>
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
