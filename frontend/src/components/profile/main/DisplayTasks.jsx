import PropTypes from "prop-types";
import ListTask from "./ListTask";

function DisplayTasks({ tasksDisplay }) {
  return (
    <ul className="flex w-full flex-col gap-2">
      {!tasksDisplay.length ? (
        <h3>No hay ninguna tarea</h3>
      ) : (
        tasksDisplay.map((task) => <ListTask key={task._id || task} task={task} />)
      )}
    </ul>
  );
}

DisplayTasks.propTypes = {
  tasksDisplay: PropTypes.array.isRequired,
};

export default DisplayTasks;
