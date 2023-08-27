import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    List,
    ListItem,
    Typography,
} from "@material-tailwind/react";

export default function Discussion() {
    return (
        <Card className="h-screen rounded-lg">
            <CardHeader
                className="mb-4 grid h-28 place-items-center"
                variant="gradient"
                color="blue-gray"
            >
                <Typography variant="h4" color="white">
                    Discussion
                </Typography>
            </CardHeader>
            <CardBody
                className="h-full overflow-y-scroll p-2"
                color="blue-gray"
            >
                <List className="justify-start">
                    <ListItem color="blue-gray">
                        <div className="flex items-start gap-2">
                            <Avatar
                                src="https://picsum.photos/200"
                                size="sm"
                                alt="avatar"
                            />
                            <div>
                                <Typography
                                    variant="small"
                                    className="font-bold"
                                >
                                    Tania Andrew
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="text-justify font-normal"
                                >
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Accusantium assumenda
                                    eveniet fugiat voluptatum molestiae esse
                                    nostrum ut dolor fuga aspernatur ipsa, aut
                                    quos tenetur repellat voluptatibus, pariatur
                                    laboriosam sequi officiis!
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                    <ListItem color="blue-gray">
                        <div className="flex items-start gap-2">
                            <Avatar
                                src="https://picsum.photos/200"
                                size="sm"
                                alt="avatar"
                            />
                            <div>
                                <Typography
                                    variant="small"
                                    className="font-bold"
                                >
                                    Tania Andrew
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                >
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Accusantium assumenda
                                    eveniet fugiat voluptatum molestiae esse
                                    nostrum ut dolor fuga aspernatur ipsa, aut
                                    quos tenetur repellat voluptatibus, pariatur
                                    laboriosam sequi officiis!
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                    <ListItem color="blue-gray">
                        <div className="flex items-start gap-2">
                            <Avatar
                                src="https://picsum.photos/200"
                                size="sm"
                                alt="avatar"
                            />
                            <div>
                                <Typography
                                    variant="small"
                                    className="font-bold"
                                >
                                    Tania Andrew
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                >
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Accusantium assumenda
                                    eveniet fugiat voluptatum molestiae esse
                                    nostrum ut dolor fuga aspernatur ipsa, aut
                                    quos tenetur repellat voluptatibus, pariatur
                                    laboriosam sequi officiis!
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                </List>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <div className="relative flex w-full">
                    <Input
                        id="message"
                        name="message"
                        label="Message"
                        color="gray"
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        className="!absolute right-0 top-0 rounded"
                        color="gray"
                        variant="text"
                    >
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
