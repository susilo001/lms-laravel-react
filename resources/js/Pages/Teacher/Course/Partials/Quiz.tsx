import Modal from "@/Components/Modal";
import { Quiz } from "@/types";
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
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function QuizComponent({
    courseId,
    quizzes,
}: {
    courseId: number;
    quizzes?: Quiz[];
}) {
    const [openCreateQuiz, setOpenCreateQuiz] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        course_id: courseId,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(route("quizzes.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleQuizEdit = () => {
        console.log("Edit Module");
    };
    const handleQuizDelete = () => {
        console.log("Delete Module");
    };

    const closeModal = () => {
        setOpenCreateQuiz(false);
    };
    return (
        <>
            <div className="mt-4 w-full space-y-4">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Add Quiz
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Add a new quiz to the course
                    </Typography>
                </div>
                <Button
                    color="green"
                    fullWidth
                    variant="outlined"
                    disabled={processing}
                    onClick={() => setOpenCreateQuiz(true)}
                    className="flex items-center justify-center gap-2"
                >
                    Add Quiz
                    <PlusIcon className="h-5 w-5" />
                </Button>
                <div className="space-y-4">
                    {quizzes?.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-4"
                        >
                            <div className="flex flex-col">
                                <Typography variant="h5">
                                    {quiz.name}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-4">
                                <IconButton
                                    color="orange"
                                    variant="text"
                                    onClick={handleQuizEdit}
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </IconButton>
                                <IconButton
                                    color="red"
                                    variant="text"
                                    onClick={handleQuizDelete}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={openCreateQuiz} onClose={closeModal}>
                <div className="flex flex-col space-y-4 p-4">
                    <h1 className="text-2xl font-semibold">Create Quiz</h1>
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
