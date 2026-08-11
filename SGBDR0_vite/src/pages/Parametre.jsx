import LinkDirect from "../fonction/LinkDirect"

function Parametre() {
    return(
        <>
          <header class="w-screen font-bold bg-red-500 flex justify-between">
              <div class="text-red-500 text-[30px] p-[10px] border-b-red-500 border-b-2 bg-white"><h1>Nom du projet </h1></div>
              <div class="m-auto w-[50%] p-[10px_20px] ">
                <ul class="m-auto flex justify-between">
                  <LinkDirect liens="/Accueil**/Apropos**/Historique**/Paramètre"
                              sonNom = "Accueil**A propos**Historique**Paramètre"
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
        </>
    )
}

export default Parametre