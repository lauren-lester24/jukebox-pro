import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

import { getTracksByPlaylistId } from "#db/queries/tracks";

import requireUser from "#middleware/requireUser";



router.use(requireUser);

router.get("/", async (req, res) => {
  const playlists = await getPlaylists(req.user.id);
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body requires: name, description");

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  if (req.user.id !== req.playlist.user_id) {
    return res
    .status(403)
    .send("You are not authorized to view Playlist.")
  }
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
try {

  if (req.user.id !== req.playlist.user_id) {
    return res
    .status(403)
    .send("You are not authorized to view this plalist's tracks.");
  }
const tracks = await getTracksByPlaylistId(req.playlist.id);  

   res.send(tracks);
   } catch (error) {
  res.status(500).send({ error: error.message });
   }
});

router.post("/:id/tracks", async (req, res) => {

  try {
   
     const { trackId }  = req.body;

      if (!trackId) {
        
        return res.status(400).send("Request body requires: trackId");
      }

      if (req.user.id !== req.playlist.user_id) {
        return res
        .status(403)
        .send("You are not authorized to modify this Playlist");
      }

      const playlistTrack = await createPlaylistTrack(req.playlistid, trackId);
       res
       .status(201).send(playlistTrack);
  } catch (error) {
     res
     .status(500).send({ error: error.message });
  }
 

});