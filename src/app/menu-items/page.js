'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

class MenuItemFlyweight {
  constructor(id, name, image) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  render() {
    return (
      <Link
        key={this.id}
        href={'/menu-items/edit/'+this.id}
        className="bg-gray-200 rounded-lg p-4"
      >
        <div className="relative">
          <Image
            className="rounded-md"
            src={this.image} alt={''} width={200} height={200} />
        </div>
        <div className="text-center">
          {this.name}
        </div>
      </Link>
    );
  }
}

class MenuItemFactory {
  constructor() {
    this.menuItems = {};
  }

  getMenuItem(id, name, image) {
    if (!this.menuItems[id]) {
      this.menuItems[id] = new MenuItemFlyweight(id, name, image);
    }
    return this.menuItems[id];
  }
}

const menuItemFactory = new MenuItemFactory();

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const {loading, data} = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        const menuItemsFlyweights = menuItems.map(item => {
          return menuItemFactory.getMenuItem(item._id, item.name, item.image);
        });
        setMenuItems(menuItemsFlyweights);
      });
    })
  }, []);

  //...

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      //...
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            item.render()
          ))}
        </div>
      </div>
    </section>
  );
}