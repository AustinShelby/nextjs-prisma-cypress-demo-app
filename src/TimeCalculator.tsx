import { FC } from "react";

const MS_IN_DAY = 86_400_000;

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US", {
  style: "long",
  numeric: "auto",
});

const timeFormatter = (days: number): string => {
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (Math.abs(days) < 7) {
    return relativeTimeFormatter.format(days, "days");
  } else if (Math.abs(days) < 30) {
    return relativeTimeFormatter.format(weeks, "weeks");
  } else if (Math.abs(months) < 12) {
    return relativeTimeFormatter.format(months, "months");
  } else {
    return relativeTimeFormatter.format(years, "years");
  }
};

export const TimeCalculator: FC<{ date: Date }> = ({ date }) => {
  const currentDate = new Date();
  const timeDifferenceMs = date.getTime() - currentDate.getTime();
  const remainder = timeDifferenceMs % MS_IN_DAY;
  const timeInDayMs = timeDifferenceMs - remainder;
  const timeDifferenceDays = timeInDayMs / MS_IN_DAY;

  return <p>{timeFormatter(timeDifferenceDays)}</p>;
};
