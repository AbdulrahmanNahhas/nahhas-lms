import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";

const Searchpage = async () => {
  const categories = await db.category.findMany();

  return (
    <>
      <div className="p-6 md:hidden md:p-0 block w-full">
        <SearchInput />
      </div>
      <Categories items={categories} />
      <div className="container p-6 pt-3">All Courses</div>
    </>
  );
};

export default Searchpage;
