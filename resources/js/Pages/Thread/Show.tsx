import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Thread } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    List,
    ListItem,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export default function ThreadShow({
    thread,
    auth,
}: PageProps<{ thread: Thread }>) {
    const { data, setData, errors, reset, post, processing } = useForm({
        user_id: auth.user.id,
        thread_id: thread.id,
        content: "",
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("posts.store"));
    };
    return (
        <Authenticated>
            <Head title="Thread Show" />
            <Card>
                <CardHeader floated={false} shadow={false}>
                    <Typography variant="h2">{thread.title}</Typography>
                    <Typography variant="paragraph">
                        {thread.content}
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <Textarea
                                variant="static"
                                placeholder="Your Comment"
                                rows={6}
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                error={!!errors.content}
                            />
                            <div className="flex w-full justify-between py-1.5">
                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    size="sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                        />
                                    </svg>
                                </IconButton>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        color="red"
                                        variant="text"
                                        onClick={() => reset("content")}
                                        disabled={processing}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="blue"
                                        variant="gradient"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="border-t-2">
                    <List>
                        {thread.posts?.map((post) => (
                            <ListItem
                                key={post.id}
                                selected={post.user_id === auth.user.id}
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        src={post.user.media?.[0].original_url}
                                        alt={post.user.name}
                                        size="sm"
                                    />
                                    <div>
                                        <Typography variant="lead">
                                            {post.user.name}
                                        </Typography>
                                        <Typography variant="small">
                                            {post.created_at}
                                        </Typography>
                                        <Typography variant="paragraph">
                                            {post.content}
                                        </Typography>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </CardFooter>
            </Card>
        </Authenticated>
    );
}
