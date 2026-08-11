import { useState } from "react"
import { useLocation } from "react-router-dom"


function Confirm() {
    const location = useLocation()
    
    const donnee = location.state || {} 
    const [sonNom, setSonNom] = useState(donnee.nomProduit)
    const [sonPrix, setSonPrix] = useState(donnee.sonPrix)
    const [sonRed, setSonRed] = useState(donnee.sonRed)
    const [sonImage, setSonImage] = useState(donnee.sonImage)
    const [saQte, setSaQte] = useState(donnee.saQte)
    const [classFormulaire, setClassFormulaire] = useState(["top-0 left-0 w-screen h-screen fixed bg-[rgba(40,40,40,0.5)] hidden flex flex", false])
    
    return(
        <div class="m-0 p-0 text-white">
            <header class="w-screen p-[10px_20px] font-bold bg-red-500 flex justify-between">
                <div class="m-auto"><h1>Nom du projet </h1></div>
                <div class="m-auto">
                    <ul class="m-auto">
                        
                    </ul>
                </div>
                <div class="m-auto">
                    <a href="">
                    <div class="p-[5px_15px] bg-white text-red-500 rounded-[10px] hover:bg-[rgb(240,240,240)]">S'inscrire</div>
                    </a>
                </div>
            </header>
            <div class="pt-[20px] flex text-black w-screen bg-[rgb(240,240,240)] justify-center">
                <div class="flex w-[80%] m-auto">
                    <div class="w-[40%]">
                        <img src={sonImage} alt="" />
                    </div>
                    <div class="pl-40">
                        <h1 class="text-[40px] font-black">{sonNom}</h1>
                        <div class="mt-5">Son prix est de {sonPrix}</div>
                        <div class="mt-2">Reduction est de <span class="bg-red-600 text-white p-[2px_5px]">{sonRed}</span></div>
                        <div class="mt-2">Caractéristique :
                            <ul></ul>
                        </div>
                        <div class="w-full flex mt-5">
                            <button class="cursor-pointer w-[200px] h-[40px] bg-green-500 hover:bg-green-400 rounded-[10px] p-[10px] text-white text-center m-auto"
                                    onClick={() => {
                                        setClassFormulaire(["top-0 left-0 w-screen h-screen fixed bg-[rgba(40,40,40,0.5)] flex flex", true])
                                    }}    >
                                Confirmer l'achat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class={classFormulaire}>
                <div class="w-[50%] rounded-[20px] p-[10px_20px] m-auto bg-[linear-gradient(rgb(100,100,100),rgb(40,40,100))] text-white">
                    <h1 class="text-[30px] w-full text-center font-semibold">Entrez vos informations pour pouvoir confirmer l'achat</h1>    
                    <form class="mt-5">
                        <div class="mb-5">
                            <label>Entrez votre nom</label> <br />
                            <input type="text" class="w-full border-b-2 border-b-white" />
                        </div>
                        <div class="justify-between mt-10 w-full flex">
                            <button type="submit" class="cursor-pointer w-[200px] h-[40px] bg-green-500 hover:bg-green-400 rounded-[10px] p-[10px] text-white text-center m-auto">
                                Valider
                            </button>
                            <div class="cursor-pointer w-[200px] h-[40px] bg-green-100 text-black font-semibold rounded-[10px] p-[10px] text-center m-auto"
                                    onClick={() => {
                                        setClassFormulaire(["top-0 left-0 w-screen h-screen fixed bg-[rgba(40,40,40,0.5)] hidden flex flex", false])
                                    }}    >
                                Annuler
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Confirm