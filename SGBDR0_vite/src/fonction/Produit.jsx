import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaShoppingBasket } from '../../node_modules/react-icons/fa'
function Produit(props){
    const navigate = useNavigate() 
    const [nomProduits, setNomProduits] = useState(props.nomProduit.split("**"))
    const [reductionProduit, setReductionProduit] = useState(props.reductionProduit.split("**"))
    const [prixProduit, setPrixProduit] = useState(props.prixProduit.split("**"))
    const nombreRestant = props.nombreRestant.split("**")
    const [nombreReste, setNombreReste] = useState(nombreRestant)
    const [lienConfirmation, setLienConfirmation] = useState(props.lienConfirmation.split("**"))
    const [imageProduit, setImageProduit] = useState(props.imageProduit.split("**"))
    const [achat, setAchat] = useState(0)


    let tableLien = []
    let tableButton = []
    let tableButtonRed = []
    nomProduits.map((nomProduit, i) => (
      tableLien.push(["m-auto z-30", true]) 
    ))

    const [reste, setReste] = useState(nombreRestant)
    const [classLien, setClassLien] = useState(tableLien)
    
    nomProduits.map((nomProduit, i) => {
      if (reste[i] <= 0 || reste[i] === undefined) {
        tableButton.push(["flex w-[200px] h-[40px] bg-blue-500 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto", true])
      }else {
        tableButton.push(["flex w-[200px] h-[40px] bg-blue-500 z-30 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto", true])
      }
    }
    )
    
    nomProduits.map((nomProduit, i) => {
      if (parseInt(reste[i]) === parseInt(nombreReste[i]) || reste[i] === undefined || parseInt(reste[i]) <=0) {
        tableButtonRed.push(["flex w-[200px] h-[40px] bg-red-500 hover:bg-red-400 rounded-[10px] text-white text-center m-auto", true]) 
      } else {
        tableButtonRed.push(["flex w-[200px] h-[40px] z-30 bg-red-500 hover:bg-red-400 rounded-[10px] text-white text-center m-auto", true])
      }
})  
  
    const [classButton, setClassButton] = useState(tableButton)
    const [classButtonRed, setClassButtonRed] = useState(tableButtonRed)    
  
    return(
        <>
          <div class="z-40 absolute right-5 top-10">
            <div>
                <FaShoppingBasket size="60" color='green' />
                <div class="flex absolute w-[40px] h-[40px] mt-[-20px] p-[5px] bg-blue-600 rounded-[100%]">
                    <div class="m-auto text-[20px]">{achat}</div>
                </div>    
            </div>
        </div>
        <div class="flex w-screen mt-10">
        {nomProduits.map((nomProduit, i) => (
              <div key={i} class="w-[30%] m-auto p-[20px_10px] hover:[border:1px_solid] hover:[transform:scale(0.96)] [transition:100ms_ease_all] border-blue-500 border-3 hover:[box-shadow:0px_0px_10px_black] rounded-[20px]">
                <h1 class="bg-[rgb(210,210,210)] p-[10px] absolute text-[25px] font-semibold mt-[-40px]">{nomProduit}</h1>
                <div>
                  <img src={imageProduit[i]} alt="" />
                </div>
                <div class="flex w-full">
                  <div class="w-[50%] [line-height:30px] text-left">
                    <div>Reduction: </div>
                    <div>
                      Prix de produit: 
                    </div>
                    <div>
                      Nombre restant: 
                    </div>
                  </div>                  
                  <div class="w-[50%] text-right [line-height:30px]">
                    <div>
                      <span class="bg-red-600 p-[0px_10px] text-white">{reductionProduit[i]}</span>
                    </div>
                    <div class="ml-5 text-[25px] font-black">
                      <span>{prixProduit[i]}</span></div>
                              
                    <div class="ml-5 text-[25px] font-black">
                      <span>{reste[i]}</span>
                    </div> 
                  </div>         
                </div>
                <div class="w-full flex">
                  <form class="w-full flex"
                        onSubmit={(event) => {
                          event.preventDefault()
                          const donnee = {
                            nomProduit: nomProduit,
                            sonPrix: prixProduit[i],
                            sonRed: reductionProduit[i],
                            sonImage: imageProduit[i],
                            saQte: nombreReste[i]
                          } 
                          navigate('/Confirm', {
                            state: donnee
                          })
                        }}>
                    <div class="m-auto w-[400px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <button type="submit" class={classLien[i][0]}>
                      <div class="w-[200px] h-[40px] bg-green-500 hover:bg-green-400 rounded-[10px] p-[10px] text-white text-center m-auto">
                          Acheter
                      </div>
                    </button>
                  </form>
                </div>                
                <div class="w-full mt-3 flex justify-center">
                  <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <button class={classButton[i][0]} onClick={ async (e) => {
                      e.preventDefault()
                      setAchat(parseInt(achat)+1)
                      classButtonRed[i][0] = "flex w-[200px] h-[40px] bg-red-500 z-30 hover:bg-red-400 rounded-[10px] text-white text-center m-auto"
                      reste[i] = parseInt(parseInt(reste[i]) - 1) 
                      setReste(reste)
                      setClassButtonRed(classButtonRed)
                     
                      if (reste[i] === 0){
                        classButton[i][0] = "flex w-[200px] h-[40px] bg-blue-500 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto"
                        setClassButton(classButton)
                      }
                    }}>
                        <div class="m-0 m-auto p-[10px]">Ajouter au panier</div>
                    </button>
                  </div>
                <div class="w-full mt-3 flex justify-center">
                  <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <button class={classButtonRed[i][0]} onClick={ async (e) => {
                      e.preventDefault()
                      reste[i] = parseInt(reste[i] + 1)                      
                      setAchat(parseInt(achat)-1)
                      setReste(reste)
                      classButton[i][0] = "flex w-[200px] z-30 h-[40px] bg-blue-500 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto"
                      setClassButton(classButton)
                      if (parseInt(reste[i]) === parseInt(nombreRestant[i]) || reste[i] === undefined) {
                        classButtonRed[i][0] = "flex w-[200px] h-[40px] bg-red-500 hover:bg-red-400 rounded-[10px] text-white text-center m-auto"
                        setClassButtonRed(classButtonRed)
                      }

                    }}>
                        <div class="m-0 m-auto p-[10px]">Enlever au panier</div>
                    </button>
                  </div>
              </div>        
        ))}
        </div>
        </>
    )
}

export default Produit