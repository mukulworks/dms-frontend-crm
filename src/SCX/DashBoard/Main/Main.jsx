import React from 'react'
import Section from './Section/Section'

const Main = ({ main, data }) =>{
    return(
        <React.Fragment>
            {
                main && main.sections.map((section, key) => (
                    <Section section={section} key={key} data={data}/>
                ))
            }
        </React.Fragment>
    )
}

export default Main;