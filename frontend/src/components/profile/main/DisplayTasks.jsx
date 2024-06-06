import PropTypes from "prop-types";
import ListTask from "./ListTask";

function DisplayTasks({ tasksDisplay }) {
  return (
    <ul className="flex flex-col gap-2 w-full">
      {!tasksDisplay.length ? (
        <h3>No hay ninguna tarea</h3>
      ) : (
        tasksDisplay.map((task) => (
          <ListTask key={task._id || task} task={task} />
        ))
      )}
    </ul>
  );
}

DisplayTasks.propTypes = {
  tasksDisplay: PropTypes.array.isRequired,
};

export default DisplayTasks;
