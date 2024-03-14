export const getSongPos = (songs,id) => {
    return songs.map(s => s.id).indexOf(id);
}

export const getTrackPos = (tracks, uri) => {
    return tracks.map(t => t.spotifyUri).indexOf(uri);
}