import { Card, CardContent } from "./ui/card";

interface TaskCardProps {
    content: string;
}

const TaskCard = ({ content }: TaskCardProps) => {
    return (
        <Card>
            <CardContent>{content}</CardContent>
        </Card>
    );
};

export default TaskCard;
