import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../Framework/Search_icon";
import "./style.css";

function SearchBar() {
  return (
    <>
      <div className="searchbar_input w-[340px] h-[240px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-dark shadow-lg">
        <Input
          label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-dark/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-dark/90",
              "placeholder:text-default-700/50 dark:placeholder:text-dark/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 dark:text-dark/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
    </>
  );
}

export default SearchBar;
