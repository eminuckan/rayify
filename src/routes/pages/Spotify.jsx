import {
    Button,
    Container, Grid, GridItem
} from "@chakra-ui/react";
import axios from "axios";
import {useLoaderData} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import {getSongPos, getTrackPos} from "../../helpers/helper.js";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis.jsx";

export async function loader(){
    const response = axios.get("https://localhost:7072/api/Track").then(function (response){
        return response
    }).catch(function (error){
        return error
    });

    return response;
}
const Spotify = () => {
    const loaderData = useLoaderData();
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState(loaderData.data?.tracks);
    const [currentSong, setCurrentSong] = useState(loaderData.data?.tracks[0]);
    const [EmbedControllerState, setEmbedControllerState] = useState();
    const [currentTime, setCurrentTime] = useState(0);
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Ana Sayfaya eriştiniz. P tuşuna basarak kaldığınız yerden dinlemeye devam edebilirsiniz. Kontroller hakkında bilgi edinmek için h tuşuna basın.");

    useEffect(()=> {
        startSynthesis();
    },[message]);

    useEffect(() => {
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                uri: songs[0].spotifyUri
            };
            const callback = (EmbedController) => {
                setEmbedControllerState(EmbedController);
                EmbedController.addListener('playback_update', e => {
                    setCurrentTime(parseInt(e.data.position / 1000, 10));
                });
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, [loaderData]);

    useEffect(() => {
        if (isPlaying)
            stopSynthesis();
    },[isPlaying]);

    useEffect(() => {
        if (!isPlaying && getSongPos(songs,currentSong.id)+1 !== 0){
            setMessage(currentSong.name);
        }
    }, [currentSong]);

    useEffect(()=> {
        const handleKeyDown = (e) => {
            if (e.code === "KeyH") {
                setMessage("Sağ ve sol ok tuşlarıyla şarkının süresini değiştirebilirisiniz, yukarı ve aşağı ok tuşuyla listenizdeki diğer şarkılara geçebilirsiniz. İstediğiniz şarkıyı ismiyle sesli aramak için Control tuşuna basın")
            } else if (e.code === "KeyP") {
                EmbedControllerState.togglePlay();
                setIsPlaying(!isPlaying);
            } else if (e.code === "ArrowRight") {
                EmbedControllerState.seek(currentTime + 5);
            } else if (e.code === "ArrowLeft") {
                EmbedControllerState.seek(currentTime - 5);
            } else if (e.code === "ArrowDown") {
                const pos = getTrackPos(songs, currentSong.spotifyUri);
                if (pos+1 !== songs.length){
                    setCurrentSong(songs[pos+1]);
                    EmbedControllerState.loadUri(songs[pos+1].spotifyUri);
                }else{
                    setCurrentSong(songs[songs.length-1]);
                    EmbedControllerState.loadUri(songs[songs.length-1].spotifyUri);
                }
                e.preventDefault();
            } else if (e.code === "ArrowUp"){
                const pos = getSongPos(songs, currentSong.id);
                if (pos !== 0){
                    setCurrentSong(songs[pos-1]);
                    EmbedControllerState.loadUri(songs[pos-1].spotifyUri);
                }else{
                    setCurrentSong(songs[0])
                    EmbedControllerState.loadUri(songs[0].spotifyUri);
                }
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyDown)

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    });

    return (
        <>
            <Helmet>
                <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
            </Helmet>
            <Container h="100vh" maxW="container.2xl"  className="box-border">
                <Grid templateColumns='repeat(1, 1fr)' gap={3} pt='5' >
                    <GridItem className="h-[calc(100vh-2em)]" w='100%' bg='wihte' pt='150'>
                        <div id="embed-iframe"></div>
                        <Button mt="5" mr="2">next</Button>
                        <Button mt="5" mr="2">play</Button>
                        <Button mt="5" mr="2">previous</Button>
                    </GridItem>

                </Grid>
            </Container>
        </>
    );
};


export default Spotify;