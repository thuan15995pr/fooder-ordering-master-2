
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import {MenuItem as MenuItemModel} from "@/models/MenuItem";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export default function MenuPage() {

  mongoose.connect(process.env.MONGO_URL);
  const categories = Category.find()
  const menuItems = MenuItemModel.find()

  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}