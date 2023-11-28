import {
    Container, Grid, GridItem, Button, Stack, Flex, Spacer, Center,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    ListItem,
    UnorderedList, Box, Image, Text,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis.jsx";
import {useEffect, useState} from "react";
import useSound from "use-sound";
import music1 from  "../../assets/sounds/Muti & Azer Bülbül  - İlle de Sen (Official Video).mp3";
import music2 from  "../../assets/sounds/Burak Bulut & Yıldız Tilbe - Bambaşka Yollara.mp3";
import music3 from  "../../assets/sounds/Mabel Matiz - Müphem.mp3";
import music4 from  "../../assets/sounds/KÖFN X Simge - Yakışıklı (Official Video).mp3";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useLoaderData} from "react-router-dom";

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
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Ana Sayfaya eriştiniz. Sıpeys tuşuna basarak kaldığınız yerden dinlemeye devam edebilirsiniz. Kontroller hakkında bilgi edinmek için h tuşuna basın.");
    const [currentSongPath,setCurrentSongPath] = useState(`https://localhost:7072/${loaderData.data.musics[0].path}`);
    const [isChanged, setIsChanged] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [play,{stop,pause}] = useSound(currentSongPath);
    const [cookies] = useCookies(['authToken','tokenExpire']);
    useEffect(()=> {
        startSynthesis();
    },[message])
    const handleKeyDown = (e) => {
        if (e.code ==="KeyH") {
            setMessage("Sağ ve sol ok tuşlarıyla şarkının süresini değiştirebilirisiniz, yukarı ve aşağı ok tuşuyla listenizdeki diğer şarkılara geçebilirsiniz")
        }
    };

    useEffect(()=> {
        document.addEventListener("keydown", handleKeyDown)
    },[]);

    useEffect(() => {
        if (isPlayed){
            play()
        }else{
            pause()
        }
    }, [isPlayed]);

    useEffect(() => {
        setIsChanged(true);
    }, [currentSongPath]);

    const playSong = (path) =>
    {
        stopSynthesis()
        setCurrentSongPath(`https://localhost:7072/${path}`)
        setIsPlayed(!isPlayed)
    };

    return (
        <Container h="100vh" maxW="container.2xl"  className="box-border">
            <Text>Merhaba {jwtDecode(cookies.authToken).username}</Text>
            <Grid templateColumns='repeat(3, 1fr)' gap={3} pt='5' >
                <GridItem p="10" className="h-[calc(100vh-2em)]" w='100%' bg='wihte' pt='150' border='1px solid grey' borderRadius='4'>
                    <Flex mb='20' h='50%' alignItems='center' justifyContent='space-between' gap='10'>
                        <Flex direction='column'>
                          <Image borderRadius='5' mb='10' src='https://cdn-icons-png.flaticon.com/512/32/32328.png  '>
                          </Image>
                        <p>Mabel Matiz - Müphem</p>
                        </Flex>
                        <Center h='90%'>

                            <Slider
                                aria-label='slider-ex-3'
                                defaultValue={30}
                                orientation='vertical'
                                h='100%'
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Center>
                    </Flex>
                    <Slider aria-label='slider-ex-1' defaultValue={30} mt={'2'} mb={'5'}>
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
                            <Button w='5rem'>
                                <p>Play</p>
                            </Button>
                            <Spacer />
                            <Button w='10rem'>
                                Next Music
                            </Button>
                        </Flex>
                    </Stack>
                </GridItem>
                <GridItem className="h-[calc(100vh-2em)]" colSpan={2} w='100%' bg='white' border='1px solid grey' borderRadius='4'>
                    <UnorderedList styleType='none'>

                        {loaderData.data.musics.map(song=> {
                            return (
                                <ListItem key={song.Id} w='100%' onClick={() => playSong(song.path)}>
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