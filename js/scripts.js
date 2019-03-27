

//********* #Instagram gallery Script **********  

function getInstagramPhotos(){


		// Instagram  access token and authorization code
    	var access_token ="11361350775.1677ed0.412b667f611041308fcd15e56c44badc";
        var authorization = 'https://api.instagram.com/oauth/authorize/?client_id=99bd7840c3ce40a3b30cceace365891f&redirect_uri=' + window.location + '&response_type=token&scope=public_content';
        
        // Init jQuery
        $(document).ready(function () {

        	// Plugin code to retrive images from 
            $('#photos').masongram({
                access_token: access_token,
                count: 10,
                size: 'low_resolution',
                caption: '',
                    
            });
            

        });

// End function
  }
//********* #Instagram gallery Script **********  

//********* switch between pages **********  
$(function(){
	$('nav a').on('click',function(){
		$('nav a').removeClass('active');
		$(this).addClass('active');
		targetDiv=$(this).attr('data-target');
		$('.content').hide();
		$('#'+targetDiv).show();
	});

	$('nav a[data-target=gallery]').on('click',function(){
		// Empty Photos div every time we click on gallery menu anchor and make new API request to get updated Instagram photo stream 
		$('#photos').html('');
		
		// Make new Instagram API request
		getInstagramPhotos();
	});
	
	$('nav a[data-target=offers]').on('click',function(){
		// Empty Photos div every time we click on gallery menu anchor and make new API request to get updated Instagram photo stream 
		$('#offers .container').html('<img src="img/loading.gif" alt="" />');
		
		 // Everytime we update, delete or add item we reload the list from firestore db
		 // this function is in js/firebase-custom-functions.js
		getPromos();
	});



});
//********* #switch between pages **********  





// Menu Dots
$(function(){
$('.dots').html('...........................................................................................................');
});



