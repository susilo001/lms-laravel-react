import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps } from "@/types";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Input,
    List,
    ListItem,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
    Typography,
} from "@material-tailwind/react";

import { MdAssignment, MdBook, MdChat, MdQuiz } from "react-icons/md";

export default function ShowCourse({ course }: PageProps<{ course: Course }>) {
    return (
        <Authenticated>
            <Head title={course.title} />

            <section className="space-y-10">
                <div className="grid grid-cols-3 gap-6">
                    <figure className="w-full">
                        <img
                            src={course.media?.[0].original_url}
                            alt={course.title}
                            className="rounded-lg object-contain"
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
                <Tabs value="modules">
                    <TabsHeader
                        className=" bg-white bg-opacity-100 p-4"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        <Tab value={"modules"}>
                            <div className="flex items-center gap-2">
                                <MdBook className="h-5 w-5" />
                                {course.modules?.length} Modules
                            </div>
                        </Tab>
                        <Tab value={"assignments"}>
                            <div className="flex items-center gap-2">
                                <MdAssignment className="h-5 w-5" />
                                {course.assignments?.length} Assignments
                            </div>
                        </Tab>
                        <Tab value={"quizzes"}>
                            <div className="flex items-center gap-2">
                                <MdQuiz className="h-5 w-5" />
                                {course.quizzes?.length} Quizzes
                            </div>
                        </Tab>
                        <Tab value={"forums"}>
                            <div className="flex items-center gap-2">
                                <MdChat className="h-5 w-5" />
                                Forum
                            </div>
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value={"modules"} className="px-0">
                            <List className="p-0">
                                {course.modules
                                    ?.sort(
                                        (a, b) =>
                                            a.order_number - b.order_number,
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
                                                        className="m-2 flex shrink-0 items-center justify-center"
                                                    >
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-gray-500 p-2 text-lg text-white">
                                                            {
                                                                module.order_number
                                                            }
                                                        </div>
                                                    </CardHeader>
                                                    <CardBody className="p-4">
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
                        </TabPanel>
                        <TabPanel value={"assignments"} className="px-0">
                            <List className="p-0">
                                {course.assignments?.map((assignment) => (
                                    <Link
                                        href={"/assignment/" + assignment.id}
                                        key={assignment.id}
                                    >
                                        <ListItem>
                                            <Card className="flex-row">
                                                <CardBody>
                                                    <Typography
                                                        variant="h3"
                                                        color="blue-gray"
                                                    >
                                                        {assignment.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="paragraph"
                                                        color="blue-gray"
                                                    >
                                                        {assignment.description}
                                                    </Typography>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </TabPanel>
                        <TabPanel value={"quizzes"} className="px-0">
                            <List className="p-0">
                                {course.quizzes?.map((quiz) => (
                                    <Link
                                        href={"/quiz/" + quiz.id}
                                        key={quiz.id}
                                    >
                                        <ListItem>
                                            <Card className="w-full">
                                                <CardBody>
                                                    <Typography
                                                        variant="h3"
                                                        color="blue-gray"
                                                    >
                                                        {quiz.name}
                                                    </Typography>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </TabPanel>
                        <TabPanel value={"forums"} className="px-0">
                            <Card>
                                <CardHeader floated={false} shadow={false}>
                                    <Typography variant="h3" color="blue-gray">
                                        Thread Title
                                    </Typography>
                                </CardHeader>
                                <CardBody className="bg-gray-200">
                                    <List className="p-0">
                                        <ListItem>
                                            <Card className="w-full">
                                                <CardBody className="flex gap-4">
                                                    <Avatar src="https://picsum.photos/200" />
                                                    <div>
                                                        <Typography variant="lead">
                                                            User Name
                                                        </Typography>
                                                        <Typography variant="paragraph">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Quisquam voluptatum,
                                                            voluptatibus,
                                                            quibusdam, quia
                                                            voluptates quos
                                                        </Typography>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                        <ListItem>
                                            <Card className="w-full">
                                                <CardBody className="flex gap-4">
                                                    <Avatar src="https://picsum.photos/200" />
                                                    <div>
                                                        <Typography variant="lead">
                                                            User Name
                                                        </Typography>
                                                        <Typography variant="paragraph">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Quisquam voluptatum,
                                                            voluptatibus,
                                                            quibusdam, quia
                                                            voluptates quos
                                                        </Typography>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                        <ListItem>
                                            <Card className="w-full">
                                                <CardBody className="flex gap-4">
                                                    <Avatar src="https://picsum.photos/200" />
                                                    <div>
                                                        <Typography variant="lead">
                                                            User Name
                                                        </Typography>
                                                        <Typography variant="paragraph">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Quisquam voluptatum,
                                                            voluptatibus,
                                                            quibusdam, quia
                                                            voluptates quos
                                                        </Typography>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </ListItem>
                                    </List>
                                </CardBody>
                                <CardFooter>
                                    <Input
                                        id="message"
                                        crossOrigin=""
                                        label="Message"
                                        type="text"
                                        icon={
                                            <PaperAirplaneIcon className="h-5 w-5" />
                                        }
                                    />
                                </CardFooter>
                            </Card>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </section>
        </Authenticated>
    );
}
