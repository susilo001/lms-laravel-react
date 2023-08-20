import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Module, PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export default function EditModule({ module }: PageProps<{ module: Module }>) {
    const { data, setData, errors, patch, processing } = useForm({
        name: module.name,
        content: null as File | null,
        description: module.description,
        order_number: module.order_number,
        course_id: module.course_id,
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData("content", file);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route("module.update", module.id));
    };

    return (
        <Authenticated>
            <Head title="Edit Module" />
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between gap-8 p-4"
                >
                    <div className="flex items-center justify-between border-b">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Edit Module
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                Edit Module {module.name}
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            label="Module Name"
                            id="name"
                            name="name"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            error={errors.name ? true : false}
                        />
                        <Input
                            type="number"
                            label="Order Number"
                            id="order_number"
                            name="order_number"
                            onChange={(e) =>
                                setData(
                                    "order_number",
                                    parseInt(e.target.value) || 0,
                                )
                            }
                            value={data.order_number}
                            error={errors.order_number ? true : false}
                        />
                    </div>
                    <Textarea
                        label="Description"
                        id="description"
                        name="description"
                        onChange={(e) => setData("description", e.target.value)}
                        value={data.description}
                        error={errors.description ? true : false}
                    />
                    <Input
                        type="file"
                        label="Content"
                        id="content"
                        name="content"
                        onChange={handleFileChange}
                        error={errors.content ? true : false}
                    />
                </form>
            </Card>
        </Authenticated>
    );
}
