import { Link } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { PropsWithChildren } from "react";

const Table = ({ children }: PropsWithChildren) => {
    return <Card className="h-full w-full">{children}</Card>;
};

const Header = ({ children }: PropsWithChildren) => {
    return (
        <CardHeader floated={false} shadow={false} className="rounded-none">
            {children}
        </CardHeader>
    );
};

const Body = ({
    children,
    className,
    TABLE_HEAD,
}: PropsWithChildren<{
    TABLE_HEAD: string[];
    className?: string;
}>) => {
    return (
        <CardBody className="overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography variant="small">{head}</Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={className}>{children}</tbody>
            </table>
        </CardBody>
    );
};

const Pagination = ({
    prevPageUrl,
    nextPageUrl,
    links,
}: PropsWithChildren<{
    prevPageUrl: string;
    nextPageUrl: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}>) => {
    return (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Link href={prevPageUrl}>
                <Button
                    disabled={prevPageUrl === null}
                    variant={prevPageUrl === null ? "text" : "outlined"}
                    color="blue-gray"
                    size="sm"
                >
                    Previous
                </Button>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
                {links.map((link, index) => (
                    <Link
                        href={link.url === null ? "#" : link.url}
                        preserveScroll
                        key={index}
                    >
                        <Button
                            variant={link.active ? "text" : "outlined"}
                            color="blue-gray"
                            size="sm"
                            className={
                                link.label === "Next &raquo;" ||
                                link.label === "&laquo; Previous"
                                    ? "hidden"
                                    : ""
                            }
                        >
                            {link.label}
                        </Button>
                    </Link>
                ))}
            </div>
            <Link href={nextPageUrl}>
                <Button
                    disabled={nextPageUrl === null}
                    variant={nextPageUrl === null ? "text" : "outlined"}
                    color="blue-gray"
                    size="sm"
                >
                    Next
                </Button>
            </Link>
        </CardFooter>
    );
};

Table.Header = Header;
Table.Body = Body;
Table.Pagination = Pagination;

export default Table;
