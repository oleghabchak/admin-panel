import { Link } from "react-router-dom";
import Button from "../../components/UiElements/Button";
import right from "../../assets/icon/icon-arrow-right.svg";
import message from "../../assets/icon/ChatText.svg";
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../store/AppStoreProvider";
import { toJS } from "mobx";
interface BreadcrumbProps {
  title?: string;
}
const Breadcrumb = observer(({ title }: BreadcrumbProps) => {
  const store = useAppStore()
  let selectedUser = localStorage.getItem("selectedUser");
  console.log('STATE' , toJS(store.selectedUser))
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {title && (
        <h1 className="text-title-lg font-semibold text-black dark:text-white">
          {title}
        </h1>
      )}
      {selectedUser && (
        <div className="w-full flex justify-between">
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  className="text-title-lg font-semibold text-darkGrey dark:text-white"
                  to="/"
                >
                  {"App users "}
                </Link>
              </li>
              <img src={right} />

              <li className="text-title-lg font-semibold text-black dark:text-white">
              {`${JSON.parse(selectedUser)?.username} ${JSON.parse(selectedUser).firstName ? JSON.parse(selectedUser).firstName : ""} ${
          JSON.parse(selectedUser).secondName ? JSON.parse(selectedUser).secondName : ""
        }`}
              </li>
            </ol>
          </nav>
          <Link to="/messages">
            <Button
              icon={message}
              variant={"primary"}
              size={"big"}
              title="Message"
            />
          </Link>
        </div>
      )}
    </div>
  );
});

export default Breadcrumb;
