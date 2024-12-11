import React from "react";
import LastHome from "../components/LastHome";
function About() {
  return (
    <div>
      {/* <!-- hyperlink section --> */}
      <section className="container mx-auto px-10">
        <ul className="flex gap-3">
          <li className="text-slate-400">Home</li>
          <li>/</li>
          <li className="font-medium">About</li>
        </ul>
      </section>
      <section className="bg-gray-100 px-6 py-10 md:p-20">
        <div className="grid grid-flow-row lg:grid-cols-3 gap-10">
          {/* Our Story */}
          <div className="p-10 text-center">
            <h3 className="text-4xl text-gray-300 font-semibold mb-5">01</h3>
            <h4
              className="text-3xl font-bold mb-10"
              style={{ color: "#ed1d24" }}
            >
              Our Story
            </h4>
            <p class="text-gray-500">
              Founded in 1894, Bata has led the shoe industry, crafting footwear
              that combines comfort, style, and quality for people worldwide.
              For over a century, we’ve been rooted in community, helping people
              express their unique tastes through the shoes they choose. Having
              re-established the Bata Factory in Nigeria in 2019 in the heart of
              the Federal Capital Territory, Abuja, we are poised to provide
              more than just shoes. Our best-selling school shoes reflect our
              commitment to supporting children as they grow and learn. At Bata,
              we celebrate what makes you stand out and remind you to embrace
              your uniqueness and be comfortable in your own shoes.
            </p>
          </div>

          {/* Our Mission */}
          <div className="p-10 text-center">
            <h3 className="text-4xl text-gray-300 font-semibold mb-5">02</h3>
            <h4
              className="text-3xl font-bold mb-10"
              style={{ color: "#ed1d24" }}
            >
              Our Mission
            </h4>
            <p class="text-gray-500">
              To provide our customers with comfortable footwear that combines
              trendy fashion and sustainability through superior innovation,
              high quality, excellent customer service, and a commitment to
              environmental stewardship. To create a value chain that supports
              job creation and human capital development.
            </p>
          </div>

          {/* Our Vision */}
          <div className="p-10 text-center">
            <h3 className="text-4xl text-gray-300 font-semibold mb-5">03</h3>
            <h4
              className="text-3xl font-bold mb-10"
              style={{ color: "#ed1d24" }}
            >
              Our Vision
            </h4>
            <p class="text-gray-500">
              To be the leading footwear company in West Africa providing
              comfortable, durable and trendy footwear.
            </p>
          </div>
        </div>
      </section>
      <LastHome />
    </div>
  );
}

export default About;
