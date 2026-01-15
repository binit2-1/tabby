"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { PencilSimple, Plus, XCircle, CheckCircle } from "@phosphor-icons/react";

type CodeInfo = {
  title: string;
  description: string;
}

export default function LeftSideBar() {
  const [codeName, setCodeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<CodeInfo[]>([]);

  
  const handleSubmit = () =>{
    if(!codeName.trim()) return;
    setItems((prev) => [...prev, {title: codeName, description: description}]);
    setCodeName("");
    setDescription("");
  }

  const handleCross = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              Add <Plus size={16} color="#FF5800" weight="bold" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Code Information</DialogTitle>
              <DialogDescription>
                Add the minimal details about your code with a valid trigger
                word and you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="code-name-1">Code Name(Trigger Word)</Label>
                <Input
                  id="code-name-1"
                  name="codeName"
                  placeholder="e.g; Breadth First Search"
                  value={codeName}
                  onChange={(e) => setCodeName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="short-description-1">Short Description</Label>
                <Input
                  id="short-description-1"
                  name="description"
                  placeholder="e.g; This code applies breadth first search"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit} disabled={!codeName.trim() || !description.trim()}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <div className="w-full flex-1 mt-5 border-t-2 border-[#1f1f1f]"/>
      <div className="flex flex-col items-center w-full h-full">
        {items.length === 0 ? (
          <p className="flex w-full justify-center text-center font-plus-jakarta-sans mt-4 text-gray-300 px-2">
            Press Add to add code snippets 
          </p>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between w-full font-plus-jakarta-sans font-bold px-2 py-2 border-b-2 border-[#1f1f1f] items-center"
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium leading-5 wrap-break-word"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 ml-3 cursor-pointer">
                <CheckCircle size={24} color="#26a269"/>
                <XCircle size={24} color="#e01b24" onClick={() => handleCross(idx)}/>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
