import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Assignment, Category, Course, Module, PageProps, Quiz } from "@/types";
import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    IconButton,
    Input,
    List,
    ListItem,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";

import { useEffect } from "react";

export default function EditCourse({
    course,
    categories,
}: PageProps<{ course: Course; categories: Category[] }>) {
    const { data, setData, patch, processing, errors } = useForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        image: null as File | null,
        category_id: categories.find(
            (category) => category.id === course.category_id,
        )?.name,
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

        patch(route("course.update", course.slug));
    };

    const handleDelete = () => {
        router.delete(route("course.destroy", course.slug));
    };

    const handleModuleCreate = (id: number) => {
        router.get(route("modules.create", { course_id: id }));
    };
    const handleModuleEdit = (id: number) => {
        router.get(route("modules.edit", id));
    };
    const handleModuleDelete = (id: number) => {
        router.delete(route("modules.destroy", id));
    };

    const handleAssignmentCreate = (course_id: number) => {
        router.get(route("assignments.create", course_id));
    };
    const handleAssignmentEdit = (id: number) => {
        router.get(route("assignments.edit", id));
    };
    const handleAssignmentDelete = (id: number) => {
        router.delete(route("assignments.destroy", id));
    };
    const handleQuizCreate = (course_id: number) => {
        router.get(route("quizzes.create", course_id));
    };
    const handleQuizEdit = (id: number) => {
        router.get(route("quizzes.edit", id));
    };
    const handleQuizDelete = (id: number) => {
        router.delete(route("quizzes.destroy", id));
    };

    return (
        <Authenticated>
            <Head title="Edit Course" />
            <section className="space-y-4">
                <Card className="h-full w-full p-4">
                    <form
                        className="flex flex-col justify-between gap-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <Typography variant="h2">
                                    Edit Course
                                </Typography>
                                <Typography variant="paragraph">
                                    Edit course details
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <Button
                                    color="red"
                                    disabled={processing}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                                <Button disabled={processing} type="submit">
                                    Save
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
                </Card>

                <AddItemCard
                    id={course.id}
                    title="Module"
                    description="Add a new module to the course"
                    items={course.modules}
                    handleCreate={handleModuleCreate}
                    handleEdit={handleModuleEdit}
                    handleDelete={handleModuleDelete}
                />
                <AddItemCard
                    id={course.id}
                    title="Assignment"
                    description="Add a new assignment to the course"
                    items={course.assignments}
                    handleCreate={handleAssignmentCreate}
                    handleEdit={handleAssignmentEdit}
                    handleDelete={handleAssignmentDelete}
                />
                <AddItemCard
                    id={course.id}
                    title="Quiz"
                    description="Add a new quiz to the course"
                    items={course.quizzes}
                    handleCreate={handleQuizCreate}
                    handleEdit={handleQuizEdit}
                    handleDelete={handleQuizDelete}
                />
            </section>
        </Authenticated>
    );
}

interface AddItemCardProps {
    id: number;
    title: string;
    description: string;
    items?: Item[];
    handleCreate: (id: number) => void;
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

type Item = Module | Assignment | Quiz;

function AddItemCard({
    id,
    title,
    description,
    items,
    handleEdit,
    handleDelete,
    handleCreate,
}: AddItemCardProps) {
    return (
        <Card className="gap-4 p-4">
            <div>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="paragraph">{description}</Typography>
            </div>
            <List className="p-0">
                {items?.map((item) => (
                    <ListItem
                        key={item.id}
                        className="border"
                        onClick={() => handleEdit(item.id)}
                    >
                        <div className="flex w-full items-center justify-between gap-4">
                            <div className="grow">
                                <Typography variant="h4">
                                    {item.name}
                                </Typography>
                            </div>
                            <div className="flex-none">
                                <div className="flex items-center gap-2">
                                    <IconButton
                                        color="orange"
                                        variant="text"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </IconButton>
                                    <IconButton
                                        color="red"
                                        variant="text"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
            <Button
                color="green"
                fullWidth
                variant="outlined"
                onClick={() => handleCreate(id)}
                className="flex items-center justify-center gap-2"
            >
                {`Add ${title}`}
                <PlusIcon className="h-5 w-5" />
            </Button>
        </Card>
    );
}
