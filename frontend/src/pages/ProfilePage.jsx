import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, startLoading, endLoading } from "../store/authSlice";
import Header from "../components/profile/header/Header";
import Main from "../components/profile/main/Main";
import AsideLeft from "../components/profile/asideLeft/AsideLeft";
import AsideRight from "../components/profile/asideRight/AsideRight";
import { profileUserRequest } from "../api/user.request";
import { setCategories, setTasks } from "../store/taskSlice";

function ProfilePage() {
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    try {
      setIsLoad(true);
      dispatch(startLoading());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(endLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    const start = async () => {
      try {
        const res = await profileUserRequest();
        setFullname(await res.fullname);
        dispatch(setUser(await res.id));
        dispatch(setTasks(res.tasks));
        dispatch(setCategories(res.categories));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoad(false);
      }
    };
    if (isLoad) {
      start();
    }
  }, [dispatch, isLoad]);

  return (
    <section className="h-screen w-full overflow-hidden">
      <Header fullname={fullname} />

      <section className="relative grid h-[calc(100%-5rem)] w-full grid-cols-12 grid-rows-1">
        <AsideLeft />

        <Main setIsLoad={setIsLoad} />

        <AsideRight />
      </section>
    </section>
  );
}

export default ProfilePage;
