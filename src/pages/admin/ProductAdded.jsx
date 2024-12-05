import React from "react";

const ProductAdded = () => {
  return (
    <main className="flex flex-col lg:flex-row lg:space-x-10 mt-10 lg:mt-20 px-6 lg:px-20">
      {/* Sidebar */}
      <aside className="w-full lg:w-60 mb-10 lg:mb-0">
        <nav className="space-y-4">
          <a
            href="#"
            className="block bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-lg"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Transactions
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Orders
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Products
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Customer Mgmt
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Journal Entries
          </a>
          <a
            href="#"
            className="block text-gray-600 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            Role Management
          </a>
        </nav>
      </aside>

      {/* Main Section */}
      <section className="flex-1 text-center">
        <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-6">
          Your product has been submitted
        </h1>
        <div className="relative mx-auto w-40 h-40 mb-8">
          <div className="absolute inset-0 w-full h-full bg-green-500 rounded-full opacity-30"></div>
        </div>
        <a
          href="#"
          className="bg-red-500 text-white font-medium px-8 py-2 rounded-lg hover:bg-red-600"
        >
          Go Home
        </a>
      </section>
    </main>
  );
};

export default ProductAdded;
