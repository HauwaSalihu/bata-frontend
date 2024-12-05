import React from "react";

function LocationsSection() {
  return (
    <div>
      <section className="bg-gray-100 py-16">
        <h4 className="text-2xl font-bold px-10 lg:px-16">OUR STORES</h4>
        <div className="flex flex-col px-10 lg:px-16 md:flex-row items-center justify-between">
          <div className="font-medium space-y-2">
            <h5 className="font-bold">HEADQUARTERS - ABUJA</h5>
            <p className="font-medium pb-5">
              House 13, Road 8, FHA Estate Lugbe, Abuja, Nigeria.
            </p>
            <h5 className="font-bold">PORTHACOURT</h5>
            <p className="font-medium pb-5">
              Indigo Mall, Stadium Road, Port Harcourt
            </p>
            <h5 className="font-bold">ENUGU</h5>
            <p className="font-medium pb-5">
              Enugu Bata Store 1 Denten street, off Ogu Police Station Road,
              Enugu
            </p>
            <h5 className="font-bold">LAGOS</h5>
            <p className="font-medium pb-5">
              Banex Mall, opposite Maroko Police Station, Lekki, Lagos.
            </p>
          </div>
          <img
            src="/loaction.png"
            className="max-w-full md:max-w-[500px]"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}

export default LocationsSection;
