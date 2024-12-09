import { Form, Formik } from "formik";
import { ITask } from "../interfaces/ITask";
import { FormField } from "../common/components/FormField";
import { Button } from "../common/components/Button";
import { State } from "../utils/state.enum";
import { UUID } from "crypto";

interface UpdateTaskProps {
    id: UUID;
    handleCloseModal: () => void;
    isOpen: boolean;
    handleSubmit: (id: UUID, values: ITask, handleCloseModal: () => void) => void;
    initialValues: ITask;
}

export const UpdateTask: React.FC<UpdateTaskProps> = ({ id, handleCloseModal, isOpen, handleSubmit, initialValues }) => {

  if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute z-0 inset-0 bg-black opacity-50"></div>
        <div className="flex z-20 flex-col border-2 items-center justify-center w-2/5 lg:w-1/4 h-3/6 lg:h-3/5 bg-white rounded-xl">
          <button
            className="pb-2 lg:pt-8"
            onClick={handleCloseModal}
          >
            <span className="text-red-600 font-bold text-md underline">close</span>
          </button>
            <h1 className="text-xl font-bold text-black">Add a new task</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleSubmit(id, values, handleCloseModal)}
              validationSchema={null}
            >
              {() => (
                <Form
                className="flex flex-col justify-center gap-2 lg:h-4/5 w-4/5">
                  <FormField
                    type="text"
                    name="name"
                    label="Name"
                    id="name"
                    placeHolder={initialValues.name}
                    required={false}
                  />
                  <FormField
                    type="text"
                    name="description"
                    label="Description"
                    id="description"
                    placeHolder={initialValues.description}
                    required={false}
                  />
                  <FormField
                    type="select"
                    name="state"
                    label="State"
                    id="state"
                    placeHolder={initialValues.state}
                    required={false}
                    options={[
                      { value: State.PENDING, label: 'Pending' },
                      { value: State.IN_PROGRESS, label: 'In Progress' },
                      { value: State.COMPLETED, label: 'Completed' },
                    ]}
                  />
                  <div className="pt-6 pb-4">
                    <Button
                      label="Update Task"
                      type="submit"
                    />
                  </div>
                </Form>          
              )}
            </Formik>
        </div>
    </div>
    )
}