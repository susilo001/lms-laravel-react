import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Forum, PageProps } from "@/types";
import {
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Head, router, useForm } from "@inertiajs/react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  List,
  ListItem,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function ForumShow({
  forum,
  auth,
}: PageProps<{ forum: Forum }>) {
  const [open, setOpen] = useState(false);
  const { data, setData, errors, post, processing } = useForm({
    title: "",
    content: "",
    forum_id: forum.id,
    user_id: auth.user.id,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    post(route("threads.store"));
  };
  return (
    <Authenticated>
      <Head title={`Forum ${forum.title}`} />
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader floated={false} shadow={false}>
            <Typography variant="h3">{forum.title}</Typography>
            <Typography variant="small">{forum.course.title}</Typography>
            <Typography variant="paragraph">{forum.description}</Typography>
          </CardHeader>
          <CardBody className="p-4">
            <div className="flex items-center">
              <Button
                variant="text"
                color="green"
                onClick={handleOpen}
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                new thread
              </Button>
              <Badge content={forum.threads?.length} placement="top-end">
                <IconButton variant="text">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                </IconButton>
              </Badge>
            </div>
          </CardBody>
          <CardFooter className="border-t-2 p-4">
            <List>
              {forum.threads?.map((thread) => (
                <ListItem key={thread.id}>
                  <div className="flex w-full flex-col items-start">
                    <div>
                      <Typography variant="h4">{thread.title}</Typography>
                      <Typography variant="paragraph">
                        {thread.content}
                      </Typography>
                    </div>
                    <div className="flex w-full items-center justify-between border-t-2 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="text"
                          color="blue"
                          onClick={() =>
                            router.get(route("threads.show", thread.id))
                          }
                          className="flex items-center gap-2"
                        >
                          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                          Comment
                        </Button>

                        <Button variant="text" color="green">
                          share
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Typography variant="small">
                          {thread.created_at}
                        </Typography>
                        <div className="flex items-center gap-2">
                          <Avatar
                            size="xs"
                            src={thread.user.avatar}
                            alt={thread.user.name}
                          />
                          <Typography variant="small">
                            {thread.user.name}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </CardFooter>
        </Card>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div>
              <Typography variant="h3">New Thread</Typography>
              <Typography variant="small">
                Create a new thread in this forum to start a new discussion.
              </Typography>
            </div>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              <Input
                id="title"
                name="title"
                label="Title"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                error={errors?.title ? true : false}
              />
              <Textarea
                id="content"
                name="content"
                label="Content"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
                error={errors?.content ? true : false}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <div className="flex items-center gap-2">
              <Button
                color="green"
                size="sm"
                type="submit"
                variant="gradient"
                disabled={processing}
              >
                Submit
              </Button>
              <Button
                color="red"
                size="sm"
                variant="gradient"
                onClick={handleClose}
                disabled={processing}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Dialog>
    </Authenticated>
  );
}
