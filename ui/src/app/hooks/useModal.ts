import { useState } from "react";

export const useModal = () => {
    const [isOpenCreateTask, setIsOpenCreateTask] = useState(false);
    const [isOpenUpdateTask, setIsOpenUpdateTask] = useState(false);
    const [isOpenDeleteTask, setIsOpenDeleteTask] = useState(false);

    const handleOpenCreateTask = () => setIsOpenCreateTask(true);
    const handleCloseCreateTask = () => setIsOpenCreateTask(false);

    const handleOpenUpdateTask = () => setIsOpenUpdateTask(true);
    const handleCloseUpdateTask = () => setIsOpenUpdateTask(false);

    const handleOpenDeleteTask = () => setIsOpenDeleteTask(true);
    const handleCloseDeleteTask = () => setIsOpenDeleteTask(false);

    return { 
        isOpenCreateTask,
        handleOpenCreateTask,
        handleCloseCreateTask,
        isOpenUpdateTask,
        handleOpenUpdateTask,
        handleCloseUpdateTask,
        isOpenDeleteTask,
        handleOpenDeleteTask,
        handleCloseDeleteTask
    }
};