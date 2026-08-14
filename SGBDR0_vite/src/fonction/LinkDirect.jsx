import { Link } from "react-router-dom";


function LinkDirect(props) {
    const liens = props.liens.split("**")
    const sonNom = props.sonNom.split("**")
    return (
        <>
            {liens.map((lien, i) => (
                <li key={i}>
                    <Link class={props.classLink} to={lien}>
                        {sonNom[i]}
                    </Link>
                </li>

            ))}
            
        </>
    )
}

export default LinkDirect