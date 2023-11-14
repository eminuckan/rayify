import {
    Box,
    Heading,
    Container,
    Text,
    Stack,
} from '@chakra-ui/react'
import {cookies} from "next/headers";
import {parseJWT} from "../utils/auth";

export default function Home() {
    const token = cookies().get("accessToken");
    const decoded = parseJWT(token?.value);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <>
            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Rayify <br />
                        <Text as={'span'} color={'green.400'}>
                            Engelsiz Müzik <br /> Kullanıcı:  {decoded.username}
                        </Text>
                    </Heading>
                </Stack>
            </Container>
        </>
    </main>
  )
}

