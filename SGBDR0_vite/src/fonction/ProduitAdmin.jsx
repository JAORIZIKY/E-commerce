import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom' 
function ProduitAdmin(props){
    const navigate = useNavigate() 
    const [nomProduits, setNomProduits] = useState(props.nomProduit.split("**"))
    const [reductionProduit, setReductionProduit] = useState(props.reductionProduit.split("**"))
    const [prixProduit, setPrixProduit] = useState(props.prixProduit.split("**"))
    const nombreRestant = props.nombreRestant.split("**")
    const [nombreReste, setNombreReste] = useState(nombreRestant)
    const [lienConfirmation, setLienConfirmation] = useState(props.lienConfirmation.split("**"))
    const [imageProduit, setImageProduit] = useState(props.imageProduit.split("**"))
    const [videoProduit, setVideoProduit] = useState(props.videoProduit.split("**"))
    
    let tableLien = []
    let tableButton = []
    let tableButtonRed = []
    nomProduits.map((nomProduit, i) => (
      tableLien.push(["m-0 p-0 m-auto z-30 justify-center flex w-full", true]) 
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
      if (parseInt(reste[i]) === parseInt(nombreReste[i]) || reste[i] === undefined) {
        tableButtonRed.push(["flex w-[200px] h-[40px] bg-red-500 hover:bg-red-400 rounded-[10px] text-white text-center m-auto", true]) 
      } else {
        tableButtonRed.push(["flex w-[200px] h-[40px] bg-red-500 z-30 hover:bg-red-400 rounded-[10px] text-white text-center m-auto", true])
      }
})  
  
    const [classButton, setClassButton] = useState(tableButton)
    const [classButtonRed, setClassButtonRed] = useState(tableButtonRed)    
  


  const handleModifier = () => {
    
  }
  const handleSupprimer = () => {

  }


  const [inputFileImage, setInputFileImage] = useState(null);
  const [inputFileVideo, setInputFileVideo] = useState(null);
  const [sourceImage, setSourceImage] = useState("");
  const [sourceVideo, setSourceVideo] = useState("");

async function sendData(event) {
    event.preventDefault();
    async function envoyerFile(event, inputFile) {

        event.preventDefault();

        // Vérifier qu'un fichier a été sélectionné
        if (!inputFile) {

            alert(
                "Veuillez sélectionner une image ou une vidéo."
            );

            return;
        }


        console.log(
            "Nom :",
            inputFile.name
        );

        console.log(
            "Type :",
            inputFile.type
        );

        console.log(
            "Taille :",
            inputFile.size
        );

        // FORMDATA

        const formData = new FormData();

        formData.append(
            "file",
            inputFile
        );

        try {

            const response = await fetch(
                "http://localhost:5000/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const resultat =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    resultat.message ||
                    "Erreur lors de l'envoi"
                );
            }

            console.log(
                "Réponse serveur :",
                resultat
            );


            alert(
                resultat.message +
                "\n\nFichier : " +
                resultat.nomFichier
            );


            // URL accessible depuis React
            console.log(
                "URL :",
                "http://localhost:5000" +
                resultat.chemin
            );


        } catch (error) {

            console.error(
                "Erreur :",
                error
            );


            alert(
                "Erreur lors de l'envoi : " +
                error.message
            );
        }
    }
    envoyerFile(event, inputFileImage)
    envoyerFile(event, inputFileVideo)
}

    return(
        <>
        <div class="flex w-screen mt-10">
        {nomProduits.map((nomProduit, i) => (
              <div key={i} class="w-[30%] m-auto p-[20px_10px] hover:[border:1px_solid] hover:[transform:scale(0.96)] [transition:100ms_ease_all] border-blue-500 border-3 hover:[box-shadow:0px_0px_10px_black] rounded-[20px]">
                <div class="bg-[rgb(210,210,210)] p-[10px] absolute text-[25px] font-semibold mt-[-40px] w-[200px]">
                  <input class="w-full border-b-2" placeholder={nomProduit} onChange={(e) => {
                    nomProduits[i] = e.target.value
                    setNomProduits(nomProduits)}} />
                </div>
                <div>
                  <img src={imageProduit[i]} alt="" />
                  <div  class="m-auto border-b-[2px] border-b-blue-500 w-[80%]">
                    <div class="text-blue-500 font-bold">Changer l'image: </div>
                    <input type="file"
                            accept="image/*"
                           class="ml-[-10px] pl-0"
                          onChange={(e) => {

                              const file = e.target.files[0];

                              if (!file) {
                                  return;
                              }

                              setInputFileImage(file);

                              // Créer un aperçu local
                              const url = URL.createObjectURL(file);
                              imageProduit[i] = url
                              setImageProduit(imageProduit)

                              }}                            
                            /></div>
                </div>
                <div class="mt-7">
                  <video src={videoProduit[i]} controls alt="" />
                  <div  class="m-auto border-b-[2px] border-b-blue-500 w-[80%]">
                    <div class="text-blue-500 font-bold">Changer le video: </div>
                    <input type="file"
                           accept="video/*"
                           class="ml-[-10px] pl-0"
                          onChange={(e) => {

                              const file = e.target.files[0];

                              if (!file) {
                                  return;
                              }

                              setInputFileVideo(file);

                              // Créer un aperçu local
                              const url = URL.createObjectURL(file);

                              videoProduit[i] = url
                              setVideoProduit(videoProduit)

                          }}                           
                           /></div>
                </div>
                <div class="flex w-full">
                  <div class="w-[50%] [line-height:40px] text-left">
                    <div>Reduction: </div>
                    <div>
                      Prix de produit: 
                    </div>
                    <div>
                      Nombre restant: 
                    </div>
                  </div>                  
                  <div class="w-[50%] text-right [line-height:30px]">
                    <div class="w-full">
                      <input class="text-right w-full border-b-2 border-b-red-600"
                       placeholder={reductionProduit[i]}
                       type="number" 
                       onChange={(e) => {
                        reductionProduit[i] = e.target.value + "%"
                        setReductionProduit(reductionProduit)}} />                      
      
                    </div>
                    <div class="text-[25px] font-black w-full">
                      <input class="text-right w-full border-b-2 border-b-blue-600"
                       placeholder={prixProduit[i]}
                       type="number"
                       onChange={(e) => {
                        prixProduit[i] = e.target.value + "Ar"
                        setPrixProduit(prixProduit)}} />                      
                    </div>
                              
                    <div class="text-[25px] font-black w-full">
                      <input  class="text-right w-full border-b-2 border-b-blue-600"
                              type="number"
                              placeholder={reste[i]}/>
                    </div> 
                  </div>         
                </div>
                <div class="w-full flex">
                  <form class="w-full flex">
                    <div type="submit" class={classLien[i][0]}>
                      <div class="m-0 m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                      <div class="m-0 w-[200px] h-[40px] m-auto bg-green-500 hover:bg-green-400 rounded-[10px] p-[10px] text-white text-center m-auto">
                          Acheter
                      </div>
                    </div>
                  </form>
                </div>                
                <div class="w-full mt-3 flex justify-center">
                  <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <div class={classButton[i][0]}>
                        <div class="m-0 m-auto p-[10px]">Ajouter au panier</div>
                    </div>
                  </div>
                <div class="w-full mt-3 flex justify-center">
                  <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <div class={classButtonRed[i][0]}>
                        <div class="m-0 m-auto p-[10px]">Enlever au panier</div>
                    </div>
                  </div>
                <div class="w-full mt-3 flex justify-center">
                     <form onSubmit={sendData}>
                        <button class="flex w-[200px] h-[40px] bg-blue-600 z-30 hover:bg-blue-700 rounded-[10px] text-white text-center m-auto">
                            <div class="m-0 m-auto p-[10px]">Modifier</div>
                        </button>                      
                      </form>   
                  </div>
                <div class="w-full mt-3 flex justify-center">
                     <form onSubmit={handleSupprimer}>
                        <button class="flex w-[200px] h-[40px] bg-red-600 z-30 hover:bg-red-700 rounded-[10px] text-white text-center m-auto">
                            <div class="m-0 m-auto p-[10px]">Supprimer</div>
                        </button>                      
                      </form>   
                  </div>
                  
              </div>        
        ))}
        </div>
        </>
    )
}

export default ProduitAdmin