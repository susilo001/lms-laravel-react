import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, Quiz } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    List,
    ListItem,
    Radio,
    Typography,
} from "@material-tailwind/react";

interface Answer {
    question_id: number;
    value: string;
}

export default function ShowQuiz({ quiz }: PageProps<{ quiz: Quiz }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        answer: [] as Answer[],
    });

    const handleAnswerChange = (questionId: number, selectedValue: string) => {
        const updatedAnswer = [...data.answer];
        const existingIndex = updatedAnswer.findIndex(
            (item) => item.question_id === questionId,
        );

        if (existingIndex !== -1) {
            updatedAnswer[existingIndex].value = selectedValue;
        } else {
            updatedAnswer.push({
                question_id: questionId,
                value: selectedValue,
            });
        }

        setData("answer", updatedAnswer);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("quiz.attempt", quiz.id));
    };

    return (
        <Authenticated>
            <Head title={quiz.name} />

            <Card className="p-4">
                <form onSubmit={handleSubmit}>
                    <CardHeader floated={false} shadow={false}>
                        <Typography variant="h2" color="blue-gray">
                            {quiz.name}
                        </Typography>
                        <Typography variant="paragraph" color="blue-gray">
                            Jawablah soal dengan benar dan teliti!
                        </Typography>
                    </CardHeader>
                    <List className="flex flex-col justify-start gap-4">
                        {quiz.questions?.map((question, index) => (
                            <ListItem
                                key={question.id}
                                className="flex flex-col items-start gap-2"
                                ripple={false}
                            >
                                <Typography
                                    color="blue-gray"
                                    variant="paragraph"
                                >
                                    {index + 1}. {question.question}?
                                </Typography>
                                <List>
                                    {question.options?.map((option, index) => (
                                        <ListItem key={index} ripple={false}>
                                            <Radio
                                                name={question.id.toString()}
                                                value={option.key}
                                                onChange={(e) =>
                                                    handleAnswerChange(
                                                        question.id,
                                                        e.target.value,
                                                    )
                                                }
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <Typography color="blue-gray">
                                                            {option.key}
                                                        </Typography>
                                                        <Typography color="blue-gray">
                                                            {option.value}
                                                        </Typography>
                                                    </div>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </ListItem>
                        ))}
                    </List>
                    <CardFooter>
                        <div className="flex items-center justify-between">
                            <Typography variant="small" color="blue-gray">
                                {quiz.questions?.length} questions
                            </Typography>
                            <div className="flex items-center gap-4">
                                <Button
                                    color="green"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </Authenticated>
    );
}
