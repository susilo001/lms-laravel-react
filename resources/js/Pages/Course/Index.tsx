import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps, Pagination } from "@/types";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BookmarkSquareIcon,
    FunnelIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Head, router } from "@inertiajs/react";
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

export default function CoursePage({
    auth,
    courses,
}: PageProps<{ courses: Pagination<Course> }>) {
    const prevPageUrl = courses.prev_page_url;
    const nextPageUrl = courses.next_page_url;

    const prev = () => {
        router.get(prevPageUrl);
    };

    const next = () => {
        router.get(nextPageUrl);
    };

    const handleOnShow = (slug: string) => {
        router.get(route("courses.show", slug));
    };

    const handleCreate = () => {
        router.get(route("courses.create"));
    };

    const handleEdit = (slug: string) => {
        router.get(route("courses.edit", slug));
    };

    const handleDelete = (slug: string) => {
        router.delete(route("courses.destroy", slug));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <section className="space-y-10">
                <Card>
                    <div className="flex items-center justify-between p-2">
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
                                <Tooltip
                                    content="Add New Course"
                                    placement="top"
                                >
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
                </Card>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {courses.data.map((course, index) => (
                        <Card
                            key={index}
                            className="flex h-[24rem] flex-col justify-between"
                        >
                            <CardHeader
                                color="blue-gray"
                                className="relative h-52"
                                onClick={() => handleOnShow(course.slug)}
                            >
                                <img
                                    src={course.media?.[0].original_url}
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody onClick={() => handleOnShow(course.slug)}>
                                <Typography variant="h5">
                                    {course.title}
                                </Typography>
                            </CardBody>
                            <CardFooter className="border-t p-4">
                                <div className="flex items-center justify-between ">
                                    <Tooltip content={course.user.name}>
                                        <Avatar
                                            size="sm"
                                            variant="circular"
                                            className="h-full -translate-x-0.5"
                                            alt={course.user.name}
                                            src={
                                                course.user.media?.[0]
                                                    .original_url
                                            }
                                        />
                                    </Tooltip>
                                    <div className="flex items-center gap-2">
                                        <Chip
                                            value={course.category.name}
                                            variant="gradient"
                                        />
                                        <Tooltip
                                            content={`${course.modules?.length} Modules`}
                                        >
                                            <Chip
                                                value={course.modules?.length}
                                                variant="gradient"
                                                color="green"
                                                icon={
                                                    <BookmarkSquareIcon className="h-4 w-4" />
                                                }
                                            />
                                        </Tooltip>
                                        {auth.user?.roles[0].name ===
                                            "teacher" && (
                                            <>
                                                <Tooltip content="Delete">
                                                    <IconButton
                                                        color="red"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                course.slug,
                                                            )
                                                        }
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Edit">
                                                    <IconButton
                                                        color="yellow"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(
                                                                course.slug,
                                                            )
                                                        }
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </div>
                                </div>
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
                                router.get(link.url ? link.url : "#")
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
