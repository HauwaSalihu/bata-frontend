import { Carousel } from "antd";
import { assets } from "../assets/assets";

const contentStyle = {
  margin: 0,
  height: "760px",
  lineHeight: "160px",
  textAlign: "center",
};
function Csr() {
  return (
    <div>
      <h2 className="text-center font-bold text-3xl m-5">
        The Kiek Foundation
      </h2>
      <Carousel
        className="m-5 border border-red-600 shadow-lg rounded-lg"
        autoplay
        arrows
        infinite={false}
      >
        <div>
          <img
            src={assets.image1}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image2}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image3}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image4}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image5}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image6}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image7}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image8}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
        <div>
          <img
            src={assets.image9}
            className="h-full w-full object-contain rounded-lg"
            style={contentStyle}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Csr;
