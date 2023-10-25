import Listen from "components/components/shared/SpeechRecognition/Listen";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input,
} from '@chakra-ui/react';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Listen />
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input className="border-2 border-neutral-800 hover:border-red-500 transition-colors duration-500 ease-in-out" type='email' />
            <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
    </main>
  )
}
