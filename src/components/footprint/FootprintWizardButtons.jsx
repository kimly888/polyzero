import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

const FootprintWizardButtons = ({
  useWizard,
  storeFunction,
  footprintResult,
}) => {
  const {
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
  } = useWizard();

  return (
    <div className="w-1/4 flex justify-center gap-4 mt-4">
      {isFirstStep && (
        <>
          <Button
            className="w-full shadow-lg flex justify-center"
            onClick={() => {
              nextStep();
              storeFunction();
            }}
          >
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </Button>
        </>
      )}

      {!isFirstStep && !isLastStep && (
        <>
          <Button
            className="w-1/2 shadow-lg flex justify-center"
            onClick={() => previousStep()}
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </Button>
          <Button
            className="w-1/2 shadow-lg flex justify-center"
            onClick={() => {
              nextStep();
              storeFunction();
            }}
          >
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </Button>
        </>
      )}

      {isLastStep && (
        <>
          <Button
            className="w-1/2 shadow-lg flex justify-center"
            onClick={() => previousStep()}
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </Button>
          <Button
            className="w-1/2 shadow-lg flex justify-center"
            type="submit"
            value={footprintResult}
            onClick={() => {
              storeFunction();
            }}
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default FootprintWizardButtons;