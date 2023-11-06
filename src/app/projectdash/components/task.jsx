import React from "react";
import "../css/tasks.css";
import { Button, ButtonIcon, Text } from "@gluestack-ui/themed";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const Task = ({ task,taskType }) => {

  const buttonState = {
    todo: (taskType === "TODO"),
    inProgress: (taskType === "In Progress"),
    completed: (taskType === "Completed"),
  };

  const handleButtonpress=(taskName,taskDestination)=>{
    console.log(`${taskName} moved from ${taskType} to ${taskDestination}`)
  }

  return (
    <div className="task-container">
      <div className="task-text">
        <Text size="lg">{task}</Text>
      </div>
      <div className="task-icons">
        <div className="btn">
          <Tooltip tooltiptext="view document" />
          <Button action="positive">
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
              handleButtonpress( task , "inProgress");
            }}
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
              handleButtonpress( task , "completed");
            }}
          >
            <ButtonIcon>
              <IoCheckmarkDoneCircleOutline />
            </ButtonIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ tooltiptext }) => {
  return <span className="tooltiptext"> {tooltiptext}</span>;
};

export default Task;
