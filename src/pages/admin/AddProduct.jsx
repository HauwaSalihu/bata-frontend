import React from "react";

const AddProduct = () => {
  return (
    <main className="mt-20 px-4 lg:px-20 mb-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
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

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <div className="mb-8">
            <h1 className="text-[#595784] text-2xl font-bold leading-tight">
              Add product
            </h1>
            <p className="text-[#464648] text-lg font-semibold">
              Hello Bata Stores, add your product
            </p>
          </div>

          {/* Product Name Input */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Product name
            </label>
            <p className="text-xs text-[#6d6b6b]">
              Create a title for your product
            </p>
            <input
              type="text"
              className="w-full mt-2 px-4 py-2 border rounded-xl border-[#99c1fd] focus:outline-none"
            />
          </div>

          {/* Product Description Input */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Product description
            </label>
            <p className="text-xs text-[#6d6c6c]">
              Describe your product to guests
            </p>
            <textarea
              className="w-full mt-2 px-4 py-2 border rounded-xl border-[#eeeeee] focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          {/* Product Category Input */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Product category
            </label>
            <p className="text-xs text-[#6d6c6c]">Add your product category</p>
            <input
              type="text"
              className="w-full mt-2 px-4 py-2 border rounded-xl border-[#eeeeee] focus:outline-none"
            />
          </div>

          {/* Product Quantity Input */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Product quantity
            </label>
            <p className="text-xs text-[#6d6c6c]">
              Specify the number of products available
            </p>
            <input
              type="number"
              className="w-full mt-2 px-4 py-2 border rounded-xl border-[#eeeeee] focus:outline-none"
            />
          </div>

          {/* Featured Image Upload */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Featured image
            </label>
            <p className="text-xs text-[#817e81]">
              Add one preview for your product
            </p>
            <div className="mt-2 p-4 border rounded-md border-[#cecece] flex justify-center items-center">
              <button className="bg-[#fd0000] text-white px-6 py-2 rounded-[5px]">
                Upload Files
              </button>
            </div>
          </div>

          {/* Other Image Previews */}
          <div className="mb-8">
            <label className="text-[#494c52] text-sm font-bold">
              Other image previews
            </label>
            <p className="text-xs text-[#f54d04]">Optional</p>
            <div className="mt-2 p-4 border rounded-md border-[#cecece] flex justify-center items-center">
              <button className="bg-[#5287b9] text-white px-6 py-2 rounded-[5px]">
                Upload Preview
              </button>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button className="bg-[#fd0000] text-white px-6 py-2 rounded-xl">
              Submit
            </button>
            <button className="text-black px-6 py-2 rounded-xl border border-[#cecece]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
