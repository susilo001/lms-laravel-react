import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

import { Enrollment, Grade, PageProps, Pagination } from "@/types";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function GradePage({
    enrollments,
}: PageProps<{ enrollments: Pagination<Enrollment> }>) {
    const getQuizTotalScore = (grades: Grade[]) => {
        return grades.reduce((totalScore, grade) => {
            if (grade.gradeable_type === "App\\Models\\Quiz") {
                totalScore += grade.score;
            }
            return totalScore;
        }, 0);
    };

    const getAssignmentTotalScore = (grades: Grade[]) => {
        return grades.reduce((totalScore, grade) => {
            if (grade.gradeable_type === "App\\Models\\Assignment") {
                totalScore += grade.score;
            }
            return totalScore;
        }, 0);
    };

    const getOverallGrade = (quizScore: number, assignmentScore: number) => {
        const total = quizScore + assignmentScore;

        if (total >= 90) {
            return "A";
        } else if (total >= 80) {
            return "B";
        } else if (total >= 70) {
            return "C";
        } else if (total >= 60) {
            return "D";
        } else {
            return "F";
        }
    };

    const handleNextPage = () => {
        router.get(enrollments.next_page_url);
    };

    const handlePreviousPage = () => {
        router.get(enrollments.prev_page_url);
    };

    return (
        <Authenticated>
            <Head title="Grade" />

            <Card>
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Grades List
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                List of all grades
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    crossOrigin
                                    label="Search"
                                    icon={
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    }
                                />
                            </div>
                            <Button
                                className="flex items-center gap-3"
                                size="sm"
                            >
                                <ArrowDownTrayIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />
                                Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            className="font-normal"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.data.map((enrollment) => {
                                const course = enrollment.course;
                                if (!course || !course.grades) {
                                    // Handle the case where course or grades are undefined
                                    return null;
                                }
                                const quizScore = getQuizTotalScore(
                                    course.grades,
                                );
                                const assignmentScore = getAssignmentTotalScore(
                                    course.grades,
                                );
                                const overallGrade = getOverallGrade(
                                    quizScore,
                                    assignmentScore,
                                );
                                return (
                                    <tr
                                        key={enrollment.id}
                                        className="even:bg-blue-gray-50/50"
                                    >
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                className="font-normal"
                                            >
                                                {enrollment.course.title}
                                            </Typography>
                                        </td>
                                        <td className="p-4">{quizScore}</td>
                                        <td className="p-4">
                                            {assignmentScore}
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                className="font-medium"
                                            >
                                                {overallGrade}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                className="font-medium"
                                            >
                                                Edit
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
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

const TABLE_HEAD = ["Course Name", "Quiz", "Assignment", "Grade", ""];
