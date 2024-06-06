import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";

function PasosAside() {
  const currentTask = useSelector(getCurrentTask);
  return (
    <ul className="flex flex-col ">
      {currentTask.pasos.map((p, i) => (
        <li key={i} className=" p-2 w-full flex flex-col ">
          <label className="text-xs text-gray-400 ">Paso {i + 1}</label>
          <p className="pl-2 ">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default PasosAside;
