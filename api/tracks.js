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
  requireBody(["trackId"]),
  async (req, res) => {
     const playlistId = Number(req.params.id);
  const { trackId } = req.body;

  if (!playlistId || trackId === undefined) return res.status(400).send({ error: "Missing playlistId or trackId" });
   
  const playlist = await getPlaylistById(playlistId);
  if (!playlist) return res.status(404).send({ error: "Playlist not found" });

  if (playlist.user_id !== req.user.id) return res.status(403).send({ error: "Forbidden" });

  const addedTrack = await addTrackToPlaylist(playlistId, trackId);

  res.status(201).send(addedTrack);
});