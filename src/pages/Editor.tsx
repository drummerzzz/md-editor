import React from 'react'
import MDEditor from '@uiw/react-md-editor';

import { onLoad, onSave } from '../controllers/artilce';
import { Text, Switch, ChakraProvider, Grid, Box, Stack } from '@chakra-ui/react';
import './EditorStiyle.css'
import { useParams } from 'react-router-dom';

export default function Editor () {
  const [toogleShowEditor, setToogleShowEditor] = React.useState<boolean>(false);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [mdText, setMdText] = React.useState<string | undefined>('**Hello world!!!**');
  const [currenttimeout, setCurrentTimeout] = React.useState<NodeJS.Timeout | undefined>(undefined);
  
  let { url } = useParams()
  React.useEffect( () => {
    async function LoadData () {
      if (url) {
        const article = await onLoad(url)
        setIsloading(true)
        if (article) {
          setToogleShowEditor(!article.text)
          setMdText(article.text)
        }
        setIsloading(false)
      }
    }
    LoadData()
  }, [])
  
  React.useEffect(() => {
    if (isLoading) return
    const delay = 3000 // 3s
    if (currenttimeout) clearTimeout(currenttimeout)
    
    const timeout = setTimeout(async () => {
      await setIsloading(true)
      if (url && mdText) await onSave(url, mdText)
      await setIsloading(false)
    }, delay)
    setCurrentTimeout(timeout)
  }, [mdText])
  
  return  (
    <ChakraProvider>
      <Grid padding={5} background="#0d1117" justifyItems="end" >
          <Stack fontSize="xl" flexDirection="row" alignItems="center">
            <Text marginRight={5} color="white">
              Editor
            </Text>
            <Switch marginLeft={5} isChecked={toogleShowEditor} size='lg' onChange={() => setToogleShowEditor(!toogleShowEditor)} />
          </Stack>
      </Grid>
      <Grid background="#0d1117" paddingX={!toogleShowEditor? 10 : 5}>
        <div data-color-mode="dark" >
          {toogleShowEditor ?
              <MDEditor
              value={mdText}
              onChange={setMdText}
              /> :
              <MDEditor.Markdown source={mdText} style={{ whiteSpace: 'pre-wrap' }} />
            }
        </div>

      </Grid>
    </ChakraProvider>
  )
}