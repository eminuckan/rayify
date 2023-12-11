export const getSongPos = (songs,id) => {
    return songs.map(s => s.id).indexOf(id);
}