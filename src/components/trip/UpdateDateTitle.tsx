"use client";
import React, { useEffect, useState, ChangeEventHandler } from "react";
import { useAction } from "@/hooks/use-action";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";
import { Trip } from "@prisma/client";
import { useDebounce } from "@/hooks/use-debounce";
import toast from "react-hot-toast";
import { updateTrip } from "@/actions/update-trip";
import { Button } from "../ui/button";

type Props = {
  trip: Trip;
};

const UpdateDateTitle = ({ trip }: Props) => {
  const [title, setTitle] = useState(trip?.title);
  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const { execute } = useAction(updateTrip, {
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error);
    },
  });

  const debouncedTitle = useDebounce(title, 500);

  const handleOnChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  useEffect(() => {
    const payload = {
      tripId: trip.id,
      title: debouncedTitle,
      startDate: selectedRange?.from,
      endDate: selectedRange?.to,
    };
    execute(payload);
  }, [debouncedTitle, selectedRange]);

  const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, "y-MM-dd"));
    } else {
      setFromValue("");
    }
    if (range?.to) {
      setToValue(format(range.to, "y-MM-dd"));
    } else {
      setToValue("");
    }
  };
  return (
    <div className="flex items-center">
      <div>
        <input
          id="title"
          onChange={handleOnChangeTitle}
          defaultValue={trip.title}
          type="text"
          autoComplete="off"
          className={`
                 p-2
            bg-inherit
                  peer
                  text-black
                  font-bold 
                  rounded-md
                  outline-none
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                `}
        />
      </div>

      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !selectedRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {trip?.startDate ? (
                trip?.endDate ? (
                  <>
                    {format(trip?.startDate, "LLL dd, y")} -{" "}
                    {format(trip?.endDate, "LLL dd, y")}
                  </>
                ) : (
                  format(trip?.startDate, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={handleRangeSelect}
              footer={
                <form className="ma2 mt-2">
                  <input
                    size={10}
                    placeholder="From Date"
                    value={fromValue}
                    onChange={handleFromChange}
                    className={`
                 p-2
            bg-inherit
                  peer
                  text-black
                  font-bold 
                  rounded-md
                  outline-none
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                `}
                  />
                  {" – "}
                  <input
                    size={10}
                    placeholder="To Date"
                    value={toValue}
                    onChange={handleToChange}
                    className={`
                 p-2
            bg-inherit
                  peer
                  text-black
                  font-bold 
                  rounded-md
                  outline-none
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                `}
                  />
                </form>
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UpdateDateTitle;
