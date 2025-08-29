import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";  // you can upload the data from any where  , right now it is upload form the fs/pdf , direct pdf dal rhe h h
import { CharacterTextSplitter } from "@langchain/textsplitters";

export async function indexTheDocument(filePath){
  //const loader = new PDFLoader(filePath); // it will divide each page of pdf in one object , abhi 4 object milega , each of 1 page 
  // 1)Parse the pdf texts , by uning the langchain 's liabrary "PDFLoader".
  // Link of pdfLoader-> https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/

  const loader = new PDFLoader(filePath,{splitPages:false}); // it will give a single object which contain all the texts
  const doc = await loader.load();  
//   console.log(docs[0].pageContent);        
  
/* 2) Chunk the above single page text into small parts , why ?? because humari question ko sabse close wale chunks mai se answer lake de , pura pdf text ko padhne ki jarurt na pade, (hum in chunks ko embiddings mai convertt  krenge then store in vector db , then wha se retrival krenege close data  ko jo ki asked question ke kareeb h )

  // link for the split pdf-> https://js.langchain.com/docs/concepts/text_splitters/

There are many ways to split the paragraph texts.
Different approaches basically decide how to split text:

Length-based: splits by fixed size (characters or tokens).
Text/Document-structured: splits by paragraphs, headers, or code blocks.  --- we use this one
Semantic-based: splits where meaning changes, keeping chunks coherent.
*/
const textSplitter = new CharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,   // two paragraph mai , pahale wlae ka last kuch words , aur second para ke starting ke kuch text wo same hoga , isse hoga ye ki related para ko acche se samjh payega llm 
});
const texts = await textSplitter.splitText(docs[0].pageContent);  // dhyan se text ko pass krna h 
  


}