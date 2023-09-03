import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Enrollment, PageProps } from "@/types";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export default function Home({
  coursesCount,
  studentsCount,
  teachersCount,
  enrollments,
}: PageProps<{
  coursesCount: number;
  studentsCount: number;
  teachersCount: number;
  enrollments: Enrollment[];
}>) {
  const gadgets = [
    {
      title: "Total Students Enrolled",
      value: studentsCount,
      color: "red",
      icon: <AcademicCapIcon className="h-10 w-10" />,
    },
    {
      title: "Total Teachers",
      value: teachersCount,
      color: "green",
      icon: <UserGroupIcon className="h-10 w-10" />,
    },
    {
      title: "Total Courses",
      value: coursesCount,
      color: "blue",
      icon: <BookOpenIcon className="h-10 w-10" />,
    },
  ];
  return (
    <AuthenticatedLayout>
      <Head title="Home" />
      <div className="mt-4 space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {gadgets.map((gadget, index) => (
            <Card key={index}>
              <CardHeader
                color={gadget.color as any}
                variant="gradient"
                className="absolute -mt-4 grid h-16 w-16 place-items-center"
              >
                {React.cloneElement(gadget.icon, {
                  className: "h-10 w-10",
                })}
              </CardHeader>
              <CardBody className="p-4 text-right">
                <Typography variant="paragraph" color="blue-gray">
                  {gadget.title}
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {gadget.value}
                </Typography>
              </CardBody>
              <CardFooter className="border-t p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-2"
                >
                  new students
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Card className="h-96">
              <CardHeader
                floated={false}
                shadow={false}
                className="overflow-visible"
              >
                <div className="flex items-center justify-between gap-2">
                  <Typography variant="h5">My Courses</Typography>
                  <Typography variant="small">{enrollments.length}</Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-auto border-t-2 p-0">
                <List>
                  {enrollments.map((enrollment) => (
                    <ListItem key={enrollment.id}>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                          <Typography variant="h6">
                            {enrollment.course.title}
                          </Typography>
                          <div className="flex items-center gap-2">
                            <Chip
                              color="blue"
                              variant="gradient"
                              icon={
                                <Avatar
                                  size="xs"
                                  variant="circular"
                                  className="h-full w-full -translate-x-0.5"
                                  alt="Tania Andrew"
                                  src={enrollment.course.user.avatar}
                                />
                              }
                              value={
                                <Typography
                                  variant="small"
                                  className="capitalize leading-none"
                                >
                                  {enrollment.course.user.name}
                                </Typography>
                              }
                              className="rounded-full py-1.5"
                            />
                            <Chip
                              color="amber"
                              value={
                                <Typography
                                  variant="small"
                                  className="capitalize leading-none"
                                >
                                  {enrollment.course.category.name}
                                </Typography>
                              }
                              className="rounded-full py-1.5"
                            />
                          </div>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </div>
          <Card className="h-96">
            <CardHeader
              floated={false}
              shadow={false}
              className="overflow-visible"
            >
              <div className="flex items-center justify-between gap-2">
                <Typography variant="h5">Assignments</Typography>
                <Typography variant="small">
                  {`Completed ${
                    enrollments.filter(
                      (enrollment) =>
                        enrollment.course.assignments?.length &&
                        enrollment.course.assignments?.length ===
                          enrollment.course.assignments?.filter(
                            (assignment) => assignment.submissions?.length,
                          ).length,
                    ).length
                  }/${
                    enrollments.filter(
                      (enrollment) => enrollment.course.assignments?.length,
                    ).length
                  }`}
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="overflow-x-auto border-t-2 p-0">
              <List>
                {enrollments.map((enrollment) => {
                  return enrollment.course.assignments?.map((assignment) => {
                    return (
                      <ListItem key={assignment.id}>
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex flex-col">
                            <Typography variant="h6">
                              {assignment.name}
                            </Typography>
                            <Typography variant="small">
                              Due Date: {assignment.due_date}
                            </Typography>
                          </div>
                          {assignment.submissions?.length ? (
                            <IconButton color="green" variant="text">
                              <CheckIcon className="h-6 w-6" />
                            </IconButton>
                          ) : (
                            <Button color="green" variant="text" size="sm">
                              Submit
                            </Button>
                          )}
                        </div>
                      </ListItem>
                    );
                  });
                })}
              </List>
            </CardBody>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
