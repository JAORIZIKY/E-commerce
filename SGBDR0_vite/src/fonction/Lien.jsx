import { useState } from "react"

function Lien(props){
    const [classLi, setClassLi] = useState(props.classLi + "")
    const [classA, setClassA] = useState(props.classA + "")
    const [classDiv, setClassDiv] = useState(props.classDiv + "")
    return(
        <>
            <li class={classLi}>
                <a class={classA} href={props.lien}>
                    <div class={classDiv}>{props.texte}</div>
                </a>
            </li>
        </>
    )
}

export default Lien