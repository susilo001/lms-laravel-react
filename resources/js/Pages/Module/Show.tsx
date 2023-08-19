import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Module, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function ShowModule({ module }: PageProps<{ module: Module }>) {
    console.log(module);
    return (
        <Authenticated>
            <Head title={module.name} />

            <Card>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="m-0 rounded-none rounded-t-lg"
                >
                    <figure>
                        <img
                            src="https://picsum.photos/1000"
                            alt={module.name}
                            className="h-[32rem] w-full object-cover"
                        />
                    </figure>
                </CardHeader>
                <CardBody>
                    <Typography color="blue-gray" variant="h2">
                        {module.name}
                    </Typography>
                    <Typography color="blue-gray" variant="paragraph">
                        {module.description}
                    </Typography>
                </CardBody>
            </Card>
        </Authenticated>
    );
}
