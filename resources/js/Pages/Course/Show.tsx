import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Course, PageProps } from "@/types";
import {
  BookmarkSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  List,
  ListItem,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function ShowCourse({
  course,
  auth,
}: PageProps<{ course: Course }>) {
  const [open, setOpen] = useState(0);
  const [content, setContent] = useState("");

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    thread_id: number,
  ) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    data.append("thread_id", thread_id.toString());
    data.append("user_id", auth.user.id.toString());
    data.append("content", content);

    router.post(route("posts.store"), data);
  };

  return (
    <Authenticated>
      <Head title={course.title} />

      <section className="space-y-10">
        <div className="grid grid-cols-3 gap-2">
          <figure>
            <img
              src={course.image}
              alt={course.title}
              className="h-64 w-64 rounded-lg object-cover"
            />
          </figure>
          <div className="col-span-2 flex flex-col gap-2">
            <Typography variant="h2">{course.title}</Typography>
            <div className="flex items-center gap-2">
              <Chip value={course.category.name} />
              <Typography variant="small">{course.user.name}</Typography>
              <Typography variant="small">{course.created_at}</Typography>
            </div>
            <Typography variant="paragraph">{course.description}</Typography>
          </div>
        </div>
        <Tabs value="modules">
          <TabsHeader
            className="bg-white bg-opacity-100 p-4"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            <Tab value={"modules"}>
              <div className="flex items-center gap-2">
                <BookmarkSquareIcon className="h-5 w-5" />
                {course.modules?.length} Modules
              </div>
            </Tab>
            <Tab value={"assignments"}>
              <div className="flex items-center gap-2">
                <DocumentCheckIcon className="h-5 w-5" />
                {course.assignments?.length} Assignments
              </div>
            </Tab>
            <Tab value={"quizzes"}>
              <div className="flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-5 w-5" />
                {course.quizzes?.length} Quizzes
              </div>
            </Tab>
            <Tab value={"forums"}>
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Forum
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value={"modules"} className="px-0">
              <List className="p-0">
                {course.modules
                  ?.sort((a, b) => a.order_number - b.order_number)
                  .map((module) => (
                    <Link key={module.id} href={"/module/" + module.id}>
                      <ListItem>
                        <Card className="flex-row">
                          <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-2 flex shrink-0 items-center justify-center"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full  p-2 text-lg ">
                              {module.order_number}
                            </div>
                          </CardHeader>
                          <CardBody className="p-4">
                            <Typography variant="h5">{module.name}</Typography>
                            <Typography variant="small">
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
                          <Typography variant="h5">
                            {assignment.name}
                          </Typography>
                          <Typography variant="small">
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
                  <Link href={"/quiz/" + quiz.id} key={quiz.id}>
                    <ListItem>
                      <Card className="w-full">
                        <CardBody>
                          <Typography variant="h5">{quiz.name}</Typography>
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
                  <Typography variant="h4">{course.forum?.title}</Typography>
                  <Typography variant="small">
                    {course.forum?.description}
                  </Typography>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-2">
                    <Button
                      className="flex items-center gap-2"
                      size="sm"
                      color="green"
                      variant="gradient"
                    >
                      <PlusIcon className="h-5 w-5" />
                      Create Thread
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className="bg-gray-200">
                  <div className="space-y-2">
                    {course.forum?.threads?.map((thread) => (
                      <Card className="w-full" key={thread.id}>
                        <CardBody className="space-y-2">
                          <Typography variant="h5">{thread.title}</Typography>
                          <div className="flex items-center gap-2">
                            <Avatar
                              src={thread.user.avatar}
                              alt={thread.user.name}
                              size="xs"
                            />
                            <Typography variant="small">
                              {thread.user.name}
                            </Typography>
                            <Typography variant="small">
                              {thread.created_at}
                            </Typography>
                          </div>
                          <Typography variant="small">
                            {thread.content}
                          </Typography>
                          <ButtonGroup variant="text" size="sm" color="blue">
                            <Button
                              className="flex items-center gap-2"
                              onClick={() => handleOpen(thread.id)}
                            >
                              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                              {thread.posts?.length} {""}
                              Comments
                            </Button>
                            <Button className="flex items-center gap-2">
                              <ShareIcon className="h-5 w-5" />
                              Share
                            </Button>
                          </ButtonGroup>
                          <Collapse open={open === thread.id}>
                            <div className="border-t-2">
                              <form
                                onSubmit={(e) => handleSubmit(e, thread.id)}
                              >
                                <div className="relative">
                                  <Textarea
                                    variant="static"
                                    placeholder="Your Comment"
                                    rows={6}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                  />
                                  <div className="flex w-full justify-between py-1.5">
                                    <IconButton
                                      variant="text"
                                      color="blue-gray"
                                      size="sm"
                                    >
                                      <ShareIcon className="h-4 w-4" />
                                    </IconButton>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        color="red"
                                        variant="text"
                                      >
                                        Reset
                                      </Button>
                                      <Button
                                        size="sm"
                                        color="blue"
                                        variant="gradient"
                                        type="submit"
                                      >
                                        Post
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <List className="p-0">
                                {thread.posts?.map((post) => (
                                  <ListItem
                                    key={post.id}
                                    selected={post.user_id === auth?.user?.id}
                                  >
                                    <div className="flex items-center gap-4">
                                      <Avatar
                                        src={post.user.avatar}
                                        alt={post.user.name}
                                        size="sm"
                                      />
                                      <div>
                                        <Typography variant="small">
                                          {post.user.name}
                                        </Typography>
                                        <Typography variant="small">
                                          {post.created_at}
                                        </Typography>
                                        <Typography variant="small">
                                          {post.content}
                                        </Typography>
                                      </div>
                                    </div>
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          </Collapse>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </section>
    </Authenticated>
  );
}
