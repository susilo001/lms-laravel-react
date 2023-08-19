import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EditModule() {
    return (
        <Authenticated>
            <Head title="Edit Module" />
        </Authenticated>
    );
}
