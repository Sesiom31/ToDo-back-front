import { useSelector } from "react-redux";
import { getCurrentTask } from "../../../store/taskSlice";

function PasosAside() {
  const currentTask = useSelector(getCurrentTask);
  return (
    <ul className="flex flex-col">
      {currentTask.pasos.map((p, i) => (
        <li key={i} className="flex w-full flex-col p-2">
          <label className="text-xs text-gray-400">Paso {i + 1}</label>
          <p className="pl-2">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default PasosAside;
