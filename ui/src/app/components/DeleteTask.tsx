import { UUID } from "crypto";
import { Button } from "../common/components/Button";

interface DeleteTaskProps {
    taskId: UUID;
    handleDeleteTask: (taskId: UUID, handleCloseModal: () => void) => void;
    isOpen: boolean;
    handleCloseModal: () => void;
}

export const DeleteTask: React.FC<DeleteTaskProps> = ({
    handleDeleteTask,
    handleCloseModal,
    isOpen,
    taskId
  }) => {
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
        <div className="flex z-30 flex-col border-2 items-center justify-center w-2/5 h-1/6 bg-white rounded-xl">
          <p className="text-xl font-bold text-black">Are you sure you want to delete this project?</p>
          <div className="flex flex-row gap-5 pt-5">
            <Button label="Confirm" type="button" onClick={() => handleDeleteTask(taskId, handleCloseModal)} />
            <Button label="Cancel" type="button" onClick={handleCloseModal} />
          </div>
        </div>
      </div>
    )
  }