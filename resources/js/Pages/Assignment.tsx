import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Assignment, PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import React from "react";

export default function AssignmentPage({
    assignment,
}: PageProps<{ assignment: Assignment }>) {
    const { data, setData, processing, post } = useForm({
        submission_file: null as File | null,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setData("submission_file", file);
    };

    const handleSubmit = () => {
        post("/assignment/" + assignment.id + "/submit");
    };

    return (
        <Authenticated>
            <Head title={assignment.name} />
            <Card className="p-4">
                <form onSubmit={handleSubmit}>
                    <CardHeader floated={false} shadow={false}>
                        <Typography variant="h2" color="blue-gray">
                            {assignment.name}
                        </Typography>
                        <Typography variant="paragraph" color="blue-gray">
                            {assignment.description}
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <Input
                            label="Submission File"
                            name="submission file"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </CardBody>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            <Typography variant="small" color="red">
                                Due Date {assignment.due_date}
                            </Typography>
                            <div className="flex items-center gap-4">
                                <Button
                                    color="green"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </Authenticated>
    );
}
