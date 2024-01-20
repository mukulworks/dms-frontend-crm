import React, { useState, useEffect } from 'react'
import doc from '../../../images/FileExtension/doc.jpg'
import excel from '../../../images/FileExtension/excel.png'
import pdf from '../../../images/FileExtension/pdf.png'
import image from '../../../images/FileExtension/image.png'
const FileWithExtension = ({ fileExtension,fileTitle,filePath }) => {
    let file;
    if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
        file = <a className="fancybox" rel="group" href={filePath} target="_blank">
            <img title={fileTitle} src={image } height="30px" width="30px" />
        </a>
    }
    else if (fileExtension === "xls" || fileExtension === "xlsx") {
        file = <a className="fancybox" rel="group" href={filePath} target="_blank">

            <img title={fileTitle} src={excel}  height="30px" width="30px" />
        </a>
    }
    else if (fileExtension === "pdf") {
        file = <a className="fancybox" rel="group" href={filePath} target="_blank">

            <img title={fileTitle} src={pdf}  height="30px" width="30px" />
        </a>
    }
    else if (fileExtension === "doc" || fileExtension === "docx") {
        file = <a className="fancybox" rel="group" href={filePath} target="_blank">

            <img title={fileTitle} src={doc}  height="30px" width="30px" />
        </a>
    }
    else {
        file = <a className="fancybox" rel="group" href={filePath} target="_blank">

            <img title={fileTitle} src={image}  height="30px" width="30px" />
        </a>
    }
    return (
        <>
            {file}
        </>
    )
}

export default FileWithExtension
