import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

import { Button, Card, Input, Typography } from "@material-tailwind/react";

export default function Lesson({}: PageProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Lesson" />

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card className="p-4">
                        <div className="flex flex-col">
                            <Typography
                                tag="h2"
                                className="text-2xl font-semibold"
                            >
                                Courses Title
                            </Typography>
                            <Typography tag="p" className="text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </Typography>
                        </div>

                        <div className="mt-4 w-full">
                            <div className="aspect-h-2 aspect-w-3">
                                <img
                                    src="https://picsum.photos/id/1/200"
                                    className="object-cover"
                                    alt="Thumbnail"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Typography tag="p" className="text-sm">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, voluptatum.Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit. Quisquam, voluptatum. Lorem ipsum dolor
                                sit amet consectetur adipisicing elit. Quisquam,
                                voluptatum.Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Quisquam,
                                voluptatum. Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Quisquam,
                                voluptatum.Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Quisquam,
                                voluptatum.
                            </Typography>
                        </div>
                    </Card>
                </div>
                <div className="w-full">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">
                                Discussion
                            </h2>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                No discussion yet.
                            </p>
                        </div>

                        <div className="mt-4">
                            <div className="relative flex w-full">
                                <Input
                                    type="text"
                                    label="Message"
                                    className="pr-20"
                                />
                                <Button
                                    size="sm"
                                    className="!absolute right-1 top-1 rounded"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
