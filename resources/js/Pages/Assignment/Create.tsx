import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CreateAssignment() {
    return (
        <Authenticated>
            <Head title="Create Assignment" />
        </Authenticated>
    );
}
