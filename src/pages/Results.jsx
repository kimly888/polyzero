import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "@material-tailwind/react";
// import tierData from "../data/tier.json";
// import messagesTwitter from "../data/variable.json";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";
import { ReactComponent as FaceBook } from "../assets/socialMediaIcons/icons8-facebook.svg";
import { ReactComponent as LinkedIn } from "../assets/socialMediaIcons/icons8-linkedin.svg";
import { ReactComponent as Twitter } from "../assets/socialMediaIcons/icons8-twitter.svg";
import { useCountUp } from "use-count-up";
import { useEffect, useState } from "react";

const Results = ({ result, setResult }) => {
  const navigateTo = useNavigate();

  const perCapitaAverage = result.country.avgKg;
  const country = result.country.name;

  const [footprint, setFootprint] = useState(result);
  // const foundTier = tierData.find((tier) => tier.title === storedResult);
  // let secondMessage = footprint.plastic.toFixed(2);
  // let forthMessage = footprint.carbon;
  // let secondMessage = foundTier.plastic;
  // let forthMessage = foundTier.carbon;

  function rounder(number) {
    return Number(number.toFixed(2));
  }

  useEffect(() => {
    const co2ePerPlasticKg = 5.6;

    if (footprint.footprintResult > 4)
      setFootprint({
        title: "🛍 Urban Consumer",
        plastic: rounder(perCapitaAverage * 2),
        carbon: rounder(perCapitaAverage * 2 * co2ePerPlasticKg),
      });
    else if (footprint.footprintResult >= 0 && footprint.footprintResult <= 4)
      setFootprint({
        title: "🛒 Conscientious Consumer",
        plastic: rounder(perCapitaAverage * 1.25),
        carbon: rounder(perCapitaAverage * 1.25 * co2ePerPlasticKg),
      });
    else if (footprint.footprintResult >= -4 && footprint.footprintResult < 0)
      setFootprint({
        title: "🥬 Plastic Reducer",
        plastic: rounder(perCapitaAverage * 0.75),
        carbon: rounder(perCapitaAverage * 0.75 * co2ePerPlasticKg),
      });
    else if (footprint.footprintResult < -4)
      setFootprint({
        title: "👩🏻‍🌾 Plastic Avoider",
        plastic: rounder(perCapitaAverage * 0.25),
        carbon: rounder(perCapitaAverage * 0.25 * co2ePerPlasticKg),
      });
    else console.log("SOMETHING WENT WRONG");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("tiers", JSON.stringify(footprint));
  }, [footprint]);

  function resetFootprint() {
    setResult(null);
    localStorage.removeItem("tiers");
    localStorage.removeItem("footprint");
    navigateTo("/wizard");
  }

  function useCounter(data) {
    const { value } = useCountUp({
      isCounting: true,
      end: data,
      duration: 2,
    });

    return value;
  }

  return (
    <div className="flex flex-col flex-grow gap-4 justify-center items-center w-full bg-slate-100">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl text-center">
        My
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {" "}
          Plastic Footprint
        </span>
      </h1>
      <div className="flex flex-col w-3/4 md:w-1/2 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="md:w-3/4">
            <CardBody>
              <h1 className="flex flex-col gap-2 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                <small className="text-base md:text-xl font-normal text-gray-500">
                  Plastic consumption
                </small>
                <div className="text-4xl md:text-6xl">
                  {useCounter(footprint.plastic)}
                  <span className="text-xl md:text-4xl">kg / year</span>
                </div>
              </h1>
              <p className="text-xs md:text-base font-normal text-gray-700 dark:text-gray-400">
                At the <strong>{footprint.title}</strong> level, we estimate you
                consume around{" "}
                <strong>{useCounter(footprint.plastic)}kg</strong> of disposable
                plastics per year.
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h1 className="flex flex-col gap-2 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                <small className="text-base md:text-xl font-normal text-gray-500">
                  National average
                </small>
                <div className="text-4xl md:text-6xl">
                  {useCounter(perCapitaAverage)}
                  <span className="text-xl md:text-4xl">kg / year</span>
                </div>
              </h1>
              <p className="text-xs md:text-base font-normal text-gray-700 dark:text-gray-400">
                per capita average annual plastic consumption in
                <strong>&nbsp;{country}</strong>.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="md:w-1/2">
            <CardBody>
              <div className="flex flex-col gap-2">
                <small className="text-base md:text-xl font-normal text-gray-500">
                  This amount of plastic will generate at least
                </small>
                <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white text-4xl md:text-6xl">
                  {useCounter(footprint.carbon)}

                  <span className="text-xl md:text-4xl">
                    kg CO
                    <span className="text-xl">2</span>e
                  </span>
                </h1>
                <p className="text-xs md:text-base font-normal text-gray-700 dark:text-gray-400">
                  emissions over the course of its life (production to
                  end-of-life).
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col justify-between gap-4">
              <div className="flex flex-col items-center gap-2">
                <small className="text-base md:text-xl font-normal text-gray-500">
                  Share your results and help raise awareness!
                </small>
              </div>
              <div className="flex gap-4 -my-2">
                {/*  */}
                <FacebookShareButton
                  url={"https://www.polyzero.earth"}
                  hashtag={"#polyzero"}
                >
                  <FaceBook />
                </FacebookShareButton>
                {/* <a
              href={
                `https://twitter.com/intent/tweet?text=${
                  messagesTwitter[0].Q1
                }+${secondMessage + "kg"}+${messagesTwitter[0].Q3}+${
                  forthMessage + "kg"
                }${messagesTwitter[0].Q5}` +
                "%0a" +
                `${messagesTwitter[0].Q6}`
              }
              data-show-count="false"
              target={"_blank"}
              rel="noreferrer"
              className=""
            > 
             </a> */}
                <TwitterShareButton
                  url={"https://www.polyzero.earth"}
                  title={`I use approx ${footprint.plastic}kg of disposable plastic/year, corresponding to ${footprint.carbon}kg of CO2e. %0aHow much plastic do you use? Estimated with`}
                  hashtags={["PolyZeroApp"]}
                >
                  <Twitter />
                </TwitterShareButton>
                <LinkedinShareButton url={"https://www.polyzero.earth"}>
                  <LinkedIn />
                </LinkedinShareButton>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap w-3/4 md:w-1/2 gap-4 justify-center ">
        <Button
          className="capitalize text-base"
          size={"xl"}
          onClick={() => navigateTo("/resources")}
        >
          Shrink your plastic habit
        </Button>
        <Button
          className="capitalize text-base"
          size={"xl"}
          onClick={() => navigateTo("/tiers")}
        >
          Off-set your CO2 emissions
        </Button>
        <Button
          className="capitalize text-base"
          size={"xl"}
          onClick={resetFootprint}
        >
          Re-do Footprint Estimate
        </Button>
      </div>
    </div>
  );
};

export default Results;
