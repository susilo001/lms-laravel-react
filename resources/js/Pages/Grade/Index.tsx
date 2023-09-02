import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Enrollment, Grade, PageProps, PaginationProps } from "@/types";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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

export default function GradePage({
  enrollments,
}: PageProps<{ enrollments: PaginationProps<Enrollment> }>) {
  const getQuizTotalScore = (grades: Grade[]) => {
    const quizGrades = grades.filter(
      (grade) => grade.gradeable_type === "App\\Models\\Quiz",
    );

    let totalScore = 0;
    quizGrades.forEach((grade) => {
      totalScore += grade.score;
    });

    return Math.round(totalScore / quizGrades.length);
  };

  const getAssignmentTotalScore = (grades: Grade[]) => {
    const assignmentGrades = grades.filter(
      (grade) => grade.gradeable_type === "App\\Models\\Assignment",
    );

    let totalScore = 0;
    assignmentGrades.forEach((grade) => {
      totalScore += grade.score;
    });

    return Math.round(totalScore / assignmentGrades.length);
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
    router.get(enrollments.links.next);
  };

  const handlePreviousPage = () => {
    router.get(enrollments.links.prev);
  };

  return (
    <Authenticated>
      <Head title="Grade" />

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5">Grades List</Typography>
              <Typography className="mt-1 font-normal">
                List of all grades
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
                Download
              </Button>
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
                    <Typography variant="small">{head}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enrollments.data.map((enrollment) => {
                const course = enrollment.course;
                if (!course || !course.grades) {
                  return null;
                }
                const quizScore = getQuizTotalScore(course.grades);
                const assignmentScore = getAssignmentTotalScore(course.grades);
                const overallGrade = getOverallGrade(
                  quizScore,
                  assignmentScore,
                );
                return (
                  <tr key={enrollment.id} className="even:bg-blue-gray-50/50">
                    <td className="max-w-sm p-4">
                      <Typography variant="small">
                        {enrollment.course.title}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small">{quizScore}</Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small">{assignmentScore}</Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small">{overallGrade}</Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {enrollments.meta.current_page} of {enrollments.meta.last_page}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={!enrollments.links.prev}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              disabled={!enrollments.links.next}
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

const TABLE_HEAD = ["Course Name", "Quiz", "Assignment", "Grade"];
