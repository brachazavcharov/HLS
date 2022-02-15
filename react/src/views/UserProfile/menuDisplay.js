import React, { useState ,useEffect} from 'react';
import { Document, Page,pdfjs  } from 'react-pdf';
import { useSelector, useDispatch } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import './profile.css';
export default function MenuFunc() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const data = useSelector((state) => state.customerReducer);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <GridContainer>
    {data?.currentUser?.menu?.breakfast?
    <GridItem >
       <h3>תפריט ארוחת בוקר</h3>
      <Document 
        file={data?.currentUser?.menu?.breakfast}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page  pageNumber={pageNumber} />
      </Document>
 </GridItem>:<h3 class="in_line">המדריכה טרם עידכנה תפריט ארוחת בוקר</h3>}
    {data?.currentUser?.menu?.lunch?
      <GridItem>
     <h3>תפריט ארוחת צהריים</h3>
    <Document  
      file={data?.currentUser?.menu?.lunch}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={pageNumber} />
    </Document>
    </GridItem>:<h3 class="in_line">המדריכה טרם עידכנה תפריט ארוחת צהריים</h3>}
    
{data?.currentUser?.menu?.dinner?
<GridItem>
     <h3>תפריט ארוחת ערב</h3>
    <Document 
      file={data?.currentUser?.menu?.dinner}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={pageNumber} />
    </Document>
    </GridItem>:<h3 class="in_line">המדריכה טרם עידכנה תפריט ארוחת ערב</h3>}
    </GridContainer>
  );
}