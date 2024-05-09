const alllikeButton = document.querySelectorAll('.like-button');

async function likeButton(productid, btn) {

    try{
        //we are using this format of axios(config one) so that below syntax of AJAX declaration is possible
        const response =  await axios({
            method: 'post',
            url: `/product/${productid}/like`,

            //For telling this request is AJAX to IsLogin middleware 
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
        });

        //this will help in dynamic change of heart
        //toggle method cannot be used here as it is used for single class here we have two classes
        if(btn.children[0].classList.contains('fas')) {//to target the i tag containing type of heart
            btn.children[0].classList.remove('fas');
            btn.children[0].classList.add('far');
        } else {
            btn.children[0].classList.remove('far');
            btn.children[0].classList.add('fas');
        }
        // console.log(response);
    }
    catch(e){
        window.location.replace('/login');//redirecting with JavaScript
        //once we enter here we can now do the redirecting earlier AJAX was just sending the error in the body 
        console.log(e.message);
    }
}


for(let btn of alllikeButton) {
    btn.addEventListener('click',() => {
        const productid = btn.getAttribute('product-id');
        likeButton(productid, btn);
    })
}