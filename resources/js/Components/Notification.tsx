import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";

import { Alert, Typography } from "@material-tailwind/react";

const statusConfig = {
    Success: {
        color: "green",
        icon: <CheckCircleIcon className="mt-px h-6 w-6" />,
    },
    Error: { color: "red", icon: <XCircleIcon className="mt-px h-6 w-6" /> },
    Warning: {
        color: "orange",
        icon: <ExclamationTriangleIcon className="mt-px h-6 w-6" />,
    },
    Info: {
        color: "blue",
        icon: <InformationCircleIcon className="mt-px h-6 w-6" />,
    },
};

export function Notification({
    message = "Default message",
    status = "Info",
}: {
    message?: string;
    status?: keyof typeof statusConfig;
}) {
    const [open, setOpen] = React.useState(true);
    const { color, icon } = statusConfig[status] || statusConfig["Info"];

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Alert
            open={open}
            color={color as "green" | "red" | "orange" | "blue"}
            icon={icon}
            onClose={() => setOpen(false)}
            animate={{
                mount: { x: 0 },
                unmount: { x: 100 },
            }}
        >
            <Typography variant="h5" color="white">
                {status}
            </Typography>
            <Typography
                color="white"
                variant="paragraph"
                className="mt-2 font-normal"
            >
                {message}
            </Typography>
        </Alert>
    );
}
