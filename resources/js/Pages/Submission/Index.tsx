import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps, Pagination } from "@/types";
import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Head, router } from "@inertiajs/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["Assignment Name", "Student", "Date", "Status", "Action"];

export default function SubmissionsPage({
  courses,
}: PageProps<{ courses: Pagination<Course> }>) {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<any>([]); // [{id: 1, score: 10}, {id: 2, score: 20}
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    data.append("gradeable_id", selected.assignment.id);
    data.append("gradeable_type", "App\\Models\\Assignment");
    data.append("user_id", selected.user.id);
    data.append("course_id", selected.assignment.course_id);
    data.append("score", score);

    router.post(route("grades.store"), data, {
      preserveScroll: true,
      onSuccess: () => {
        handleOpen();
      },
    });
  };

  const handleNextPage = () => {
    router.get(courses.next_page_url);
  };

  const handlePreviousPage = () => {
    router.get(courses.prev_page_url);
  };

  return (
    <Authenticated>
      <Head title="Submissions" />

      <Card className="h-full w-full overflow-x-auto">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5">Submissions List</Typography>
              <Typography color="gray" className="mt-1 font-normal">
                List of all submissions the student has made for the assignments
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                    <Typography variant="small" className="font-normal">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.data.map(
                (course) =>
                  course.assignments?.map((assignment, index) => (
                    <tr key={assignment.id} className="even:bg-blue-gray-50/50">
                      <td className="max-w-xs p-4">
                        <Typography variant="small">
                          {assignment.name}
                        </Typography>
                      </td>
                      <td className="max-w-sm p-4">
                        <Typography variant="small">
                          {assignment.submissions?.[index].user.name}
                        </Typography>
                      </td>
                      <td className="max-w-sm p-4">
                        <Typography variant="small">
                          {assignment.submissions?.[index].created_at}
                        </Typography>
                      </td>
                      <td className="p-4">
                        {assignment.grades?.length ? (
                          <Chip
                            color="green"
                            value="Completed"
                            icon={<CheckCircleIcon className="h-5 w-5" />}
                          />
                        ) : (
                          <Chip
                            value="not graded yet"
                            color="red"
                            icon={<XCircleIcon className="h-5 w-5" />}
                          />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {assignment.grades?.length ? (
                          <Button size="sm" color="blue">
                            View
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            color="green"
                            onClick={() => {
                              setSelected({
                                assignment: assignment,
                                user: assignment.submissions?.[index].user,
                              });
                              handleOpen();
                            }}
                          >
                            Grade Now
                          </Button>
                        )}
                      </td>
                    </tr>
                  )),
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small">
            Page {courses.current_page} of {courses.last_page}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={!courses.prev_page_url}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              disabled={!courses.next_page_url}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <Typography variant="h3">Grade Submission</Typography>
          </DialogHeader>
          <DialogBody divider>
            <div className="grid gap-6">
              <Input
                id="file"
                name="file"
                label="Submission File"
                type="file"
              />
              <Input
                id="score"
                name="score"
                label="Score"
                type="number"
                max={100}
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="gradient"
              color="red"
              size="sm"
              onClick={handleOpen}
            >
              close
            </Button>
            <Button variant="gradient" color="green" size="sm" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </Authenticated>
  );
}
