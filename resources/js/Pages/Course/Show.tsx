import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Chip,
    IconButton,
    List,
    ListItem,
    Typography,
} from "@material-tailwind/react";
import { FaFacebook, FaTwitter } from "react-icons/fa6";

export default function ShowCourse({ course }: PageProps<{ course: Course }>) {
    console.log(course);
    return (
        <Authenticated>
            <Head title={course.title} />

            <section className="space-y-10">
                <div className="grid grid-cols-3 gap-6">
                    <figure>
                        <img
                            src={course.image}
                            alt={course.title}
                            className="rounded-lg object-cover"
                        />
                    </figure>
                    <div className="col-span-2 flex flex-col gap-2">
                        <Typography variant="h2" color="blue-gray">
                            {course.title}
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Chip value={course.category.name} />
                            <Typography variant="small" color="blue-gray">
                                {course.user.name}
                            </Typography>
                            <Typography variant="small" color="blue-gray">
                                {course.created_at}
                            </Typography>
                        </div>
                        <Typography variant="paragraph" color="blue-gray">
                            {course.description}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-lg border bg-blue-gray-500 p-4">
                    <div className="flex items-center gap-2">
                        <Typography variant="small" color="white">
                            {course.modules?.length} modules
                        </Typography>
                        <Typography variant="small" color="white">
                            {course.assignments?.length} assignments
                        </Typography>
                        <Typography variant="small" color="white">
                            {course.quizzes?.length} quizzes
                        </Typography>
                    </div>

                    <div className="flex items-center gap-2">
                        <IconButton color="blue-gray">
                            <FaFacebook className="h-6 w-6" />
                        </IconButton>
                        <IconButton color="blue-gray">
                            <FaTwitter className="h-6 w-6" />
                        </IconButton>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <List className="p-0">
                            {course.modules
                                ?.sort(
                                    (a, b) => a.order_number - b.order_number,
                                )
                                .map((module) => (
                                    <Link
                                        key={module.id}
                                        href={"/module/" + module.id}
                                    >
                                        <ListItem>
                                            <Card className="flex-row">
                                                <CardHeader
                                                    shadow={false}
                                                    floated={false}
                                                    className="w-1/7 flex shrink-0 items-center justify-center"
                                                >
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-gray-500 p-4 text-lg text-white">
                                                        {module.order_number}
                                                    </div>
                                                </CardHeader>
                                                <CardBody>
                                                    <Typography
                                                        variant="h3"
                                                        color="blue-gray"
                                                    >
                                                        {module.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="paragraph"
                                                        color="blue-gray"
                                                    >
                                                        {module.description}
                                                    </Typography>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                    </Link>
                                ))}
                        </List>
                    </div>
                    <div className="space-y-8">
                        <Card className="rounded-lg">
                            <CardHeader className="p-2" color="blue-gray">
                                <Typography variant="h4" color="white">
                                    Assignments
                                </Typography>
                            </CardHeader>
                            <CardBody className="p-0">
                                <List className="justify-start">
                                    {course.assignments?.map((assignment) => (
                                        <Link
                                            href={
                                                "/assignment/" + assignment.id
                                            }
                                            key={assignment.id}
                                        >
                                            <ListItem>
                                                <Typography
                                                    variant="h5"
                                                    color="blue-gray"
                                                >
                                                    {assignment.name}
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </CardBody>
                        </Card>
                        <Card className="rounded-lg">
                            <CardHeader className="p-2" color="blue-gray">
                                <Typography variant="h4" color="white">
                                    Quizzes
                                </Typography>
                            </CardHeader>
                            <CardBody className="p-0">
                                <List className="justify-start">
                                    {course.quizzes?.map((quiz) => (
                                        <Link
                                            href={"/quiz/" + quiz.id}
                                            key={quiz.id}
                                        >
                                            <ListItem>
                                                <Typography
                                                    variant="h5"
                                                    color="blue-gray"
                                                >
                                                    {quiz.name}
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
