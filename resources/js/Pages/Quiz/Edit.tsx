import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EditQuiz() {
    return (
        <Authenticated>
            <Head title="Edit Quiz" />
        </Authenticated>
    );
}
