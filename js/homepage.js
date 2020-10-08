window.onload=function(){
    // Get the parameter object
    var oBox=document.getElementById('box');
    // Get the the left botton
    var oPrev=oBox.children[0];
    // Get the the right botton
    var oNext=oBox.children[1];
    // Get the collection of objects of the tag name:
    var oUl=oBox.getElementsByTagName('ul')[0];
    // Get yl subset
    var aLi=oUl.children;
    // Get the collection of objects of the tag name:
    var oOl=oBox.getElementsByTagName('ol')[0];
    // Get ol subset
    var aBtn=oOl.children;

    //Make a copy first
    oUl.innerHTML+=oUl.innerHTML;
    //Calculate the width
    oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';

    var W=oUl.offsetWidth/2;

    //When the mouse is placed on the button, the button will be displayed（not showing button at the beginning）
    oBox.onmouseover=function(){
        clearInterval(timer);
        oPrev.style.display='block';
        oNext.style.display='block';
    }
    oBox.onmouseout=function(){
        timer=setInterval(function(){
			
            iNow--;
            tab();
        },2000);
        oPrev.style.display='none';
        oNext.style.display='none';
    }
    //keep the same loop mod
    var iNow=0;

    //tab things
    for(var i=0; i<aBtn.length; i++){
        (function(index){
            aBtn[i].onclick=function(){

                if(index==0 && iNow%aBtn.length==aBtn.length-1){//After a loop finished, index=0; iNow%aBtn.length=is the last image. iNow be in
                    //++;
                    iNow++;
                }
                if(index==aBtn.length-1 && iNow%aBtn.length==0){//After a loop finish, index=the last subscript; iNow%aBtn.length= the first picture. iNow are in
                    //--;
                    iNow--;
                }

                if(iNow>0){
                    iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;//Math.floor(iNow/aBtn.length)*aBtn.length Correspond to newMove，The corresponding buttons are also changing accordingly when images are moving。
                }else{
                    if(index==0 && iNow%aBtn.length==-1){
                        iNow++;
                    }
                    iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
                }
                tab();
                document.title=iNow;
            }
        })(i);
    }

    function tab(){
        for(var i=0; i<aBtn.length; i++){
            aBtn[i].className='';
        }
        if(iNow<0){
            aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='active';
        }else{
            aBtn[iNow%aBtn.length].className='active';
        }
        //oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
        console.log(iNow)
        startMove(oUl,-iNow*aLi[0].offsetWidth);
    }

    //click the right button --->
    oNext.onclick=function(){
        iNow++;
        tab();

    }
    // setting time 
    var timer=null;
    timer=setInterval(function(){
        iNow--;
        tab();
    },5000);
    // click the left button <---
    oPrev.onclick=function(){
        iNow--;
        tab();

    }
    var left=0;
    function startMove(obj,iTarget){
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            var iSpeed=(iTarget-left)/8;//  Total distance/8 to get speed。
                //Judging whether the speed is positive or negative, to choose different values, it cannot be a decimal, and it requires a width of li each time.
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

            if(left==iTarget){//Judging l=iTaegrt
                clearInterval(obj.timer);
            }else{
                left+=iSpeed;
                if(left<0){
                    obj.style.left=left%W+'px';
                }else{
                    obj.style.left=(left%W-W)%W+'px';
                }
            }

        },30);
    }
}

window.addEventListener('load', function() {
    // get left button
    var leftArrow = this.document.querySelector('.lf');
    // get right button
    var rightArrow = this.document.querySelector('.lr');
 
    // Move the mouse to the left and right arrows to change the images
    leftArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '0 0';
    });
    // addeventlistener
    leftArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-83px 0';
    });
 // addeventlistener
    rightArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '-42px 0';
    });
 // addeventlistener
    rightArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-123px 0';
    });
 
    // get images and the small points on the bottom of images .....
    var imgs = this.document.querySelectorAll('.img');
    var dots = this.document.querySelector('.dots').querySelectorAll('span');
 
    // Set the index property to the IMAGES to determine which IMAGES IS the current one
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('data-index', i);
    }
 
    // Get current images and images index
    var current = this.document.querySelector('.current');
    var currentIndex = current.getAttribute('data-index');
 
    // The click event of the left arrow(button), click to return to the previous images 
    // If the current image is the first one, it needs to be changed to the last image, which is the 5th.
    leftArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[--currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        } else {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 4;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        }
    });
 
    // Click the right arrow to switch to the next picture
    // If it is currently the fifth image showing, switch back to the first image
    rightArrow.addEventListener('click', changeImage);
 
    var timer = this.setInterval(changeImage, 2000);
 
    function changeImage() {
        if (currentIndex < 4) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[++currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        } else {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 0;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        }
    };
 
    // Click event of small dot
    for (let k = 0; k < dots.length; k++) {
        dots[k].setAttribute('data-index', k);
        dots[k].addEventListener('click', function() {
            var index = this.getAttribute('data-index');
            if (index != currentIndex) {
                imgs[currentIndex].classList.remove('current');
                dots[currentIndex].classList.remove('square');
                imgs[index].classList.add('current');
                dots[index].classList.add('square');
                currentIndex = index;
            }
 
        })
    }
 
});