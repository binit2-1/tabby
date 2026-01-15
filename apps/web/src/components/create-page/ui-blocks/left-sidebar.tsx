"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Plus } from "@phosphor-icons/react"

export default function LeftSideBar() {

  const [codeName, setCodeName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add <Plus size={16} /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Code Information</DialogTitle>
            <DialogDescription>
              Add the minimal details about your code with a valid trigger word and you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="code-name-1">Code Name(Trigger Word)</Label>
              <Input id="code-name-1" name="codeName" placeholder="e.g; Breadth First Search" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="short-description-1">Short Description</Label>
              <Input id="short-description-1" name="description" placeholder="e.g; This code applies breadth first search" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
