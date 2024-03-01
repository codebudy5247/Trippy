"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Upload, X, Search } from "lucide-react";
import ImageList from "./ImageList";
import { Trip } from "@prisma/client";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  trip: Trip;
};

const SelectImgModal = ({ showModal, setShowModal, trip }: Props) => {
  const [value, setValue] = useState("beach");
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchedImages, setSearchedImages] = useState<any>();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
    }
  };

  const handleClearInput = () => {
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  };

  const showClearButton = !!value;

  async function getImages() {
    const res = await fetch(
      `https://pixabay.com/api/?key=41876546-b9727925975b47ce1a931fd57&q=${value}&image_type=photo&pretty=true&per_page=150`
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return await res.json();
  }

  useEffect(() => {
    const init = async () => {
      let images = (await getImages()) as PixabayImageResponse;
      setSearchedImages(images.hits);
    };
    init();
  }, [value]);

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent>
        <div className="p-2 h-full">
          <h1 className="text-center text-2xl">Select a cover photo</h1>

          <div className="mt-2 flex gap-2">
            <Button size="lg" variant="outline" className="flex gap-2">
              <Upload size={20} /> Upload
            </Button>
            <form
              className="relative flex h-10 w-full content-between items-center"
              onSubmit={handleSubmit}
            >
              <input
                className="h-full w-full rounded-lg border border-solid border-transparent bg-neutral-100 p-2.5 pr-9 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-orange-500"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
                ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
              />
              {showClearButton ? (
                <button
                  type="button"
                  className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
                  aria-label="Clear search input"
                  onClick={handleClearInput}
                >
                  <X size="1.25rem" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
                  aria-label="Submit search"
                >
                  <Search size="1.25rem" />
                </button>
              )}
            </form>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md border p-1 mt-2">
            <ImageList
              ImageListData={searchedImages}
              tripID={trip.id}
              setShowModal={setShowModal}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectImgModal;
