
function generateRandomIndex(str) 
//génère un nombre au hasard correspond à un index du string sauf si espace
{
    if  ( typeof str != "string" ) 
        return null;

    let characString = Array.from(str);;
    let index ;

    function createRandomIndex()
    {
        index = Math.floor ( (Math.random()*str.length-1)+1 )
        return index ;
    }
    createRandomIndex();
   
    if (characString[index]== ' ')
        {
           while (characString[index]== ' ')
           createRandomIndex();            
        }


return index ;
}

function isElementDifferent(array,index) 
//test si valeur de l'array à l'indexe donné est différent des restes des valeurs de l'array
{
    if  ( !( Array.isArray(array) ) ) 
        return "pas array";
     
    for (let counter=0; counter<array.length-1; counter++)
    {
        if (counter==index)
            continue;

        if (array[index]==array[counter])
            return false 
    }

return true  
}

function lettersToBug (htmlId, nbLetters) 
// indexe au hasard des lettres qu'on fera "buger" après 
//Choisis le nombre de lettre à faire buger dans le string 
//Les stock dans un arrray
// Peut pas être les mêmes lettres

{
    const element = document.getElementById(htmlId);
    const text= element.textContent;

    if  (   !( Number.isInteger(nbLetters) )  || (nbLetters<0) || nbLetters > (text.length/2) )
        return null; 
    
    let indexList = Array (nbLetters);   
    
    
    for (let counter = 0; counter < nbLetters; counter++)
    {
        indexList[counter]=generateRandomIndex(text);
        if (counter>=1 )
            while ( !( isElementDifferent(indexList,counter) ) )
            {
                indexList[counter]=generateRandomIndex(text); 
            }
    } 

return indexList;
}

function createHtmlSPan(str)
{
    if  ( typeof str != "string" ) 
    return null;
    const newSpan = document.createElement("span");
    const htmlText= document.createTextNode(str);
    newSpan.appendChild(htmlText)

return newSpan;
}

function transformToHtmlString (htmlId)
// Prend un texte html et le renvoie avec un span pour chaque caractère
{
    const element = document.getElementById(htmlId);
    const text= element.innerHTML;
    element.innerHTML=null;

    for (counter = 0 ; counter<text.length; counter++)
    { 
        const caractere = createHtmlSPan(text[counter]) ;
        caractere.id = `${htmlId}.${counter}`;
        element.appendChild(caractere);
        
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fonts = ["NexaHeavy", "Times", "NewAwky"];

function animateFont(htmlId,baseFontFamily,randomLetters) 
{
 
    let index= 0;
    let id= null;
    clearInterval(id);
    id = setInterval(frame, 2000);

    async function frame() 
    {  
      
        if (index==fonts.length)
        {
            clearInterval(id);
           for (let counter = 0; counter<randomLetters.length ; counter++) 
           {
            const htmlElement = document.getElementById(`${htmlId}.${ randomLetters[counter] }`) ; 
            htmlElement.style.fontFamily= baseFontFamily ;
            await sleep (90); 
            htmlElement.classList.remove('glitch-text');  
           }
            
            
        }
            else 
            {
            

            for (let counter = 0; counter<randomLetters.length ; counter++)
                {
                const htmlElement = document.getElementById(`${htmlId}.${ randomLetters[counter] }`);
                htmlElement.classList.add('glitch-text');  
                htmlElement.style.fontFamily= fonts[index] ;
                }      
                ++index ;

            }
    } 
}



transformToHtmlString("nom");
animateFont ("nom", "NexaHeavy",lettersToBug ("nom" , 3) );    
setInterval( function() { animateFont ("nom", "NexaHeavy",lettersToBug ("nom" , 3) ); }, 7050);


