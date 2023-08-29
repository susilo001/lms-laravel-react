import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Forum, PageProps, Pagination } from "@/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import {
    Badge,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    List,
    ListItem,
    Typography,
} from "@material-tailwind/react";

export default function ForumPage({
    forums,
}: PageProps<{ forums: Pagination<Forum> }>) {
    console.log(forums);

    const handlePaginationClick = (url: string) => {
        router.get(url);
    };

    const handlePrevPage = () => {
        router.get(forums.prev_page_url!);
    };

    const handleNextPage = () => {
        router.get(forums.next_page_url!);
    };

    return (
        <Authenticated>
            <Head title="Forums Page" />
            <List>
                {forums.data.map((forum) => (
                    <Link href={route("forums.show", forum.id)} key={forum.id}>
                        <ListItem>
                            <Card className="w-full">
                                <CardHeader floated={false} shadow={false}>
                                    <Typography variant="h3">
                                        {forum.title}
                                    </Typography>
                                    <Typography variant="small">
                                        {forum.course.title}
                                    </Typography>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <Typography variant="paragraph">
                                        {forum.description}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="border-t-2 p-4">
                                    <div className="flex items-center justify-between">
                                        <Typography variant="small">
                                            Created at: {forum.created_at}
                                        </Typography>

                                        <Badge
                                            content={forum.threads_count}
                                            placement="top-end"
                                        >
                                            <IconButton variant="text">
                                                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Badge>
                                    </div>
                                </CardFooter>
                            </Card>
                        </ListItem>
                    </Link>
                ))}
            </List>

            <ButtonGroup
                variant="outlined"
                className="mt-4 flex w-full justify-center"
            >
                <IconButton
                    onClick={handlePrevPage}
                    disabled={!forums.prev_page_url}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                {forums.links.map((link) => (
                    <IconButton
                        key={link.label}
                        disabled={link.active}
                        onClick={() => handlePaginationClick(link.url!)}
                        className={`${
                            link.label === "Next &raquo;" ||
                            link.label === "&laquo; Previous"
                                ? "hidden"
                                : ""
                        }`}
                    >
                        {link.label}
                    </IconButton>
                ))}
                <IconButton
                    onClick={handleNextPage}
                    disabled={!forums.next_page_url}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </ButtonGroup>
        </Authenticated>
    );
}
