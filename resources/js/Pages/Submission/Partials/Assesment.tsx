import { useForm } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Assesment({ open }: { open: boolean }) {
    const [isOpen, setIsOpen] = useState(open);
    const { data, setData, post, processing, errors, reset } = useForm({
        gradeable_id: "",
        gradeable_type: "",
        user_id: "",
        course_id: "",
        score: "",
    });
    function handleOpen() {
        setIsOpen(!isOpen);
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    return (
        <Dialog open={isOpen} handler={handleOpen}>
            <form onSubmit={handleSubmit}>
                <DialogHeader>New message to @</DialogHeader>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input
                            id="file"
                            name="file"
                            label="Submission File"
                            type="file"
                        />
                        <Input
                            id="score"
                            name="score"
                            label="Score"
                            type="number"
                            value={data.score}
                            onChange={(e) => setData("score", e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                id="gradeable_id"
                                name="gradeable_id"
                                label="Gradeable ID"
                                type="number"
                                disabled
                            />
                            <Input
                                id="gradeable_type"
                                name="gradeable_type"
                                label="Gradeable Type"
                                type="text"
                                value={data.gradeable_type}
                                disabled
                            />
                            <Input
                                id="course_id"
                                name="course_id"
                                label="Course ID"
                                type="number"
                                disabled
                            />
                            <Input
                                id="user_id"
                                name="user_id"
                                label="User ID"
                                type="number"
                                disabled
                            />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="gradient"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        disabled={processing}
                    >
                        close
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        size="sm"
                        type="submit"
                        disabled={processing}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
