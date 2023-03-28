class gridElement 
{
    topYPos = 8;
    botYPos = 8; 
    height= 0;
    elemBelowShift= 0;
    imageElem = null;
    elemShift= 0;
    reBotYPos = 0; //Position y bas de l'image après avoir été décalé 
}

var paysageSectionGridObj = [];

var gap = 10;


function getFormInput(InputID)
{
    let inputFile= document.getElementById(InputID) ; 

return inputFile;
}

function createImg(Src)
{
    const newImg= document.createElement("IMG");
    newImg.src= Src;

return newImg;
}

function PlaceImg(parentID,image)
{
    let section= document.getElementById(parentID);
    section.appendChild(image);
}

function returnHighestHeight (array)
{
    array.sort(function(a, b){return b.botYPos-a.botYPos});

return array[0];
}

function returnHighestReHeight (array) 
{
    array.sort(function(a, b){return b.reBotYPos-a.reBotYPos});

return array[0];
}

function InstanceGridElement (parentID,elemPerRow)
{
    const elementNumb = document.getElementById(parentID).childElementCount;
    let Images = [];
    let imagesHeight = [];
    let rowHighestElem = 0;
    let reRowHighestElem = 0 ; //élément avec plus grand position Y après décalage 

    for ( let counter=0; counter<elementNumb; ++counter)
    {        
        if (counter==0)
        {
            var rowElems = [] ;  
        }
      
       

        Images[counter]= document.querySelector(`#PaysageSection :nth-child(${counter+1})`);
        imagesHeight[counter]=Images[counter].offsetHeight;     
        paysageSectionGridObj[counter]= new gridElement;
        paysageSectionGridObj[counter].height= imagesHeight[counter];
        paysageSectionGridObj[counter].imageElem=Images[counter];


        if (counter<elemPerRow)
        {
            paysageSectionGridObj[counter].botYPos = 
            paysageSectionGridObj[counter].topYPos+paysageSectionGridObj[counter].height;


            rowElems[counter] =  paysageSectionGridObj[counter];
        }
        
        else 
        {
            if (counter%elemPerRow == 0)
            {

                rowHighestElem = returnHighestHeight (rowElems);
                reRowHighestElem = returnHighestReHeight(rowElems);
                rowElems = [] ;


                for (minus=1; minus<=elemPerRow;minus++ )
                {
                    paysageSectionGridObj[counter-minus].elemBelowShift = 
                  ( (  rowHighestElem.botYPos - paysageSectionGridObj[counter-minus].botYPos)*-1 )

               
              
                
                    if ( (paysageSectionGridObj[counter-minus]!= rowHighestElem) && (rowHighestElem.elemShift < paysageSectionGridObj[counter-minus].elemShift) )
                    {
                        paysageSectionGridObj[counter-minus].elemBelowShift = 
                        paysageSectionGridObj[counter-minus].elemBelowShift + 
                        rowHighestElem.elemShift*-1;

                        if ( (paysageSectionGridObj[counter-minus].elemShift!=0 ) && (paysageSectionGridObj[counter-minus].elemBelowShift!=0 ) )

                            paysageSectionGridObj[counter-minus].elemBelowShift = 
                            paysageSectionGridObj[counter-minus].elemBelowShift+ 
                            paysageSectionGridObj[counter-minus].elemShift+gap;
                    }

                    if (reRowHighestElem!=rowHighestElem || rowHighestElem.elemShift!=0)
                    {
                        paysageSectionGridObj[counter-minus].elemBelowShift = 
                      ( ( reRowHighestElem.reBotYPos - paysageSectionGridObj[counter-minus].reBotYPos)*-1  ) 

                    }
               
                

         
                         
                }


            }

            paysageSectionGridObj[counter].elemShift =  paysageSectionGridObj[counter-elemPerRow].elemBelowShift;
              
            paysageSectionGridObj[counter].topYPos = rowHighestElem.botYPos+gap;   
            paysageSectionGridObj[counter].botYPos = 
            paysageSectionGridObj[counter].topYPos+paysageSectionGridObj[counter].height; 
            

            paysageSectionGridObj[counter].reBotYPos =  paysageSectionGridObj[counter].botYPos+paysageSectionGridObj[counter].elemShift ;
            rowElems[counter] =  paysageSectionGridObj[counter];  

        }

    }
    
console.log(imagesHeight);

}

function adjustGridGap(gridObjArray,elemPerRow)
{
    length= gridObjArray.length
    
    for (counter=elemPerRow; counter<length; counter++)
    {
        if (gridObjArray[counter-elemPerRow].elemBelowShift<0)     
        {
            gridObjArray[counter].imageElem.style.marginTop= 
            `${gridObjArray[counter-elemPerRow].elemBelowShift}px`;
            
        }
  
    }
}


window.addEventListener("load", () => {
    InstanceGridElement ("PaysageSection",3);

    adjustGridGap(paysageSectionGridObj,3);
    
    console.log(paysageSectionGridObj);
  });

