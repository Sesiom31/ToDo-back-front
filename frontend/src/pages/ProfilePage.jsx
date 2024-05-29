import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { setUser, startLoading, endLoading} from "../store/authSlice";
import Header from "../components/profile/Header";
import Main from "../components/profile/Main";
import AsideLeft from "../components/profile/AsideLeft";
import AsideRight from "../components/profile/AsideRight";
import { profileUserRequest } from "../api/user.request";

function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const start = async () => {
      try {
        dispatch(startLoading());
        const res = await profileUserRequest();
        console.log(res.user.id);
        dispatch(setUser(res.user.id));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(endLoading());
      }
    };

    start();
  }, [dispatch]);

  return (
    <section className="w-full h-screen relative">
      <Header />

      <section className=" grid grid-cols-12 w-full h-[calc(100%-5rem)]">
        <AsideLeft />
        <Main />
        <AsideRight />
      </section>
    </section>
  );
}

export default ProfilePage;
