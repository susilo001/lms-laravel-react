import Modal from "@/Components/Modal";
import { Assignment } from "@/types";
import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import {
    Button,
    IconButton,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function AssignmentComponent({
    courseId,
    assignments,
}: {
    courseId: number;
    assignments?: Assignment[];
}) {
    const [openCreateAssignment, setOpenCreateAssignment] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        due_date: "",
        total_marks: "",
        course_id: courseId,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("assignments.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleAssignmentEdit = () => {
        console.log("Edit Module");
    };
    const handleAssignmentDelete = () => {
        console.log("Delete Module");
    };

    const closeModal = () => {
        setOpenCreateAssignment(false);
        reset();
    };

    return (
        <>
            <div className="mt-4 w-full space-y-4">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Add Assignment
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Add a new assignment to the course
                    </Typography>
                </div>
                <Button
                    color="green"
                    fullWidth
                    variant="outlined"
                    disabled={processing}
                    onClick={() => setOpenCreateAssignment(true)}
                    className="flex items-center justify-center gap-2"
                >
                    Add Assignment
                    <PlusIcon className="h-5 w-5" />
                </Button>
                <div className="space-y-4">
                    {assignments?.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-4"
                        >
                            <div className="flex flex-col">
                                <Typography variant="h4">
                                    {assignment.name}
                                </Typography>
                                <Typography variant="paragraph">
                                    {assignment.description}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-4">
                                <IconButton
                                    color="orange"
                                    variant="text"
                                    onClick={handleAssignmentEdit}
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </IconButton>
                                <IconButton
                                    color="red"
                                    variant="text"
                                    onClick={handleAssignmentDelete}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={openCreateAssignment} onClose={closeModal}>
                <div className="flex flex-col space-y-4 p-4">
                    <h1 className="text-2xl font-semibold">
                        Create Assignment
                    </h1>
                    <hr className="border-1 border-gray-300" />
                    <form onSubmit={handleSubmit} className="space-y-4 p-4">
                        <Input
                            id="name"
                            name="name"
                            label="Module Name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={errors.name ? true : false}
                        />

                        <Textarea
                            id="description"
                            name="description"
                            label="Module Description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            error={errors.description ? true : false}
                        />

                        <Input
                            id="due_date"
                            name="due_date"
                            label="Due Date"
                            type="date"
                            value={data.due_date}
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                            error={errors.due_date ? true : false}
                        />

                        <Input
                            id="total_marks"
                            name="total_marks"
                            label="Total Marks"
                            type="number"
                            value={data.total_marks}
                            onChange={(e) =>
                                setData("total_marks", e.target.value)
                            }
                            error={errors.total_marks ? true : false}
                        />

                        <div className="flex items-center space-x-4">
                            <Button
                                color="green"
                                type="submit"
                                disabled={processing}
                            >
                                Create
                            </Button>

                            <Button color="red" onClick={() => reset()}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
