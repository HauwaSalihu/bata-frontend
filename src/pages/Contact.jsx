import React from "react";

function Contact() {
  return (
    <div>
      <main className="lg:px-20 mt-20">
        {/* <!-- hyperlink section --> */}
        <section className="container mx-auto px-10">
          <ul className="flex gap-3">
            <li className="text-slate-400">Home</li>
            <li>/</li>
            <li className="font-medium">Contact</li>
          </ul>
        </section>
        {/* <!-- Contact section --> */}
        <section className="container mx-auto m-5 flex w-fit flex-col xl:flex-row gap-5">
          <div className="shadow-md p-5 w-96">
            <div className="border-b py-10">
              <span className="flex items-center gap-3 font-bold">
                <i className="fas fa-phone p-3 border text-white rounded-full bg-red-500"></i>
                To Call Us
              </span>
              <p className="mt-5">We are available 24/7, 7 days a week.</p>
              <p className="mt-5">Phone: +234-90-456-789</p>
            </div>

            <div className="py-10">
              <span className="flex items-center gap-3 font-bold">
                <i className="fas fa-envelope p-3 border text-white rounded-full bg-red-500"></i>
                Write to Us
              </span>
              <p className="mt-5">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="mt-5">Email:batanigeria@gmail.com</p>
              <p className="mt-5">Email:support@batanigeria.com</p>
            </div>
          </div>
          {/* <!-- Contact form --> */}
          <form className="shadow-md p-5 w-full flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <input
                type="text"
                className="bg-gray-200 p-3 rounded-md"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="bg-gray-200 p-3 rounded-md"
                placeholder="Your Email"
              />
              <input
                type="number"
                className="bg-gray-200 p-3 rounded-md"
                placeholder="Your Phone"
              />
            </div>
            <textarea
              name="message"
              className="bg-gray-200 p-3 rounded-md"
              rows="12"
              placeholder="Your Message"
            ></textarea>
            <button className="bg-red-500 text-white py-3 px-10 rounded-md self-end">
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Contact;
