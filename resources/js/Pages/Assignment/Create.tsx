import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export default function CreateAssignment({ course_id }: { course_id: number }) {
    const { data, setData, errors, post, processing } = useForm({
        course_id: 0,
        name: "",
        description: "",
        due_date: "",
        total_marks: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("assignment.store"));
    };
    return (
        <Authenticated>
            <Head title="Create Assignment" />
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between gap-8 p-4"
                >
                    <div className="flex items-center justify-between border-b">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Create Assignment
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                Create a new Assignment
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <Button type="submit" disabled={processing}>
                                Create
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            label="Assignment Name"
                            id="name"
                            name="name"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            error={errors.name ? true : false}
                        />
                        <Input
                            type="text"
                            label="Total Marks"
                            id="total_marks"
                            name="total_marks"
                            onChange={(e) =>
                                setData("total_marks", e.target.value)
                            }
                            value={data.total_marks}
                            error={errors.total_marks ? true : false}
                        />
                        <Input
                            type="date"
                            label="Due Date"
                            id="due_date"
                            name="due_date"
                            onChange={(e) =>
                                setData(
                                    "due_date",
                                    new Date(e.target.value).toISOString(),
                                )
                            }
                            value={data.due_date}
                            error={errors.due_date ? true : false}
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
                </form>
            </Card>
        </Authenticated>
    );
}
