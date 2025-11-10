import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById, createTrack } from "#db/queries/tracks";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.get("/:id", async (req, res) => {
  const track = req.track;

  if (req.user) {
    const tracks = await getTrackById  (
   tracks.id,
   req.user.id,
    );
    tracks.playlists = playlists;
  }
  res.send(track);
});


router.post(
  "/:id/tracks",
  requireUser,
  requireBody(["name", "duration_ms"]),
  async (req, res) => {
    const { name, duration_ms } = req.body;
    const track = await createTrack(
      req.track.id,
      req.user.id,
        name, 
      duration_ms,
        );
        res.status(201).send(track)
  }
);