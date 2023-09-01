import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Enrollment, PageProps, Pagination } from "@/types";
import {
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Input,
    Typography,
} from "@material-tailwind/react";

export default function AssignmentPage({
    enrollments,
}: PageProps<{ enrollments: Pagination<Enrollment> }>) {
    const handleNextPage = () => {
        router.get(enrollments.next_page_url);
    };

    const handlePreviousPage = () => {
        router.get(enrollments.prev_page_url);
    };
    return (
        <Authenticated>
            <Head title="Assignment" />

            <Card className="h-full w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Assignment List
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                List of all assignments for the student
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
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <table className="w-full min-w-max table-auto">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography variant="small">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.data.map(
                                (enrollment) =>
                                    enrollment.course?.assignments?.map(
                                        (assignment) => (
                                            <tr
                                                key={assignment.id}
                                                className="even:bg-blue-gray-50/50"
                                            >
                                                <td className="max-w-sm p-4">
                                                    <Typography variant="small">
                                                        {assignment.name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <Typography
                                                        variant="small"
                                                        color="red"
                                                    >
                                                        {assignment.due_date}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    {assignment.submissions
                                                        ?.length ? (
                                                        <Chip
                                                            color="green"
                                                            value="Completed"
                                                            icon={
                                                                <CheckCircleIcon className="h-5 w-5" />
                                                            }
                                                        />
                                                    ) : (
                                                        <Chip
                                                            value="Not submitted yet"
                                                            color="red"
                                                            icon={
                                                                <XCircleIcon className="h-5 w-5" />
                                                            }
                                                        />
                                                    )}
                                                </td>
                                                <td className="p-4 text-center">
                                                    {assignment.submissions
                                                        ?.length ? (
                                                        <Link
                                                            href={route(
                                                                "assignment.show",
                                                                assignment.id,
                                                            )}
                                                        >
                                                            <Button
                                                                size="sm"
                                                                color="blue"
                                                                variant="gradient"
                                                            >
                                                                View
                                                            </Button>
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={route(
                                                                "assignment.show",
                                                                assignment.id,
                                                            )}
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="gradient"
                                                                color="green"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ),
                                    ),
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Page {enrollments.current_page} of{" "}
                        {enrollments.last_page}
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={!enrollments.prev_page_url}
                            onClick={handlePreviousPage}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={!enrollments.next_page_url}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Authenticated>
    );
}

const TABLE_HEAD = ["Assignment Name", "Due date", "Submission", "Action"];
