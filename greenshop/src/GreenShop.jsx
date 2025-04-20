import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const productsData = [
  {
    id: 1,
    name: "Barberton Daisy",
    price: 119,
    category: "House Plants",
    image: "/img/product-1.png",
  },
  {
    id: 2,
    name: "Angel Wing Begonia",
    price: 169,
    category: "Potter Plants",
    image: "/img/product-2.png",
  },
  {
    id: 3,
    name: "African Violet",
    price: 199,
    category: "Small Plants",
    image: "/img/product-3.png",
  },
  {
    id: 4,
    name: "Beach Spider Lily",
    price: 129,
    category: "Big Plants",
    image: "/img/product-4.png",
  },
  {
    id: 5,
    name: "Blushing Bromeliad",
    price: 89,
    category: "Succulents",
    image: "/img/product-5.png",
  },
  {
    id: 6,
    name: "Aluminum Plant",
    price: 179,
    category: "Terrariums",
    image: "/img/product-6.png",
  },
  {
    id: 7,
    name: "Bird's Nest Fern",
    price: 99,
    category: "Gardening",
    image: "/img/product-7.png",
  },
  {
    id: 8,
    name: "Broadleaf Lady Palm",
    price: 59,
    category: "Accessories",
    image: "/img/product-8.png",
  },
  {
    id: 9,
    name: "Chinese Evergreen",
    price: 39,
    category: "House Plants",
    image: "/img/product-9.png",
  },
];

const categories = [
  "All",
  "House Plants",
  "Potter Plants",
  "Small Plants",
  "Big Plants",
  "Succulents",
  "Terrariums",
  "Gardening",
  "Accessories",
];

export default function GreenShop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let filteredProducts = productsData.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "All") {
      filteredProducts = filteredProducts.filter((p) => p.category === category);
    }
    setFiltered(filteredProducts);
    setCurrentPage(1);
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white min-h-screen px-4 md:px-20 py-10">
      <header className="w-full max-w-[1200px] mx-auto flex justify-between items-center mb-10">
        <img src="/img/logo.png" alt="logo" className="w-[150px]" />
        <nav className="hidden md:flex space-x-10 text-base">
          <a href="#">Home</a>
          <a href="#">Shop</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40 md:w-60"
          />
          <Button className="bg-[#46A358] text-white">Login</Button>
        </div>
      </header>

      <section className="w-full max-w-[1200px] mx-auto">
        <div className="mb-6 flex flex-wrap gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              variant={cat === category ? "default" : "outline"}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((product) => (
            <Card key={product.id} className="shadow-md">
              <CardContent className="p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-[#46A358] font-bold text-lg">${product.price}.00</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="rounded-full w-10 h-10"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </section>

      <footer className="w-full max-w-[1200px] mx-auto mt-20 pt-10 border-t border-[#46A35833] text-center text-sm text-gray-500">
        © 2025 GreenShop. All rights reserved.
      </footer>
    </div>
  );
}