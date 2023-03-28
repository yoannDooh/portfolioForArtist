
function animateTargets()
{
    const nav = document.getElementById("navTarg");
    const text = document.getElementById("textTarg");
    const aPropos= document.getElementById("propos");
    const rect= aPropos.getBoundingClientRect();
   
    if (rect.top < -15)
    {
        text.classList.add('TextanimateOnScroll');
        nav.classList.add('NavAnimateOnScroll');
    }    
    else 
    {
        text.classList.remove('TextanimateOnScroll');
        nav.classList.remove('NavAnimateOnScroll');   
    }

}

document.addEventListener("scroll", animateTargets);
