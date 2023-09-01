import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Submission } from "@/types";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

export default function SubmissionShow({
    submission,
}: PageProps<{ submission: Submission }>) {
    console.log(submission);
    return (
        <Authenticated>
            <Head title="Submission" />

            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false}>
                    <Typography variant="h2">Submission</Typography>
                </CardHeader>
                <CardBody>
                    <Input
                        id="submission_file"
                        name="submission_file"
                        label="Submission File"
                        type="text"
                        value={submission.submission_file}
                    />
                </CardBody>
            </Card>
        </Authenticated>
    );
}
