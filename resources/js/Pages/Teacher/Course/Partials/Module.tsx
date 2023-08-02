import Modal from "@/Components/Modal";
import { Module } from "@/types";
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
export default function ModuleComponent({
    courseId,
    modules,
}: {
    courseId: number;
    modules?: Module[];
}) {
    const [openCreateModule, setOpenCreateModule] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        content: null as File | null,
        course_id: courseId,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(route("modules.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("content", file);
    };

    const closeModal = () => {
        setOpenCreateModule(false);
        reset();
    };

    const handleModuleEdit = () => {
        console.log("Edit Module");
    };
    const handleModuleDelete = () => {
        console.log("Delete Module");
    };

    return (
        <>
            <div className="mt-4 w-full space-y-4">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Add Module
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Add a new module to the course
                    </Typography>
                </div>
                <Button
                    color="green"
                    fullWidth
                    variant="outlined"
                    disabled={processing}
                    onClick={() => setOpenCreateModule(true)}
                    className="flex items-center justify-center gap-2"
                >
                    Add Module
                    <PlusIcon className="h-5 w-5" />
                </Button>
                <div className="space-y-4">
                    {modules?.map((module) => (
                        <div
                            key={module.id}
                            className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-4"
                        >
                            <div className="flex flex-col">
                                <Typography variant="h4">
                                    {module.name}
                                </Typography>
                                <Typography variant="paragraph">
                                    {module.description}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-4">
                                <IconButton
                                    color="orange"
                                    variant="text"
                                    onClick={handleModuleEdit}
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </IconButton>
                                <IconButton
                                    color="red"
                                    variant="text"
                                    onClick={handleModuleDelete}
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={openCreateModule} onClose={closeModal}>
                <div className="flex flex-col space-y-4 p-4">
                    <h1 className="text-2xl font-semibold">Create Module</h1>
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
                            id="content"
                            name="content"
                            type="file"
                            onChange={handleFileChange}
                            error={data.content ? true : false}
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
