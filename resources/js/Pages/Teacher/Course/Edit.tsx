import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Course, PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import Assignment from "./Partials/Assignment";
import Module from "./Partials/Module";
import Quiz from "./Partials/Quiz";

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

    return (
        <Authenticated>
            <Head title="Edit Course" />
            <Card className="h-full w-full p-4">
                <form
                    className="flex flex-col justify-between gap-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Edit Course
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                Edit course details
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
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

                <hr className="my-4" />

                <Module courseId={course.id} modules={course.modules} />

                <hr className="my-4" />

                <Assignment
                    assignments={course.assignments}
                    courseId={course.id}
                />

                <hr className="my-4" />

                <Quiz quizzes={course.quizzes} courseId={course.id} />
            </Card>
        </Authenticated>
    );
}
