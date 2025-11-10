import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}


// export async function getPlaylistsByTrackIdAndUserId(trackId, userId) {
//   const sql = `
//     SELECT p.*
//     FROM playlists p
//     JOIN playlists_tracks pt ON p.id = pt.playlist_id
//     WHERE pt.track_id = $1
//       AND p.user_id = $2
//   `;
//   const { rows } = await db.query(sql, [trackId, userId]);
//   return rows;
// }
