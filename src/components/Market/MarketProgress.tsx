import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

export const MarketProgress = ({ account }) => {
  const { marketLockTimestamp, marketSettleTimestamp } = account;
  const formattedLockTimestamp = new Date(parseInt(marketLockTimestamp, 16));

  const steps = [
    { label: "Market opened", description: "{market_opened_time}" },
    {
      label: "Finalizing",
      description: formattedLockTimestamp.toUTCString(),
    },
    {
      label: "Closed",
      description: formattedLockTimestamp.toUTCString(),
    },
  ];

  const { setStep, activeStep } = useSteps({
    initialStep: 1,
  });
  const dt = new Date();

  useEffect(() => {
    if (dt >= formattedLockTimestamp) {
      setStep(2);
    }
    if (dt >= formattedLockTimestamp) {
      setStep(3);
    }
  }, [dt.getMinutes()]);

  return (
    <Flex minWidth={"lg"} py={4}>
      <Steps orientation="vertical" colorScheme="gray" activeStep={activeStep}>
        {steps.map(({ label, description }) => (
          <Step label={label} key={label} description={description} />
        ))}
      </Steps>
    </Flex>
  );
};

export default MarketProgress;
