import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Select from "../../components/Select";
import DefaultLayout from "../../layout/DefaultLayout";
import Input from "../../components/Input";
import UsersList from "../Daily/UsersList";
import { useEffect, useState } from "react";
import { useAppStore } from "../../store/AppStoreProvider";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import "./index.less";
import Pagination from "rc-pagination";
import CloseBlue from "./../../assets/icon/CloseBlue.svg";
import NoUsers from "./NoUsers";
import Button from "../../components/UiElements/Button";
import { useDebounce } from "use-debounce";

const AppUsers = observer(({ itemsPerPage }) => {
  const store = useAppStore();
  const [searchData, setSearchData] = useState<string>("");
  const [debouncedText] = useDebounce(searchData, 500);
  const [sorting, setSorting] = useState<"ASC" | "DESC">("ASC");
  const [skip, setSkip] = useState<number>(0);
  const [filteredBy, setFilteredBy] = useState<any>([]);
  const [status, setStatus] = useState<"good" | "medium" | "critical" | "all">(
    "all"
  );
  const [subscription, setSubscription] = useState<"coaching" | "all">("all");
  const [diabetes, setDiabetes] = useState<"type1" | "type2" | "all">("all");
  const [isOpen, setIsOpen] = useState<number | boolean>(0);
  const handleOpen = (
    id: number | boolean | ((prevState: number | boolean) => number | boolean)
  ) => setIsOpen(id);
  const handleClose = () => setIsOpen(false);

  const handleStatusChange = (
    newValue:
      | string
      | ((
          prevState: "good" | "medium" | "critical" | "all"
        ) => "good" | "medium" | "critical" | "all")
  ) => {
    setStatus(newValue);
    const newFilters = [...filteredBy];
    const statusIndex = newFilters.findIndex((f) => f.startsWith("status-"));
    if (statusIndex > -1) newFilters.splice(statusIndex, 1);
    if (newValue !== "all") newFilters.push(`status-${newValue}`);
  };

  const handleSubscriptionChange = (
    newValue: string | ((prevState: "coaching" | "all") => "coaching" | "all")
  ) => {
    setSubscription(newValue);
    const newFilters = [...filteredBy];

    if (newValue === "all") {
      setFilteredBy(
        newFilters.filter((filter) => filter.title !== "Subscription")
      );
    } else {
      const subscriptionIndex = newFilters.findIndex(
        (f) => f.title === "Subscription"
      );

      if (subscriptionIndex > -1) {
        newFilters[subscriptionIndex] = {
          title: "Subscription",
          value: newValue,
          label: newValue === "coaching" ? "Coaching" : "AI assistant",
        };
      } else {
        newFilters.push({
          title: "Subscription",
          value: newValue,
          label: newValue === "ai-assistant" ? "AI assistant" : "Coaching",
        });
      }

      setFilteredBy(newFilters);
    }
  };

  const handleDiabetesChange = (
    newValue:
      | string
      | ((prevState: "type1" | "type2" | "all") => "type1" | "type2" | "all")
  ) => {
    setDiabetes(newValue);
    const newFilters = [...filteredBy];

    if (newValue === "all") {
      setFilteredBy(newFilters.filter((filter) => filter.title !== "Diabetes"));
    } else {
      const diabetesIndex = newFilters.findIndex((f) => f.title === "Diabetes");

      if (diabetesIndex > -1) {
        newFilters[diabetesIndex] = {
          title: "Diabetes",
          value: newValue,
          label: newValue === "type1" ? "1 type" : "2 type",
        };
      } else {
        newFilters.push({
          title: "Diabetes",
          value: newValue,
          label: newValue === "type2" ? "2 type" : "1 type",
        });
      }

      setFilteredBy(newFilters);
    }
  };

  const handleSortingChange = (
    newValue: string | ((prevState: "ASC" | "DESC") => "ASC" | "DESC")
  ) => {
    setSorting(newValue);
    const newFilters = [...filteredBy];
    const sortingIndex = newFilters.findIndex((f) => f.title === "Sorting");
    if (sortingIndex > -1) {
      newFilters[sortingIndex] = {
        title: "Sorting",
        value: newValue,
        label: newValue === "ASC" ? "Recent on top" : "Latest on top",
      };
    } else {
      newFilters.push({
        title: "Sorting",
        value: newValue,
        label: newValue === "ASC" ? "Recent on top" : "Latest on top",
      });
    }
    setFilteredBy(newFilters);
  };

  const apply = () => {
    store.fetchUsersData(sorting, skip);
  };

  const clearFilters = (value: object) => {
    if (value.title === "Sorting") {
      setSorting("ASC");
    }
    if (value.title === "Diabetes") {
      setDiabetes("all");
    }
    setSearchData("");
    setSkip(0);
    setFilteredBy(
      filteredBy.filter(
        (filter: { value: any }) => filter.value !== value.value
      )
    );
    setSubscription("all");
  };

  const filteredUserData = store.UsersList.filter(
    (user: { diabeticType: string; subscription: string; status: string }) =>
      (diabetes === "all" || user.diabeticType === diabetes) &&
      (subscription === "all" || user.subscription === subscription)
  );

  const onPaginationChange = (page: number, pageSize: number) => {
    setSkip((page - 1) * pageSize);
  };

  useEffect(() => {
    if (store.accessToken) {
      store.fetchUsersData(sorting, skip, debouncedText, diabetes);
    }
  }, [sorting, skip, debouncedText, diabetes, store.accessToken]);

  return (
    <DefaultLayout>
      <Breadcrumb title={`App users (${store.totalUsers})`} />
      <div className="flex justify-between pb-2">
        <div className="flex items-center justify-between gap-1">
          <Select
            id={1}
            apply={apply}
            values={[
              { value: "coaching", label: "Coaching" },
              { value: "ai-assistant", label: "AI assistant" },
              { value: "all", label: "All" },
            ]}
            selected={subscription}
            setSelected={handleSubscriptionChange}
            title={"Subscription"}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
          />
          <Select
            id={2}
            apply={apply}
            selected={diabetes}
            setSelected={handleDiabetesChange}
            values={[
              { value: "type1", label: "1 type " },
              { value: "type2", label: "2 type " },
              { value: "all", label: "All" },
            ]}
            title={"Diabetes"}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
          />
          <Select
            id={3}
            apply={apply}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            selected={sorting}
            setSelected={handleSortingChange}
            values={[
              { value: "ASC", label: "Recent on top" },
              { value: "DESC", label: "Latest on top" },
            ]}
            title={"Sorting"}
          />
          <Select
            id={4}
            apply={apply}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            selected={status}
            multiple={true}
            setSelected={handleStatusChange}
            values={[
              { value: "good", label: "Good" },
              { value: "medium", label: "Medium" },
              { value: "critical", label: "Critical" },
              { value: "all", label: "All" },
            ]}
            title={"Status"}
          />
        </div>

        <div className="flex items-center justify-between gap-1">
          <Input
            onChange={(value) => setSearchData(value.target.value)}
            placeholder={"Search"}
          ></Input>
        </div>
      </div>

      {filteredBy?.length > 0 && (
        <div>
          {filteredBy?.map((filter: object) => (
            <div
              key={filter.title}
              className="h-10 mb-2 mr-2 p-2 bg-sky-100 rounded-lg justify-start items-center gap-2 inline-flex"
            >
              <div className="text-cyan-600 text-base font-semibold  leading-normal">
                {filter.title}:
              </div>
              <div className="grow flex shrink basis-0 text-cyan-600 text-base font-semibold   leading-normal">
                {filter.label}{" "}
                <img
                  onClick={() => clearFilters(filter)}
                  src={CloseBlue}
                  className="ml-3"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUserData?.length > 0 ? (
        <div className="flex flex-col gap-10">
          <UsersList userData={filteredUserData} />
        </div>
      ) : (
        <>
          {searchData.length > 0 ? (
            <NoUsers type="no-data-search" searchData={searchData}>
              <Button variant={"primary"} size={"big"} title=" Clear search" />
            </NoUsers>
          ) : (
            <NoUsers type="no-data" searchData={searchData} />
          )}
        </>
      )}

      <Pagination
        defaultCurrent={1}
        onChange={onPaginationChange}
        total={store.totalUsers}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      />
    </DefaultLayout>
  );
});

export default AppUsers;
