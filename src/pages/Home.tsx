import {
    ChakraProvider,
    Box,
    Grid,
    theme,
    Input,
    Button,
  } from "@chakra-ui/react"
import React from "react"
  
  
export default function Home () {
  const [link, setLink] = React.useState<string | undefined>('')
  const goToArticle = () => {
    if (link) window.location.replace(link)
  }
  return (
    <ChakraProvider theme={theme}>
      <Grid background="#0d1117" minH="100vh" justifyItems="center" alignItems="center">
          <Box fontSize="xl" marginTop="-10rem" textAlign="center">
            <Grid textAlign="center" justifyItems="center" justifyContent="center" justifySelf="center">
              <img src="/markdown.png" width="60%"/>
            </Grid>
            <Input  margin={1} color="white" value={link} onInput={(event) => setLink(event.currentTarget.value)} size="lg" width="80%" placeholder='Article url' />
            <Button margin={1} color="#0d1117" colorScheme="linkedin" disabled={!link} size="lg" onClick={goToArticle}>Go</Button>
          </Box>
      </Grid>
  </ChakraProvider>
 )
}
  