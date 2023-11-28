import {
    Container, Grid, GridItem, Button, ButtonGroup, Stack, Flex, Spacer, Center,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList, Box, Image, Text,
} from "@chakra-ui/react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis.jsx";
import {useEffect, useState} from "react";
import useSound from "use-sound";
import startSound from "../../assets/sounds/start.mp3";
import music1 from  "../../assets/sounds/Muti & Azer Bülbül  - İlle de Sen (Official Video).mp3";
import music2 from  "../../assets/sounds/Burak Bulut & Yıldız Tilbe - Bambaşka Yollara.mp3";
import music3 from  "../../assets/sounds/Mabel Matiz - Müphem.mp3";
import music4 from  "../../assets/sounds/KÖFN X Simge - Yakışıklı (Official Video).mp3";
const Home = () => {
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Ana Sayfaya eriştiniz. Sıpeys tuşuna basarak kaldığınız yerden dinlemeye devam edebilirsiniz. Kontroller hakkında bilgi edinmek için h tuşuna basın.");
    const [currentSong,setCurrentSong] = useState({musicName:'İllede sen', musicPath:music1});
    const [isPlayed, setIsPlayed] = useState(false);
    const [play,{stop, pause}] = useSound([music1,music2,music3]);
    const songList =[{musicName:'İllede sen', musicPath:music1},{musicName:'Bambaşka Yollara', musicPath:music2},{musicName:'Müphem', musicPath:music3},{musicName:'Yakışıklı', musicPath:music4}]
    const x = document.getElementById("sP");
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

    const playSong = (song) =>
    {

        setCurrentSong(song)
        setIsPlayed(!isPlayed)
        if(isPlayed === true)
        {
            play();
        }
        else {pause()};

    };

    const pauseButton = () =>
    {
        setIsPlayed(!isPlayed)
        if(isPlayed === true)
        {
            play();
            x.textContent = "Pause";

        }
        else
        {
            pause();

           x.textContent = "Play";

        };
    }
    return (
        <Container h="100vh" maxW="container.2xl"  className="box-border">
            <Grid templateColumns='repeat(3, 1fr)' gap={3} pt='5' >
                <GridItem p="10" className="h-[calc(100vh-2em)]" w='100%' bg='wihte' pt='150' border='1px solid grey' borderRadius='4'>
                    <Flex mb='20' h='50%' alignItems='center' justifyContent='space-between' gap='10'>
                        <Flex direction='column'>
                          <Image borderRadius='5' mb='10' src='https://i.ytimg.com/vi/C2tQrIHSXho/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCbR8sRCp1J_R4S_U2upByaU9PdUw'>
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
                            <Button onClick={pauseButton} w='5rem'>
                                <p id="sP">Pause</p>
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

                        {songList.map(song=> {
                            return (
                                <ListItem w='100%' onClick={() => playSong(song)}><Flex w='100%' cursor='pointer' justifyContent='flex-start' mt='5' h='120' alignItems='center'><Image borderRadius='5' w='200' h='110' objectFit="cover" mt='-1px' boxShadow='dark-lg'  src='https://i.ytimg.com/vi/C2tQrIHSXho/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCbR8sRCp1J_R4S_U2upByaU9PdUw'></Image><Text mt='-1' display='block' color='Black' fontSize='30' ml='10'>Mabel Matiz - Müphem</Text>
                                </Flex><Box h='100%' w='95%' ml='auto' mr='auto' bottom='0' borderBottom='1px solid lightgrey' mt='3'></Box></ListItem>
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