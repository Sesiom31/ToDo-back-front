import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";
import { capitalizeCategory } from "../../../utils/configString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faStar } from "@fortawesome/free-solid-svg-icons";

function AsideRight() {
  const currentTask = useSelector(getCurrentTask);
  console.log(currentTask);

  return (
    <aside className=" bg-gray-700 col-span-3 p-2 flex flex-col gap-6">
      {Object.keys(currentTask).length === 0 ? (
        <h3>No hay una tarea seleccionada</h3>
      ) : (
        <>
          <div className="border-none  p-2 w-full ">
            <div>
              <span className="text-xs text-gray-400">Tarea:</span>
              <h3 className="pl-2">{capitalizeCategory(currentTask.task)}</h3>
            </div>
            <div>
              <span className="text-xs text-gray-400">Descripción:</span>
              <p className="pl-2">
                {capitalizeCategory(currentTask.description)}
              </p>
            </div>
            <div className="flex justify-around mt-6">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">completo</span>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`${
                    currentTask.isComplete ? "text-orange-500" : "text-gray-400"
                  } text-xs`}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">importante</span>
                <FontAwesomeIcon
                  icon={faStar}
                  className={`${
                    currentTask.isImportant
                      ? "text-orange-500"
                      : "text-gray-400"
                  } text-base`}
                />
              </div>
            </div>
          </div>

          <button className=" bg-green-500 rounded-md p-2 w-full text-gray-800 text-lg my-4">
            Agregar paso
          </button>
          <ul className="flex flex-col gap-6">
            {currentTask.pasos.map((p, i) => (
              <li
                key={i}
                className="border-none ring-2 ring-sky-300 rounded-md p-2 w-full "
              >
                <p>description: {p.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

export default AsideRight;
