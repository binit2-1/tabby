import { type Request, type Response } from "express";
import * as redisServices from "../services/redisServices";

export const saveSnippets = async (req: Request, res: Response) => {
  try {
    const { code, title, description, language, bundleId } = req.body;

    if (!code || !bundleId || !title || !description || !language) {
      return res.status(400).json({ error: "Code, Title, Description, Language, and BundleID are required" });
    }

    const snippetData = JSON.stringify({
      code,
      title: title || "Untitled",
      description: description || "",
      language,
      createdAt: new Date(),
    });

    const id = await redisServices.addToBundle(bundleId, snippetData, 86400);
    return res.status(200).json({ success: true, id });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return res.status(500).json({ error: error.message });
    } else console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};


export const getSnippetBundle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Id Not Found" });
    }

    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const data = await redisServices.getBundle(id);

    if (!data) {
      return res.status(404).json({ error: "Bundle not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
};
