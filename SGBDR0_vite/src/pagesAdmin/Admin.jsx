import { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import LinkDirect from '../fonction/LinkDirect'
import { FaSearch, FaChevronCircleDown, FaChevronCircleLeft } from 'react-icons/fa'
import '../App.css'
import ProduitAdmin from '../fonction/ProduitAdmin'
import produit1 from '../image/ChatGPT Image Jun 12 2026 06_23_35 PM.png'
import Relation from "../fonction/Relation"
import  axios  from 'axios'
let cheminFile = "/src/imageVideo/Detective Conan Opening 1 - Mune Ga Dokidoki (Lyrics in the Description)_1786482118879.mp4"

const ligne1 = produit1+"**"+produit1+"**"+produit1
const lignevideo = cheminFile+"**"+cheminFile

const Admin = () => { 
  

// Reglage des données à afficher
  let [tripleProduits, setTripleProduits] = useState("")
  let [nameProduit, setNameProduit] = useState("")
  let [reduct, setReduct] = useState("")
  let [quantite, setQuantite] = useState("")
  let [prixU, setPrixU] = useState("")
  let [cheminImage, setCheminImage] = useState("")
  let [cheminVideo, setCheminVideo] = useState("")
  let [LigneProduitId, setLigneProduit] = useState([])
  let [LigneProduitImage, setLigneProduitImage] = useState([])
  let [LigneProduitNom, setLigneProduitNom] = useState([])
  let [LigneProduitPu, setLigneProduitPu] = useState([])
  let [LigneProduitQte, setLigneProduitQte] = useState([])
  let [LigneProduitRed, setLigneProduitRed] = useState([])
  let [LigneProduitVideo, setLigneProduitVideo] = useState([])

  // Lien vers le backend
  const API_URL = 'http://localhost:5000/api/vente'
  const API_URL1 = 'http://localhost:5000/api/innerJoin'

  const [inputFileImage, setInputFileImage] = useState(null);
  const [inputFileVideo, setInputFileVideo] = useState(null);
  const [sourceImage, setSourceImage] = useState("");
  const [sourceVideo, setSourceVideo] = useState("");
    

  const [nomProd, setNomProd] = useState('')
  const [red, setRed] = useState(0)
  const [pu, setPu] = useState(0)
  const [reste, setReste] = useState(0) 


  const [typeProduit, setTypeProduit] = useState([])
  const [produit, setProduit] = useState([])

  let [typeSelect, setTypeSelect] = useState("")

  const [classMenu, setClassMenu] = useState(['m-auto flex [flex-direction:column] rounded-[0px_0px_10px_10px] bg-[rgb(200,200,200)] z-[-2] mt-19 p-[5px_0px] absolute [line-height:40px] [opacity:0] [transition:all_ease_40ms] [opacity:0]', false])
  const [classChDown, setClassChDown] = useState('[transform:rotate(0deg)] absolute m-auto [transition:all_ease_40ms]')   
  
  
  const [nom, setNom] = useState('')
  const [prix_unitaire, setPrix_unitaire] = useState(0)
  const [reduction, setReduction] = useState(0)
  const [qte, setQte] = useState(0)
  const [nom_produitMax, setNom_produitMax] = useState('')
  const [nom_video, setNom_video] = useState('')

  const [nom_image, setNom_image] = useState('')

  const [dataVideo, setDataVideo] = useState({
      id : [],
      nom : [],
      nom_video : [],
      nom_image : [],
      reduction : [],

    }
  )
  const [dataImage, setDataImage] = useState([])
  const [dataProduit, setDataProduit] = useState([])
  
  const [imageExist, setImageExist] = useState(false)
  const [videoExist, setVideoExist] = useState(false)


  const [newCategory,setNewCategory] = useState('')
  // Formulaire : pour ajouter ou modifier
  const [formData, setFormData] = useState({
        table: '',
        colonnes: '',
        values: []
    });
  
  const [formDataDiv, setFormDataDiv] = useState({
        table: '',
        colonnes: '',
        values: []
    });
  const [formDataTypeProduit, setFormDataTypeProduit] = useState({
        table: '',
        colonnes: '',
        values: []
    });


  // Mode édition : si on est en train de modifier
  const [editingId, setEditingId] = useState(null);    
 
  // Chargement : pour afficher un message de chargement
  const [loading, setLoading] = useState(true);

  // Le tableau vide [] signifie "exécute une seule fois"
  useEffect(() => {
      chargerData();
  }, []);

  // Récupérer tous les donnees
  const chargerData = async () => {
      try {
          setLoading(true);
          let response = await axios.get(`${API_URL}/*§t_typeProduit ORDER BY id ASC`);
          setTypeProduit(response.data);
          console.log(typeSelect);
         
          if (typeof response.data[0] !== "undefined") {
              if ((typeSelect=== "") && (typeof response.data[0].nomType !== "undefined")){
                response = await axios.get(`${API_URL1}/${response.data[0].nomType}`)
                setDataProduit(response.data)
                
                
              } else if (typeSelect !== "") {
                response = await axios.get(`${API_URL1}/${response.data[0].nomType}`)
                setDataProduit(response.data)                

              }
               
            response = await axios.get(`${API_URL}/*§t_video ORDER BY id ASC`)
            setDataVideo(response.data)

            response = await axios.get(`${API_URL}/*§t_image ORDER BY id ASC`)
            setDataImage(response.data)
                  
            

          }
          response = await axios.get(`${API_URL}/id§t_produit ORDER BY ID DESC LIMIT 1`)
          setNom_produitMax(response.data)          
          // response = await axios.get(`${API_URL}/t_produit.id, nom, t_typeProduit.nomType, prix_unitaire, reduction§t_produit INNER JOIN t_typeProduit WHERE t_produit.id_typeProduit = t_typeProduit.id`)
          // console.log(response);
          
      } catch (error) {
          console.error('Erreur chargement :', error);
          alert('Erreur lors du chargement des donnée');
      } finally {
          setLoading(false);
      }
      
  };  
  // Récupérer tous les donnees de la table choisie
  const chargerAvecTypeSelect = async (Event) => {
    Event.preventDefault()  
    try {
          setLoading(true);
          let response = await axios.get(`${API_URL}/*§t_typeProduit ORDER BY id ASC`);
          setTypeProduit(response.data);
          console.log(response.data[0].id);
          
         
          if (typeof response.data[0] !== "undefined") {
              console.log(typeSelect);
              if ((typeSelect=== "") && (typeof response.data[0].nomType !== "undefined")){
                console.log("use response");
                
                response = await axios.get(`${API_URL1}/${typeSelect}`)
                setDataProduit(response.data)
              }
              if (typeSelect !== "") {
                console.log("use typeSelect");
                
                response = await axios.get(`${API_URL1}/${typeSelect}`)
                setDataProduit(response.data)                
              }
            
            response = await axios.get(`${API_URL}/*§t_video ORDER BY id ASC`)
            setDataVideo(response.data)

            response = await axios.get(`${API_URL}/*§t_image ORDER BY id ASC`)
            setDataImage(response.data)
                  
            

          }
          response = await axios.get(`${API_URL}/id§t_produit ORDER BY ID DESC LIMIT 1`)
          setNom_produitMax(response.data)          
          // response = await axios.get(`${API_URL}/t_produit.id, nom, t_typeProduit.nomType, prix_unitaire, reduction§t_produit INNER JOIN t_typeProduit WHERE t_produit.id_typeProduit = t_typeProduit.id`)
          // console.log(response);
          
      } catch (error) {
          console.error('Erreur chargement :', error);
          alert('Erreur lors du chargement des donnée');
      } finally {
          setLoading(false);
      }
      
  };  

    
  // Enregistrement  
  const handleEnvoyer = async (Event) => {

        const { table, colonnes, values } = formData;
        
        // Validation simple
        if (values === []) {
            alert('Il y a des champs vide!');
            return;
        }
        
        try {
            if (editingId) {
              
                await axios.put(`${API_URL}/${editingId}`, formData);
                alert('les nouveaux informations ont été modifié avec succès !');
            } else {
                // MODE AJOUT : Requête POST
                console.log(formData.values);
                console.log(formData.colonnes);
                console.log(formData.table);
                                  
                await axios.post(API_URL, formData);
                alert('les nouveaux informations a été ajouté avec succès !');
            }
            
            
        } catch (error) {
            console.error('Erreur :', error);
            alert('Erreur lors de l\'opération');
            return
        }
            
  }
  // Enregistrement de type de produit
  function handleEnvoyerTypeProduit() {
    formData.values = formDataTypeProduit.values
    formData.colonnes = formDataTypeProduit.colonnes
    formData.table = formDataTypeProduit.table
    setFormData(formData)
    handleEnvoyer()
    // Recharger la liste
    console.log("Rechargement");
    
    chargerData();
    
    // Réinitialiser le formulaire
    setFormData({ table: '', colonnes:'', values: [] });
    setFormDataTypeProduit({ table: '', colonnes:'', values: [] })
    setEditingId(null);    
  }
   // Enrregistrement de video, image, produit 
      // verification de copie dans le dossier
  const verificationImageVideo = async (event) => {
    event.preventDefault()
   
      try {
          setLoading(true);
          
          dataImage.map((chaqueImage, i) => {
            if(chaqueImage.nom_image === inputFileImage.name) {
              setImageExist(true)
              alert(imageExist)
            }
          })
          dataVideo.map((chaqueVideo, i) => {
            if(chaqueVideo.nom_video === inputFileVideo.name) {
              setImageExist(true)
              alert(videoExist)
            }
          })

      } catch (error) {
          console.error('Erreur chargement :', error);
          alert('Erreur lors du chargement des donnée');
      } finally {
          setLoading(false);
      }
        
    };     
  function handleEnvoyerImage() {
    formData.values = [inputFileImage.name, nom_produitMax]
    formData.colonnes = 'nom_image, id_produit '
    formData.table = 't_image'
    setFormData(formData)
    alert(formData.colonnes)
    alert(formData.values)
    alert(formData.table)
    handleEnvoyer()
    // Recharger la liste
    chargerData();
    
    // Réinitialiser le formulaire
    setFormData({ table: '', colonnes:'', values: [] });
    setEditingId(null);    
  }
  function handleEnvoyerVideo() {
    formData.values = [inputFileVideo.name, nom_produitMax]
    formData.colonnes = 'nom_video, id_produit '
    formData.table = 't_video'
    setFormData(formData)
    alert(formData.colonnes)
    alert(formData.values)
    alert(formData.table)
    handleEnvoyer()
    // Recharger la liste
    chargerData();
    
    // Réinitialiser le formulaire
    setFormData({ table: '', colonnes:'', values: [] });
    setEditingId(null);    
  }
  function handleEnvoyerProduit() {
    formData.values = [nom, prix_unitaire, qte, reduction, typeSelect]
    formData.colonnes = 'nom, prix_unitaire, qte, reduction, id_typeproduit '
    formData.table = 't_produit'
    setFormData(formData)
    alert(formData.colonnes)
    alert(formData.values)
    alert(formData.table)
    handleEnvoyer()
    // Recharger la liste
    chargerData();
    
    // Réinitialiser le formulaire
    setFormData({ table: '', colonnes:'', values: [] });
    setEditingId(null);    
  }
  async function sendData(event) {
      event.preventDefault();
      handleEnvoyerProduit()
      verificationImageVideo()
      chargerData()
      
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
      if (imageExist === false) {
        envoyerFile(event, inputFileImage)
        }
      if (imageExist === false) {
       envoyerFile(event, inputFileVideo)
        }
      handleEnvoyerImage()
      handleEnvoyerVideo()
     
}

  return (
    <>
      <div class='m-0 p-0 text-white'>
        <div class = "hidden">
        {
          LigneProduitId = []
        }
        {
          LigneProduitImage = []
        }
        {
          LigneProduitNom = []
        }
        {
          LigneProduitPu = []
        }
        {
          LigneProduitQte = []
        }
        {
          LigneProduitRed = []
        }
        {
          LigneProduitVideo = []
        }
        {
                dataProduit.map((chaqueProduit, i) => {
                  if (((i + 1)% 3 !== 0) && (i + 1 < dataProduit.length )){
                    tripleProduits += chaqueProduit.id +"**"
                    nameProduit += chaqueProduit.nom +"**"
                    reduct += chaqueProduit.reduction +"**"
                    quantite += chaqueProduit.qte +"**"
                    prixU += chaqueProduit.prix_unitaire +"**"
                    cheminImage += "/src/imageVideo/"+chaqueProduit.nom_image +"**"
                    cheminVideo += "/src/imageVideo/"+chaqueProduit.nom_video +"**"                 
                  }else{
                    tripleProduits += chaqueProduit.id +"**"
                    nameProduit += chaqueProduit.nom +"**"
                    reduct += chaqueProduit.reduction +"**"
                    quantite += chaqueProduit.qte +"**"
                    prixU += chaqueProduit.prix_unitaire +"**"
                    cheminImage += "/src/imageVideo/"+chaqueProduit.nom_image +"**"
                    cheminVideo += "/src/imageVideo/"+chaqueProduit.nom_video +"**"      
                    
                    tripleProduits = tripleProduits.slice(0,tripleProduits.length - 2)
                    nameProduit = nameProduit.slice(0,nameProduit.length - 2)
                    reduct = reduct.slice(0,reduct.length - 2)
                    quantite = quantite.slice(0,quantite.length - 2)
                    prixU = prixU.slice(0,prixU.length - 2)
                    reduct = reduct.slice(0,reduct.length - 2)
                    cheminImage = cheminImage.slice(0,cheminImage.length - 2)
                    cheminVideo = cheminVideo.slice(0,cheminVideo.length - 2)
                    
                    LigneProduitId.push(tripleProduits)
                    LigneProduitNom.push(nameProduit)
                    LigneProduitImage.push(cheminImage)
                    LigneProduitPu.push(prixU)
                    LigneProduitQte.push(quantite)
                    LigneProduitRed.push(reduct)
                    LigneProduitVideo.push(cheminVideo)
                    tripleProduits = ""
                    nameProduit = ""
                    reduct = ""
                    quantite = ""
                    prixU = ""
                  }                                                      
                })}
        </div>
          <header class="w-screen font-bold bg-red-500 flex justify-between">
              <div class="text-red-500 text-[30px] p-[10px] border-b-red-500 border-b-2 bg-white pr-[30px] rounded-[0px_20px_20px_0px]"><h1>Nom du projet </h1></div>
              <div class="m-auto w-[50%] p-[10px_20px] ">
                <ul class="m-auto flex justify-between">
                  <LinkDirect liens="/AproposAdmin**/Historique**/Paramètre"
                              sonNom = "A propos**Historique**Paramètre"
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
              <div class="m-auto p-[15px_5px] flex">
                <div>
                  <div class="text-black font-bold m-auto">catégorie des produits</div>
                  <select class="w-full p-[5px_15px] text-black font-semibold border-2 border-blue-500"
                          onChange={(e) => {
                            console.log(e.target.value);
                            typeSelect = e.target.value
                            
                            setTypeSelect(typeSelect)
                            console.log(typeSelect);
                            
                          }}>
                    {typeProduit.map((chaqueType, i) => (
                      <option key={i} value={chaqueType.nomType} class="border-blue-500 border-2">{chaqueType.nomType}</option>
                    ))}
                  </select>                                  
                </div>
                <button class="ml-4 w-[40px] flex justify-center items-center"
                onClick={() => {
                  if (classMenu[1] === false) {
                    setClassMenu(['m-auto flex [flex-direction:column] rounded-[0px_0px_10px_10px] bg-[rgb(200,200,200)] z-30 mt-19 p-[5px_0px] absolute [line-height:40px] [opacity:1] [transition:all_ease_40ms] [opacity:0]', true])
                    setClassChDown('[transform:rotate(90deg)] absolute m-auto [transition:all_ease_40ms]')
                  }else{
                    setClassMenu(['m-auto flex [flex-direction:column] rounded-[0px_0px_10px_10px] bg-[rgb(200,200,200)] z-[-2] mt-19 p-[5px_0px] absolute [line-height:40px] [opacity:0] [transition:all_ease_40ms] [opacity:0]', false])
                    setClassChDown('[transform:rotate(0deg)] absolute m-auto [transition:all_ease_40ms]')                    
                  }
                }}>
                  <FaChevronCircleDown class={classChDown} size="30" color='rgb(150,150,150)' />

                </button>
                <div class={classMenu}>
                  <form onSubmit={chargerAvecTypeSelect}><button type='submit' class="w-full hover:bg-blue-400 p-[7px]">Voir les produits</button></form>
                  <form action=""><button class="w-full hover:bg-blue-400 p-[7px]">Supprimer ce catégorie</button></form>
                  <form action=""><button class="w-full hover:bg-blue-400 p-[7px]">Modifier le nom de ce catégorie</button></form>
                </div>
              </div>
              <div class='ml-5 m-auto flex text-black'>
                <form onSubmit={handleEnvoyerTypeProduit} class="flex">
                  <div class="flex [flex-direction:column]">
                    <label class="font-black">Nouveau Catégorie:</label>
                    <input type="text"
                          class="pb-2 border-b-2 border-b-blue-500"
                            placeholder='Son nom'
                            onChange={(e) => {
                              formDataTypeProduit.values = [e.target.value]
                              formDataTypeProduit.table = 't_typeProduit'
                              formDataTypeProduit.colonnes = 'nomType'
                              setFormDataTypeProduit(formDataTypeProduit)
                            } 
                              }
                            />
                  </div>
                  <button class="bg-blue-600 hover:bg-blue-500 p-[10px] text-white ml-[40px] rounded-[10px]"
                          type="submit">Enregistrer</button>
                </form>
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

          <div class="text-black mt-10 w-screen text-black justify-between">
              {LigneProduitId.map((id,i) => (
                
                <div key={i}>
                 
                  <ProduitAdmin nomProduit={LigneProduitNom[i]} 
                                reductionProduit={LigneProduitRed[i]}
                                prixProduit={LigneProduitPu[i]}
                                lienConfirmation=""
                                nombreRestant = {LigneProduitQte[i]}
                                imageProduit={LigneProduitImage[i]}
                                videoProduit={LigneProduitVideo[i]}
                                
                                />              
                </div>
                ))}
              <form onSubmit={sendData}>
                <div class="w-[30%] m-auto mt-10 p-[20px_10px] border-blue-500 border-3 rounded-[20px]">
                  <div class="bg-[rgb(210,210,210)] w-[15%] absolute text-[25px] font-semibold mt-[-40px]">
                    <div class="w-full">
                      <input class="m-auto border-b-[2px] border-b-blue-500 w-[80%]"
                             type="text"
                             onChange={(e) => {
                                setNom(e.target.value)
                             }} required />
                    </div>
                  </div>
                  <div>
                    <img src={sourceImage} alt="" />
                    <input
                        type="file"
                        accept="image/*"
                        className="border-2 border-blue-500 mt-4 cursor-pointer"
                        onChange={(e) => {

                            const file = e.target.files[0];

                            if (!file) {
                                return;
                            }

                            setInputFileImage(file);

                            // Créer un aperçu local
                            const url = URL.createObjectURL(file);

                            setSourceImage(url);

                        }}
                    />
                  </div>
                  <div class="mt-5">
                    <video src={sourceVideo} controls alt="" />
                    <input
                        type="file"
                        accept="video/*"
                        className="border-2 border-blue-500 mt-4 cursor-pointer"
                        onChange={(e) => {

                            const file = e.target.files[0];

                            if (!file) {
                                return;
                            }

                            setInputFileVideo(file);

                            // Créer un aperçu local
                            const url = URL.createObjectURL(file);

                            setSourceVideo(url);

                        }}
                    />
                  </div>
                  <div class="flex w-full">
                    <div class="w-[50%] [line-height:40px] text-left">
                      <div class="mt-5">Reduction: </div>
                      <div>
                        Prix de produit: 
                      </div>
                      <div>
                        Nombre restant: 
                      </div>
                    </div>                  
                    <div class="w-[50%] text-right [line-height:30px]">
                      <div>
                        <input class="m-auto text-right w-full p-0 border-b-2 w-[40%] border-b-red-500"
                                type="number"
                                min={0}
                                max={100}
                                placeholder='Reduction'
                                onChange={(e) => {
                                  setReduction(e.target.value)
                                }} />
                      </div>
                      <div class="ml-5 font-black">
                        <input class="m-auto text-right w-full p-0 border-b-2 w-[40%] border-b-blue-500"
                               type="number"
                               placeholder='P.U'
                               min={0}
                               onChange={(e) => {
                                setPrix_unitaire(e.target.value)
                               }} required />
                      </div>                              
                      <div class="ml-5 font-black">
                        <input class="m-auto text-right w-full p-0 border-b-2 w-[40%] border-b-blue-500"
                                type="number"
                                placeholder='Quantité'
                                min={0}
                                onChange={(e) => {
                                  setQte(e.target.value)
                                }} />
                      </div> 
                    </div>         
                  </div>
                  <div class="w-full flex justify-center">
                    <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <div class="m-0 m-auto z-30 flex">
                      <div class="m-0 w-[200px] m-auto h-[40px] bg-green-500 hover:bg-green-400 rounded-[10px] p-[10px] text-white text-center m-auto">
                          Acheter
                      </div>
                      </div>
                  </div>
                  <div class="w-full mt-3 flex justify-center">
                    <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <div class="flex w-[200px] h-[40px] bg-blue-500 z-30 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto">
                        <div class="m-0 m-auto p-[10px]">Ajouter au panier</div>
                    </div>
                  </div>
                  <div class="w-full mt-3 flex justify-center">
                    <div class="m-auto w-[200px] bg-[rgba(255,255,255,0.5)] h-[40px] absolute"></div>
                    <div class="flex w-[200px] h-[40px] bg-red-500 z-30 hover:bg-red-400 rounded-[10px] text-white text-center m-auto">
                        <div class="m-0 m-auto p-[10px]">Enlever au panier</div>
                    </div>
                  </div>
                  <div class="w-full mt-5 flex">
                    <button class="m-auto flex p-[10px] bg-blue-500 z-30 hover:bg-blue-400 rounded-[10px] text-white text-center m-auto" 
                            type='Submit'>Enregistrer
                    </button>
                  </div>
                </div>
              </form>     
          </div>
      </div>
    </>
  )
}

export default Admin
