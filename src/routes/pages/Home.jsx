import {
    Container, Grid, GridItem, Button, Stack, Flex, Spacer, Center,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    ListItem,
    UnorderedList, Box, Image, Text,
} from "@chakra-ui/react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useLoaderData, useOutletContext} from "react-router-dom";
import {getSongPos} from "../../helpers/helper.js";

export async function loader(){
    const response = axios.get("https://localhost:7072/api/Music").then(function (response){
        return response
    }).catch(function (error){
        return error
    });

    return response;
}
const Home = () => {
    const loaderData = useLoaderData();
    const [searchVal, setSearchVal] = useOutletContext();
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(loaderData.data?.musics[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(HTMLAudioElement);
    const [duration,setDuration] = useState();
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Ana Sayfaya eriştiniz. P tuşuna basarak kaldığınız yerden dinlemeye devam edebilirsiniz. Kontroller hakkında bilgi edinmek için h tuşuna basın.");

    useEffect(()=> {
        startSynthesis();
    },[message]);


    useEffect(() => {
        if (loaderData.data?.musics){
            setSongs(loaderData.data.musics);
        }
    }, []);

    useEffect(() => {
        if (isPlaying){
            stopSynthesis();
            audioRef.current.play();
            setSearchVal("");
        }else{
            audioRef.current.pause();
        }
    },[isPlaying]);

    useEffect(() => {
        if (isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
        if (!isPlaying && getSongPos(songs,currentSong.id)+1 !== 0){
            setMessage(currentSong.title);
        }
    }, [currentSong]);

    useEffect(() => {
        if (searchVal){
            const filteredSongs = loaderData.data?.musics.filter(s => s.title.toLowerCase().includes(searchVal.toLowerCase()));
            if (filteredSongs.length === 0){
                setMessage(`Aradığınız ${searchVal} sorgusu ile şarkı bulunamadı lütfen tekrar aramak için ctrl tuşuna basın`)
                setSongs(loaderData.data?.musics);
            }else{

                setSongs(filteredSongs);
                setCurrentSong(filteredSongs[0]);
            }
            document.activeElement.blur();
        }
    }, [searchVal]);


    const onLoadedMetadata = ()=>{
        const seconds = Math.floor(audioRef.current.duration);
        setDuration(seconds);
    }

    useEffect(()=> {
        const handleKeyDown = (e) => {
            if (e.code === "KeyH") {
                setMessage("Sağ ve sol ok tuşlarıyla şarkının süresini değiştirebilirisiniz, yukarı ve aşağı ok tuşuyla listenizdeki diğer şarkılara geçebilirsiniz. İstediğiniz şarkıyı ismiyle sesli aramak için Control tuşuna basın")
            } else if (e.code === "KeyP") {
                setIsPlaying(!isPlaying);
            } else if (e.code === "ArrowRight") {
                audioRef.current.currentTime += 5;
            } else if (e.code === "ArrowLeft") {
                audioRef.current.currentTime -= 5;
            } else if (e.code === "ArrowDown") {
                const pos = getSongPos(songs, currentSong.id);
                if (pos+1 !== songs.length){
                    setCurrentSong(songs[pos+1]);
                }else{
                    setCurrentSong(songs[songs.length-1]);
                }
                e.preventDefault();
            } else if (e.code === "ArrowUp"){
                const pos = getSongPos(songs, currentSong.id);
                if (pos !== 0){
                    setCurrentSong(songs[pos-1]);
                }else{
                    setCurrentSong(songs[0])
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
        <Container h="100vh" maxW="container.2xl"  className="box-border">
            <Grid templateColumns='repeat(3, 1fr)' gap={3} pt='5' >
                <GridItem p="10" className="h-[calc(100vh-2em)]" w='100%' bg='wihte' pt='150' border='1px solid grey' borderRadius='4'>
                    <Flex mb='20' h='50%' alignItems='center' justifyContent='space-between' gap='10'>
                        <Flex direction='column'>
                          <Image borderRadius='5' mb='10px' src='https://cdn-icons-png.flaticon.com/512/32/32328.png  ' />
                        <p>{currentSong.title}</p>
                        </Flex>
                        <Center h='90%'>
                            <audio preload="metadata" onLoadedMetadata={onLoadedMetadata} ref={audioRef} src={`https://localhost:7072/${currentSong?.path}`} />
                        </Center>
                    </Flex>
                    <Slider aria-label='slider-ex-1' defaultValue={0} max={duration} mt={'2'} mb={'5'} onChange={(value) => audioRef.current.currentTime = value}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Stack>
                        <Flex>
                            <Button w='10rem'>
                                Previous Music
                            </Button>
                            <Spacer />
                            <Button w='5rem' onClick={() => setIsPlaying(!isPlaying)}>
                                <p>{isPlaying ? 'Pause' : 'Play'}</p>
                            </Button>
                            <Spacer />
                            <Button w='10rem'>
                                Next Music
                            </Button>
                        </Flex>
                    </Stack>
                </GridItem>
                <GridItem className="h-full" colSpan={2} w='100%' bg='white' border='1px solid grey' borderRadius='4'>
                    <UnorderedList styleType='none'>

                        {songs.map(song=> {
                            return (
                        <ListItem key={song.id} w='100%' onClick={() => setCurrentSong(song)}>
                            <Flex w='100%' cursor='pointer' justifyContent='flex-start' mt='5' h='120' alignItems='center'>
                                <Image borderRadius='5' w='200' h='110' objectFit="cover" mt='-1px'  src='https://cdn-icons-png.flaticon.com/512/32/32328.png' />
                                <Text mt='-1' display='block' color='Black' fontSize='30' ml='10'>{song.title}</Text>
                            </Flex>
                            <Box h='100%' w='95%' ml='auto' mr='auto' bottom='0' borderBottom='1px solid lightgrey' mt='3'></Box>
                        </ListItem>
                        )
                        }
                        )};

                    </UnorderedList>
                </GridItem>
            </Grid>
        </Container>
    );
};


export default Home;