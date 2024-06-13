import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, stopSpinner } from "../store/authSlice";
import Header from "../components/profile/header/Header";
import Main from "../components/profile/main/Main";
import AsideLeft from "../components/profile/asideLeft/AsideLeft";
import AsideRight from "../components/profile/asideRight/AsideRight";
import { profileUserRequest } from "../api/user.request";
import { setCategories, setTasks } from "../store/taskSlice";
0;

function ProfilePage() {
  console.log("PROFILE");
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const start = async () => {
      try {
        const res = await profileUserRequest();
        setFullname(await res.fullname);
        dispatch(setUser(await res.id));
        dispatch(setTasks(await res.tasks));
        dispatch(setCategories(await res.categories));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(stopSpinner());
      }
    };

    start();
  }, [dispatch]);

  return (
    <section className="h-screen w-full overflow-hidden">
      <Header fullname={fullname} />

      <section className="relative grid h-[calc(100%-5rem)] w-full grid-cols-12 grid-rows-1">
        <AsideLeft />

        <Main />

        <AsideRight />
      </section>
    </section>
  );
}

export default ProfilePage;
