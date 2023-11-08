import { useState } from "react";
import "../css/tasks.css";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@gluestack-ui/themed";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const Task = ({ task, taskType }) => {
  const [showModal, setShowModal] = useState(false);
  const [dtask, setdTask] = useState({ taskTitle: "", taskDesc: "" });

  const buttonState = {
    todo: taskType === "TODO",
    inProgress: taskType === "In Progress",
    completed: taskType === "Completed",
  };

  const handleButtonpress = (taskName, taskDestination) => {
    console.log(`${taskName} moved from ${taskType} to ${taskDestination}`);
  };

  const handleDesc = (taskName) => {
    //fetch task desc
    setdTask({ taskTitle: taskName, taskDesc: "test" });
    setShowModal(true);
  };

  return (
    <>
      <div className="task-container">
        <div className="task-text">
          <Text size="lg">{task}</Text>
        </div>
        <div className="task-icons">
          <div className="btn">
            <Tooltip tooltiptext="task description" />
            <Button
              action="positive"
              onPress={() => handleDesc(task)}
              size="sm"
            >
              <ButtonIcon>
                <MdOutlineDocumentScanner />
              </ButtonIcon>
            </Button>
          </div>

          {/* todos */}
          <div className="btn">
            <Tooltip tooltiptext="move to todo" />
            <Button
              action="positive"
              isDisabled={buttonState.todo}
              onPress={() => {
                handleButtonpress(task, "todo");
              }}
              size="sm"
            >
              <ButtonIcon>
                <LuListTodo />
              </ButtonIcon>
            </Button>
          </div>

          {/* progess */}
          <div className="btn">
            <Tooltip tooltiptext="move to in progress" />
            <Button
              action="positive"
              isDisabled={buttonState.inProgress}
              onPress={() => {
                handleButtonpress(task, "inProgress");
              }}
              size="sm"
            >
              <ButtonIcon>
                <TbProgress />
              </ButtonIcon>
            </Button>
          </div>

          {/* completed */}
          <div className="btn">
            <Tooltip tooltiptext="move to completed" />
            <Button
              action="positive"
              isDisabled={buttonState.completed}
              onPress={() => {
                handleButtonpress(task, "completed");
              }}
              size="sm"
            >
              <ButtonIcon>
                <IoCheckmarkDoneCircleOutline />
              </ButtonIcon>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="lg"
      >
        <ModalContent>
          <Center>
            <ModalHeader>{dtask.taskTitle}</ModalHeader>
          </Center>
          <ModalBody></ModalBody>
          <Center>
            <ModalFooter>
              <Button
                action="negative"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

const Tooltip = ({ tooltiptext }) => {
  return <span className="tooltiptext"> {tooltiptext}</span>;
};

export default Task;
