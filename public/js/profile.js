$(document).ready(function () {
    if (!sessionStorage.userId) {
        window.location.href = "/";
    }
    $('#username').append(sessionStorage.lastName + " " + sessionStorage.name);

    $('imgsuccess').html('Upload Success');
    //   if ('/user-images/'+sessionStorage.userId+'.jpg'){
    //     $('#userimage').attr('src','/user-images/'+sessionStorage.userId+'.jpg');
    //   }
    //   else{
    //     $('#userimage').attr('src','http://loremflickr.com/320/240/brazil,rio');
    //   }
    $.ajax({
        url: '/user-images/' + sessionStorage.userId + '.jpg',
        type: 'HEAD',
        error: function () {
            $('#userimage').attr('src', 'http://loremflickr.com/320/240/brazil,rio');
        },
        success: function () {
            $('#userimage').attr('src', '/user-images/' + sessionStorage.userId + '.jpg');
        }
    })
    //   sessionStorage.userId=userId;
    //   sessionStorage.lastName=data.lastname;
    //   sessionStorage.name=data.name;

    var navItems = $('.admin-menu li > a');
    var navListItems = $('.admin-menu li');
    var allWells = $('.admin-content');
    var allWellsExceptFirst = $('.admin-content:not(:first)');
    allWellsExceptFirst.hide();
    navItems.click(function (e) {
        e.preventDefault();
        navListItems.removeClass('active');
        $(this).closest('li').addClass('active');
        allWells.hide();
        var target = $(this).attr('data-target-id');
        $('#' + target).show();
    });

    //puting recent user upload on registered user home page
    // var newDiv = $('<div>');
    // newDiv.html('<div class="col-lg-4 col-sm-6"><div class="card hovercard"><div class="cardheader"></div><div class="avatar"><img alt="" src="http://lorempixel.com/100/100/people/9/"></div><div class="info"><div class="title"><a target="_blank" href="http://scripteden.com/">Product Name</a></div><div class="desc">Product short description goes here</div></div><div class="bottom"><a class="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac"><i class="fa fa-twitter"></i></a><a class="btn btn-danger btn-sm" rel="publisher" href="https://plus.google.com/+ahmshahnuralam"><i class="fa fa-google-plus"></i></a><a class="btn btn-primary btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam"><i class="fa fa-facebook"></i></a><a class="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam"><i class="fa fa-behance"></i> </a></div></div></div>')
    // $('#home').append(newDiv);


})
$('#profile1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "profile");
})


$('#home1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "home");
})

$('#add-product1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "add-product");
})

$('#settings1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "settings");
})

$('#logout1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "logout");
})

$('#message1').on('click', function (e) {
    e.preventDefault();
    // alert('clicked');
    $('#item-search').hide();
    $("#profile1").attr("data-target-id", "message");
})

$('#addProduct').on('click', function (e) {

    e.preventDefault();
   
    
    
    
    
    
    

    var productSelect = $('#productSelect').val().trim();
    var productName = $('#productname').val().trim();
    var userWant = $('#userwant').val().trim();
    var productDescription = $('#productdescription').val().trim();
    var shortDesc = $('#shortdesc1').val().trim();
    var location = $('#myloc').val().trim();
console.log(productSelect)
console.log(productName)
console.log(userWant)
console.log(productDescription)
console.log(shortDesc)
console.log(location)

    if (productSelect === '' || productName === '' || userWant === '' || shortDesc === '' || location === '') {
        alert('Invalid Input');
        return false;
    }
    var userPost = {
        category: productSelect,
        name: productName,
        userwant: userWant,
        description: productDescription,
        shortdesc: shortDesc,
        location: location,
        userid: sessionStorage.userId
    }
    $('#productSelect').val('');
    $('#productname').val('');
    $('#userwant').val('');
    $('#short_desc').val('');
    $('#location').val('');
    productDescription = $('#productdescription').val('');


    $.post('/api/posts/', userPost, function (data) {
        console.log(data);
        localStorage.productId = data.id;
    }).then(function () {
        window.location.href = "/productimages";

    })

})