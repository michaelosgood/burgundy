// user page comes here!
$(document).ready(function () {

    $('#chat-button').on('click',function (e) {
        // alert('clicked');
        e.preventDefault();
        var myWindow;
        sessionStorage.user2 =$(this).val();
        console.log(sessionStorage.user2);
            myWindow = window.open("/chat", "", "width=500, height=500");
  
    })
    // this function is called after a query to return results on the browser
function show(data) {
    $('#home').empty();
    $("#search_error").hide();
    if (data.length>0) {
        console.log(data.length>0);
        for (var index = 0; index < data.length; index++) {
            var newDiv = $('<div>');
            console.log(data[index].id);
            var imgPath = '/product-images/' + data[index].id + '.jpg';
            if (data[0].still_available) {
                var avail = "<b>Availability: Still Available</b>";
            } else {
                var avail = "<b>Availability: No longer Available</b>";
            }
            newDiv.html('<div class="col-lg-4 col-sm-6 item"  value=' + data[index].id + '><div class="card hovercard"><div class="cardheader"></div><div class="avatar"><img alt="" src=' + imgPath + '></div><div class="info"><div class="title"><a target="_blank" href="/item/' + data[index].id + '">' + data[index].item_name + '</a></div><div class="desc">' + data[index].short_desc + '</div></div><div class="bottom"><a class="btn btn-primary btn-twitter btn-sm" href="#">' + avail + '<i class="fa fa-twitter"></i></a></div></div></div>')
            $('#home').append(newDiv);

        }

    } else {
        $("#search_error").show();
    }
}


    $.get("/api/posts/", function (data) {

     }).then(show)
    $(document).on('click', '.item', function (e) {
        e.preventDefault();
        $('#home').hide();
        var id = $(this).attr('value');
        
        $.get("/api/item/"+id, function (data) {
            console.log(data);
            if (data) {
                $('#item-search').show();
                $('#title').text(data[0].item_name);
                $('#short_desc').html('<b>Description:</b>' + data[0].short_desc);
                $('#item-img').attr('src', 'product-images/' + data[0].id + '.jpg');
                $('#description').text(data[0].description);
                $('#item_category').html('<b>Category: </b>' + data[0].item_category);
                $('#location').html("<b>Location: </b>" + data[0].location);
                $('#user_want').html('<b>Exchange for: </b>' + data[0].user_want);
                $('#chat-button').val(data[0].id);
                
                if (data[0].still_available) {
                    $('#still_available').html("<b>Availability: Still Available</b>");
                } else {
                    $('#still_available').html("<b>Availability: No longer Available</b>");
                }

                console.log(data);
            } else {
                console.log('error');
            }
        })
    })


    $('#search-btn').on('click', function (e) {
        e.preventDefault();
        var searchText = $('#search-text').val().trim();
        if (searchText === '') {
            alert('Enter a product name');
        } else {

            $.get("/api/posts/"+searchText, function (data) {
               

            }).then(show);
        }

    })

   

})