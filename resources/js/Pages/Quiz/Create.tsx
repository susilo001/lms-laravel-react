import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

export default function CreateQuizPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <Authenticated>
            <Head title="Create Quiz" />
            <Card>
                <CardHeader floated={false} shadow={false}>
                    <Typography variant="h3">Create Quiz</Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Input type="text" label="Quiz Name" />
                            <Input type="number" label="Course ID" />
                            <Input type="text" label="Total Marks" />
                        </div>
                        <Button type="submit">Save</Button>
                    </form>
                </CardBody>
            </Card>
        </Authenticated>
    );
}
