import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import { FaSearch, FaShoppingBasket } from '../../node_modules/react-icons/fa'
import '../App.css'
import Produit from '../fonction/Produit'
import produit1 from '../image/ChatGPT Image Jun 12 2026 06_23_35 PM.png'
import Relation from "../fonction/Relation"
import LinkDirect from '../fonction/LinkDirect'
const ligne1 = produit1+"**"+produit1+"**"+produit1

function Accueil() {
    return(
        <>
            <div class='m-0 p-0 text-white'>
                <header class="w-screen font-bold bg-red-500 flex justify-between">
                    <div class="text-red-500 text-[30px] p-[10px] border-b-red-500 border-b-2 bg-white"><h1>Nom du projet </h1></div>
                    <div class="m-auto w-[50%] p-[10px_20px] ">
                        <ul class="m-auto flex justify-between">
                        <LinkDirect liens="/Accueil**/Apropos**/Classement"
                                    sonNom = "Accueil**A propos**Classement"
                                    classLink = "hover:border-b-white hover:border-b-3"
                                    />
                        </ul>
                    </div>
                    <div class="m-auto">
                        <a href="">
                        <div class="p-[5px_15px] bg-white text-red-500 rounded-[10px] hover:bg-[rgb(240,240,240)]">S'inscrire</div>
                        </a>
                    </div>
                </header>
                <div class="text-white">
                    <div class="w-screen flex justify-between p-[30px-10px] border-b-2 border-b-[rgb(210,210,210)]">
                    <div class="m-auto p-[15px_5px]">
                        <select name="tableau" id="tableau" class="p-[5px_15px] text-black font-semibold border-2 border-blue-500">
                        <option value="" class="border-blue-500 border-2">Liste de Table</option>
                        </select>                
                        <button class="bg-blue-500 ml-[15px] hover:bg-blue-400 p-[7px] rounded-[10px]">Voir les produits</button>
                    </div>
                    <div class='flex m-auto text-black border-2 border-[rgb(210,210,210)] rounded-[0px_10px_10px_0px] '>
                        <input class="placeholder:text-[rgb(210,210,210)]"
                        type="text" name="recherche" id="recherche" placeholder='Recherche' />
                        <button class="bg-red-500 hover:bg-red-400 rounded-[0px_10px_10px_0px] p-[10px]">
                        <FaSearch class="text-[20px] text-white"/> 
                        </button>
                    </div>
                    </div>
                </div>
                <div class="mt-10 w-screen text-black justify-between">
                    <Produit nomProduit="Mangue**Tomate**Orange" 
                    reductionProduit="5%**0%"
                    prixProduit="500 Ar"
                        lienConfirmation=""
                        nombreRestant="5**7"
                        imageProduit={ligne1}
                        prixProduit="100 Ar**200 Ar" />
                </div>
            </div>        
        </>
    )

}

export default Accueil