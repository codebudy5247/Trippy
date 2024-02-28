"use client";
import React, { useEffect, useState, ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Trip } from "@prisma/client";
import Image from "next/image";
import SelectImgModal from "./SelectImageModal/SelectImgModal";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";
import { updateTrip } from "@/actions/update-trip";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";

type Props = {
  trip: Trip;
};

const UpdateTripForm = ({ trip }: Props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
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
    <>
      <div className="mt-2">
        <div
          onClick={() => router.push("/trip")}
          className="cursor-pointer mb-1"
        >
          <ChevronLeft size={20} color="grey" />
        </div>

        <div className="">
          <div className="w-fit">
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

        <div className="h-full w-full mt-2 ">
          {trip.coverImage === "" ? (
            <div
              onClick={() => setShowModal(true)}
              className="bg-gray-300 py-10 rounded-lg mt-2 cursor-pointer"
            >
              <h1 className="text-gray-800 text-sm text-center">
                Add a trip photo
              </h1>
            </div>
          ) : (
            <>
              <div className="relative">
                <Button
                  onClick={() => setShowModal(true)}
                  variant="outline"
                  className="mt-2 ml-2 absolute"
                >
                  Update Image
                </Button>
                <div className="flex h-60 overflow-hidden">
                  <Image
                    src={trip.coverImage}
                    alt="_image"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <SelectImgModal
        showModal={showModal}
        setShowModal={setShowModal}
        trip={trip}
      />
    </>
  );
};

export default UpdateTripForm;
