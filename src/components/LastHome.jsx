import { assets } from "../assets/assets";
function LastHome() {
  return (
    <div>
      <section className="mx-auto container flex flex-wrap md:flex-nowrap items-center justify-center gap-5 md:gap-10 p-28">
        <div className="flex items-center flex-col text-center">
          <img
            src={assets.elements}
            className="fas fa-truck p-3  border-[10px] rounded-full"
          />
          <h4 className="mt-5 font-bold">FAST DELIVERY</h4>
          <p className="mt-5">
            Delivery for all products within and outside Nigeria
          </p>
        </div>
        <div className="flex items-center flex-col text-center">
          <img
            src={assets.support_img}
            className="fas fa-headset p-3 w-14  border-[10px] rounded-full"
          />
          <h4 className="mt-5 font-bold">24/7 CUSTOMER SERVICE</h4>
          <p className="mt-5">Friendly 24/7 customer support</p>
        </div>
      </section>
    </div>
  );
}

export default LastHome;
