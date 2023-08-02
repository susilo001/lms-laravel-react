import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Course, PageProps, Pagination } from "@/types";
import {
    MagnifyingGlassIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Button,
    IconButton,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["No", "Title", "Enrollment", "Date", "Action"];

export default function Index({
    courses,
    categories,
}: PageProps<{ courses: Pagination<Course>; categories: Category[] }>) {
    const [openCreateCourse, setOpenCreateCourse] = useState(false);

    const handleCreate = () => {
        setOpenCreateCourse(true);
    };

    const handleEdit = (slug: string) => {
        router.get(route("course.edit", slug));
    };

    const handleDelete = (slug: string) => {
        router.delete(route("course.destroy", slug));
    };

    const closeModal = () => {
        setOpenCreateCourse(false);
    };

    return (
        <Authenticated>
            <Head title="Course" />
            <Table>
                <Table.Header>
                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Courses
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                List of all the courses
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
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <Button
                                className="flex items-center gap-2"
                                color="green"
                                onClick={handleCreate}
                            >
                                Create Course
                                <PlusIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </Table.Header>
                <Table.Body TABLE_HEAD={TABLE_HEAD}>
                    {courses.data.map((course, index) => (
                        <tr key={index}>
                            <td className="border-b border-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-center font-bold"
                                >
                                    {index + 1}
                                </Typography>
                            </td>
                            <td className="border-b border-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                >
                                    {course.title}
                                </Typography>
                            </td>
                            <td className="border-b border-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-center font-bold"
                                >
                                    {course.enrollments_count}
                                </Typography>
                            </td>

                            <td className="border-b border-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="text-center font-normal"
                                >
                                    {course.created_at}
                                </Typography>
                            </td>
                            <td className="border-b border-blue-gray-50 p-4">
                                <div className="flex items-center justify-center gap-2">
                                    <IconButton
                                        variant="text"
                                        color="orange"
                                        onClick={() => handleEdit(course.slug)}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>

                                    <IconButton
                                        variant="text"
                                        color="red"
                                        onClick={() =>
                                            handleDelete(course.slug)
                                        }
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table.Body>
                <Table.Pagination
                    prevPageUrl={courses.prev_page_url}
                    nextPageUrl={courses.next_page_url}
                    links={courses.links}
                />
            </Table>
            <Modal show={openCreateCourse} onClose={closeModal}>
                <CreateCourse categories={categories} />
            </Modal>
        </Authenticated>
    );
}

export function CreateCourse({ categories }: { categories: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        slug: "",
        description: "",
        image: null as File | null,
        category_id: "",
    });

    useEffect(() => {
        const slug = data.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        setData("slug", slug);
    }, [data.title]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData("image", file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route("course.store"));
    };
    return (
        <>
            <form
                className="flex flex-col justify-between gap-8 p-4"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Create Course
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Create a new course
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <Button disabled={processing} type="submit">
                            Create
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Input
                            id="title"
                            label="Title"
                            value={data.title}
                            onChange={(event) =>
                                setData("title", event.target.value)
                            }
                            error={errors?.title ? true : false}
                        />
                        <Input
                            id="slug"
                            label="Slug"
                            value={data.slug}
                            disabled
                            error={errors?.slug ? true : false}
                        />
                        <Select
                            id="category"
                            label="Category"
                            value={data.category_id}
                            onChange={(value?: string) =>
                                setData("category_id", value || "")
                            }
                            error={errors?.category_id ? true : false}
                        >
                            {categories.map((category) => (
                                <Option
                                    key={category.id}
                                    value={category.id.toString()}
                                >
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Input
                        id="image"
                        label="Image"
                        type="file"
                        onChange={handleFileChange}
                        error={errors?.image ? true : false}
                    />
                    <Textarea
                        id="description"
                        label="Description"
                        value={data.description}
                        onChange={(event) =>
                            setData("description", event.target.value)
                        }
                        error={errors?.description ? true : false}
                    />
                </div>
            </form>
        </>
    );
}
