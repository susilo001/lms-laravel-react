import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CreateModule() {
    return (
        <Authenticated>
            <Head title="Create Module" />
        </Authenticated>
    );
}
