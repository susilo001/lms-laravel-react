import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function EditAssignment() {
    return (
        <Authenticated>
            <Head title="Edit Assignment" />
        </Authenticated>
    );
}
